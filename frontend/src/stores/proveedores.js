import { defineStore } from "pinia";
import axios from "axios";
import { local } from "../variable.js";
import { ref } from "vue";

export const useproveedoresStore = defineStore("proveedores", () => {
  let lodin = ref(true);

  const pedirproveedores = async () => {
    try {
      lodin.value = false;
      return await axios.get(`${local}/proveedor`);
    } catch (error) {
      lodin.value = false;
      console.log(error);
    } finally {
      lodin.value = false;
    }
  };

  const agregarproveedor = async (info) => {
    try {
      return await axios.post(`${local}/proveedor`, info);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const actualizarproveedor = async (id, nombre, valor, cantidad, proveedor) => {
    try {
      const res = await axios.put(`${local}/proveedor/${id}`, {
        nombre: nombre,
        valor: valor,
        cantidad: cantidad,
        proveedor: proveedor
      });
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const actuestado = async (id, estado) => {
    try {
      const res = await axios.put(`${local}/proveedor/estado/${id}`, {
        estado: estado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    agregarproveedor,
    pedirproveedores,
    actualizarproveedor,
    actuestado,
    lodin
  };
});
