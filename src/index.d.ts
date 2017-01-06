import { Node, Attributes } from 'tweed'

export class PageNotFoundError extends Error {
  readonly path: string

  constructor (path: string)
}

export type Route = { render: () => Node } | Node

export type Routes = {
  [path: string]: (router: Router) => (Route | PromiseLike<Route>)
}

export class Router {
  current: Route | null
  readonly routes: Routes

  constructor (routes: Routes)

  navigate (path: string): PromiseLike<Route>
  render (): Node
  link (href: string, title: string, attributes?: Attributes): Node
}
