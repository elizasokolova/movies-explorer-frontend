import React from 'react';
import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from "../Preloader/PreLoader";
import useFilterFilms from '../../utils/useFilterFilms';
import moviesApi from "../../utils/MoviesApi";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Movies({ handleFilmClick, filmsQuantity, getMoreFilms, storedFilm, loggedIn, authorized }) {
    const [isLoading, setIsLoading] = useState(false);
    const [films, setFilms] = useState(JSON.parse(localStorage.getItem('films')) ?? []);
    const [filmControl, setFilmControl] = useState(JSON.parse(localStorage.getItem('check-films')) ?? false);
    const [localFilm, setLocalFilm] = useState(localStorage.getItem('films-find') ?? '');
    const filteredFilms = useFilterFilms(films, filmControl, localFilm);
    const [localFilms, setLocalFilms] = useState(JSON.parse(localStorage.getItem('filtered-films')) ?? filteredFilms);
    const [message, setMessage] = useState('Введите название фильма');

    function getFilmsList() {
        setIsLoading(true);
        moviesApi.getFilms()
            .then(film => {
                if (film.length) {
                    localStorage.setItem('films', JSON.stringify(film));
                    setFilms(film);
                }
            })
            .catch(() => setMessage('Во время запроса произошла ошибка'))
            .finally(() => setIsLoading(false))
    }

    function changeCheck(checked) {
        localStorage.setItem('check-films', checked);
        setFilmControl(checked);
    }

    function onValueChange(value) {
        if (films.length === 0) {
            getFilmsList();
        }
        localStorage.setItem('films-find', value);
        setLocalFilm(value);
    }

    useEffect(() => {
        if (films.length && !filteredFilms.length) {
            setMessage('Ничего не найдено');
        }
    }, [films.length, filteredFilms.length]);

    useEffect(() => {
        if (localFilms !== filteredFilms) {
            localStorage.setItem('filtered-films', JSON.stringify(filteredFilms));
            setLocalFilms(filteredFilms);
        }
    }, [filteredFilms, localFilms]);

    return (
    <>
        <Header authorized={authorized}/>
        <SearchForm
            handleFound={onValueChange}
            startValue={localFilm}
            defaultCheck={filmControl}
            changeCheck={changeCheck}
            disabledCheck={!localFilm}
        />

        {isLoading ? <Preloader /> :
            <MoviesCardList
                films={localFilms}
                handleFilmClick={handleFilmClick}
                filmsQuantity={filmsQuantity}
                storedFilm={storedFilm}
                filteredFilms={filteredFilms}
                getMoreFilms={getMoreFilms}
            />
        }
        <div className="cards__more">
            {
                filteredFilms.length === 0 ?
                    <p className='cards__text'>{message}</p> : filteredFilms.length > filmsQuantity &&
                    <button type="button" className="cards__button" onClick={getMoreFilms}>Ещё</button>
            }
        </div>
        <Footer />
    </>
)}

export default Movies;
