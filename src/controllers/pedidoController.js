import express from 'express';
import { generarPedido } from '../services/pedidoService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { id_usuario, id_mesa, items, id_pedido } = req.body;

  try {
    if ((!id_pedido && (!id_usuario || !id_mesa)) || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Datos incompletos para crear o actualizar el pedido' });
    }

    const resultado = await generarPedido(
      { id_usuario, id_mesa, id_pedido },
      items
    );

    res.status(201).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al generar o actualizar el pedido' });
  }
});

export default router;
