import { body } from 'express-validator';
import { pool } from '../config/db'; 

export const validateUserCreation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('lastname').notEmpty().withMessage('Lastname is required'),

  body('email')
    .isEmail().withMessage('Invalid email')
    .custom(async (email) => {
      const result = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
      if (result.rows.length > 0) {
        return Promise.reject('Email already in use');
      }
    }),

  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character'),
];

export const validateUserUpdate = [
  body('email').optional().isEmail().withMessage('Invalid email'),
  body('name').optional().notEmpty().withMessage('Name can\'t be empty'),

  body('password')
    .optional()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character'),
];
