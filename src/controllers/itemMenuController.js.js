
const itemMenuService = require('../services/itemMenuService');

async function getItemsByCategoriaAndRestaurante(req, res) {
  try {
    const { idCategoria, idRestaurante } = req.body;

    if (!idCategoria || !idRestaurante) {
      return res.status(400).json({ error: 'Faltan parámetros requeridos.' });
    }

    const items = await itemMenuService.fetchItemsByCategoriaAndRestaurante(idCategoria, idRestaurante);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los items.' });
  }
}

module.exports = { getItemsByCategoriaAndRestaurante };
