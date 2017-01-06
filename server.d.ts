import { Router, Routes } from './dist'

export interface IncomingMessage {
  url?: string
}

export interface ServerResponse {
  writeHead(statusCode: number, headers?: any): void
  end(str: string, cb?: Function): void
}

interface ServerRouter extends Router {
  handle (request: IncomingMessage, response: ServerResponse): PromiseLike<undefined>
}

declare namespace ServerRouter {
  function make (routes: Routes): PromiseLike<ServerRouter>
}

export default ServerRouter
