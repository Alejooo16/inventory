<template>
<div>
 




      <nav class="navbar bg-body-tertiary fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">INVENTARIO</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
    
          <router-link to="/" @click="cerrarsesion()">
                   <button style="width: 100%;" class="btn btn-danger" >Cerrar sesion</button>
          </router-link>

<br>

          <router-link to="/producto">
                   <button style="width: 100%;" class="btn btn-dark" >Productos disponibles </button>
          </router-link>

          <br>

          <router-link to="/ventas">
                   <button style="width: 100%;" class="btn btn-dark" >Ventas de insumos</button>
          </router-link>
 
          <br>

<router-link to="/compras">
         <button style="width: 100%;" class="btn btn-dark" >Compras de insumos</button>
</router-link>

<br>

<router-link to="/proveedores">
                   <button style="width: 100%;" class="btn btn-dark" >Proveedores</button>
          </router-link>
    
        </ul>
      </div>
    </div>
  </div>
</nav>

<br><br><br><br>

 <router-view></router-view>
 
    </div>
</template>
 


<script setup>

import { ref } from 'vue'


const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}



function cerrarsesion() {
  sessionStorage.removeItem("token");
  inicio.value = "/";
}


</script>
  
<style scoped>
.Administrar {
  color: rgb(255, 255, 255);
  font-size: 0.8rem;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-weight: 700;
}

.tabs {
  top: 75px;
  position: relative;
  display: flex;
}


.tab {
  background-color: rgb(38, 51, 73);
  border-radius: 5px 5px 0px 0px;
  border: solid 1px white;
  margin: 5px;
  bottom: -5px;
  width: 200px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 1s;
}

.tab:hover {
  transform: translateY(-10px);
  border-radius: 10px 10px 0px 0px;
  background-color: rgb(26, 32, 43);
  border: solid 2px rgb(99, 129, 192);
  height: 55px;
}

#ticket {
  background-color: rgb(85, 177, 149);
}


.header-banner {
  background-size: 90%;
  background-position: center;
  height: 200px;
  background-color: rgb(6, 6, 101);
}

.link {
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

#cliente {
  background-color: rgb(54, 129, 179);
}

img {
  width: 45px;
  margin: 15px;
}



.spancerra{
  color: aliceblue;
}
.spancerra:hover{
color: #fa1a1a;
}

.cerrar{
  position: relative;
  left: 85%;
}


</style>