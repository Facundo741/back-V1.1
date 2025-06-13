import { pool } from '../config/db';
import { User } from '../types/user';

export const getAllUsers = async (): Promise<User[]> => {
  const result = await pool.query('SELECT id, name, lastname, email FROM users');
  return result.rows;
};

export const createUser = async (name: string, lastname: string, email: string, password: string): Promise<User> => {
  const result = await pool.query (
    'INSERT INTO users (name, lastname, email, password)VALUES ($1, $2, $3, $4) RETURNING id, name, lastname, email, password', 
    [name, lastname, email, password]
  );
  return result.rows[0];
};