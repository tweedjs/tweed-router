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

    this.current = await this.routes[route](this)

    return this.current
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
