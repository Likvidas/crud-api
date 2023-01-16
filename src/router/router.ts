import { getAllUsersController, getUserById } from '../controllers';
import { ServerResponseType, ClientRequestType } from '../controllers';
import { HttpRequestMethodsType } from './router.types';

export const router: Record<HttpRequestMethodsType, (req: ClientRequestType, res: ServerResponseType) => void> = {
  GET: (req, res) => {
    if (req.url === '/api/users') {
      getAllUsersController(res);

      return;
    }
    if (req.url?.includes('/api/users/')) {
      getUserById(req, res);

      return;
    }
  },
  POST: () => console.log('You are using POST request'),
  PUT: () => console.log('You are using PUT request'),
  DELETE: () => console.log('You are using DELETE request'),
};
