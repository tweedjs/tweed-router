/** @jsx Node */

import { Node } from 'tweed'
import Router from './Router'

export default class BrowserRouter {
  constructor (router) {
    this._router = router

    this._onPopState = this._onPopState.bind(this)
    this._onClickLink = this._onClickLink.bind(this)
  }

  static async make (routes) {
    const replacingRoutes = {}

    for (const route in routes) {
      if (routes.hasOwnProperty(route)) {
        replacingRoutes[route] =
          () => routes[route](router)
      }
    }

    const router = new BrowserRouter(
      new Router(replacingRoutes)
    )

    await router._router.navigate(window.location.pathname)

    window.addEventListener('popstate', router._onPopState)

    return router
  }

  _onPopState () {
    this._router.navigate(window.location.pathname)
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

  async navigate (path) {
    const route = await this._router.navigate(path)

    window.history.pushState(null, document.title, path)

    return route
  }

  render () {
    return this._router.render()
  }

  _onClickLink (event) {
    event.preventDefault()

    this.navigate(event.target.pathname)
  }

  link (href, title, attributes = {}) {
    const event = href in this._router.routes
      ? { 'on-click': this._onClickLink }
      : {}

    return (
      <a
        href={href}
        {...event}
        {...attributes}
      >{title}</a>
    )
  }
}
