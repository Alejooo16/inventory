import express from 'express';

import {
    actualizarVenta,
    crearVenta,
    eliminarVenta,
    obtenerVentas,
    obtenerVenta,
    actualizarestado
} from '../controllers/ventas.js'


const router = express.Router();

router.get('/', obtenerVentas);
router.get('/:id', obtenerVenta);
router.post('/', crearVenta);
router.put('/:id', actualizarVenta);
router.delete('/:id', eliminarVenta);
router.put('/estado/:id', actualizarestado);

export default router;