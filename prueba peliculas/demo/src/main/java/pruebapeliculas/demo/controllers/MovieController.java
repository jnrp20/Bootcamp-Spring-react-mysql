package pruebapeliculas.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import pruebapeliculas.demo.models.Movie;
import pruebapeliculas.demo.repository.MovieRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/movies")
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    // Crear una nueva película
    @PostMapping
    @CrossOrigin(origins = "http://localhost:3000") // permite el acceso del front hacia este endpoint
    public ResponseEntity<Movie> createMovie(@RequestBody Movie movie) {
        Movie savedMovie = movieRepository.save(movie);
        System.out.println("entre");
        return new ResponseEntity<>(savedMovie, HttpStatus.CREATED);
    }

    // Crear múltiples películas (para un arreglo de objetos)
    @PostMapping("/bulk")
    @CrossOrigin(origins = "http://localhost:3000") // permite el acceso del front hacia este endpoint
    public ResponseEntity<List<Movie>> createMovies(@RequestBody List<Movie> movies) {
        List<Movie> savedMovies = movieRepository.saveAll(movies);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMovies);
    }


    // Obtener todas las películas
    @GetMapping
    @CrossOrigin(origins = "http://localhost:3000") // permite el acceso del front hacia este endpoint
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    // Obtener una película por ID
    @GetMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000") // permite el acceso del front hacia este endpoint
    public ResponseEntity<Movie> getMovieById(@PathVariable("id") Long id) {
        Optional<Movie> movie = movieRepository.findById(id);
        return movie.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Actualizar una película
    @PutMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000") // permite el acceso del front hacia este endpoint
    public ResponseEntity<Movie> updateMovie(@PathVariable("id") Long id, @RequestBody Movie movie) {
        if (!movieRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        movie.setIdmovies(id);
        Movie updatedMovie = movieRepository.save(movie);
        return ResponseEntity.ok(updatedMovie);
    }

    // Eliminar una película
    @DeleteMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000") // permite el acceso del front hacia este endpoint
    public ResponseEntity<Void> deleteMovie(@PathVariable("id") Long id) {
        if (!movieRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        movieRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}