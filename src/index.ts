import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db/connection';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (_req, res) => {
  res.send('Server running');
});

app.get('/db-test', async(_req, res)=>{
  try {
    const result = await pool.query('SELECT NOW()');
    res.json ({ dbTime: result.rows[0].now});
  } catch (error) {
    console.error('Error connection DB',error);
    res.status(500).send('Error connection with DB')    
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
