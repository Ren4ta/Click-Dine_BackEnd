import { Client } from 'pg';
import config from '../configs/db_config.js';

const verifyUser = async (mail, contrasena) => {
  const client = new Client(config);
  try {
    await client.connect();

    const query = `
      SELECT
        CASE
          WHEN EXISTS (
            SELECT 1 FROM usuario WHERE mail = $1 AND contrasena = $2
          ) THEN 'Login successful'
          WHEN EXISTS (
            SELECT 1 FROM usuario WHERE mail = $1
          ) THEN 'Incorrect password'
          WHEN EXISTS (
            SELECT 1 FROM usuario WHERE contrasena = $2
          ) THEN 'Incorrect email'
          ELSE 'Incorrect email and password'
        END AS login_status,
        (SELECT id FROM usuario WHERE mail = $1 AND contrasena = $2),
        (SELECT id_restaurante FROM usuario WHERE mail = $1 AND contrasena = $2),
        (SELECT mail FROM usuario WHERE mail = $1 AND contrasena = $2),
        (SELECT contrasena FROM usuario WHERE mail = $1 AND contrasena = $2),
        (SELECT id_tipo FROM usuario WHERE mail = $1 AND contrasena = $2)
    `;
    const result = await client.query(query, [mail, contrasena]);

    return result.rows[0];
  } finally {
    await client.end();
  }
};

export default { verifyUser };
