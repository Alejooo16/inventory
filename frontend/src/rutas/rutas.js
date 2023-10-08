import Producto from '../components/Producto.vue'
import Login from '../components/Login.vue'
import Contenedor from '../components/Contenedor.vue'
import Ventas from "../components/Ventas.vue"
import Compras from "../components/Compras.vue"
import Proveedores from "../components/Proveedores.vue"

import { createRouter , createWebHashHistory } from 'vue-router'


const routes = [
    { path: "/" , component : Login },
    {
        path : "/contenedor", component : Contenedor,

        children: [
        {path: "/producto", component : Producto},
        {path: "/ventas", component: Ventas},
        {path: "/compras", component: Compras},
        {path: "/proveedores", component: Proveedores}
        ],
        beforeEnter: (to, from, next) => {
            const toke = sessionStorage.getItem('token');
            if(!toke && to.path !== '/'){
                next('/')
            }else{
                next()
            }
        }
    }
    
]


export const router = createRouter({
    history : createWebHashHistory(),
    routes
})