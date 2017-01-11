import { Router, Routes } from './dist'
import { Logger } from 'tweed/render/http'

export interface IncomingMessage {
  url?: string
}

export interface ServerResponse {
  writeHead(statusCode: number, headers?: any): void
  end(str: string, cb?: Function): void
}

interface ServerRouter extends Router {
  handle (
    request: IncomingMessage,
    response: ServerResponse,
    logger?: Logger
  ): PromiseLike<undefined>
}

declare namespace ServerRouter {
  function make (routes: Routes): PromiseLike<ServerRouter>
}

export default ServerRouter
