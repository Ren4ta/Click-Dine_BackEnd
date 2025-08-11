import express from 'express';
import { obtenerItemDeRestaurante } from '../services/itemService.js';

const router = express.Router();

router.get('/:id_restaurante/:id_item', async (req, res) => {
  const { id_restaurante, id_item } = req.params;
  try {
    const item = await obtenerItemDeRestaurante(id_restaurante, id_item);
    if (!item) {
      return res.status(404).json({ error: 'Ítem no encontrado' });
    }
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el ítem' });
  }
});

export default router;
