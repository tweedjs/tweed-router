import { Router, Routes } from './dist'

export abstract class History {
  prefix?: string
  path: string
  onURLChange (listener: () => void): void
  changeURL (path: string): void
}

export const BrowserHistory: {
  new (): History
}

export const HashHistory: {
  new (): History
}

declare class BrowserRouter extends Router {
  constructor(routes: Routes, history?: History)
  boot(): PromiseLike<void>
}

declare namespace BrowserRouter {
  function make (routes: Routes, history?: History): PromiseLike<Router>
}

export default BrowserRouter
