import config from './configs/db_config.js'
import pkg from 'pg'
const { Client } = pkg;

const client = new Client(config)
await client.connect();
let sql = `SELECT * FROM restaurante]`;
let result = await client.query(sql);
await client.end();
console.log(result.rows)


