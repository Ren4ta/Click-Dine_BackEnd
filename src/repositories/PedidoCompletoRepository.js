import { Client } from 'pg';
import DBconfig from '../configs/db_config.js';

export async function getItemsByPedido(id_pedido) {
  const client = new Client(DBconfig);

  try {
    await client.connect();

    const query = `
      SELECT 
        item_pedido.id AS id_item_pedido,
        item_pedido.id_item_menu,
        item_pedido.id_estado_item,
        item_pedido.id_pedido,
        item_menu.nombre,
        item_menu.img,
        item_menu.precio,
        item_menu.descripcion,
        item_menu.disponible
      FROM item_pedido
      JOIN item_menu ON item_menu.id = item_pedido.id_item_menu
      WHERE item_pedido.id_pedido = $1
      ORDER BY item_pedido.id;
    `;

    const res = await client.query(query, [id_pedido]);
    return res.rows;
  } catch (error) {
    console.error('Error en la consulta de items:', error);
    throw error;
  } finally {
    await client.end();
  }
}
