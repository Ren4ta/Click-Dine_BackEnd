const itemMenuRepository = require('../repositories/itemMenuRepository');

async function fetchItemsByCategoriaAndRestaurante(idCategoria, idRestaurante) {
  return await itemMenuRepository.getItemsByCategoriaAndRestaurante(idCategoria, idRestaurante);
}

module.exports = { fetchItemsByCategoriaAndRestaurante };
