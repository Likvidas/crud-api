import os from 'os';
import * as dotenv from 'dotenv';

dotenv.config();

const { PORT } = process.env;

export const sayHello = () =>
  console.log(`Hello from module. PORT = ${PORT} Your computer has Cores: - ${os.cpus().length}`);

const muFn = (x: number) => `Hello ${x}`;
