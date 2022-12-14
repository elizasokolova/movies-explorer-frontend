import React from 'react';
import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import useFilterFilms from '../../utils/useFilterFilms';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function SavedMovies({films, handleFilmClick, authorized}) {
    const [filmControl, setFilmControl] = useState(JSON.parse(localStorage.getItem('check-savedFilms')) ?? false);
    const [localFilm, setLocalFilm] = useState( '');
    const filteredFilms = useFilterFilms(films, filmControl, localFilm);
    const [localSavedFilms, setLocalSavedFilms] = useState(JSON.parse(localStorage.getItem('filtered-savedFilms')) ?? filteredFilms);
    const [message, setMessage] = useState('У вас нет сохраненных фильмов');

    function changeCheck(checked) {
        localStorage.setItem('check-savedFilms', checked);
        setFilmControl(checked);
    }

    function onValueChange(value) {
        setLocalFilm(value);
    }

    useEffect(() => {
        if (films.length && !filteredFilms.length) {
            setMessage('Ничего не найдено');
        }
    }, [films.length, filteredFilms.length]);

    useEffect(() => {
        if (localSavedFilms !== filteredFilms) {
            localStorage.setItem('filtered-savedFilms', JSON.stringify(filteredFilms));
            setLocalSavedFilms(filteredFilms);
        }
    }, [filteredFilms, localSavedFilms]);

  return (
      <>
        <Header authorized={authorized}/>
        <SearchForm
            handleFound={onValueChange}
            startValue={localFilm}
            defaultCheck={filmControl}
            changeCheck={changeCheck}
        />
        <MoviesCardList
            films={localSavedFilms}
            handleFilmClick={handleFilmClick}
        />
        <div className="cards__more">
            {filteredFilms.length === 0 ? <p className="cards__text">{message}</p> : null}
        </div>
        <Footer />
      </>
  );
}
export default SavedMovies;
