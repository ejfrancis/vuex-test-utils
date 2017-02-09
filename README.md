## VUEX-TEST-UTILS

Simplify vuex tests


```javascript

  const initialState = { 
    foo: 'bar',
  }

  const gettersMock = {
    getter1: () => ({ test: true }),
    getter2: () => ({ test: fase }),
  }

  const action = spy(({ commit, dispatch, getters, state }, payload) => {
    commit('TEST_COMMIT', 1)
    return 'committed'
  })

  const { dispatch, getMutations, reset } = testAction(initialState, gettersMock)

  const result = dispatch(action, { id: 1 })

  const mutations = getMutations()

  // use your custom assert 
  t.deepEqual(mutations, [
    { type: 'TEST_COMMIT', payload: 1 },
  ])
```

## API

| method                                         |  Desc      
| -----------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| testAction(state ? Object) => store            | Returns an instance of the configured mock store                                                                   |
| store.dispatch(action, ...args) => action: Any | Dispatches an action through the mock store. The action will be stored in an array inside the instance and executed|
| store.getMutations() => mutations: Array       | Returns all mutations                                                                                              | 
| store.reset() => mutations: Array              | Clear all mutations                                                                                                |

### TODO

Actually it's really naive, vuex api is not fully respected

getters ({ ~~state~~, getters, rootState })  
dispatch ({ ~~commit~~, ~~dispatch~~, ~~getters~~, rootGetters, rootState, state })  
subscribe(handler)
