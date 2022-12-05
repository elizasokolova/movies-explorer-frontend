import React from 'react';
import { useEffect } from 'react';
import useFormAndValidation from "../../utils/useFormAndValidation";

function SearchForm ({
     handleSearch,
     initialValue,
     initialChecked,
     onCheckChange,
     disabledCheck,
}) {
    const { values, handleChange, isValid, errors, setErrors } = useFormAndValidation();

    function handleCheck(e) {
        onCheckChange(e.target.checked);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (isValid) {
            handleSearch(values.search);
        } else {
            console.log(errors);
        }
    }

    useEffect(() => {
        setErrors({ search: "Фильм" })
    }, []);

    return (
    <div className='search-form' >
        <form className='search-form__form' onSubmit={handleSubmit} noValidate>
            <input className='search-form__input' name="search" type="text" placeholder={isValid ? `Фильм` : errors.search} defaultValue={initialValue} onChange={handleChange} required />
            <button type="submit" className='search-form__button'>Поиск</button>
        </form>

        <div className='filterCheckbox'>
            <div className='filterCheckbox__container'>
                <input
                    className='filterCheckbox__input'
                    type='checkbox'
                    id='miniFilm'
                    defaultChecked={initialChecked}
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
