import express from 'express';
import { generarPedido } from '../services/pedidoService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { usuario_id, fecha, total, items } = req.body;

  try {
    if (!usuario_id || !fecha || !total || !items) {
      return res.status(400).json({ error: 'Datos incompletos para crear el pedido' });
    }

    const resultado = await generarPedido({ usuario_id, fecha, total }, items);
    res.status(201).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al generar el pedido' });
  }
});

export default router;
