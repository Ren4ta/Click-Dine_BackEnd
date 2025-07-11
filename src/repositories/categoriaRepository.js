// src/repositories/categoriasRepository.js
import pool from '../db.js';

export async function getCategoriasByRestaurante(id_restaurante) {
  const query = `
    SELECT id, nombre, img, id_restaurante
    FROM categorias
    WHERE id_restaurante = $1
    ORDER BY id;
  `;
  const { rows } = await pool.query(query, [id_restaurante]);
  return rows;
}

  