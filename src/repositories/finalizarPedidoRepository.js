import { Client } from 'pg';
import DBconfig from '../configs/db_config.js';

export async function existePedido(id_pedido, id_restaurante) {
  const client = new Client(DBconfig);
  const query = `
    SELECT p.id FROM pedido p
    JOIN mesa m ON p.id_mesa = m.id
    WHERE p.id = $1 AND m.id_restaurante = $2
  `;
  try {
    await client.connect();
    const res = await client.query(query, [id_pedido, id_restaurante]);
    return res.rowCount > 0;
  } finally {
    await client.end();
  }
}

export async function existeRestaurante(id_restaurante) {
  const client = new Client(DBconfig);
  const query = `SELECT id FROM restaurante WHERE id = $1`;
  try {
    await client.connect();
    const res = await client.query(query, [id_restaurante]);
    return res.rowCount > 0;
  } finally {
    await client.end();
  }
}

export async function calcularTotalPedido(id_pedido) {
  const client = new Client(DBconfig);
  const query = `
    SELECT SUM(im.precio) as subtotal
    FROM item_pedido ip
    JOIN item_menu im ON ip.id_item_menu = im.id
    WHERE ip.id_pedido = $1
  `;
  try {
    await client.connect();
    const res = await client.query(query, [id_pedido]);
    return res.rows[0].subtotal || 0;
  } finally {
    await client.end();
  }
}

export async function updateEstadoPedido(id_pedido, id_estado_pedido) {
  const client = new Client(DBconfig);
  const query = `
    UPDATE pedido
    SET id_estado_pedido = $1
    WHERE id = $2
    RETURNING id, id_estado_pedido
  `;
  try {
    await client.connect();
    const res = await client.query(query, [id_estado_pedido, id_pedido]);
    return res.rows[0];
  } finally {
    await client.end();
  }
}

export async function updateEstadoMesa(id_mesa, id_estado_mesa) {
  const client = new Client(DBconfig);
  const query = `
    UPDATE mesa
    SET id_estado_mesa = $1
    WHERE id = $2
    RETURNING id, id_estado_mesa
  `;
  try {
    await client.connect();
    const res = await client.query(query, [id_estado_mesa, id_mesa]);
    return res.rows[0];
  } finally {
    await client.end();
  }
}

export async function crearTicket({ id_tipo_factura, id_medio_pago, propina, total, id_pedido, id_restaurante }) {
  const client = new Client(DBconfig);
  const query = `
    INSERT INTO ticket (id_tipo_factura, id_medio_pago, propina, total, id_pedido, id_restaurante)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  try {
    await client.connect();
    const res = await client.query(query, [id_tipo_factura, id_medio_pago, propina, total, id_pedido, id_restaurante]);
    return res.rows[0];
  } finally {
    await client.end();
  }
}
