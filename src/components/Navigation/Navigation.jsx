import React from 'react';
import {Link, NavLink } from 'react-router-dom';

function Navigation({ isNavOpen, closeBurger }) {
  return (
      <div className={`navigation ${isNavOpen ? 'navigation_opened' : ''}`}>
        <nav className='navigation__container'>
          <button className='navigation__close' type='button' onClick={() => closeBurger()}/>
          <ul className='navigation__list'>
            <li className='navigation__list-item'>
              <Link to='/' className='navigation__list-link'>Главная</Link>
            </li>
            <li className='navigation__list-item'>
              <NavLink to='/movies' activeClassName='navigation__list-item_active' className='navigation__list-link'>Фильмы</NavLink>
            </li>
            <li className='navigation__list-item'>
              <NavLink to='/saved-movies' activeClassName='navigation__list-item_active' className='navigation__list-link'>Сохранённые фильмы</NavLink>
            </li>
            <li className='navigation__list-item header__acc header__acc_visible'>
              <NavLink to='/profile' className='header__link header__profile header__pic'>Аккаунт</NavLink>
            </li>
          </ul>
        </nav>
      </div>
  );
}
export default Navigation;
