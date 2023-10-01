import { defineStore } from "pinia";
import axios from "axios";
import { local } from "../variable.js";
import { ref } from "vue";

export const useProductosStore = defineStore("productos", () => {
  let lodin = ref(true);

  const pedirproductos = async () => {
    try {
      lodin.value = false;
      return await axios.get(`${local}/producto`);
    } catch (error) {
      lodin.value = false;
      console.log("nos fuimos a");
      console.log(error);
    } finally {
      lodin.value = false;
    }
  };

  const agregarproducto = async (info) => {
    try {
      return await axios.post(`${local}/producto`, info);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const actualizarproducto = async (id, cantidad) => {
    try {
      const res = await axios.put(`${local}/producto/${id}`, {
        cantidad: cantidad
      });
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const actualizartresdatos = async (id,nombre,descripcion,precio) => {
    try {
      const res = await axios.put(`${local}/producto/${id}`, {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio
      });
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const actuestado = async (id, estado) => {
    try {
      const res = await axios.put(`${local}/producto/estado/${id}`, {
        estado: estado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    agregarproducto,
    pedirproductos,
    actualizarproducto,
    actuestado,
    actualizartresdatos,
    lodin
  };
});
