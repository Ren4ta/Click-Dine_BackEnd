import { Client } from 'pg';
import DBconfig from '../configs/db_config.js';

export async function crearPedidoConItems(pedidoData, items) {
  const client = new Client(DBconfig);

  try {
    await client.connect();
    await client.query('BEGIN');

    let pedido_id = pedidoData.id_pedido;

    // Si no se recibió un id_pedido, crear uno nuevo
    if (!pedido_id) {
      const pedidoQuery = `
        INSERT INTO pedido (id_usuario, tiempocreacion, tiempofincocina, id_estado_pedido, id_mesa)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id;
      `;

      const pedidoRes = await client.query(pedidoQuery, [
        pedidoData.id_usuario,
        null,
        null,
        2,
        pedidoData.id_mesa
      ]);

      pedido_id = pedidoRes.rows[0].id;
    }

    const itemQuery = `
      INSERT INTO item_pedido (id_item_menu, id_estado_item, id_pedido)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    let insertedItems = [];
    for (const item of items) {
      const res = await client.query(itemQuery, [
        item.id_item_menu,
        2,
        pedido_id
      ]);
      insertedItems.push(res.rows[0]);
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
