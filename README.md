# Vuex Typescript Accessor

An effective accessor to make Vuex 100% typescript friendly

## Install
```
npm i @simpli/vuex-typescript vuex
```

## Configuration with example

The example below is a Vuex Store scenario which has
the `RootStore` with a module called `BasketModule`

### src/store/index.ts
```typescript
import Vue from 'vue'
import Vuex, {Store} from 'vuex'
import {RootStore} from '@/store/RootStore'
import {BasketModule} from '@/store/modules/BasketModule'

Vue.use(Vuex)

export const root = new RootStore()
export const basket = new BasketModule()

root.modules = {
  basket,
}

export new Store(root)
```

### src/store/RootStore.ts
```typescript
import {AccessorHandler} from '@simpli/vuex-typescript'
import {ActionContext, ModuleTree, StoreOptions} from 'vuex'

export interface RootState {
  language: string
}

export type RootContext = ActionContext<RootState, RootState>

@AccessorHandler
export class RootStore implements StoreOptions<RootState> {
  modules?: ModuleTree<RootState>

  state: RootState = {
    language: 'en-US',
  }

  getters = {
    language: (state: RootState) => state.language,
  }

  actions = {
    changeLanguage(context: RootContext, language: string) {
      context.commit('SET_LANGUAGE', language)
    },
  }

  mutations = {
    SET_LANGUAGE(state: RootState, val: string) {
      state.language = val
    },
  }
}
```

### src/store/modules/BasketModule.ts
```typescript
import {AccessorHandler} from '@simpli/vuex-typescript'
import {ActionContext, Module} from 'vuex'
import {RootState} from '@/store/RootStore'
import {BasketItem} from '@/models/BasketItem'

export type BasketContext = ActionContext<BasketState, RootState>

export interface BasketState {
  items: BasketItem[]
}

@AccessorHandler
export class BasketModule implements Module<BasketState, RootState> {
  namespaced = true

  state: BasketState = {
    items: [],
  }

  getters = {
    isEmpty: (state: BasketState) => !state.items.length,
    items: (state: BasketState) => state.items,
    amount: (state: BasketState) => state.items.reduce((a, b) => a + (b.price || 0), 0),
  }

  actions = {
    async addItem(context: BasketContext, item: BasketItem) {
      context.commit('PUSH_ITEM', item)
    },

    async removeItem(context: BasketContext, item: BasketItem) {
      context.commit('REMOVE_ITEM', item)
    },

    async clearBasket(context: BasketContext) {
      context.commit('SET_ITEMS', [])
    },
  }

  mutations = {
    PUSH_ITEM(state: BasketState, item: BasketItem) {
      state.items.push(item)
    },

    REMOVE_ITEM(state: BasketState, item: BasketItem) {
      const index = state.items.indexOf(item);
      if (index >= 0) {
        state.items.splice(index, 1);
      }
    },

    SET_ITEMS(state: BasketState, items: BasketItem[]) {
      state.items = items
    },
  }
}
```

### src/models/BasketItem.ts
```typescript
export class BasketItem {
  constructor(
    public id: number | null = null,
    public name: string | null = null,
    public price: number | null = null,
  ) {}
}
```

### src/helpers/App.ts
```typescript
import {AccessorWrapper} from '@simpli/vuex-typescript'
import {RootState} from '@/store/RootStore'
import {store, root} from '@/store'

export const wrapper = new AccessorWrapper<RootState, RootState>()

export abstract class App {
  $read = wrapper.accessors.read
  $dispatch = wrapper.accessors.dispatch
  $commit = wrapper.accessors.commit

  get language() {
    return App.$read(root.getters.language)(store)
  }

  changeLanguage(language: string) {
    return App.$dispatch(root.actions.changeLanguage)(store, language)
  }
}
```

### src/helpers/Basket.ts
```typescript
import {AccessorWrapper} from '@simpli/vuex-typescript'
import {RootState} from '@/store/RootStore'
import {BasketState} from '@/store/modules/BasketModule'
import {BasketItem} from '@/models/BasketItem'
import {basket} from '@/store'

export const wrapper = new AccessorWrapper<BasketState, RootState>('basket')

export abstract class Basket {
  $read = wrapper.accessors.read
  $dispatch = wrapper.accessors.dispatch
  $commit = wrapper.accessors.commit

  get isEmpty() {
    return Basket.$read(basket.getters.isEmpty)(store)
  }

  get items() {
    return Basket.$read(basket.getters.items)(store)
  }

  get amount() {
    return Basket.$read(basket.getters.amount)(store)
  }

  addItem(item: BasketItem) {
    return Basket.$dispatch(basket.actions.addItem)(store, item)
  }

  removeItem(item: BasketItem) {
    return Basket.$dispatch(basket.actions.removeItem)(store, item)
  }

  clearBasket() {
    return Basket.$dispatch(basket.actions.clearBasket)(store)
  }
}
```

### src/types/vue.d.ts
```typescript
import {App} from '@/helpers/App'
import {Basket} from '@/helpers/Basket'

declare module 'vue/types/vue' {
  interface Vue {
    $app: typeof App
    $basket: typeof Basket
  }
}
```

### src/main.ts
```typescript
import Vue from 'vue'
import {App} from '@/helpers/App'
import {Basket} from '@/helpers/Basket'

// ...

Vue.prototype.$app = App
Vue.prototype.$basket = Basket

// ...

```

## Usage in Typescript/JS file

```typescript
import {Root} from '@/helpers/Root'

console.log(Root.language) // en-US

Root.changeLanguage('pt-BR')

console.log(Root.language) // pt-BR
```

```typescript
import {Basket} from '@/helpers/Basket'
import {BasketItem} from '@/models/BasketItem'

const items = Basket.items

console.log(items) // []
console.log(Basket.isEmpty) // true
console.log(Basket.amount) // 0

const item1 = new BasketItem(1, 'foo', 10)
const item2 = new BasketItem(2, 'bar', 20)
const item3 = new BasketItem(3, 'foobar', 30)

Basket.addItem(item1)
Basket.addItem(item2)
Basket.addItem(item3)

console.log(items) // [item1, item2, item3]
console.log(Basket.isEmpty) // false
console.log(Basket.amount) // 60

Basket.removeItem(item2)

console.log(items) // [item1, item3]
console.log(Basket.isEmpty) // false
console.log(Basket.amount) // 40

Basket.clearBasket()

console.log(items) // []
console.log(Basket.isEmpty) // true
console.log(Basket.amount) // 0
```

## Usage in Vue file
```vue
<template>
  <div>
    <div>
      Current language:
      {{ $app.language }}
    </div>

    <button @click="$app.changeLanguage('pt-BR')">
      Change Language
    </button>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class MyComponent extends Vue {}
</script>
```

## Credit

This library was built based on this repository
https://github.com/istrib/vuex-typescript
