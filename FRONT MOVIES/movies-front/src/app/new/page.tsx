"use client"; // Indica que este archivo debe ser ejecutado del lado del cliente

import FormCard from "@/components/formCard"; // Importa el componente del formulario para crear una nueva película
import Header from "@/components/header"; // Importa el componente de encabezado para la página
import React, { Component } from "react"; // Importa React y el componente base

import { ToastContainer } from 'react-toastify'; // Importa el contenedor para las notificaciones Toast
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos predeterminados para las notificaciones Toast

// Definición del componente de página
export default class page extends Component {
  render() {
    return (
      <div className="">
        {/* Renderiza el encabezado de la página */}
        <Header />

        {/* Título principal de la página */}
        <h1 className="text-center text-white text-3xl">
          CREAR NUEVA PELÍCULA
        </h1>

        {/* ToastContainer es necesario para mostrar las notificaciones Toast en la aplicación.
            Se coloca aquí para que el componente FormCard pueda usar toast.success y otros métodos de toast */}
        <ToastContainer />

        {/* Renderiza el formulario para crear una nueva película */}
        <FormCard />
      </div>
    );
  }
}
