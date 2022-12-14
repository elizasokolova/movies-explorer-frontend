import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react'

function SearchForm ({ handleFound, startValue, defaultCheck, changeCheck, disabledCheck }) {
    const [name, setName] = useState({});
    const [message, setMessage] = useState({});
    const [isCheck, setIsCheck] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setName({...name, [name] : value});
        setMessage({...message, [name]: event.target.validationMessage});
        setIsCheck(event.target.closest("form").checkValidity());
    }

    function handleCheck(event) {
        changeCheck(event.target.checked);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (isCheck) {
            handleFound(name.search);
        } else {
            console.log(message);
        }
    }

    useEffect(() => {
        setMessage({ search: "Фильм" })
    }, []);

    return (
    <div className='search-form' >
        <form className='search-form__form' onSubmit={handleSubmit} noValidate>
            <input className='search-form__input' name="search" type="text" placeholder={isCheck ? `Фильм` : message.search} defaultValue={startValue} onChange={handleChange} required />
            <button type="submit" className='search-form__button'>Поиск</button>
        </form>

        <div className='filterCheckbox'>
            <div className='filterCheckbox__container'>
                <input
                    className='filterCheckbox__input'
                    type='checkbox'
                    id='miniFilm'
                    defaultChecked={defaultCheck}
                    onChange={handleCheck}
                    disabled={disabledCheck}
                />
                <label htmlFor='miniFilm' className='filterCheckbox__label'>Короткометражки</label>
            </div>
        </div>
    </div>
    )
}
export default SearchForm;
