# Tweed Router

Universal Router for Tweed.

## Installation

```shell
$ npm install --save tweed-router
```

## Usage

```javascript
const router = new Router({
  '/': () => new HomePage(),
  '/about': () => new AboutPage()
})

router.navigate('/')
```

Render the router with Tweed's `render` method to render the current page of the router
automatically:

```javascript
import { VirtualNode } from 'tweed'
import render from 'tweed/render/dom'

class HomePage {
  constructor (router) {
    this.router = router
  }

  render () {
    return (
      <p>
        Home page! Go to {this.router.link('the about page', '/about')}
      </p>
    )
  }
}

const router = new Router({
  '/': () => new HomePage(router),
  '/about': () => <p>About page</p>
})

router.navigate('/')
  .then(() => render(router, document.querySelector('#app')))
```

## SPA Router

There is a special `BrowserRouter` class which handles all communication with the browser
environment. The process of attaching the router to the browser involves navigating to the
initial `location.pathname` as well as attaching some event listener.

This process is encapsulated in a static `make` method, which returns a promise.

```javascript
import BrowserRouter from 'tweed-router/browser'

const routes = {
  '/': (router) => new HomePage(router),
  '/about': () => new AboutPage()
}

BrowserRouter.make(routes)
  .then((router) => render(router, document.querySelector('#app')))
```

Sometimes, the `BrowserRouter` instance has to be interacted with before the first
navigation. In that case, we can use the `boot` method to perform those initial operations
manually:

```javascript
const router = new BrowserRouter(routes)

// Interact with router instance (e.g. register with some dependency manager)

router.boot()
  .then(() => render(router, document.querySelector('#app')))
```

### History API vs URL Hash

By default, the `BrowserRouter` will use the History API to manipulate the URL of the
browser window. However, if you don't have access to a back-end that can dynamically
direct all traffic to the same `index.html` file, you might want to use the URL's hash to
determine the current page.

```
History API : /some/url
URL Hash    : #/some/url
```

The `tweed-router/browser` package exposes two classes called `BrowserHistory` and
`HashHistory`, which can be used to explicitly choose an implementation:

```javascript
import BrowserRouter, { HashHistory } from 'tweed-router/browser'

BrowserRouter.make(routes, new HashHistory())
// or
new BrowserRouter(routes, new HashHistory())
```

## Server Router

The router can also be used on the server using the `ServerRouter` like so:

```javascript
import ServerRouter from 'tweed-router/server'

ServerRouter.make(routes)
  .then((router) => router.handle(req, res))
```
