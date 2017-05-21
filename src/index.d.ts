import { VirtualNode, Attributes, Renderable } from 'tweed'

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

export type RouteHandler =
  (router: Router, params: Params) => (RouteResponse | PromiseLike<RouteResponse>)

export interface Routes {
  [path: string]: RouteHandler
}
export abstract class Routes implements Routes {}

export type Params = {
  [param: string]: string
}

export interface Match {
  matches: boolean
  params: Params
}

export interface Endpoint {
  match (path: string): Match
}

export class Router {
  current: Renderable
  isLoading: boolean
  readonly routes: [Endpoint, RouteHandler][]
  readonly currentPath: string
  readonly currentEndpoint: Endpoint
  readonly currentMatch: Match

  constructor (routes: Routes)

  navigate (path: string): PromiseLike<Renderable>
  render (): VirtualNode
  link (href: string, title: string, attributes?: Attributes): VirtualNode
  isActive (path: string): boolean
}
