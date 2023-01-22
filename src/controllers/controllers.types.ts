import { IncomingMessage, ServerResponse } from 'http';

export type ClientRequestType = IncomingMessage;
export type ServerResponseType = ServerResponse<IncomingMessage> & { req: IncomingMessage };
