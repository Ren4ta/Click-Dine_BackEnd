import { Client } from 'pg';
import DBconfig from '../configs/db_config.js';

export async function crearPedidoConItems(pedidoData, items) {
  const client = new Client(DBconfig);

  try {
    await client.connect();
    await client.query('BEGIN'); // iniciar transacción

    // 1. Crear pedido
    const pedidoQuery = `
      INSERT INTO pedido (id_usuario, fecha, total)
      VALUES ($1, $2, $3)
      RETURNING id;
    `;
    const pedidoRes = await client.query(pedidoQuery, [
      pedidoData.usuario_id,
      pedidoData.fecha,
      pedidoData.total
    ]);
    const pedido_id = pedidoRes.rows[0].id;

    // 2. Actualizar estado de items y asociarlos al pedido
    const itemQuery = `
      UPDATE item_pedido
      SET estado_pedido_id = 4, pedido_id = $1
      WHERE id = $2
      RETURNING *;
    `;

    let updatedItems = [];
    for (const id_item_pedido of items) {
      const res = await client.query(itemQuery, [pedido_id, id_item_pedido]);
      updatedItems.push(res.rows[0]);
    }

    await client.query('COMMIT');
    return { pedido_id, items: updatedItems };
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error en transacción de pedido:', error);
    throw error;
  } finally {
    await client.end();
  }
}
