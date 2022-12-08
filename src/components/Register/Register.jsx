import React from 'react';
import { useContext, useMemo, useState } from "react";
import { Link } from 'react-router-dom';
import logotype from '../../images/Logotype.svg';
import Input from "../Input/Input.jsx";
import InfoTooltip from "../InfoToolTip/InfoTooltip.jsx";
import { InfoContext } from '../../contexts/InfoContext';
import { ValidationContext } from "../../contexts/ValidationContext";
import { checkValidation } from "../../utils/checkValidation.js";
import { errorMessages } from "../../utils/config.js";

function Register ({ onRegister }) {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const { name, email, password } = form;
    const store = useContext(ValidationContext);
    const { validationState, setValidationState } = store;
    const [ blockBtn, setBlockBtn] = useState(false);
    const [requestMessage, setRequestMessage] = useState("");
    const { tooltip, setTooltip } = useContext(InfoContext);

    function handleSubmit (event) {
        event.preventDefault();
        setBlockBtn(true);
        onRegister(name, email, password)
            .then(() => setTooltip({
                ...tooltip,
                isOpen: true,
                message: "Вы успешно зарегистрировались",
                success: true,
            }))
            .catch(({ status, message }) => {
                setRequestMessage(errorMessages[status]);
                setBlockBtn(false);
                setTooltip({
                    ...tooltip,
                    isOpen: true,
                    message: "При регистрации произошла ошибка",
                    success: false,
                });
            })
    }

    function handleChange(event) {
        setRequestMessage("");
        const { state } = checkValidation(event, "register");
        setValidationState(state(validationState));
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const inputError = useMemo(() =>
        Object.values(validationState.register.errors).some((error) => error), [validationState.register.errors]
    );

    const blockButton = inputError || blockBtn || Object.values(form).some((input) => input === "");

    return (
        <section className='login'>
            <Link className='login__logo-link' to='/'>
                <img className='header__logo header__logo_register' src={logotype} alt='Логотип'/>
            </Link>
            <h1 className='login__title'>Добро пожаловать!</h1>
            <form className='login__form' onSubmit={handleSubmit}>
                <Input titleClass="input__title" errorClass="input__error" inputClass="input" labelClass="input__field" name="name" type="text" title="Имя" value={name} onChange={handleChange} error={validationState.register.errors.name} disabled={blockBtn} required/>
                <Input titleClass="input__title" errorClass="input__error" inputClass="input" labelClass="input__field" name="email" type="email" title="E-mail" value={email} onChange={handleChange} error={validationState.register.errors.email} disabled={blockBtn} required/>
                <Input titleClass="input__title" errorClass="input__error" inputClass="input" labelClass="input__field" name="password" type="password" title="Пароль" value={password} onChange={handleChange} error={validationState.register.errors.password} disabled={blockBtn} required/>
                <p className="login__message">{requestMessage}</p>
                <button type="submit" className={`login__button login__button-reg ${blockButton && "login__button_block"}`} disabled={blockButton}>Зарегистрироваться</button>
            </form>
            <Link to='/signin' className='login__link'>Уже зарегистрированы? <span className='login__link-blue'>Войти</span></Link>
            <InfoTooltip />
        </section>
    )
}
export default Register;
