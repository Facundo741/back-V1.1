import { pool } from '../config/db';
import { User } from '../types/user';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (): Promise<User[]> => {
  const result = await pool.query(
    `SELECT id,name, lastname, email 
      FROM users 
      WHERE role != 'admin'
    `);
  return result.rows;
};

export const createUser = async (
  name: string, 
  lastname: string, 
  email: string, 
  password: string
): Promise<User> => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt);

  const result = await pool.query(
    ` INSERT INTO users (name, lastname, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, lastname, email;
    `,
    [name, lastname, email, hashedPassword]
  );
  return result.rows[0];
};

export const deleteUser = async (id: number): Promise<User | null> => {
  const result = await pool.query(
    `DELETE FROM users WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0] || null;
};

export const updateUser = async (
  id: number,
  name?: string,
  lastname?: string,
  email?: string,
  password?: string
): Promise<User | null> => {
  let hashedPassword = null;

  if (password) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
  }

  const result = await pool.query(
    `UPDATE users
    SET
        name = COALESCE($2, name),
        lastname = COALESCE($3, lastname),
        email = COALESCE($4, email),
        password = COALESCE($5, password)
    WHERE id = $1
    RETURNING id, name, lastname, email;
    `,
    [id, name ?? null, lastname ?? null, email ?? null, hashedPassword ?? null]
  );

  return result.rows[0] ?? null;
};
