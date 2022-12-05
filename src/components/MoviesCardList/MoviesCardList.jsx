import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';

function MoviesCardList ({
    movies,
    handleFilmClick,
    filmsQuantity,
    storedFilm
}) {
    return (
        <section className="cards">
            <ul className="cards__movies">
                {movies.map((movie) => (
                    <MoviesCard
                        movie={movie}
                        key={movie.id ? movie.id : movie.movieId}
                        handleFilmClick={handleFilmClick}
                        storedFilm={storedFilm}
                    />
                )).slice(0, filmsQuantity)}
            </ul>
        </section>
    )
}
export default MoviesCardList;
