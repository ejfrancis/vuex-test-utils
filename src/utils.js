import isObject from 'lodash.isobject'

export const unifyObjectStyle = (type, payload, options) => {
  if (isObject(type) && type.type) {
    return {
      options: payload,
      payload: type,
      type: type.type
    }
  }

  return { type, payload, options }
}
