const db = require('../configs/db_config.js');

async function getItemsByCategoriaAndRestaurante(idCategoria, idRestaurante) {
  const query = `
    SELECT item_menu.*
    FROM item_menu
    JOIN categoria ON item_menu.id_categoria = categoria.id
    WHERE categoria.id = $1 AND categoria.id_restaurante = $2;
  `;
  const values = [idCategoria, idRestaurante];

  const { rows } = await db.query(query, values);
  return rows;
}

module.exports = { getItemsByCategoriaAndRestaurante };
