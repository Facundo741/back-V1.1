import { Router } from 'express';
import { 
  getUsers,
  addUser
  } from '../controllers/user.controller';

const router = Router();

router.get('/users', getUsers);
router.post('/create', addUser);


export default router;