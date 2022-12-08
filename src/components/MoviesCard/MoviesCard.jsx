import React from 'react';
import {useLocation} from 'react-router-dom';
import { useState } from 'react';
import likeSvg from '../../images/like.svg';
import deleteSvg from '../../images/delete.svg';
import dislikeSvg from '../../images/dislike.svg';

function getFormattedDuration (duration) {
    let formattedDuration = `${duration % 60} м.`;
    if (duration >= 60) {
        formattedDuration = `${Math.trunc(duration / 60)} ч.` + formattedDuration;
    }
    return formattedDuration;
}

function MoviesCard({ film, handleFilmClick, storedFilm,}) {
    const location = useLocation();
    const [isFilmLiked, setIsFilmLiked] = useState(false);
    const isSaved = location.pathname === '/saved-movies';
    return (
    <li className='movies-card'>
        <a className="movies__trailer-link" href={film.trailerLink} target="_blank" rel="noreferrer">
            <img className='movies-card__image' src={isSaved ? film.image : `https://api.nomoreparties.co${film.image.url}`} alt={film.nameRU} />
        </a>
        <div className="movies-card__info">
            <div className="movies-card__description">
                <h2 className="movies-card__title">{film.nameRU}</h2>
                <button
                    className={`card-btn ${isSaved ? 'movies-card__delete' : 'movies-card__like'}`}
                    onClick={() => {handleFilmClick(film);
                        setIsFilmLiked(!isFilmLiked);}}
                >
                    <img src={isSaved ? deleteSvg : storedFilm.some((m) => m.movieId === film.id) ? likeSvg : dislikeSvg
                    } alt={isSaved ? 'удалить' : 'лайк'}/>
                </button>

            </div>
            <p className="movies-card__time">{getFormattedDuration(film.duration)}</p>
        </div>
    </li>
    )
}
export default MoviesCard;
