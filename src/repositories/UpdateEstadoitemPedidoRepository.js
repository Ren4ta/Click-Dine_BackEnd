import { Client } from 'pg';
import DBconfig from '../configs/db_config.js';

export async function updateEstadoItems(id_pedido, items) {
  const client = new Client(DBconfig);

  try {
    await client.connect();
    await client.query('BEGIN');

    const query = `
      UPDATE item_pedido
      SET id_estado_item = $1
      WHERE id = $2 AND id_pedido = $3
      RETURNING *;
    `;

    let updated = [];
    for (const item of items) {
      const res = await client.query(query, [
        item.id_estado_item,
        item.id_item_pedido,
        id_pedido
      ]);
      if (res.rows.length > 0) {
        updated.push(res.rows[0]);
      }
    }

    await client.query('COMMIT');
    return updated;

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error al actualizar estado de items:', error);
    throw error;
  } finally {
    await client.end();
  }
}
