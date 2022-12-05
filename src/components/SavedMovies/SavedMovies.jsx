import React from 'react';
import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import useFilteredMovies from '../../utils/getFilteredMovies';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function SavedMovies({films, handleFilmClick, loggedIn}) {
    const [localCheck, setLocalCheck] = useState(JSON.parse(localStorage.getItem('saved-check')) ?? false);
    const [localValue, setLocalValue] = useState(localStorage.getItem('saved-movies-search-value') ?? '');
    const [pretext, setPretext] = useState('У вас нет сохраненных фильмов');

    const filteredMovies = useFilteredMovies(films, localCheck, localValue);
    const [localSavedMovies, setLocalSavedMovies] = useState(JSON.parse(localStorage.getItem('filtered-saved-movies')) ?? filteredMovies);

    function onCheckChange(checked) {
        localStorage.setItem('saved-movies-check', checked);
        setLocalCheck(checked);
    }

    function onValueChange(value) {
        localStorage.setItem('saved-movies-search-value', value);
        setLocalValue(value);
    }

    useEffect(() => {
        if (films.length && !filteredMovies.length) {
            setPretext('Ничего не найдено');
        }
    }, [films.length, filteredMovies.length]);

    useEffect(() => {
        if (localSavedMovies !== filteredMovies) {
            localStorage.setItem('filtered-saved-movies', JSON.stringify(filteredMovies));
            setLocalSavedMovies(filteredMovies);
        }
    }, [filteredMovies, localSavedMovies]);

  return (
      <>
        <Header loggedIn={loggedIn}/>
        <SearchForm
            handleSearch={onValueChange}
            initialValue={localValue}
            initialChecked={localCheck}
            onCheckChange={onCheckChange}
        />
        <MoviesCardList
            movies={localSavedMovies}
            handleFilmClick={handleFilmClick}
        />
        <div className="cards__more">
            {filteredMovies.length === 0 ? <p className="cards__text">{pretext}</p> : null}
        </div>
        <Footer />
      </>
  );
}

export default SavedMovies;
