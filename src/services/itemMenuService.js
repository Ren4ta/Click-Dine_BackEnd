import { getItemsByCategoriaAndRestaurante } from '../repositories/itemMenuRepository.js';

async function fetchItemsByCategoriaAndRestaurante(idCategoria, idRestaurante) {
  return await getItemsByCategoriaAndRestaurante(idCategoria, idRestaurante);
}

export default {
  fetchItemsByCategoriaAndRestaurante
};
