import { Client } from 'pg';
import DBconfig from '../configs/db_config.js';

export async function getCategoriasByRestaurante(id_restaurante) {
  const client = new Client(DBconfig);

  try {
    await client.connect();

    const query = `
      SELECT id, nombre, img, id_restaurante
      FROM categorias
      WHERE id_restaurante = $1
      ORDER BY id;
    `;

    const res = await client.query(query, [id_restaurante]);
    return res.rows;
  } catch (error) {
    console.error('Error en la consulta:', error);
    throw error;
  } finally {
    await client.end();
  }
}
