import { getItemByRestauranteAndId } from '../repositories/itemRepository.js';

export const obtenerItemDeRestaurante = (id_restaurante, id_item) => {
  return getItemByRestauranteAndId(id_restaurante, id_item);
};
