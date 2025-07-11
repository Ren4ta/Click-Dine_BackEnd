// src/controllers/restaurantesController.js
import express from 'express';
import restauranteService from '../services/restauranteService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await restauranteService.getAllRestaurantes();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
