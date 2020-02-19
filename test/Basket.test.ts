import * as Vuex from 'vuex'
import { createStore } from '../example/store'
import { RootHelper } from '../example/helpers/RootHelper'
import { BasketHelper } from '../example/helpers/BasketHelper'
import { BasketItem } from '../example/models/BasketItem'

const Vue = require('vue')

describe('Basket', () => {
  Vue.use(Vuex)

  const helper = new BasketHelper(createStore())
  helper.addItem(new BasketItem(1, 'foo', 10))
  helper.addItem(new BasketItem(2, 'bar', 20))
  helper.addItem(new BasketItem(3, 'foobar', 30))

  it('can check if the basket is empty', async () => {
    const result = helper.isEmpty

    expect(result).toEqual(false)
  })

  it('can get item of basket', async () => {
    const result = helper.items.map(item => item.id)

    expect(result).toEqual([1, 2, 3])
  })

  it('can get the amount', async () => {
    const result = helper.amount

    expect(result).toEqual(60)
  })

  it('can add a item', async () => {
    await helper.addItem(new BasketItem(4, 'new', 40))
    const items = helper.items

    expect(items.length).toEqual(4)
  })

  it('can remove a item', async () => {
    const item = helper.items[1]
    await helper.removeItem(item)
    const ids = helper.items.map(item => item.id)

    expect(ids).toEqual([1, 3, 4])
  })

  it('can clear the basket', async () => {
    await helper.clearBasket()
    const items = helper.items
    const isEmpty = helper.isEmpty

    expect(items.length).toEqual(0)
    expect(isEmpty).toEqual(true)
  })
})
