import { handleInvalidPath, getAllUsersController, getUserById, addUserController } from '../controllers';
import { ServerResponseType, ClientRequestType } from '../controllers';
import { HttpRequestMethodsType } from './router.types';

const USERS = '/api/users';

export const router: Record<HttpRequestMethodsType, (req: ClientRequestType, res: ServerResponseType) => void> = {
  GET: (req, res) => {
    if (req.url === USERS) {
      getAllUsersController(res);

      return;
    }
    if (req.url?.includes(`${USERS}/`)) {
      getUserById(req, res);

      return;
    }
    handleInvalidPath(res);
  },
  POST: (req, res) => {
    if (req.url === USERS) {
      addUserController(req, res);

      return;
    }
    handleInvalidPath(res);
  },
  PUT: () => console.log('You are using PUT request'),
  DELETE: () => console.log('You are using DELETE request'),
};
