import express from "express";
import productoruta from './productos.js'
import adminruta from "./admin.js"
import compraruta from "./compras.js"
import ventaruta from "./ventas.js"
import proveedorruta from "./proveedores.js"

const router = express.Router();

router.use('/producto', productoruta)
router.use("/admin", adminruta )
router.use("/compra", compraruta)
router.use("/venta", ventaruta)
router.use("/proveedor",proveedorruta)

export default router;

