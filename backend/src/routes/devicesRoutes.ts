import { Router } from 'express';
import { getActivos, createActivo } from '../controller/devicesController';

const router = Router();

router.get('/', getActivos);
router.post('/', createActivo);

export default router;
