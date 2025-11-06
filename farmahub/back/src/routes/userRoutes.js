import express from 'express';
import { UserController } from '../controllers/userController.js';

const router = express.Router();

router.get('/', UserController.listar);
router.post('/', UserController.criar);

export default router;