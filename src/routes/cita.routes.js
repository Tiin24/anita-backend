import { Router } from 'express';
import { createCita,getAllCitas,getCitaById,getCitasByClientId,updateCitaById,getCitasAceptadas } from '../controllers/cita.controller.js';

const router = Router();

router.get('/aceptadas', getCitasAceptadas);
router.get('/cliente/:clientId', getCitasByClientId);
router.get('/', getAllCitas);
router.get('/:id', getCitaById);

router.post('/', createCita);

router.put('/:id',updateCitaById)


export default router;
