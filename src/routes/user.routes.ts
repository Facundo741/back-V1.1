import { Router } from 'express';
import { 
        getUsers,
        addUser,
        removeUser,
        patchUser
      } from '../controllers/user.controller';

const router = Router();

router.get('/users', getUsers);
router.post('/create', addUser);
router.delete('/users/:id', removeUser);
router.patch('/users/:id', patchUser);

export default router;