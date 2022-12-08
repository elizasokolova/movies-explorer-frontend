import React from 'react';
import {Link, NavLink } from 'react-router-dom';

function Navigation({ isNavOpen, closeBurger }) {
  return (
      <div className={`navigation ${isNavOpen ? 'navigation_opened' : ''}`}>
        <nav className='navigation__container'>
          <button className='navigation__close' type='button' onClick={() => closeBurger()}/>
          <ul className='navigation__list'>
            <li className='navigation__child'>
              <Link to='/' className='navigation__link'>Главная</Link>
            </li>
            <li className='navigation__child'>
              <NavLink to='/movies' activeClassName='navigation__child_active' className='navigation__link'>Фильмы</NavLink>
            </li>
            <li className='navigation__child'>
              <NavLink to='/saved-movies' activeClassName='navigation__child_active' className='navigation__link'>Сохранённые фильмы</NavLink>
            </li>
            <li className='navigation__child header__acc header__acc_visible'>
              <NavLink to='/profile' className='header__link header__profile header__pic'>Аккаунт</NavLink>
            </li>
          </ul>
        </nav>
      </div>
  );
}
export default Navigation;
