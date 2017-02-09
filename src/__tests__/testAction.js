import test from 'ava'
import { spy } from 'sinon'
import isFunction from 'lodash.isfunction'
import testAction from '../testAction'

test('basic use of testAction', (t) => {
  t.plan(13)

  const initialState = { foo: 'bar' }

  const gettersMock = {
    getter1: spy(),
    getter2: spy()
  }

  const action = spy(({ commit, dispatch, getters, state }, payload) => {
    t.true(isFunction(commit))
    t.true(isFunction(dispatch))
    t.deepEqual(state, initialState)
    t.deepEqual(payload.id, 1)
    t.deepEqual(getters, gettersMock)
    getters.getter1()
    getters.getter2()
    commit('TEST_COMMIT', 1)
    return 'committed'
  })

  const { dispatch, getMutations, reset } = testAction(initialState, gettersMock)

  t.true(isFunction(dispatch))
  t.true(isFunction(getMutations))
  t.true(isFunction(reset))

  const result = dispatch(action, { id: 1 })

  t.true(action.calledOnce)
  t.true(gettersMock.getter1.calledOnce)
  t.true(gettersMock.getter2.calledOnce)
  t.is(result, 'committed')

  const mutations = getMutations()

  t.deepEqual(mutations, [
    { type: 'TEST_COMMIT', payload: 1 }
  ])
})

test('with inlined commit', (t) => {
  const { dispatch, getMutations } = testAction()

  dispatch(({ commit }) => {
    commit('TEST_COMMIT', 1)
  })

  const mutations = getMutations()

  t.deepEqual(mutations, [
    { type: 'TEST_COMMIT', payload: 1 }
  ])
})

test('with object-style commit', (t) => {
  const initialState = {}

  const { dispatch, getMutations } = testAction(initialState)

  dispatch(({ commit }) => {
    commit({ type: 'TEST_COMMIT', id: 1 })
  })

  const mutations = getMutations()

  t.deepEqual(mutations, [
    {
      type: 'TEST_COMMIT',
      payload: {
        type: 'TEST_COMMIT',
        id: 1
      }
    }
  ])
})

test('multiple mutations inside one dispatch', (t) => {
  const initialState = {}

  const { dispatch, getMutations } = testAction(initialState)

  dispatch(({ commit }) => {
    commit('TEST_COMMIT', 1)
    commit('TEST_COMMIT', 2)
    commit('TEST_COMMIT', 3)
  })

  const mutations = getMutations()

  t.deepEqual(mutations, [
    { type: 'TEST_COMMIT', payload: 1 },
    { type: 'TEST_COMMIT', payload: 2 },
    { type: 'TEST_COMMIT', payload: 3 }
  ])
})

test('multiple mutations from multi dispatch', (t) => {
  const initialState = {}

  const { dispatch, getMutations } = testAction(initialState)

  dispatch(({ commit }) => {
    commit('TEST_COMMIT', 1)
  })

  dispatch(({ commit }) => {
    commit('TEST_COMMIT', 2)
  })

  dispatch(({ commit }) => {
    commit('TEST_COMMIT', 3)
  })

  const mutations = getMutations()

  t.deepEqual(mutations, [
    { type: 'TEST_COMMIT', payload: 1 },
    { type: 'TEST_COMMIT', payload: 2 },
    { type: 'TEST_COMMIT', payload: 3 }
  ])
})

test('reset all mutations', (t) => {
  const initialState = {}

  const { dispatch, getMutations, reset } = testAction(initialState)

  dispatch(({ commit }) => {
    commit('TEST_COMMIT', 1)
    commit('TEST_COMMIT', 2)
    commit('TEST_COMMIT', 3)
  })

  const mutations = getMutations()
  t.is(mutations.length, 3)

  reset()

  t.is(mutations.length, 3)

  t.deepEqual(getMutations().length, 0)
})
