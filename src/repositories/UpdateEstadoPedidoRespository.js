import { Client } from 'pg';
import DBconfig from '../configs/db_config.js';

export async function updateEstadoPedido(id_pedido, id_estado_pedido) {
  const client = new Client(DBconfig);
  const query = `
    UPDATE pedido
    SET id_estado_pedido = $1
    WHERE id = $2
    RETURNING id, id_estado_pedido;
  `;

  try {
    await client.connect();
    const res = await client.query(query, [id_estado_pedido, id_pedido]);

    if (res.rowCount === 0) {
      return null; 
    }

    return res.rows[0];
  } catch (error) {
    console.error('Error al actualizar el estado del pedido:', error);
    throw error;
  } finally {
    await client.end();
  }
}
