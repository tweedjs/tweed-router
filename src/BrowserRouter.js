import Router from './Router'
import BrowserHistory from './BrowserHistory'
export { BrowserHistory }
export { default as HashHistory } from './HashHistory'

export default class BrowserRouter extends Router {
  constructor (routes, history) {
    super(routes)

    this._history = history

    this._onURLChange = this._onURLChange.bind(this)
  }

  static async make (routes, history = new BrowserHistory()) {
    const router = new BrowserRouter(routes, history)

    await router.boot()

    return router
  }

  async boot () {
    await this.navigate(this._history.path, false)

    this._history.onURLChange(this._onURLChange)
  }

  _onURLChange () {
    this.navigate(this._history.path, false)
  }

  async navigate (path, push = true) {
    const route = await super.navigate(path)

    window.scrollTo(0, 0)

    let title = document.title

    if (route.title != null) {
      title = route.title
    }

    if (push) {
      this._history.changeURL(path, title)
    }

    document.title = title

    return route
  }

  link (href, title, attributes) {
    if (this._history.prefix != null && this._hasRoute(href)) {
      return super.link(this._history.prefix + href, title, attributes)
    }

    return super.link(href, title, attributes)
  }
}
