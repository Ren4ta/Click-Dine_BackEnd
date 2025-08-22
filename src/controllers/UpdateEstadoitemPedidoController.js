import express from 'express';
import { agregarItemsAlPedido } from '../services/itemPedidoService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { items } = req.body;  
  try {
    if (!items) {
     return res.status(400).json({ error: 'Faltan datos: items' });
    }  
    const resultado = await agregarItemsAlPedido(items);
    res.status(201).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar items al pedido' });
  }
});

export default router;
