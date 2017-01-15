/** @jsx Node */

import { Engine, Node } from 'tweed'
import { StringRenderer } from 'tweed/render/string'
import { Router, PageNotFoundError } from '../src'

let html = ''
const engine = new Engine(
  new StringRenderer((h) => { html = h })
)

describe('Router', () => {
  let router

  beforeEach(() => {
    router = new Router({
      '/': () => <div>Home</div>,
      '/:param': (r, { param }) => <div>{param}</div>
    })
  })

  test('can build links', () => {
    const link = router.link('/', 'Link')
    delete link.data.on
    expect(link).toEqual(<a href='/'>Link</a>)
  })

  test('loads a route', async () => {
    const route = await router.navigate('/')

    expect(route).toEqual(<div>Home</div>)

    engine.render(router)

    expect(html).toBe('<div>Home</div>')
  })

  test('throws a PageNotFoundError if no route matches the path', async () => {
    try {
      await router.navigate('/not/found')

      throw new Error('Never threw')
    } catch (error) {
      expect(error).toBeInstanceOf(PageNotFoundError)
    }
  })

  test('param', async () => {
    const route = await router.navigate('/hello')

    expect(route).toEqual(<div>hello</div>)
  })
})
