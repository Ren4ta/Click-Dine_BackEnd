// src/controllers/categoriasController.js
import express from 'express';
import { getCategoriasByRestaurante } from '../repositories/categoriaRepository.js';

const router = express.Router();

// GET /api/categorias/:id_restaurante
router.get('/:id_restaurante', async (req, res) => {
  const { id_restaurante } = req.params;
  try {
    const categorias = await getCategoriasByRestaurante(id_restaurante);
    res.json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
});

export default router;
