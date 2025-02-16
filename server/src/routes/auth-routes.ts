import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;
  console.log('Login function');
  try {
    const user = await User.findOne({ where: {username} });
    console.log('After user');
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    console.log('This is before the token');
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1h' });
    console.log('This is after the token');
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
