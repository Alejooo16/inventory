import express from 'express';

import {
    actualizarProducto,
    crearProducto,
    eliminarProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarestado
} from '../controllers/productos.js'


const router = express.Router();

router.get('/', obtenerProductos);
router.get('/:id', obtenerProducto);
router.post('/', crearProducto);
router.put('/:id', actualizarProducto);
router.delete('/:id', eliminarProducto);
router.put('/estado/:id', actualizarestado);

export default router;