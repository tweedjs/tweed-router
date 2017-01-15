export default class HashHistory {
  onURLChange (listener) {
    window.addEventListener('hashchange', listener)
  }

  changeURL (path) {
    window.location.hash = path
  }

  get path () {
    if (window.location.hash === '') {
      this.changeURL('/')
    }

    return window.location.hash.slice(1) || '/'
  }
}
