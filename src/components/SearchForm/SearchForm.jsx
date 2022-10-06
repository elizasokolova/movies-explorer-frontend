import React from 'react';
import FilterCheckbox from '../FilterCheckBox/FilterCheckBox';

function SearchForm() {
    return (
    <div className='search-form' >
        <form className='search-form__form'>
            <input className='search-form__input' placeholder='Фильм' required />
            <button className='search-form__button'>Поиск</button>
        </form>
        <FilterCheckbox />
    </div>
    )
}
export default SearchForm;
