import React from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logotype from '../../images/Logotype.svg';
import Navigation from '../Navigation/Navigation.jsx';

function Header({ loggedIn, minimal }) {
    const [isNavOpen, setIsNavOpen] = useState(false)

    function openBurger() {
        setIsNavOpen(true);
        updateBodyStyles();
    }

    function closeBurger() {
        setIsNavOpen(false);
        updateBodyStyles();
    }

    function updateBodyStyles() {
        if (isNavOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
    }
    return (
    <header className={`header ${loggedIn || minimal? 'header_theme_white' : ''}`}>
        <div className={`header__container ${minimal ? 'header__mini' : ''}`}>
            <Link to='/'>
                <img className='header__logo' alt='Логотип' src={logotype}/>
            </Link>
            <nav className={`header__nav ${loggedIn ? 'header__nav_visible' : ''}`}>
                <ul className='header__list'>
                    <li className='header__item'>
                        <NavLink to='/movies' activeClassName='header__link-black' className='header__link'>Фильмы</NavLink>
                    </li>
                    <li className='header__item'>
                        <NavLink to='/saved-movies' activeClassName='header__link-black' className='header__link'>Сохранённые фильмы</NavLink>
                    </li>
                    <li className={`header__acc ${loggedIn ? 'header__acc_visible' : ''}`}>
                        <NavLink to='/profile' className='header__link header__profile header__pic'>Аккаунт</NavLink>
                    </li>
                </ul>
            </nav>

            <button className={`header__menu ${loggedIn ? 'header__menu_visible' : ''}`} onClick={openBurger}>
                <span className='header__span'/>
            </button>
            <div className={`header__but ${loggedIn || minimal? 'header__but_hidden' : ''}`}>
                <Link to='/signup'>
                    <button className='header__register'>Регистрация</button>
                </Link>
                <Link to='/signin'>
                    <button className='header__log'>Войти</button>
                </Link>
            </div>
        </div>
        <Navigation isNavOpen={isNavOpen} closeBurger={closeBurger}/>
    </header>
    )
}
export default Header;
