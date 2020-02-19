import { Module } from 'vuex'

/**
 * Accessor Handler Decorator
 * Used as decorator - @AccessorHandler
 * @param constructor
 */
export function AccessorHandler<T extends { new (...args: any[]): {} }>(constructor: T) {
  const objectModule: Module<any, any> = new constructor()

  if (objectModule.getters) {
    Object.keys(objectModule?.getters).forEach(key => {
      const getters: any = objectModule.getters
      getters[key]._vuexKey = key
    })
  }

  if (objectModule.actions) {
    Object.keys(objectModule.actions).forEach(key => {
      const actions: any = objectModule.actions
      actions[key]._vuexKey = key
    })
  }

  if (objectModule.mutations) {
    Object.keys(objectModule.mutations).forEach(key => {
      const mutations: any = objectModule.mutations
      mutations[key]._vuexKey = key
    })
  }

  return class extends constructor {
    getters = objectModule.getters
    actions = objectModule.actions
    mutations = objectModule.mutations
  }
}
