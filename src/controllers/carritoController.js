import express from 'express';
import { listarCarrito } from '../services/carritoService.js';

const router = express.Router();

router.get('/:id_pedido', async (req, res) => {
  const { id_pedido } = req.params;
  try {
    const carrito = await listarCarrito(id_pedido);
    res.json(carrito);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

export default router;
