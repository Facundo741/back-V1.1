import { Router } from 'express';
import { 
        getUsers,
        addUser,
        removeUser,
        patchUser
      } from '../controllers/user.controller';
import { verifyToken } from '../middleware/auth';

const router = Router();

router.get('/users',verifyToken, getUsers);
router.post('/create', addUser);
router.delete('/users/:id', removeUser);
router.patch('/users/:id', patchUser);

export default router;