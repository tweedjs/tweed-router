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

    if (typeof result === 'object' && result.render == null) {
      if (typeof result.default === 'function') {
        return new result(this) // eslint-disable-line
      }

      if (typeof result.load === 'function') {
        return result.load(this)
      }

      if (typeof result.default === 'object' && result.default.render != null) {
        return result.default
      }
    }

    return result
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
