import { Router, Routes } from './dist'

interface BrowserRouter extends Router {}

declare namespace BrowserRouter {
  function make (routes: Routes): PromiseLike<BrowserRouter>
}

export default BrowserRouter
