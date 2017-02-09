import test from 'ava'
import commit from '../commit'

test('commit', (t) => {
  const mutation = commit('TYPE', 'foobar')

  t.is(mutation.type, 'TYPE')
  t.is(mutation.payload, 'foobar')
})

test('commit with object style', (t) => {
  const mutation = commit({ type: 'TYPE', foo: 'bar' })

  t.is(mutation.type, 'TYPE')
  t.deepEqual(mutation.payload, {
    type: 'TYPE',
    foo: 'bar'
  })
})
