import { Router, Routes } from './dist'

export interface History {
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

interface BrowserRouter extends Router {}

declare namespace BrowserRouter {
  function make (routes: Routes, history?: History): PromiseLike<BrowserRouter>
}

export default BrowserRouter
