import express from 'express';

import {
    obtenerproveedores,
    obtenerproveedor,
    actualizarestado,
    crearproveedor,
    actualizarproveedor,
    eliminarproveedor
} from '../controllers/proveedores.js'


const router = express.Router();

router.get('/', obtenerproveedores);
router.get('/:id', obtenerproveedor);
router.post('/', crearproveedor);
router.put('/:id', actualizarproveedor);
router.delete('/:id', eliminarproveedor);
router.put('/estado/:id', actualizarestado);

export default router;