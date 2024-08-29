"use client"; // Indica que este componente se debe renderizar en el cliente (en lugar del servidor) en Next.js.

import React, { useEffect, useState } from "react"; // Importa React y hooks necesarios de React.
import { Movie } from "@/types/movie"; // Importa el tipo interfaz Movie para usarlo en el estado.
import { Bounce, toast } from "react-toastify";

export default function BtnSelect() {
  const [movies, setMovies] = useState<Movie[]>([]);
  // Define el estado `movies` para almacenar el arreglo de películas.
  // `setMovies` es la función que actualizará este estado.

  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  // Define el estado `selectedMovieId` para almacenar el ID de la película seleccionada.
  // `setSelectedMovieId` es la función que actualizará este estado.

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  // Define el estado `selectedMovie` para almacenar el objeto de la película seleccionada.
  // `setSelectedMovie` es la función que actualizará este estado.

  useEffect(() => {
    // El hook useEffect se ejecuta después de que el componente se monta (similar a componentDidMount en clases).

    fetch("http://localhost:8080/movies") // Realiza una solicitud HTTP GET a la API para obtener la lista de películas.
      .then((response) => response.json()) // Convierte la respuesta en formato JSON.
      .then((data) => setMovies(data)) // Actualiza el estado `movies` con los datos obtenidos.
      .catch((error) => console.error("Error fetching movies:", error));
    // Captura y maneja cualquier error durante la solicitud o la conversión de la respuesta.
  }, []); // El array vacío como dependencia significa que este efecto se ejecutará solo una vez, al montar el componente.

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value); // Obtiene el ID de la película seleccionada como número.
    setSelectedMovieId(selectedId); // Actualiza el estado `selectedMovieId` con el ID seleccionado.
    const movie = movies.find((movie) => movie.idmovies === selectedId) || null; // Busca la película en el arreglo `movies` con el ID seleccionado.
    setSelectedMovie(movie); // Actualiza el estado `selectedMovie` con el objeto de la película seleccionada.
  };

  const handleDelete = () => {
    if (selectedMovieId === null) return;
    // Si no hay ninguna película seleccionada, no hace nada.

    fetch(`http://localhost:8080/movies/${selectedMovieId}`, {
      method: "DELETE", // Especifica que la solicitud HTTP es del tipo DELETE.
    })
      .then((response) => {
        // response ya viene en el protocolo http y es el que trae el estado de la solicitud.
        // Un fetch siempre debe tener uno o más `.then`.
        if (response.ok) {
          //libreria toastify para la alerta de exito al crear

          toast.success("🎬 Pelicula eliminada exitosamente 🍿", {
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

          // Si la respuesta es exitosa (código de estado http entre 200-299):
          setMovies(
            (
              prevMovies // setMovies es el modificador del useState Movie[] el cual es el que trae el listado de películas de la base de datos.
            ) =>
              prevMovies.filter(
                (
                  movie // prevMovies es una variable que puede tomar cualquier nombre. Esta variable filtra el array y solo deja los elementos que tengan un id diferente al de la película previamente eliminada.
                ) => movie.idmovies !== selectedMovieId
              )
          ); // Filtra el array de películas para eliminar la película con el ID seleccionado.
          setSelectedMovieId(null); // Resetea el ID de la película seleccionada.
        } else {
          console.error("Error deleting movie:", response.statusText);
          // Imprime un mensaje de error en la consola si la respuesta no es exitosa.


          toast.error('⚠️ Ups. ocurrio un error. Intentelo nuevamente ⚠️', {
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
      })
      .catch((error) => console.error("Error deleting movie:", error));
    // Captura y maneja cualquier error durante la solicitud DELETE.
  };

  return (
    <div className="w-full items-center">
      <form className="w-[50vw] mx-auto  text-center " >
        {/* Contenedor para el formulario con clases de Tailwind CSS para estilo */}

       
        {/* Etiqueta para el selector */}

        <select
          id="movieSelect"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleChange}
          // Evento que actualiza el estado `selectedMovie` con la película seleccionada del dropdown.
        >
          <option value="">Seleccione una pelicula</option>
          {/* Opción por defecto para indicar que el usuario debe seleccionar una opción */}

          {movies.map((movie) => (
            <option key={movie.idmovies} value={movie.idmovies}>
              {movie.title}
            </option>
            // Mapea el arreglo de películas para crear una opción en el dropdown por cada película.
          ))}
        </select>

        <div className="mt-5  w-[50vw] h-[50vh]">
          {selectedMovie && (
            <div className="mt-4 w-[50vw] h-[50vh] ">
              <img
                src={selectedMovie.imageUrl}
                alt={selectedMovie.title}
                className=""
                style={{
                  width: "100%",
                  height: "100%",
              
                }}
              />
              {/* Renderiza la imagen de la película seleccionada si `selectedMovie` no es null */}
            </div>
          )}

        
        </div>

        <button
          type="button"
          className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleDelete}
        >
          Eliminar Película
        </button>
        {/* Botón que llama a `handleDelete` al hacer clic */}
      </form>
    </div>
  );
}
