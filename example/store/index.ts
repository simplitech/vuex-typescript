import {Store} from 'vuex'
import { RootStore } from './RootStore'
import { BasketModule } from './modules/BasketModule'

export const root = new RootStore()
export const basket = new BasketModule()

root.modules = {
  basket,
}

export function createStore() {
  return new Store(root)
}
