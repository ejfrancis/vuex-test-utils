import { unifyObjectStyle } from './utils'

export default (_type, _payload, _options) => {
  const {
    type,
    payload,
    options
  } = unifyObjectStyle(_type, _payload, _options)

  const mutation = { type, payload }
  return mutation
}
