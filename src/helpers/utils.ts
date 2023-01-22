import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { User } from '../db/db.types';

export const checkUserIsValid = (user: User) => {
  if (typeof user.age !== 'number' || typeof user.username !== 'string' || !Array.isArray(user.hobbies)) {
    return false;
  }

  if (user.hobbies.some((hobby) => typeof hobby !== 'string')) {
    return false;
  }

  return true;
};

export const readDB = async () => {
  try {
    const data = await readFile(join(__dirname, '../db/db.json'), 'utf8');

    return { data: JSON.parse(data), status: 'ok' };
  } catch (error) {
    return { data: 'Something wrong. Our Data Base returned error', status: 'error' };
  }
};

export const writeDB = async (data: User[]) => {
  try {
    await writeFile(join(__dirname, '../db/db.json'), JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const clearDB = async () => {
  try {
    await writeFile(join(__dirname, '../db/db.json'), JSON.stringify([]));
  } catch (error) {
    console.log(error);
  }
};
