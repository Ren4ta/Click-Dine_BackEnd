import express from 'express';
import { agregarItemsAlPedido } from '../services/itemPedidoService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { pedido_id, items } = req.body;

  try {
    if (!pedido_id || !items) {
      return res.status(400).json({ error: 'Faltan datos: pedido_id o items' });
    }

    const resultado = await agregarItemsAlPedido(pedido_id, items);
    res.status(201).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar items al pedido' });
  }
});

export default router;
