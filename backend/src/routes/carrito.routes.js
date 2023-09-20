import { Router } from "express"
import { getCarrito, createCarrito, updateCarrito, deleteCarrito, getcarrito} from '../controllers/carrito.controller.js';

const router = Router()

router.get('/carrito',getCarrito)
router.get('/carrito/:id',getcarrito)
router.post('/carrito',createCarrito)
router.patch('/carrito/:id',updateCarrito)
router.delete('/carrito/:id',deleteCarrito)

export default router