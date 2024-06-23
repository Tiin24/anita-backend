import { Router } from 'express';
import {  createClient ,getClients,getClientById} from '../controllers/client.controller.js';

const router = Router();

router.get('/', getClients); // Obtener todos los clientes
router.get('/:id', getClientById); // Obtener cliente por ID
router.post('/', createClient); 

export default router;
