import React from 'react';
import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from "../Preloader/PreLoader";
import useFilteredMovies from '../../utils/getFilteredMovies';
import moviesApi from "../../utils/MoviesApi";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Movies({
    handleFilmClick,
    filmsQuantity,
    getMoreFilms,
    storedFilm,
    loggedIn
}) {

    const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('movies')) ?? []);
    const [localCheck, setLocalCheck] = useState(JSON.parse(localStorage.getItem('movies-check')) ?? false);
    const [localValue, setLocalValue] = useState(localStorage.getItem('movies-search-value') ?? '');
    const [isLoading, setIsLoading] = useState(false);
    const [pretext, setPretext] = useState('Введите название фильма в поисковой строке');

    const filteredMovies = useFilteredMovies(movies, localCheck, localValue);
    const [localMovies, setLocalMovies] = useState(JSON.parse(localStorage.getItem('filtered-movies')) ?? filteredMovies);

    function getAllMovies() {
        setIsLoading(true);
        moviesApi.getFilms()
            .then(moviesList => {
                if (moviesList.length) {
                    localStorage.setItem('movies', JSON.stringify(moviesList));
                    setMovies(moviesList);
                }
            })
            .catch(() => setPretext('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'))
            .finally(() => setIsLoading(false))
    }

    function onCheckChange(checked) {
        localStorage.setItem('movies-check', checked);
        setLocalCheck(checked);
    }

    function onValueChange(value) {
        if (movies.length === 0) {
            getAllMovies();
        }
        localStorage.setItem('movies-search-value', value);
        setLocalValue(value);
    }

    useEffect(() => {
        if (movies.length && !filteredMovies.length) {
            setPretext('Ничего не найдено');
        }
    }, [movies.length, filteredMovies.length]);

    useEffect(() => {
        if (localMovies !== filteredMovies) {
            localStorage.setItem('filtered-movies', JSON.stringify(filteredMovies));
            setLocalMovies(filteredMovies);
        }
    }, [filteredMovies, localMovies]);

    return (
    <>
        <Header loggedIn={loggedIn}/>
        <SearchForm
            handleSearch={onValueChange}
            initialValue={localValue}
            initialChecked={localCheck}
            onCheckChange={onCheckChange}
            disabledCheck={!localValue}
        />

        {isLoading ? <Preloader /> :
            <MoviesCardList
                movies={localMovies}
                handleFilmClick={handleFilmClick}
                filmsQuantity={filmsQuantity}
                storedFilm={storedFilm}
                filteredMovies={filteredMovies}
                getMoreFilms={getMoreFilms}
            />
        }
        <div className="cards__more">
            {
                filteredMovies.length === 0 ?
                    <p className='cards__text'>{pretext}</p> :
                    filteredMovies.length > filmsQuantity &&
                    <button
                        type="button"
                        className="cards__button"
                        onClick={getMoreFilms}
                    >Ещё</button>
            }
        </div>
        <Footer />
    </>
)}

export default Movies;
