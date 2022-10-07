import React from 'react';
import { Route } from 'react-router-dom';
import { useState } from 'react';

function MoviesCard({preview, title, time}) {
    const [likeButton, setLikeButtonActive] = useState(false);

    function handleChangeButton() {
        setLikeButtonActive(!likeButton);
    }

    return (
    <li className='movies-card'>
        <img className='movies-card__image' src={preview} alt='Превью' />
        <div className="movies-card__info">
            <div className="movies-card__description">
                <h2 className="movies-card__title">{title}</h2>
                <Route path='/movies'>
                    <button className={`${likeButton ? 'movies-card__like' : 'movies-card__dislike'}`} onClick={handleChangeButton}/>
                </Route>
                <Route path='/saved-movies'>
                    <button className='movies-card__delete' onClick={handleChangeButton}/>
                 </Route>
            </div>
            <p className="movies-card__time">{time}</p>
        </div>
    </li>
    )
}
export default MoviesCard;
