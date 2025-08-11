import express from 'express';
import { fetchItemsByCategoriaAndRestaurante } from '../services/itemMenuService.js';

const router = express.Router();

router.get('/:idRestaurante/:idCategoria', async (req, res) => {
  const { idRestaurante, idCategoria } = req.params;

  try {
    const items = await fetchItemsByCategoriaAndRestaurante(idRestaurante, idCategoria);
    res.json(items);
  } catch (error) {
    console.error('Error en itemMenuController:', error);
    res.status(500).json({ error: 'Error al obtener los items.' });
  }
});

export default router;
