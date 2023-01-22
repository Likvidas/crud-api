import { User } from '../db/db.types';
import { HttpSatatusCode } from '../server';
import { ClientRequestType, ServerResponseType } from './controllers.types';
import { validate, version, v4 as uuidv4 } from 'uuid';
import { readDB, writeDB, checkUserIsValid } from '../helpers/utils';

export const sendResponse = (res: ServerResponseType, statusCode: HttpSatatusCode, body?: User[] | User | string) => {
  const headers = { 'Content-type': typeof body === 'object' ? 'application/json' : 'text/plain' };
  res.writeHead(statusCode, headers);
  res.end(body ? JSON.stringify(body) : '');
};

export const handleInvalidPath = (res: ServerResponseType) => {
  sendResponse(res, HttpSatatusCode.NotFound, 'Ooops!!! Page not found');
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

export const addUserController = async (req: ClientRequestType, res: ServerResponseType) => {
  const bodyRequest: Buffer[] = [];
  let body: User;

  req
    .on('error', (error) => {
      console.log(error);
      sendResponse(
        res,
        HttpSatatusCode.InternalServerError,
        'An error occurred while processing the request body. We are doing everything to fix it.',
      );
    })
    .on('data', (chunk) => bodyRequest.push(chunk))
    .on('end', async () => {
      try {
        body = JSON.parse(Buffer.concat(bodyRequest).toString());
      } catch (error) {
        console.log(error);
        sendResponse(res, HttpSatatusCode.BadRequest, 'An error occurred while processing the JSON file ');
      }

      if (!checkUserIsValid(body)) {
        sendResponse(
          res,
          HttpSatatusCode.BadRequest,
          'The request to add a new user was rejected. The following fields are required: username: string, age: number, hobbies: string[] ',
        );

        return;
      } else {
        const id = uuidv4();
        const { data, status } = await readDB();

        if (status === 'error') {
          sendResponse(res, HttpSatatusCode.InternalServerError, data);

          return;
        }

        const newUser = { ...body, id };

        const newData: User[] = [...data, newUser];

        await writeDB(newData);

        sendResponse(res, HttpSatatusCode.Created, newUser);
      }
    });
};

export const updateUserController = async (req: ClientRequestType, res: ServerResponseType) => {
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

  const updatedUser = (data as User[])?.find((user) => user?.id === id);

  if (!updatedUser) {
    sendResponse(res, HttpSatatusCode.NotFound, 'Information about the updated user was not found');

    return;
  }

  const userListWithoutUpdatedUser = (data as User[])?.filter((user) => user.id !== updatedUser.id);

  const bodyRequest: Buffer[] = [];
  let body: User;

  req
    .on('error', (error) => {
      console.log(error);
      sendResponse(
        res,
        HttpSatatusCode.InternalServerError,
        'An error occurred while processing the request body. We are doing everything to fix it.',
      );
    })
    .on('data', (chunk) => bodyRequest.push(chunk))
    .on('end', async () => {
      try {
        body = JSON.parse(Buffer.concat(bodyRequest).toString());
      } catch (error) {
        console.log(error);
        sendResponse(res, HttpSatatusCode.BadRequest, 'An error occurred while processing the JSON file ');
      }

      const newUser = { ...updatedUser, ...body };

      const newData: User[] = [...userListWithoutUpdatedUser, newUser];

      await writeDB(newData);

      sendResponse(res, HttpSatatusCode.Ok, newUser);
    });
};

export const deleteUserController = async (req: ClientRequestType, res: ServerResponseType) => {
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

  const deletedUser = (data as User[])?.find((user) => user?.id === id);

  if (!deletedUser) {
    sendResponse(res, HttpSatatusCode.NotFound, 'Information about the deleted user was not found');

    return;
  }

  const userListWithoutDeletedUser = (data as User[])?.filter((user) => user.id !== deletedUser.id);

  await writeDB(userListWithoutDeletedUser);

  sendResponse(res, HttpSatatusCode.NoContent, '');
};
