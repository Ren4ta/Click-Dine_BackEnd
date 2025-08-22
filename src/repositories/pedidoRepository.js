import { Client } from 'pg';
import DBconfig from '../configs/db_config.js';

export async function crearPedidoConItems(pedidoData, items) {
const client = new Client(DBconfig);

  try {

    await client.connect();
    await client.query('BEGIN');
    const pedidoQuery = `
      INSERT INTO pedido (id_usuario, tiemporecacion, tiempofincocina, id_estado_pedido, id_mesa)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id;
    `;
    const pedidoRes = await client.query(pedidoQuery, [
      pedidoData.id_usuario,
      pedidoData.tiemporecacion,
      pedidoData.tiempofincocina,
      pedidoData.id_estado_pedido,
      pedidoData.id_mesa
    ]);
    const pedido_id = pedidoRes.rows[0].id;
    const itemQuery = `
     INSERT INTO item_pedido (id_item_menu, id_estado_item, id_pedido)
     VALUES ($1, $2, $3)
     RETURNING *;
    `;
    let insertedItems = [];
    for (const item of items) {
      const res = await client.query(itemQuery, [
        item.id_item_menu,
        item.id_estado_item || 2,
        pedido_id
      ]);
      insertedItems.push(res.rows);
    }
    await client.query('COMMIT');
    return { pedido_id, items: insertedItems };
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error en transacción de pedido:', error);
    throw error;
  } finally {
    await client.end();
  }
}
