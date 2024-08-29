package pruebapeliculas.demo.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "moviesJueputa")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idmovies;

    private String title;
    private String description;
    private int year;
    private int votes;
    private double rating;
    private String imageUrl;

    // Constructores, getters y setters
    public Movie() {
    }

    public Movie(String title, String description, int year, int votes, double rating, String imageUrl) {
        this.title = title;
        this.description = description;
        this.year = year;
        this.votes = votes;
        this.rating = rating;
        this.imageUrl = imageUrl;
    }

    // Getters y Setters
    public Long getIdmovies() {
        return idmovies;
    }

    public void setIdmovies(Long idmovies) {
        this.idmovies = idmovies;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getVotes() {
        return votes;
    }

    public void setVotes(int votes) {
        this.votes = votes;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
