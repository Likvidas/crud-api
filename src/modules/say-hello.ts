import os from 'os';

export const sayHello = () => console.log(`Hello from module. Your computer has Cores: - ${os.cpus().length}`);
