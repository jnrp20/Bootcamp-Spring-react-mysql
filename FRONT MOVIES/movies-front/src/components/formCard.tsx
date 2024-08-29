import React, { useState } from "react";
import { Bounce, toast } from "react-toastify";

interface Props {
  children?: React.ReactNode;
}

export default function FormCard() {
  // Estados para almacenar los valores de los inputs del formulario
  const [title, setTitle] = useState(""); // Estado para el título de la película
  const [year, setYear] = useState(""); // Estado para el año de la película
  const [description, setDescription] = useState(""); // Estado para la descripción
  const [imageUrl, setImageUrl] = useState(""); // Estado para la URL de la portada
  const votes = 0; // Valor predeterminado para los votos
  const rating = 0; // Valor predeterminado para la calificación

  // Función que se encarga de enviar los datos del formulario al backend
  const crearPelicula = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Previene la recarga automática de la página


     // Verificación de campos vacíos
     if (!title || !year || !description || !imageUrl) {
        toast.warn('Todos los campos deben ser completados.', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        return; // Detiene la ejecución de la función si hay campos vacíos
      }

    // Creación del objeto con los datos de la nueva película en formato JSON
    const newMovie = {
      title: title,
      description: description,
      year: year,
      votes: votes,
      rating: rating,
      imageUrl: imageUrl,
    };

    try {
      // Envío de los datos al servidor mediante una petición POST
      const response = await fetch("http://localhost:8080/movies", {
        method: "POST", // Método HTTP
        headers: { "Content-Type": "application/json" }, // Especifica que se envía JSON
        body: JSON.stringify(newMovie), // Convierte el objeto a JSON
      });

      // Manejo de la respuesta del servidor
      if (response.ok) {
        console.log("Película agregada con éxito");


        //libreria toastify para la alerta de exito al crear

        toast.success('🎬 Pelicula creada exitosamente🍿', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });

        // Reseteo de los campos del formulario después de enviar los datos
        setTitle("");
        setYear("");
        setDescription("");
        setImageUrl("");
      } else {
        console.error("Error al agregar la película");



        toast.error(' Ups. ocurrio un error. Intentelo nuevamente ', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });

      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div>
      <div className="w-[100vw] h-auto mt-14">
        {/* Formulario para ingresar los detalles de la nueva película */}
        <form
          className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
          onSubmit={crearPelicula} // Asocia la función de envío con el formulario
        >
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 mb-2">
              Título de la Película
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Título"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              onChange={(e) => setTitle(e.target.value)} // Actualiza el estado del título
              value={title} // Vincula el valor del estado al input
            />
          </div>
          <div className="mb-4">
            <label htmlFor="year" className="block text-gray-700 mb-2">
              Año
            </label>
            <input
              type="number"
              id="year"
              name="year"
              placeholder="Año"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              onChange={(e) => setYear(e.target.value)} // Actualiza el estado del año
              value={year} // Vincula el valor del estado al input
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Descripción"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              onChange={(e) => setDescription(e.target.value)} // Actualiza el estado de la descripción
              value={description} // Vincula el valor del estado al textarea
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-gray-700 mb-2">
              URL de la Portada
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              placeholder="URL de la Portada"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              onChange={(e) => setImageUrl(e.target.value)} // Actualiza el estado de la URL
              value={imageUrl} // Vincula el valor del estado al input
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Crear
          </button>
        </form>
      </div>
    </div>
  );
}
