import * as repo from '../repositories/finalizarPedidoRepository.js';

function limpiarNumero(valor) {
  if (typeof valor === 'string') {
    valor = valor.replace(/\./g, '').replace(',', '.');
  }
  const numero = parseFloat(valor);
  if (isNaN(numero)) throw new Error('Propina inválida, debe ser un número');
  return numero;
}

export async function cerrarPedido({ id_pedido, id_restaurante, id_medio_pago, id_tipo_factura, propina }) {
  const propinaLimpia = limpiarNumero(propina);

  const pedidoExiste = await repo.existePedido(id_pedido, id_restaurante);
  if (!pedidoExiste) throw new Error('Pedido o restaurante no existen o no coinciden');

  const restauranteExiste = await repo.existeRestaurante(id_restaurante);
  if (!restauranteExiste) throw new Error('Restaurante no existe');

  let subtotal = await repo.calcularTotalPedido(id_pedido);

  subtotal = parseFloat(
    subtotal
      .toString()
      .replace(/\./g, '')  // quitar puntos
      .replace(',', '.')   // cambiar coma por punto decimal
  );

  if (isNaN(subtotal)) {
    throw new Error('Subtotal inválido en cálculo');
  }

  // Ajustar dividiendo entre 100 para corregir escala decimal
  subtotal = subtotal / 100;

  const propinaMonto = (subtotal * propinaLimpia) / 100;
  const total = subtotal + propinaMonto;

  const pedidoActualizado = await repo.updateEstadoPedido(id_pedido, 7);

  const idMesa = await obtenerIdMesaPorPedido(id_pedido);
  const mesaActualizada = await repo.updateEstadoMesa(idMesa, 1);

  console.log('Valores antes de crear ticket:', {
    id_tipo_factura,
    id_medio_pago,
    propina: propinaMonto,
    total,
    id_pedido,
    id_restaurante
  });

  const ticketCreado = await repo.crearTicket({
    id_tipo_factura,
    id_medio_pago,
    propina: propinaMonto,
    total,
    id_pedido,
    id_restaurante
  });

  return {
    subtotal,
    propina: propinaMonto,
    total,
    pedidoActualizado,
    mesaActualizada,
    ticketCreado
  };
}

async function obtenerIdMesaPorPedido(id_pedido) {
  const { Client } = await import('pg');
  const DBconfig = (await import('../configs/db_config.js')).default;
  const client = new Client(DBconfig);
  try {
    await client.connect();
    const res = await client.query('SELECT id_mesa FROM pedido WHERE id = $1', [id_pedido]);
    return res.rows.length ? res.rows[0].id_mesa : null;
  } finally {
    await client.end();
  }
}
