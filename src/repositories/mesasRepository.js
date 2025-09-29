import { Client } from 'pg';
import DBconfig from '../configs/db_config.js';

export async function getMesasConPedidosActivos(id_restaurante) {
  const client = new Client(DBconfig);

  const query = `
    SELECT
      m.id AS id_mesa,
      m.numero_mesa,
      p.id AS id_pedido,
      p.id_estado_pedido,
      p.tiempocreacion,
      p.tiempofincocina,
      COALESCE(items.items, '[]')::json AS items
    FROM mesa m
    LEFT JOIN LATERAL (
      SELECT p_inner.id, p_inner.id_estado_pedido, p_inner.tiempocreacion, p_inner.tiempofincocina
      FROM pedido p_inner
      WHERE p_inner.id_mesa = m.id
        AND p_inner.id_estado_pedido <> 7
      ORDER BY p_inner.tiempocreacion DESC
      LIMIT 1
    ) p ON TRUE
    LEFT JOIN LATERAL (
      SELECT json_agg(json_build_object(
        'id_item_pedido', ip.id,
        'id_item_menu', ip.id_item_menu,
        'id_estado_item', ip.id_estado_item,
        'nombre', im.nombre,
        'precio', im.precio,
        'disponible', im.disponible,
        'id_categoria', im.id_categoria
      )) AS items
      FROM item_pedido ip
      JOIN item_menu im ON im.id = ip.id_item_menu
      WHERE ip.id_pedido = p.id
    ) items ON TRUE
    WHERE m.id_restaurante = $1
    ORDER BY m.numero_mesa;
  `;

  try {
    await client.connect();
    const res = await client.query(query, [id_restaurante]);

    // Mapear a una estructura más amigable JSON
    const mesas = res.rows.map(row => {
      if (!row.id_pedido) {
        return {
          id_mesa: row.id_mesa,
          numero_mesa: row.numero_mesa,
          pedido_activo: false,
          mensaje: 'No hay pedido activo'
        };
      }

      return {
        id_mesa: row.id_mesa,
        numero_mesa: row.numero_mesa,
        pedido_activo: true,
        pedido: {
          id_pedido: row.id_pedido,
          id_estado_pedido: row.id_estado_pedido,
          tiempocreacion: row.tiempocreacion,
          tiempofincocina: row.tiempofincocina,
          items: row.items // ya es un JSON array (puede ser [])
        }
      };
    });

    return mesas;
  } catch (error) {
    console.error('Error en getMesasConPedidosActivos:', error);
    throw error;
  } finally {
    await client.end();
  }
}
