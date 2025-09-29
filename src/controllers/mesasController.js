import express from 'express';
import { getMesasConPedidosActivos } from '../repositories/mesasRepository.js';

const router = express.Router();

// GET /mesas/:id_restaurante/pedidos-activos
router.get('/:id_restaurante/pedidos-activos', async (req, res) => {
  const { id_restaurante } = req.params;

  try {
    const mesas = await getMesasConPedidosActivos(id_restaurante);
    res.json(mesas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener mesas y pedidos activos' });
  }
});

export default router;
