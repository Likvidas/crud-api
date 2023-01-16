import { createServer } from 'http';
import { router } from '../router';
import { HttpRequestMethodsType } from '../router/router.types';
import { sendResponse } from '../controllers';
import { HttpSatatusCode } from './server.types';
import { clearDB } from '../helpers/utils';
import { env } from 'process';
import { config } from 'dotenv';

config();

export const initServer = () => {
  const port = Number(env.PORT) ?? 6060;
  const hostName = '127.0.0.1';

  const server = createServer((request, response) => {
    const { method } = request;
    if (method) {
      router[method as HttpRequestMethodsType]
        ? router[method as HttpRequestMethodsType](request, response)
        : sendResponse(
            response,
            HttpSatatusCode.NotImplemented,
            `This method - ${method} is not supported our application`,
          );
    }
  });

  server.listen(port, hostName, () => {
    console.log(`Server started at http://${hostName}:${port}`);
  });

  process.on('SIGINT', async () => {
    await clearDB();
    server.close(() => process.exit(0));
  });

  return server;
};
