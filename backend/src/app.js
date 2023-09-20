import express from 'express'
import productosRoutes from './routes/productos.routes.js'
import indexRoutes from './routes/index.routes.js'
import usuariosRoutes from './routes/usuarios.routes.js'
import pedidosRoutes from './routes/pedidos.routes.js'
import carritoRoutes from './routes/carrito.routes.js'


const app = express()

app.use(express.json())

app.use(indexRoutes)
app.use('/api',productosRoutes)
app.use('/api',usuariosRoutes)
app.use('/api',pedidosRoutes)
app.use('/api',carritoRoutes)

app.use((req, res, next) =>{
    res.status(404).json({
        message: 'EndPoint no encontrado'
    })
})

export default app