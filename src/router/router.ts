import {
  handleInvalidPath,
  getAllUsersController,
  getUserById,
  addUserController,
  updateUserController,
  deleteUserController,
} from '../controllers';
import { ServerResponseType, ClientRequestType } from '../controllers';
import { HttpRequestMethodsType } from './router.types';

export const USERS_ENDPOINT = '/api/users';

export const router: Record<HttpRequestMethodsType, (req: ClientRequestType, res: ServerResponseType) => void> = {
  GET: (req, res) => {
    if (req.url === USERS_ENDPOINT) {
      getAllUsersController(res);

      return;
    }
    if (req.url?.includes(`${USERS_ENDPOINT}/`)) {
      getUserById(req, res);

      return;
    }
    handleInvalidPath(res);
  },
  POST: (req, res) => {
    if (req.url === USERS_ENDPOINT) {
      addUserController(req, res);

      return;
    }
    handleInvalidPath(res);
  },
  PUT: (req, res) => {
    if (req.url?.includes(`${USERS_ENDPOINT}/`)) {
      updateUserController(req, res);

      return;
    }
    handleInvalidPath(res);
  },
  DELETE: (req, res) => {
    if (req.url?.includes(`${USERS_ENDPOINT}/`)) {
      deleteUserController(req, res);

      return;
    }
    handleInvalidPath(res);
  },
};
