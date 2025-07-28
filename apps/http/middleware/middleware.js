import jwt from 'jsonwebtoken';

import dotenv from "dotenv";

dotenv.config();

export const protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);    
    req.userid = decoded.userid; 

    
    next(); 
  } catch (err) {    
    return res.status(401).json({ message: 'Invalid token' });
  }
};
