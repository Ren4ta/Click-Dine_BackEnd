// src/index.js
import express from 'express';
import restaurantesController from './controllers/restaurantesController.js';

const app = express();
const port = process.env.PORT || 3000;


// Rutas
app.use('/api/restaurantes', restaurantesController);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
