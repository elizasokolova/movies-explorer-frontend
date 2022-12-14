import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';

function MoviesCardList ({ films, handleFilmClick, filmsQuantity, storedFilm }) {
    return (
        <section className="cards">
            <ul className="cards__movies">
                {films.map((film) => (
                    <MoviesCard
                        film={film}
                        key={film.id ? film.id : film.movieId}
                        handleFilmClick={handleFilmClick}
                        storedFilm={storedFilm}
                    />
                )).slice(0, filmsQuantity)}
            </ul>
        </section>
    )
}
export default MoviesCardList;
