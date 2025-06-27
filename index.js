import express from 'express';
import cors from 'cors';
import supabase from './supabase.js';
import 'dotenv/config'

const app = express();
const PORT = 4000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.get('/api/categorias', async (req, res) => {
  const { data, error } = await supabase
    .from('categoria')
    .select('*');

  if (error) {
    console.error('Error fetching categorias:', error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
