import express from 'express';

import {
obtenerAdmins,
obtenerAdmin,
CrearAdmin,
ActualizarAdmin,
EliminarAdmin,
loginadmin
} from '../controllers/admin.js';

const router = express.Router();


router.post("/login",loginadmin)
router.get('/', obtenerAdmins);
router.get('/:id',obtenerAdmin);
router.post('/',CrearAdmin);
router.put('/:id', ActualizarAdmin);
router.delete('/:id', EliminarAdmin);

export default router;
