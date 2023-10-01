import {defineStore} from "pinia"
import axios from "axios"
import { ref } from "vue";
import {local} from "../variable.js"
let lodin  = ref(false)


export const useClientStore = defineStore("login", ()=>{


    const login = async (nombre, contraseña) => {
        try {
          lodin.value = true
          const data = { nombre, contraseña };
          return await axios.post(`${local}/admin/login`, data);
        
        } catch (error) {
          lodin.value = true
          throw error;
        }finally{
          lodin.value = false
        }
      }


    return{
        login,
        lodin
    }
})

