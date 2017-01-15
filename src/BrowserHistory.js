export default class BrowserHistory {
  onURLChange (listener) {
    window.addEventListener('popstate', listener)
  }

  changeURL (path, title = document.title) {
    window.history.pushState(null, title, path)
  }

  get path () {
    return window.location.pathname
  }
}
