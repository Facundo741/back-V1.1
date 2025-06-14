import { Request, Response } from 'express';
import {  getAllUsers, 
          createUser, 
          deleteUser,
          updateUser
      } from '../services/user.service';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);

  } catch (error) {
    console.error('Error getting users: ', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

export const addUser = async (req: Request, res: Response) => {
  const { name, lastname, email, password } = req.body;
  try {
    const newUser = await createUser (name, lastname, email, password);
    res.status(201).json(newUser);

  } catch (error) {
    console.error('Error creating user: ',error);
    res.status(500).json({ message: 'Error creating user'});    
  }
};


export const removeUser = async (req: Request, res: Response): Promise<any> => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    const deletedUser = await deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted', id: deletedUser.id });

  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const patchUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  const { name, lastname, email, password } = req.body;

  if (name === undefined && lastname === undefined && email === undefined) {
    return res.status(400).json({ error: 'No data to update' });
  }

  try {
    const updated = await updateUser(id, name, lastname, email, password);

    if (!updated) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ message: 'User updated', user: updated });
  } catch (err) {
    console.error('Error updating user:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};