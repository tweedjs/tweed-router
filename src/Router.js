/** @jsx Node */

import { mutating, Node } from 'tweed'
import PageNotFoundError from './errors/PageNotFoundError'

export default class Router {
  @mutating current = null

  constructor (routes) {
    this.routes = routes

    this._onClickLink = this._onClickLink.bind(this)
  }

  async navigate (path) {
    const route = Object.keys(this.routes)
      .filter((p) => p === path)[0]

    if (route == null) {
      this.current = null

      throw new PageNotFoundError(path)
    }

    const result = await this.routes[route](this)

    this.current = await this._normalizeRouteResponse(result)

    return this.current
  }

  async _normalizeRouteResponse (response) {
    if (typeof response === 'object' && response.render == null) {
      if (typeof response.default === 'function') {
        return new response(this) // eslint-disable-line
      }

      if (typeof response.load === 'function') {
        return response.load(this)
      }

      if (typeof response.default === 'object' && response.default.render != null) {
        return response.default
      }
    }
    return response
  }

  render () {
    if (this.current == null) {
      return (
        <div>Not Found</div>
      )
    }

    if (typeof this.current.render === 'function') {
      return this.current.render()
    }

    return this.current
  }

  _onClickLink (event) {
    event.preventDefault()

    this.navigate(event.target.pathname)
  }

  link (href, title, attributes = {}) {
    return (
      <a
        href={href}
        on-click={this._onClickLink}
        {...attributes}
      >{title}</a>
    )
  }
}
