import isFunction from 'lodash.isfunction';
import commit from './commit'

const concatMutations = (fn) => {
  let mutations = [];

  const call = (...args) => {
    mutations.push(fn(...args))
    return mutations[mutations.length - 1] 
  }

  const clear = () => mutations = []
  const get = () => mutations

  return { get, clear, call }
}


const dispatch = ({ state, commit, getters }) => (action, ...args) => {
  const locals = { state, commit, getters, dispatch: dispatch({ state, commit, getters })}
  return action(locals, ...args)
}

export default (initialState = {}, getters = {}, actions = {}) => {
  const { get, clear, call } = concatMutations(commit)

  return { 
    getMutations: get,
    reset: clear, 
    commit: call,
    dispatch: dispatch({ 
      state: initialState,
      commit: call,
      getters,
      actions
    }),
  }
}
