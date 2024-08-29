

import BtnSelect from '@/components/btnSelect'; // Importa el componente BtnSelect para seleccionar y eliminar una película
import Header from '@/components/header'; // Importa el componente Header para el encabezado de la página
import React from 'react'; // Importa React para crear componentes

import { ToastContainer } from 'react-toastify'; // Importa el contenedor necesario para mostrar notificaciones Toast
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos predeterminados para las notificaciones Toast

// Definición del componente de página
export default function Page() {
  return (
    <div>
      {/* Renderiza el encabezado de la página con un título específico */}
      <Header>
        {/* Título de la página, centrado y estilizado */}
        <h2 className="flex justify-center text-3xl mt-16 text-white font-sans">
          Módulo para eliminar película
        </h2>
      </Header>
    
      {/* ToastContainer es necesario para mostrar las notificaciones Toast en la aplicación */}
      <ToastContainer />
      
      {/* Renderiza el componente BtnSelect para manejar la eliminación de películas */}
      <BtnSelect />
    </div>
  );
}
