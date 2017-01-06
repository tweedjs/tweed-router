export default function PageNotFoundError (path) {
  if (this == null) {
    throw new TypeError("Class constructor PageNotFoundError cannot be invoked without 'new'")
  }

  const message = `No page was found at the path '${path}'`

  this.path = path
  this.name = 'PageNotFoundError'
  this.message = message
  this.stack = new Error(message).stack
}

PageNotFoundError.prototype = Object.create(Error.prototype)
