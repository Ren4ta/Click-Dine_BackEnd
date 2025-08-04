import { Client } from 'pg';
import config from '../configs/db_config.js';

const findAll = async () => {
  const client = new Client(config);
  try {
    await client.connect();
    const sql = 'SELECT * FROM restaurante';
    const result = await client.query(sql);
    return result.rows;
  } finally {
    await client.end();
  }
};

export default {
  findAll,
};
