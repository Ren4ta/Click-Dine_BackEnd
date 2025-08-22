import { Client } from 'pg';
import DBconfig from '../configs/db_config.js';

export async function addItemsToPedido(pedido_id, items) {
  const client = new Client(DBconfig);
  try {
    await client.connect();
    const query = `
     INSERT INTO item_pedido (id_item_menu, id_estado_item, id_pedido)
     VALUES ($1, 2, NULL)
     RETURNING *;
    `;
    let results = [];
    for (const id_item_menu of items) {
      const res = await client.query(query, [id_item_menu, pedido_id]);
      results.push(res.rows[0]);
    }
    return results;
  } catch (error) {
    console.error('Error en la inserción de items:', error);
    throw error;
  } finally {
    await client.end();
  }
}
