import React from 'react';
import { Link } from 'react-router-dom';
import logotype from '../../images/Logotype.svg';

function Register() {
    return (
        <section className='login'>
            <Link className='login__logo-link' to='/'>
                <img className='header__logo header__logo_register' src={logotype} alt='Логотип'/>
            </Link>
            <h1 className='login__title'>Добро пожаловать!</h1>
            <form className='login__form'>
                <p className="login__field">Имя</p>
                <input name='name' id='name' type='name' className='login__input login__input_type_name' required/>
                <p className="login__field">E-mail</p>
                <input name='email' id='email' type='email' className='login__input login__input_type_email' required/>
                <p className="login__field">Пароль</p>
                <input name='password' id='password' type='password' className='login__input login__input_type_password' required minLength='4' maxLength='16'/>
                <button name='register' type='submit' className='login__button login__button-reg'>Зарегистрироваться</button>
            </form>
            <Link to='/signin' className='login__link'>Уже зарегистрированы? <span className='login__link-blue'>Войти</span></Link>
        </section>
    )
}

export default Register;
