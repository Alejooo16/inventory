<template>
  <div>
    <span class="subtitulo">BODEGA DE INSUMOS</span>


    <button class="busco btn btn-dark" data-bs-toggle="modal" data-bs-target="#modal" >
      Agregar producto
    </button>
    <div class="busco">
      <input v-model="buscado" type="text" placeholder="Buscar por nombre" />
    </div>

    <div class="cuadrovalortotal">
     El valor total actualmente es: {{ totalvalores }}
    </div>


<div class="table-container" >
    <table class="table">
  <thead>
    <tr>
              <th>Nombre</th>
              <th>Descripcion del producto</th>
              <th>Precio-unidad</th>
              <th>Precio total</th>
              <th>Cantidad-disponible</th>
              <th>Estado</th>
              <th>Reabastecer</th>
              <th>Vender</th>
              <th>Editar</th>
              <th>Activar-Desactivar</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(producto, index) in productosfiltrando" :key="index">
              <td>{{ producto.nombre }}</td>
              <td>{{ producto.descripcion }}</td>
              <td>{{ producto.precio }}</td>
              <td>{{ producto.precio * producto.cantidad }}</td>
              <td style="color: red;" v-if="producto.cantidad < 20" >{{ producto.cantidad }}</td>
              <td style="color: black;" v-else >{{ producto.cantidad }}</td>
              <td>
                <span v-if="producto.estado == true" style="color: #25e40b; font-size: 1.1rem">Activo</span>
                <span v-else style="color: #e4240b; font-size: 1.1rem">Inactivo</span>
              </td>
              <td>
             <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#reabastecer" @click="traer(producto)" >Reabastecer</button>
              </td>
              <td>
                <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#vender" @click="traer(producto)" >Vender</button>
              </td>
              <td>
                <button @click="traerparaeditar(producto)" type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#edicion">
  Editar
</button>
              </td>
              <td>
                <button class="btn btn-danger" v-if="producto.estado == true"
                 @click="estado(true, producto)" >Inactivar producto</button>
              
          <button class="btn btn-success"  v-else  @click="estado(false, producto)" >Activar producto</button>

              </td>
            </tr>

  </tbody>
</table>
</div>



<!-- modal de editar algunos datos -->

<div class="modal fade" id="edicion" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Edicion</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

        <div class="form-group">
              <label for="cantidad">Nombre del producto</label>
              <input autocomplete="off" type="text" v-model="editarnombre" class="form-control" />
            </div>

            <div class="form-group">
              <label for="cantidad">Descripcion del producto</label>
              <input autocomplete="off" type="text" v-model="editardescripcion" class="form-control" />
            </div>

            <div class="form-group">
              <label for="cantidad">Precio actual del producto</label>
              <input autocomplete="off" type="number" v-model="editarprecio" class="form-control" />
            </div>


            <div style="margin: 10px;" class="alert alert-danger d-flex align-items-center" role="alert" v-if="alerta_v">
              <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:" style="height: 20px; width: 20px;">
                <use xlink:href="#exclamation-triangle-fill" />
              </svg>
              <div>{{ alerta_v }}</div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="d-none">
              <symbol id="check-circle-fill" viewBox="0 0 16 16">
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </symbol>
              <symbol id="info-fill" viewBox="0 0 16 16">
                <path
                  d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </symbol>
              <symbol id="exclamation-triangle-fill" viewBox="0 0 16 16">
                <path
                  d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </symbol>
            </svg>
            <div style="margin: 10px;" v-if="validacion == true" class="alert alert-success d-flex align-items-center"
              role="alert">
              <svg style="height: 20px; width: 20px;" class="bi flex-shrink-0 me-2" role="img" aria-label="Success:">
                <use xlink:href="#check-circle-fill" />
              </svg>
              <div>Registro exitoso</div>
            </div>
            
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
        <button @click="ediciontresdatos()" type="button" class="btn btn-dark">Guardar</button>
      </div>
    </div>
  </div>
</div>




<!-- este sera el modal de reabastecer -->

<div class="modal fade" id="reabastecer" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Reabastecer</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="quitar_val()" ></button>
      </div>
      <div class="modal-body">
         <p style="font-size: 20px;" >La cantidad actual del producto {{ nombrereabastecer }} es {{ cantidadactualdeproducto }}</p>
        <br>

            <div class="form-group">
              <label for="cantidad">Cantidad del producto a agregar</label>
              <input autocomplete="off" type="number" v-model="cantidadreabastecer" class="form-control" />
            </div>

            <div class="form-group">
              <label for="valorunidadreabastecer">Valor unidad del producto</label>
              <input autocomplete="off" type="number" v-model="valorunidadreabastecer" class="form-control" />
            </div>

            <div class="form-group">
              <label for="proveedor">Nombre de la compañia proveedora</label>
              <input autocomplete="off" type="text" v-model="proveedorreabastecer" class="form-control" />
            </div>

            
            <div class="form-group">
              <label for="proveedor">Telefono de la compañia proveedora</label>
              <input autocomplete="off" type="text" v-model="telefonoreabastecer" class="form-control" />
            </div>


            <div style="margin: 10px;" class="alert alert-danger d-flex align-items-center" role="alert" v-if="alerta_v">
              <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:" style="height: 20px; width: 20px;">
                <use xlink:href="#exclamation-triangle-fill" />
              </svg>
              <div>{{ alerta_v }}</div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="d-none">
              <symbol id="check-circle-fill" viewBox="0 0 16 16">
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </symbol>
              <symbol id="info-fill" viewBox="0 0 16 16">
                <path
                  d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </symbol>
              <symbol id="exclamation-triangle-fill" viewBox="0 0 16 16">
                <path
                  d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </symbol>
            </svg>
            <div style="margin: 10px;" v-if="validacion == true" class="alert alert-success d-flex align-items-center"
              role="alert">
              <svg style="height: 20px; width: 20px;" class="bi flex-shrink-0 me-2" role="img" aria-label="Success:">
                <use xlink:href="#check-circle-fill" />
              </svg>
              <div>Registro exitoso</div>
            </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="quitar_val()" >Cerrar</button>
        <button type="button" class="btn btn-dark" @click="crearcompra()" >Guardar</button>
      </div>
    </div>
  </div>
</div>


<!-- este el modal de vender -->

<div class="modal fade" id="vender" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Vender productos</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="quitar_val()" ></button>
      </div>
      <div class="modal-body">
         <p style="font-size: 20px;" >La cantidad actual del producto {{ nombrereabastecer }} es {{ cantidadactualdeproducto }}</p>
        <br>

            <div class="form-group">
              <label for="cantidad">Cantidad del producto a vender</label>
              <input autocomplete="off" type="number" v-model="cantidadvender" class="form-control" />
            </div>

            <div class="form-group">
              <label for="valorunidadreabastecer">Valor unidad del producto</label>
              <input autocomplete="off" type="number" v-model="valorunidadvender" class="form-control" />
            </div>

            <div class="form-group">
              <label for="proveedor">Nombre del comprador</label>
              <input autocomplete="off" type="text" v-model="cliente" class="form-control" />
            </div>


            <div style="margin: 10px;" class="alert alert-danger d-flex align-items-center" role="alert" v-if="alerta_v">
              <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:" style="height: 20px; width: 20px;">
                <use xlink:href="#exclamation-triangle-fill" />
              </svg>
              <div>{{ alerta_v }}</div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="d-none">
              <symbol id="check-circle-fill" viewBox="0 0 16 16">
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </symbol>
              <symbol id="info-fill" viewBox="0 0 16 16">
                <path
                  d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </symbol>
              <symbol id="exclamation-triangle-fill" viewBox="0 0 16 16">
                <path
                  d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </symbol>
            </svg>
            <div style="margin: 10px;" v-if="validacion == true" class="alert alert-success d-flex align-items-center"
              role="alert">
              <svg style="height: 20px; width: 20px;" class="bi flex-shrink-0 me-2" role="img" aria-label="Success:">
                <use xlink:href="#check-circle-fill" />
              </svg>
              <div>Registro exitoso</div>
            </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="quitar_val()" >Cerrar</button>
        <button type="button" class="btn btn-dark" @click="crearventa()" >Guardar</button>
      </div>
    </div>
  </div>
</div>






<!-- este el de agregar -->

    <div class="modal fade" id="modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              Agregar nuevo producto
            </h1>
            <button @click="quitar_val()" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="nombre">Nombre</label>
              <input autocomplete="off" type="text" v-model="nombremodel" id="nombre" class="form-control" />
            </div>

            <div class="form-group">
              <label for="descripcion">Descripcion</label>
              <input autocomplete="off" type="text" v-model="descripcionmodel" id="cedula" class="form-control" />
            </div>

            <div class="form-group">
              <label for="precio">Precio</label>
              <input autocomplete="off" type="text" v-model="preciomodel"  id="telefono"
                class="form-control" />
            </div>

            <div class="form-group">
              <label for="cantidad">Cantidad</label>
              <input autocomplete="off" type="number" v-model="cantidadmodel" id="telefono"
                class="form-control" />
            </div>



            <div style="margin: 10px;" class="alert alert-danger d-flex align-items-center" role="alert" v-if="alerta_v">
              <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:" style="height: 20px; width: 20px;">
                <use xlink:href="#exclamation-triangle-fill" />
              </svg>
              <div>{{ alerta_v }}</div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="d-none">
              <symbol id="check-circle-fill" viewBox="0 0 16 16">
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </symbol>
              <symbol id="info-fill" viewBox="0 0 16 16">
                <path
                  d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </symbol>
              <symbol id="exclamation-triangle-fill" viewBox="0 0 16 16">
                <path
                  d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </symbol>
            </svg>
            <div style="margin: 10px;" v-if="validacion == true" class="alert alert-success d-flex align-items-center"
              role="alert">
              <svg style="height: 20px; width: 20px;" class="bi flex-shrink-0 me-2" role="img" aria-label="Success:">
                <use xlink:href="#check-circle-fill" />
              </svg>
              <div>Registro exitoso</div>
            </div>



            
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="quitar_val()">
              Cancelar
            </button>
            <button type="button" id="liveToastBtn" @click="crearproducto()"
              class="btn btn-dark">
              Agregar producto
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script setup>
import { ref, onMounted, computed } from "vue";
import { useProductosStore } from "../stores/producto";
import {useComprasStore} from "../stores/compras"
import {useVentasStore} from "../stores/ventas"
import { useproveedoresStore } from "../stores/proveedores";

let productosarray = ref([]);
let nombremodel = ref("");
let descripcionmodel = ref("");
let preciomodel = ref("");
let cantidadmodel = ref("")
let productoid = ref("");
let buscado = ref("");
let validacion = ref(false);
let alerta_v = ref("");

let idnecesario = ref("")
let ideditar = ref("")

let nombrereabastecer = ref("")
let valorunidadreabastecer = ref("")
let cantidadreabastecer = ref("")
let proveedorreabastecer = ref("")
let cantidadactualdeproducto = ref("")
let telefonoreabastecer = ref("")

let cantidadvender = ref("")
let valorunidadvender = ref("")
let cliente = ref("")

let editarnombre = ref("")
let editardescripcion = ref("")
let editarprecio = ref("")

const useproductos = useProductosStore();
const usecompras = useComprasStore()
const useventas = useVentasStore()
const useproveedores = useproveedoresStore()

// se ejecuta en el onMounted
async function traeproductos() {
  let cosa = await useproductos.pedirproductos();
  productosarray.value = cosa.data;
  
}



// este se esta ejecutando en el boton que se encuentra en el modal  que dice crear nuevo
async function crearproducto() {
  if (validaciones() == true) {
    const nuevo_producto = {
      nombre: nombremodel.value,
      descripcion: descripcionmodel.value,
      precio: preciomodel.value,
      cantidad: cantidadmodel.value
    };

    const p = await useproductos.agregarproducto(nuevo_producto);

    await traeproductos();

      limpiar()
    setTimeout(() => {
      validacion.value = false
    }, 1000);
  }
}



function limpiar() {
  nombremodel.value = "";
  descripcionmodel.value = "";
  preciomodel.value = "";
  cantidadmodel.value = "";
}

function limpiarreabastecer() {
  cantidadreabastecer.value = "";
  valorunidadreabastecer.value = "";
  proveedorreabastecer.value = "";
  telefonoreabastecer.value = "";
}

function limpiarventas() {
  cantidadvender.value = "";
  valorunidadvender.value = "";
  cliente.value = "";
}

function limpiaredicion() {
  editarnombre.value = "";
  editardescripcion.value = "";
  editarprecio.value = "";
}

// aca trabajamos el boton reabastecer
function traer(producto) {
  nombrereabastecer.value = producto.nombre
  cantidadactualdeproducto.value = producto.cantidad
  productoid.value = producto.cantidad
  idnecesario.value = producto._id
  valorunidadvender.value = producto.precio
}



 async function crearcompra() {

  if (validacionesreabastecer() == true) {

    const nuevo_producto2 = {
      proveedor: proveedorreabastecer.value,
      cantidad: cantidadreabastecer.value,
      telefono: telefonoreabastecer.value,
      nombreproducto: nombrereabastecer.value,
      valor: valorunidadreabastecer.value,
    };

 const gg = await useproveedores.agregarproveedor(nuevo_producto2)

    const nuevo_producto1 = {
      nombre: nombrereabastecer.value,
      valor: valorunidadreabastecer.value,
      cantidad: cantidadreabastecer.value,
      proveedor: proveedorreabastecer.value
    };

    const c = await usecompras.agregarcompra(nuevo_producto1);


    let total = Number(cantidadactualdeproducto.value)  + Number(cantidadreabastecer.value) 
       console.log(idnecesario.value);
   console.log(total);

    const a = await useproductos.actualizarproducto(idnecesario.value,total)

 limpiarreabastecer()
     traeproductos()
    setTimeout(() => {
      validacion.value = false
    }, 2000);
  }
}


//  trae los datos a los campos para editarlos
function traerparaeditar(producto) {
 ideditar.value = producto._id,
 console.log(ideditar.value);
editarnombre.value = producto.nombre,
editardescripcion.value = producto.descripcion,
editarprecio.value = producto.precio
}


// aca la edicion de los tres datos
async function ediciontresdatos() {
if (validacionesedicion() == true) {

  const a = await useproductos.actualizartresdatos(ideditar.value,editarnombre.value,editardescripcion.value,editarprecio.value)

   limpiaredicion()
   traeproductos()
   setTimeout(() => {
      validacion.value = false
    }, 1000);
}
}



// aca la funcion del boton vender

async function crearventa() {


if (validacionesventas() == true) {
  const nueva_venta = {
    nombre: nombrereabastecer.value,
    valor: valorunidadvender.value,
    cantidad: cantidadvender.value,
    cliente: cliente.value
  };
 

  let total = Number(cantidadactualdeproducto.value) - Number(cantidadvender.value) 
     console.log(idnecesario.value);
      console.log(total);

      if(total < 0){
       return alerta_v.value = "No tenemos esa cantidad disponible"
      }


  const producto_agregado = await useventas.agregarventa(nueva_venta);
  const actualizacion_del_producto = await useproductos.actualizarproducto(idnecesario.value,total)
console.log(producto_agregado);
  if(producto_agregado){
    validacion.value = true
    limpiarventas()
  }


   traeproductos()
  setTimeout(() => {
    validacion.value = false
  }, 2000);
}
}



let productosfiltrando = computed(() => {
  if (buscado.value === "") {
    traeproductos();
  }
  let nombrebuscado = buscado.value;
  let resultados = productosarray.value.filter((producto) =>
    producto.nombre.includes(nombrebuscado)
  );
  return resultados;
});

// let totalvalores = computed(() => {
//   // Accede al valor de productosfiltrando utilizando .value
//   const productosFiltrados = productosfiltrando.value;

//   // Aplica reduce al array de productos filtrados
//   return productosFiltrados.reduce((total, producto) => total + parseFloat(producto.precio), 0);
// });

// console.log(totalvalores);

let totalvalores = computed(() => {
  // Accede al valor de productosfiltrando utilizando .value
  const productosFiltrados = productosfiltrando.value;

  // Aplica reduce al array de productos filtrados para calcular la suma de (precio * cantidad)
  return productosFiltrados.reduce((total, producto) => {
    return total + (parseFloat(producto.precio) * producto.cantidad);
  }, 0);
});

console.log(totalvalores.value); // Acceder al valor calculado



async function estado(estado, producto) {
  productoid.value = producto._id;
  if (estado == true) {
    const productoactuali = await useproductos.actuestado(productoid.value, false);
    await traeproductos();
  } else {
    const productoactuali = await useproductos.actuestado(productoid.value, true);
    await traeproductos();
  }
}


function validacionesreabastecer() {
  validacion.value = false;
if (!cantidadreabastecer.value) {
    alerta_v.value = "La cantidad es obligatoria";
  }else if (!proveedorreabastecer.value) {
    alerta_v.value = "El proveedor es obligatorio";
  }else if (!valorunidadreabastecer.value) {
    alerta_v.value = "El valor es obligatorio";
  }else if (!telefonoreabastecer.value) {
    alerta_v.value = "El telefono es obligatorio";
  } else {
    alerta_v.value = "";
    return (validacion.value = true);
  }
}

function validacionesventas() {
  validacion.value = false;
if (!cantidadvender.value) {
    alerta_v.value = "La cantidad es obligatoria";
  }else if (!cliente.value) {
    alerta_v.value = "El proveedor es obligatorio";
  }else if (!valorunidadvender.value) {
    alerta_v.value = "El valor es obligatorio";
  } else {
    alerta_v.value = "";
    return true
  }
}

function validacionesedicion() {
  validacion.value = false;
if (!editarnombre.value) {
    alerta_v.value = "El nombre es obligatorio";
  }else if (!editardescripcion.value) {
    alerta_v.value = "La descripcion es obligatoria";
  }else if (!editarprecio.value) {
    alerta_v.value = "El precio es obligatorio";
  } else {
    alerta_v.value = "";
    return (validacion.value = true);
  }
}


function validaciones() {
  validacion.value = false;
  if (!nombremodel.value) {
    alerta_v.value = "El nombre es obligatorio";
  } else if (!descripcionmodel.value) {
    alerta_v.value = "La descripcion es obligatoria";
  } else if (!preciomodel.value) {
    alerta_v.value = "El precio es obligatorio";
  } else if (!cantidadmodel.value) {
    alerta_v.value = "La cantidad es obligatoria";
  } else {
    alerta_v.value = "";
    return (validacion.value = true);
  }
}


function quitar_val(){
  alerta_v.value = "";
}

// propiedad que se encarga de ejecutar la funcion traeproductos una ves se carga el componente
onMounted(() => {
  traeproductos();
});
</script>



<style scoped>
.subtitulo {
  font-size: 2.1rem;
  font-weight: 600;
  position: relative;
  left: 40%;
  top: 30px;
}


.table-container {
  max-height: 400px; /* Altura máxima antes de que aparezca el scroll */
  overflow-y: auto; /* Agregar un scroll vertical si es necesario */
}


/* Estilos para la tabla */
table {
  width: 95%;
  position: relative;
  border-collapse: collapse;
  margin-bottom: 20px;
  left: 2.5%;
  
}

/* Estilos para los encabezados de la tabla */
th {
  background-color: #000000;
  border: 2px solid #ffffff;
  text-align: center;
  padding: 8px;
  color: #dddddd;
}

/* Estilos para las celdas de la tabla */
td {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

/* Estilos para las filas pares de la tabla */

/* Estilos para el resaltado al pasar el mouse por una fila */
tbody tr:hover {
  background-color: #1a4c973f;
}


.edi {
  width: 30px;
}

.btedi {
  top: -7px;
}

.lupa {
  width: 40px;
  height: 40px;
  position: relative;
  top: 5px;
}

.busco {
  display: flex;
  top: -10px;
  position: relative;
  margin: 40px;
}

.busco input {
  width: 250px;
  height: 40px;
  outline: none;
  font-size: 16px;
 
}

.cuadrovalortotal{
  position: relative;
  left: 55rem;
  bottom: 6rem;
  font-size: 30px;
}

.busco input::placeholder {
  text-align: center;
}

.tabla {
  position: relative;
  right: 10px;
}

.tabla::-webkit-scrollbar {
  width: 5px;
}

.tabla::-webkit-scrollbar-thumb {
  background-color: #252966;
  border-radius: 20px;
}

.alerta {
  font-family: "Times New Roman", Times, serif;
  font-size: 17px;
  position: relative;
  bottom: -20px;
  color: red;
  font-weight: 100;
}

.modal-body {
  font-family: Arial, sans-serif;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.modal input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Estilos para el botón de Estado */
.estado {
  margin-top: 15px;
}

.estado-buttons {
  display: flex;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
}


</style>
