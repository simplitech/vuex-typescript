import * as Vuex from 'vuex'
import { createStore } from '../example/store'
import { RootHelper } from '../example/helpers/RootHelper'

const Vue = require('vue')

describe('Root', () => {
  Vue.use(Vuex)

  const helper = new RootHelper(createStore())
  helper.changeLanguage('es')

  it('can get the app language', async () => {
    const result = helper.language

    expect(result).toEqual('es')
  })

  it('can change the app language', async () => {
    await helper.changeLanguage('pt-BR')
    const language = helper.language

    expect(language).toEqual('pt-BR')
  })
})
