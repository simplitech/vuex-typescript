import { AccessorWrapper } from '../../src'
import { RootState } from '../store/RootStore'
import { basket } from '../store'
import { BasketState } from '../store/modules/BasketModule'
import { BasketItem } from '../models/BasketItem'
import { Store } from 'vuex'

export const wrapper = new AccessorWrapper<BasketState, RootState>('basket')

export class BasketHelper {
  constructor(public store: Store<RootState>) {}

  $accessors = wrapper.accessors

  get isEmpty() {
    return this.$accessors.read(basket.getters.isEmpty)(this.store)
  }

  get items() {
    return this.$accessors.read(basket.getters.items)(this.store)
  }

  get amount() {
    return this.$accessors.read(basket.getters.amount)(this.store)
  }

  addItem(item: BasketItem) {
    return this.$accessors.dispatch(basket.actions.addItem)(this.store, item)
  }

  removeItem(item: BasketItem) {
    return this.$accessors.dispatch(basket.actions.removeItem)(this.store, item)
  }

  clearBasket() {
    return this.$accessors.dispatch(basket.actions.clearBasket)(this.store)
  }
}
