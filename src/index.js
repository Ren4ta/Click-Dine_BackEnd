import express from 'express'; 
import cors from 'cors';
import restaurantesController from './controllers/restaurantesController.js'; 
import authController from './controllers/authController.js';
import categoriasController from './controllers/categoriasController.js'; 
import itemMenuController from './controllers/itemMenuController.js';
import itemRoutes from './controllers/itemController.js';
import UpdateEstadoitemPedidoController from './controllers/UpdateEstadoitemPedidoController.js';
import pedidoController from './controllers/pedidoController.js';
import carritoRouter from './controllers/carritoController.js';
import mesasController from './controllers/mesasController.js';


const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json()); 

app.use('/api/restaurantes', restaurantesController);  
app.use('/api', authController);
app.use('/api/categorias', categoriasController);
app.use('/api/items-by-categoria-restaurante', itemMenuController);
app.use('/api/items', itemRoutes);
app.use('/api/item-pedido', UpdateEstadoitemPedidoController);
app.use('/api/pedido', pedidoController);
app.use('/api/carrito', carritoRouter);
app.use('/mesas', mesasController);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});








