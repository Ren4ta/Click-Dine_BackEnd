// src/controllers/authController.js
import express from 'express';
import authService from '../services/authService.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { mail, contrasena } = req.body;

  try {
    const loginResult = await authService.login(mail, contrasena);
    res.json(loginResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
