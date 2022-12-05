import React from 'react';
import {useLocation} from 'react-router-dom';
import { useState } from 'react';
import likeActive from '../../images/like.svg';
import deleteIcon from '../../images/delete.svg';
import like from '../../images/dislike.svg';

function getFormattedDuration (duration) {
    let formattedDuration = `${duration % 60} м.`;
    if (duration >= 60) {
        formattedDuration = `${Math.trunc(duration / 60)} ч.` + formattedDuration;
    }
    return formattedDuration;
}

function MoviesCard({
    movie,
    handleFilmClick,
    storedFilm,
}) {
    const location = useLocation();
    const [isMovieLiked, setIsMovieLiked] = useState(false);
    const isMyCard = location.pathname === '/saved-movies';

    return (
    <li className='movies-card'>
        <a className="movies__trailer-link" href={movie.trailerLink} target="_blank" rel="noreferrer">
            <img className='movies-card__image' src={isMyCard ? movie.image : `https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU} />
        </a>
        <div className="movies-card__info">
            <div className="movies-card__description">
                <h2 className="movies-card__title">{movie.nameRU}</h2>

                <button
                    className={`card-btn ${isMyCard ? 'movies-card__delete' : 'movies-card__like'}`}
                    onClick={() => {
                        handleFilmClick(movie);
                        setIsMovieLiked(!isMovieLiked);}}
                >
                    <img src={
                        isMyCard ? deleteIcon :
                            storedFilm.some((m) => m.movieId === movie.id) ? likeActive : like
                    } alt={isMyCard ? 'крестик' : 'сердечко'}/>
                </button>

            </div>
            <p className="movies-card__time">{getFormattedDuration(movie.duration)}</p>
        </div>
    </li>
    )
}
export default MoviesCard;
