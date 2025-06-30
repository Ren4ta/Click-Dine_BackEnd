import config from './configs/db_config.js'
import pkg from 'pg'
const { Client } = pkg;

console.log(config)
const client = new Client(config);
try{
    await client.connect();
    let sql = `SELECT * FROM restaurante`;
    let result = await client.query(sql);
    
    console.log(result.rows)
} catch (ex) {
    console.log(ex)
} finally {
    await client.end();
}




