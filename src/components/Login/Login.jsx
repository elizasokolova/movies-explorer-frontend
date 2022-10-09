import React from 'react';
import { Link } from 'react-router-dom';
import logotype from '../../images/Logotype.svg';
import mainApi from "../../utils/MainApi.js";

function Login() {

    return (
        <section className='login'>
            <Link className='login__logo-link' to='/'>
                <img className='header__logo header__logo_register' src={logotype} alt='Логотип'/>
            </Link>
            <h1 className='login__title'>Рады видеть!</h1>
            <form className='login__form'>
                <p className="login__field">E-mail</p>
                <input name='email' id='email' type='email' className='login__input login__input_type_email' required/>
                <p className="login__field">Пароль</p>
                <input name='password' id='password' type='password' className='login__input login__input_type_password' required minLength='4' maxLength='16'/>
                <button name='login' type='submit' className='login__button'>Войти</button>
            </form>
            <Link to='/signup' className='login__link'>Ещё не зарегистрированы? <span className='login__link-blue'>Регистрация</span></Link>
        </section>
    )
}
export default Login;
