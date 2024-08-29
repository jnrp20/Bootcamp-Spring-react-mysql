"use client";

import Header from "@/components/header";
import Label from "@/components/label";
import { Movie } from "@/types/movie";
import Image from "next/image";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify"; // Importa ToastContainer y toast
import "react-toastify/dist/ReactToastify.css"; // Importa los estilos para Toast

export default function Page() {
  const [title, setTitle] = useState(""); // Estado para el título de la película
  const [year, setYear] = useState(""); // Estado para el año de la película (como string para manejar el input)
  const [description, setDescription] = useState(""); // Estado para la descripción
  const defaultImgUrl =
    "https://react.semantic-ui.com/images/wireframe/image.png";
  const [imageUrl, setImageUrl] = useState(defaultImgUrl); // Estado para la URL de la portada
  const [movies, setMovies] = useState<Movie[]>([]); // Estado para el arreglo de películas
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null); // Estado para el ID de la película seleccionada
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null); // Estado para el objeto de la película seleccionada

  // Hook para obtener la lista de películas al montar el componente
  useEffect(() => {
    fetch("http://localhost:8080/movies") // Realiza una solicitud HTTP GET para obtener la lista de películas
      .then((response) => response.json()) // Convierte la respuesta en formato JSON
      .then((data) => setMovies(data)) // Actualiza el estado `movies` con los datos obtenidos
      .catch((error) => console.error("Error fetching movies:", error)); // Maneja cualquier error durante la solicitud
  }); //le quite los [] para que el listado se actualice cada que hay un cambio y no cada que se reinicie lapagina

  // Maneja el cambio en el select de películas
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value); // Obtiene el ID de la película seleccionada como número
    setSelectedMovieId(selectedId); // Actualiza el estado `selectedMovieId` con el ID seleccionado
    const movie = movies.find((movie) => movie.idmovies === selectedId) || null; // Busca la película en el arreglo `movies` con el ID seleccionado
    setSelectedMovie(movie); // Actualiza el estado `selectedMovie` con el objeto de la película seleccionada

    if (movie) {
      setTitle(movie.title); // Actualiza el estado `title` con el título de la película seleccionada
      setYear(movie.year.toString()); // Convierte el año a string antes de asignarlo al estado `year`
      setDescription(movie.description); // Actualiza el estado `description` con la descripción de la película seleccionada
      setImageUrl(movie.imageUrl); // Actualiza el estado `imageUrl` con la URL de la portada de la película seleccionada
    } else {
      setImageUrl(defaultImgUrl); // Si no hay película seleccionada, usa la imagen predeterminada
    }
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    if (!selectedMovie) {
      toast.error("⚠️ No se ha seleccionado ninguna película.", {
        // Muestra un mensaje de error si no se ha seleccionado una película
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
      return;
    }

    if (description.length > 500) {
      toast.error("La descripcion no debe superar los 255 caracteres", {
        // Muestra un mensaje de error si la descripcion es muy larga
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
      return;
    }

    const updatedMovie = {
      idmovies: selectedMovie.idmovies, // ID de la película
      title: title || selectedMovie.title, // Título actualizado o el actual si no se ha modificado
      year: Number(year) || selectedMovie.year, // Año convertido a número o el actual si no se ha modificado
      description: description || selectedMovie.description, // Descripción actualizada o la actual si no se ha modificado
      imageUrl: imageUrl || selectedMovie.imageUrl, // URL de la portada actualizada o la actual si no se ha modificado
      votes: selectedMovie.votes || 0, // Valores por defecto si no se han proporcionado
      rating: selectedMovie.rating || 0,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/movies/${selectedMovie.idmovies}`,
        {
          method: "PUT", // Método de la solicitud para actualizar el recurso
          headers: {
            "Content-Type": "application/json", // Tipo de contenido JSON
          },
          body: JSON.stringify(updatedMovie), // Cuerpo de la solicitud con los datos de la película actualizada
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar la película"); // Lanza un error si la respuesta no es exitosa
      }

      toast.success("🎉 Película actualizada con éxito.", {
        // Muestra un mensaje de éxito si la actualización es exitosa
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

      // Limpia los campos del formulario y restablece el estado
      setTitle("");
      setYear("");
      setDescription("");
      setImageUrl(defaultImgUrl); // Restablece la URL de la imagen a la predeterminada
      setSelectedMovie(null);
    } catch (error) {
      toast.error(`⚠️ Error al actualizar`, {
        // Muestra un mensaje de error si ocurre un problema durante la actualización
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
  };

  return (
    <div>
      <Header />
      <h1 className="text-center text-white text-3xl">MÓDULO ACTUALIZAR</h1>
      <div className="w-[100vw] h-auto mt-14 flex justify-center">
        <div className="w-[50vw] h-[70vh] relative">
          <img
            src={imageUrl}
            alt={selectedMovie ? selectedMovie.title : "Imagen de portada"}
            style={{
              width: "100%",
              height: "100%",
          
            }}
          />
        </div>

        <form
          className="bg-white w-[30vw] p-6 h-[70vh] rounded-lg shadow-lg ml-10"
          onSubmit={handleSubmit} // Asocia la función de envío con el formulario
        >
          <label className="text-xl w-[100vw] text-center">
            Elija una opción
          </label>
          <select
            id="movieSelect"
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white mb-5"
            onChange={handleSelectChange} // Maneja el cambio en el select
          >
            <option value="">Seleccione una pelicula</option>
            {movies.map((movie) => (
              <option key={movie.idmovies} value={movie.idmovies}>
                {movie.title}
              </option>
            ))}
          </select>
          <hr />
          <br />

          <div className="flex flex-col space-y-3">
            <Label>Título</Label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)} // Maneja el cambio en el campo de texto del título
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <Label>Año</Label>
            <input
              id="year"
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)} // Maneja el cambio en el campo de texto del año
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <Label>Descripción</Label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)} // Maneja el cambio en el campo de texto de la descripción
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={4}
            />
            <Label>Url de la imagen</Label>
            <input
              id="imageUrl"
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)} // Maneja el cambio en el campo de texto del año
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="w-full px-3 py-2 bg-blue-500 text-white rounded-md"
            >
              Actualizar Película
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />{" "}
      {/* Agrega el ToastContainer para mostrar notificaciones */}
    </div>
  );
}
