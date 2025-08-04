import express from 'express'; 
import cors from 'cors';
import restaurantesController from './controllers/restaurantesController.js'; 
import authController from './controllers/authController.js';
import categoriasController from './controllers/categoriasController.js'; 

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json()); 

app.use('/api/restaurantes', restaurantesController);  
app.use('/api', authController);
app.use('/api/categorias', categoriasController);
app.post('/api/items-by-categoria-restaurante', itemMenuController.getItemsByCategoriaAndRestaurante);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
