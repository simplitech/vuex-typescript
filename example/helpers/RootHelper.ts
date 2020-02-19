import { AccessorWrapper } from '../../src'
import { RootState } from '../store/RootStore'
import { root } from '../store'
import { Store } from 'vuex'

export const wrapper = new AccessorWrapper<RootState, RootState>()

export class RootHelper {
  constructor(public store: Store<RootState>) {}

  $accessors = wrapper.accessors

  get language() {
    return this.$accessors.read(root.getters.language)(this.store)
  }

  changeLanguage(language: string) {
    return this.$accessors.dispatch(root.actions.changeLanguage)(this.store, language)
  }
}
