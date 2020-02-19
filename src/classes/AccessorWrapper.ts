import { StoreAccessor } from '../interfaces/StoreAccessor'

/**
 * Vuex Accessor Wrapper
 */
export class AccessorWrapper<TModuleState, TRootState> {
  readonly namespace: string
  readonly accessors: StoreAccessor<TModuleState, TRootState>

  constructor(namespace = '') {
    this.namespace = namespace

    this.accessors = {
      commit: (handler: Function) => this.createAccessor('commit', handler),
      dispatch: (handler: Function) => this.createAccessor('dispatch', handler),
      read: (handler: Function) => {
        const key = this.qualifyKey(handler)

        return (store: any) => {
          return store.rootGetters
            ? store.rootGetters[key] // ActionContext
            : store.getters[key] // Store
        }
      }
    }
  }

  private createAccessor(operation: string, handler: Function): any {
    const key = this.qualifyKey(handler)
    return (store: any, payload: any) => store[operation](key, payload, { root: true })
  }

  private qualifyKey(handler: Function) {
    const key = (handler as any)._vuexKey

    if (!key) {
      console.warn(`Vuex handler functions must not be anonymous.
Vuex needs a key by which it identifies a handler.
      `)
      return ''
    }

    return this.namespace ? `${this.namespace}/${key}` : key
  }
}
