/** @jsx Node */

import { mutating, Node } from 'tweed'
import PageNotFoundError from './errors/PageNotFoundError'

export default class Router {
  @mutating current = null
  @mutating isLoading = false
  currentPath = '/'

  constructor (routes) {
    this.routes = routes

    this._onClickLink = this._onClickLink.bind(this)
  }

  async navigate (path) {
    this.isLoading = true

    const route = Object.keys(this.routes)
      .filter((p) => p === path)[0]

    if (route == null) {
      this.current = null

      throw new PageNotFoundError(path)
    }

    const result = await this.routes[route](this)

    this.current = await this._normalizeRouteResponse(result)
    this.currentPath = path
    this.isLoading = false

    return this.current
  }

  async _normalizeRouteResponse (response) {
    const isAnObject =
      typeof response === 'object'
    const isAnObjectWithLoad =
      isAnObject && typeof response.load === 'function'
    const isAModuleWithDefault =
      isAnObject && response.default != null
    const isAModuleWithDefaultComponent =
      isAModuleWithDefault && typeof response.default.render === 'function'
    const isAModuleWithDefaultClass =
      isAModuleWithDefault && typeof response.default === 'function'
    const isAModuleWithDefaultClassWithLoad =
      isAModuleWithDefaultClass && typeof response.default.load === 'function'

    if (isAnObjectWithLoad) {
      return response.load(this)
    }
    if (isAModuleWithDefaultComponent) {
      return response.default
    }
    if (isAModuleWithDefaultClassWithLoad) {
      return response.default.load(this)
    }
    if (isAModuleWithDefaultClass) {
      return new response.default(this) // eslint-disable-line
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

  isActive (path) {
    return this.currentPath === path
  }
}
