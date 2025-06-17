import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api', userRoutes);
app.use('/api', authRoutes);

app.get('/', (_req, res)=> {
  res.send('Successful server');
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});
