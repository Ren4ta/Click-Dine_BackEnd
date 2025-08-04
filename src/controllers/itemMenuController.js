import express from 'express';
import { fetchItemsByCategoriaAndRestaurante } from '../services/itemMenuService.js';

const router = express.Router();

router.get('/:idRestaurante/:idCategoria', async (req, res) => {
  const { idCategoria, idRestaurante } = req.params;

  if (!idCategoria || !idRestaurante) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos.' });
  }

  try {
    const items = await fetchItemsByCategoriaAndRestaurante(idCategoria, idRestaurante);
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los items.' });
  }
});

export default router;
