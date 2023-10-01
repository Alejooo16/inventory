import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import { router } from '../src/rutas/rutas.js'
import {createPinia} from 'pinia' 



const myApp = createApp(App)
const pinia = createPinia()


myApp.use(Quasar, {
    plugins: {},
})

myApp.use(router)
myApp.use(pinia)
myApp.mount('#app')
