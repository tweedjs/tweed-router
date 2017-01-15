const notEmpty = (s) => s !== ''

export default class Endpoint {
  constructor (pattern, params) {
    this.pattern = pattern
    this.params = params
  }

  static parse (expression) {
    let params = []

    const pattern =
        '^\\/?' +
        expression
          .replace(
            /(?:^|\/):([^/]+)(?:$|\/)/,
            (m, name) => {
              params.push(name)
              return '/([^/]+)/'
            }
          )
          .split('/')
          .filter(notEmpty)
          .join('\\/?') +
        '\\/?$'

    return new Endpoint(
      new RegExp(pattern),
      params
    )
  }

  match (path) {
    return new Match(this.pattern, path, this.params)
  }
}

class Match {
  constructor (pattern, path, paramNames) {
    this._pattern = pattern
    this._path = path
    this._paramNames = paramNames
  }

  get matches () {
    return this._pattern.test(this._path)
  }

  get params () {
    const [, ...params] = this._pattern.exec(this._path)

    return params.reduce((params, param, index) => {
      params[this._paramNames[index]] = param
      return params
    }, {})
  }
}
