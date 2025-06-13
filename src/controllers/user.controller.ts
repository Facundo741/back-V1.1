import { Request, Response } from 'express';
import { getAllUsers, createUser } from '../services/user.service';

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
