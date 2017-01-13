import { Node, Attributes, Renderable } from 'tweed'

export class PageNotFoundError extends Error {
  readonly path: string

  constructor (path: string)
}

export interface Page {
  title?: string
  render (): Renderable
}

export type RouteResponse = Renderable
  | Page
  | { load (router: Router): Renderable | Page }
  | { new (router: Router): Renderable | Page }
  | { default: { load (router: Router): Renderable | Page } }
  | { default: { new (router: Router): Renderable | Page } }

export type Routes = {
  [path: string]: (router: Router) => (RouteResponse | PromiseLike<RouteResponse>)
}

export class Router {
  current: Renderable
  readonly routes: Routes

  constructor (routes: Routes)

  navigate (path: string): PromiseLike<Renderable>
  render (): Node
  link (href: string, title: string, attributes?: Attributes): Node
}
