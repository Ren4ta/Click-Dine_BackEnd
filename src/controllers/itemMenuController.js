import express from 'express';
import itemMenuService from '../services/itemMenuService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { idCategoria, idRestaurante } = req.body;

  if (!idCategoria || !idRestaurante) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos.' });
  }

  try {
    const items = await itemMenuService.fetchItemsByCategoriaAndRestaurante(idCategoria, idRestaurante);
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los items.' });
  }
});

export default router;
