import Endpoint from '../src/Endpoint'

describe('Endpoint', () => {
  test('simple endpoint', () => {
    const endpoint = Endpoint.parse('/')

    expect(endpoint.match('/').matches).toBe(true)
  })

  test('ignores slashes', () => {
    const endpoint = Endpoint.parse('/hello')

    expect(endpoint.match('hello').matches).toBe(true)
    expect(endpoint.match('/hello').matches).toBe(true)
    expect(endpoint.match('hello/').matches).toBe(true)
    expect(endpoint.match('/hello/').matches).toBe(true)
  })

  test('must match exact', () => {
    const endpoint = Endpoint.parse('/hello')

    expect(endpoint.match('/hello/too-long').matches).toBe(false)
    expect(endpoint.match('/before/hello').matches).toBe(false)
  })

  test('a single param', () => {
    const endpoint = Endpoint.parse('/before/:param/after')
    const match = endpoint.match('/before/hello/after')
    expect(match.matches).toBe(true)
    expect(match.params).toEqual({ param: 'hello' })
  })

  test('multiple params', () => {
    const endpoint = Endpoint.parse('/before/:param/:other/after')
    const match = endpoint.match('/before/hello/other/after')
    expect(match.matches).toBe(true)
    expect(match.params).toEqual({ param: 'hello', other: 'other' })
  })
})
