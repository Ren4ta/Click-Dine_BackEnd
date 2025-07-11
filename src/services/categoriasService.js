// src/services/categoriasService.js
import { getAllCategorias, getCategoriaById } from '../repositories/categoriaRepository.js';

export const listarCategorias = () => {
  return getAllCategorias();
};

export const obtenerCategoria = (id) => {
  return getCategoriaById(id);
};
