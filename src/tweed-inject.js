try {
  module.exports = require('tweed-inject')
} catch (e) {
  module.exports = {
    inject: () => () => null
  }
}
