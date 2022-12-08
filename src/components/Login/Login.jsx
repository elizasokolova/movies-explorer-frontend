import React from 'react';
import { useContext, useMemo, useState } from "react";
import { Link } from 'react-router-dom';
import logotype from '../../images/Logotype.svg';
import Input from "../Input/Input.jsx";
import InfoTooltip from "../InfoToolTip/InfoTooltip.jsx";
import { ValidationContext } from "../../contexts/ValidationContext";
import { InfoContext } from '../../contexts/InfoContext';
import { checkValidation } from "../../utils/checkValidation.js";
import { errorMessages } from "../../utils/config.js";

function Login ({onLogin}) {
    const store = useContext(ValidationContext);
    const { validationState, setValidationState } = store;
    const [form, setForm] = useState({ email: "", password: "" });
    const { email, password } = form;
    const [ blockBtn, setBlockBtn] = useState(false);
    const [requestMessage, setRequestMessage] = useState("");
    const { tooltip, setTooltip } = useContext(InfoContext);

    function handleChange(event) {
        setRequestMessage("");
        const { state } = checkValidation(event, "login");
        setValidationState(state(validationState));
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const inputError = useMemo(() =>
        Object.values(validationState.login.errors).some((error) => error), [validationState.login.errors]
    );

    const blockButton = inputError || blockBtn || Object.values(form).some((input) => input === "");

    function handleSubmit (event) {
        setBlockBtn(true);
        event.preventDefault();
        onLogin(email, password)
        .then(() => setTooltip({
            ...tooltip,
            isOpen: true,
            message: "Вы успешно вошли",
            success: true,
        }))
        .catch(({ status, message }) => {
            console.log(message);
            setBlockBtn(false);
            setRequestMessage(errorMessages[status]);
            setTooltip({
                ...tooltip,
                isOpen: true,
                message: "Не удалось войти в аккаунт",
                success: false,
            });
        })
    }

    return (
        <section className='login'>
            <Link className='login__logo-link' to='/'>
                <img className='header__logo header__logo_register' src={logotype} alt='Логотип'/>
            </Link>
            <h1 className='login__title'>Рады видеть!</h1>
            <form className='login__form' onSubmit={handleSubmit}>
                <Input titleClass="input__title" errorClass="input__error" inputClass="input" labelClass="input__field" name="email" type="email" title="E-mail" value={email} onChange={handleChange} error={validationState.login.errors.email} disabled={blockBtn} required/>
                <Input titleClass="input__title" errorClass="input__error" inputClass="input" labelClass="input__field" name="password" type="password" title="Пароль" value={password} onChange={handleChange} error={validationState.login.errors.password} disabled={blockBtn} required/>
                <p className="login__message">{requestMessage}</p>
                <button className={`login__button ${blockButton && "login__button_block"}`} type="submit" disabled={blockButton}>Войти</button>
            </form>
            <Link to='/signup' className='login__link'>Ещё не зарегистрированы? <span className='login__link-blue'>Регистрация</span></Link>
            <InfoTooltip />
        </section>
    )
}
export default Login;
