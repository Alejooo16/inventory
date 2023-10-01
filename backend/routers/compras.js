import express from 'express';

import {
    actualizarCompra,
    crearCompra,
    eliminarCompra,
    obtenerCompras,
    obtenerCompra,
    actualizarestado
} from '../controllers/compras.js'


const router = express.Router();

router.get('/', obtenerCompras);
router.get('/:id', obtenerCompra);
router.post('/', crearCompra);
router.put('/:id', actualizarCompra);
router.delete('/:id', eliminarCompra);
router.put('/estado/:id', actualizarestado);

export default router;