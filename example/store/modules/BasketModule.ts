import {ActionContext, Module} from 'vuex'
import { AccessorHandler } from '../../../src'
import { RootState } from '../RootStore'
import { BasketItem } from '../../models/BasketItem'

export type BasketContext = ActionContext<BasketState, RootState>

export interface BasketState {
  items: BasketItem[]
}

@AccessorHandler
// @ts-ignore
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
