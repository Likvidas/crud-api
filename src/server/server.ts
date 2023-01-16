import { createServer } from 'http';
import { env, stdout } from 'process';
import * as dotenv from 'dotenv';
import { HttpSatatusCode } from '.';
import { router } from '../router';
import { HttpRequestMethodsType } from 'src/router/router.types';

dotenv.config();

export const initServer = () => {
  const port = Number(env.PORT) ?? 6060;

  const hostName = '127.0.0.1';

  const server = createServer((request, response) => {
    const { method } = request;
    if (method) {
      router[method as HttpRequestMethodsType]
        ? router[method as HttpRequestMethodsType](request, response)
        : console.log(`\nThis method - ${method} is not supported our application`);
    }
    response.writeHead(HttpSatatusCode.Ok, { 'Content-type': 'text/plain' });
    response.end('Hello from server');
  });

  server.listen(port, hostName, () => {
    stdout.write(`Server started at http://${hostName}:${port}`);
  });
};
