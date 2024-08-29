"use client"; // Agrega esta línea al inicio del archivo
import { Movie } from "@/types/movie";
import { useEffect, useState } from "react";

export default function MovieCard() {
  // Cambia el estado para manejar un arreglo de películas
   // aqui puede entrar en el hook useState un arreglo de tipo Movie[] o simplemente un null. esto debido aque la api puede demorar en entregar los datos
  const [movies, setMovies] = useState<Movie[]>([]);



  // no se define en el fetch el GET ya que por defecto viene puesto una solicitud GET. Si fuera un POST tocaba anadirle el metodo y el body de la peticion
  useEffect(() => {
    fetch("http://localhost:8080/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data)) // Guarda el arreglo de películas en el estado
      .catch((error) => console.error('Error fetching movies:', error));
  });/*se le agrega estas llaves[] para que solo se cargue el use efect cuando la pagina se abra por primera vez, si no, el useState se actualiza cada que hay un cambio*/ 

  return (
    <div className="bg-gray-900 h-auto mt-20">
      
      <div className="w-screen h-auto flex flex-wrap justify-center gap-4 ">
        {/* Mapea las películas y crea un card para cada una */}
        {/* recuerda que el objeto movie es de Tipo Movie por lo que el idmovies hace referencia a la interfaz llamada movies.ts */}
        {movies.map((movie) => (
          <div key={movie.idmovies} className="max-w-sm rounded-2xl overflow-hidden shadow-lg m-10 " >
            <img className="w-full h-60" src={movie.imageUrl} alt={"imagen no disponible"} />
            
            <div className="px-6 py-4 bg-white ">
              <div className="font-bold text-xl mb-2 ">{movie.title}</div>
              <p className="text-base">{movie.description}</p>
             
            </div>
            <div className="px-6 pt-1 pb-2 bg-white   h-full">
              
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {movie.year}
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                votes: {movie.votes}
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                rating: {movie.rating}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
