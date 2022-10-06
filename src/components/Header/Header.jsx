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
        <div className={`header__container ${minimal ? 'header__container_small' : ''}`}>
            <Link to='/'>
                <img className='header__logotype' alt='Логотип' src={logotype}/>
            </Link>
            <nav className={`header__menu ${loggedIn ? 'header__menu_visible' : ''}`}>
                <ul className='header__list'>
                    <li className='header__list-item'>
                        <NavLink to='/movies' className='header__list-link header__list-link-black'>Фильмы</NavLink>
                    </li>
                    <li className='header__list-item'>
                        <NavLink to='/saved-movies' className='header__list-link'>Сохранённые фильмы</NavLink>
                    </li>
                    <li className={`header__account ${loggedIn ? 'header__account_visible' : ''}`}>
                        <NavLink to='/profile' className='header__list-link header__profile header__image'>Аккаунт</NavLink>
                    </li>
                </ul>
            </nav>

            <button className={`header__burger ${loggedIn ? 'header__burger_visible' : ''}`} onClick={openBurger}>
                <span className='header__burger-span'/>
            </button>
            <div className={`header__buttons ${loggedIn || minimal? 'header__buttons_hidden' : ''}`}>
                <Link to='/signup'>
                    <button className='header__registration'>Регистрация</button>
                </Link>
                <Link to='/signin'>
                    <button className='header__login'>Войти</button>
                </Link>
            </div>
        </div>
        <Navigation isNavOpen={isNavOpen} closeBurger={closeBurger}/>
    </header>
    )
}
export default Header;
