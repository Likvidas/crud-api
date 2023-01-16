import { createServer } from 'http';
import { env, stdout } from 'process';
import * as dotenv from 'dotenv';
import { HttpSatatusCode } from './server.types';

dotenv.config();

export const initServer = () => {
  const port = Number(env.PORT) ?? 6060;

  const hostName = '127.0.0.1';

  const server = createServer((request, response) => {
    response.writeHead(HttpSatatusCode.Ok, { 'Content-type': 'text/plain' });
    response.end('Hello from server');
  });

  server.listen(port, hostName, () => {
    stdout.write(`Server started at http://${hostName}:${port}`);
  });
};
