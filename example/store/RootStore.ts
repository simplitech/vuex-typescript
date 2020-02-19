import {ActionContext, ModuleTree, StoreOptions} from 'vuex'
import { AccessorHandler } from '../../src'

export interface RootState {
  language: string
}

export type RootContext = ActionContext<RootState, RootState>

@AccessorHandler
// @ts-ignore
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
