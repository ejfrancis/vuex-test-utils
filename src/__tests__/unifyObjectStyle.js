import test from 'ava'
import { unifyObjectStyle } from '../utils'

test('inlined args', (t) => {
  const { type, payload } = unifyObjectStyle('TYPE', { test: true })

  t.is(type, 'TYPE')
  t.deepEqual(payload, {
    test: true
  })
})

test('object args', (t) => {
  const { type, payload } = unifyObjectStyle({ type: 'TYPE', test: true })

  t.is(type, 'TYPE')
  t.deepEqual(payload, {
    type: 'TYPE',
    test: true
  })
})
