<script setup >

import { useClientStore } from "../stores/admin.js";
let useadmin = useClientStore();
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
let nombre = ref("");
let contraseña = ref("");
let alerta_v = ref("");



function paso() {

  useadmin.login(nombre.value, contraseña.value).then((response) => {
      let tok = response.data.token;
      sessionStorage.setItem("token", tok);
      console.log(response.data);

      if (response.data.status == 200) {
        console.log("sesion exitosa");
        router.push("/producto");
      } else if(response.data.status == 404) {
        alerta_v.value = "Los dos campos deben ser correctos."
        setTimeout(() => {
        alerta_v.value = ""
        }, 3000);
      }
    })
}

</script>

<template>
  <div>
    <div class="centrar-div">
      <div
        style="
          background-color: #f1f2f6;
          width: 400px;
          height: 400px;
          border-radius: 10px;
        "
      >
        <br />
        <div
          style="display: flex; align-items: center; justify-content: center"
        >


        </div>
        <br />

 <img style="height: 200px; width: 200px;position: relative;left: 25%;top: -5%;" src="../assets/imagenlogin.png" alt=""> 

        <input
          style="width: 90%; margin-right: 10px; margin-left: 10px"
          class="form-control me-2"
          type="text"
          v-model="nombre"
          placeholder="Usuario"
        /><br />

        <input
          style="width: 90%; margin-right: 10px; margin-left: 10px"
          class="form-control me-2"
          type="password"
          v-model="contraseña"
          placeholder="Contraseña"
        />
        <br /><br />

        <div
          style="display: flex; align-items: center; justify-content: center;position: relative; top: -7%;"
        >
        
        <button @click="paso()" class="btn btn-dark"  v-if="useadmin.lodin == false ">Ingresar➡️</button> 


        <div class="spinner-border text-warning" role="status" v-if="useadmin.lodin == true ">
        <span class="visually-hidden">Loading...</span>
        </div>
        </div>
        
        
      </div>
      
    </div>
    <div style="justify-content: center;display: flex; " >
      <span>{{ alerta_v }}</span>
    </div>
    
  </div>
</template>



<style scoped>



.centrar-div {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

span {
  margin-top: 1%;
  font-size: 22px;
  color: rgb(10, 0, 0);
}


</style>