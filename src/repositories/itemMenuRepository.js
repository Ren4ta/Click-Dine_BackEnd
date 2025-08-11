import { Client } from 'pg';
import DBconfig from './../configs/db_config.js';

export async function getItemsByCategoriaAndRestaurante(idRestaurante, idCategoria) {
  const client = new Client(DBconfig);

  try {
    await client.connect();

    const query = `
      SELECT i.*
      FROM item_menu i
      INNER JOIN categoria c ON i.id_categoria = c.id
      WHERE c.id_restaurante = $1 AND c.id = $2
    `;

    const values = [idRestaurante, idCategoria];

    const res = await client.query(query, values);
    return res.rows;
  } catch (error) {
    console.error('Error en itemMenuRepository:', error);
    throw error;
  } finally {
    await client.end();
  }
}
