import { Engine } from 'tweed'
import HTTPRenderer from 'tweed/render/http'
import Router from './Router'

export default class ServerRouter {
  constructor (router) {
    this._router = router
  }

  static async make (routes) {
    return new ServerRouter(
      new Router(routes)
    )
  }

  async handle (request, response) {
    const engine = new Engine(
      new HTTPRenderer(response)
    )

    await this.navigate(request.url)

    engine.render(this)
  }

  get current () {
    return this._router.current
  }

  set current (current) {
    this._router.current = current
  }

  get routes () {
    return this._router.routes
  }

  navigate (path) {
    return this._router.navigate(path)
  }

  render () {
    return this._router.render()
  }

  link (href, title, attributes = {}) {
    return this._router.link(href, title, attributes)
  }
}
