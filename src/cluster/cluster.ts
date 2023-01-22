import { cpus } from 'os';
import { config } from 'dotenv';
import { env } from 'process';
import { initServer } from '../server';
import { Cluster } from 'cluster';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cluster: Cluster = require('cluster'); /* Почему то если делать импорт через ES6 Modules cluster is undefined, таким способом вроде работает  */

config();

const port = Number(env.PORT) ?? 6060;

if (cluster.isPrimary) {
  const coresCount = cpus().length;

  console.log(`Master process started. Pid: ${process.pid}`);

  for (let i = 0; i < coresCount; i++) {
    const PORT = port + i;
    cluster.fork({ PORT });

    cluster.on('exit', (worker) => {
      console.log(`Worker ${worker.process.pid} is died`);
      cluster.fork({ PORT });
    });
  }
} else if (cluster.isWorker) {
  const id = cluster.worker?.id;
  initServer();
  console.log(`Worker ${id} started ${process.pid}`);
}
