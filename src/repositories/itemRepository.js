import { Client } from 'pg';
import DBconfig from './../configs/db_config.js';
export async function getItemByRestauranteAndId(id_restaurante, id_item) {
    const client = new Client(DBconfig);
  
    try {
      await client.connect();
  
      const query = `
        SELECT 
          im.id, 
          im.nombre, 
          im.descripcion, 
          im.precio, 
          im.img, 
          im.disponible, 
          im.id_categoria, 
          c.nombre AS categoria
        FROM item_menu im
        INNER JOIN categoria c ON im.id_categoria = c.id
        WHERE c.id_restaurante = $1 
          AND im.id = $2
        LIMIT 1;
      `;
  
      const res = await client.query(query, [id_restaurante, id_item]);
      return res.rows[0] || null;
    } catch (error) {
      console.error('Error en la consulta:', error);
      throw error;
    } finally {
      await client.end();
    }
  }
  