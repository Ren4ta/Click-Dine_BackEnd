import { getItemsByCategoriaAndRestaurante } from '../repositories/itemMenuRepository.js';

export async function fetchItemsByCategoriaAndRestaurante(idRestaurante, idCategoria) {
  return await getItemsByCategoriaAndRestaurante(idRestaurante, idCategoria);
}
