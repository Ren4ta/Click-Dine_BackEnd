// src/controllers/categoriasController.js
import express from 'express';
import { listarCategorias, obtenerCategoria } from '../services/categoriasService.js';

const router = express.Router();

// GET /api/categorias - listar todas las categorías
router.get('/', (req, res) => {
  const categorias = listarCategorias();
  res.json(categorias);
});

// GET /api/categorias/:id - obtener categoría por id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const categoria = obtenerCategoria(id);

  if (!categoria) {
    return res.status(404).json({ error: 'Categoría no encontrada' });
  }

  res.json(categoria);
});

export default router;
