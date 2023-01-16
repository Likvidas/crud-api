import { readFile } from 'fs/promises';
import { join } from 'path';
import { User } from '../db/db.types';
import { HttpSatatusCode } from '../server';
import { ClientRequestType, ServerResponseType } from './controllers.types';
import { validate, version } from 'uuid';

const readDB = async () => {
  try {
    const data = await readFile(join(__dirname, '../db/db.json'), 'utf8');

    return { data: JSON.parse(data), status: 'ok' };
  } catch (error) {
    return { data: 'Something wrong. Our Data Base returned error', status: 'error' };
  }
};

const sendResponse = (res: ServerResponseType, statusCode: HttpSatatusCode, body?: User[] | User | string) => {
  const headers = { 'Content-type': typeof body === 'object' ? 'application/json' : 'text/plain' };
  res.writeHead(statusCode, headers);
  res.end(body ? JSON.stringify(body) : '');
};

export const getAllUsersController = async (res: ServerResponseType) => {
  const { data, status } = await readDB();
  const code = status === 'ok' ? HttpSatatusCode.Ok : HttpSatatusCode.InternalServerError;
  sendResponse(res, code, data);
};

export const getUserById = async (req: ClientRequestType, res: ServerResponseType) => {
  const id = req.url?.split('/')?.[3] ?? '';

  const isValidId = validate(id) && version(id) === 4;

  if (!isValidId) {
    sendResponse(res, HttpSatatusCode.BadRequest, 'Your User ID is not valid. Please take valid User ID and try again');

    return;
  }

  const { data, status } = await readDB();

  if (status === 'error') {
    sendResponse(res, HttpSatatusCode.InternalServerError, data);

    return;
  }

  const currentUser = (data as User[])?.find((user) => user?.id === id);

  if (!currentUser) {
    sendResponse(res, HttpSatatusCode.NotFound, 'Information about the requested user was not found');

    return;
  }

  sendResponse(res, HttpSatatusCode.Ok, currentUser);
};
