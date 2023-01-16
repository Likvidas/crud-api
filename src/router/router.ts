import { IncomingMessage, ServerResponse } from 'http';
import { HttpRequestMethodsType } from './router.types';

export const router: Record<
  HttpRequestMethodsType,
  (req?: IncomingMessage, res?: ServerResponse<IncomingMessage>) => void
> = {
  GET: (req, res) => console.log('You are using GET request', req),
  POST: () => console.log('You are using POST request'),
  PUT: () => console.log('You are using PUT request'),
  DELETE: () => console.log('You are using DELETE request'),
};
