import React, {useState, useContext, useMemo, useEffect} from "react";
import { Link } from "react-router-dom";
import Header from '../Header/Header.jsx';
import { CurrentUserContext } from "../../contexts/UserContext";
import { ValidationContext } from "../../contexts/ValidationContext";
import { checkValidation } from "../../utils/checkValidation.js";
import { InfoContext } from '../../contexts/InfoContext';
import Input from "../Input/Input";
import {errorMessages} from "../../utils/config";

function Profile ({authorized, onUserUpdate, onLogout}) {
    const currentUser = useContext(CurrentUserContext);
    const [form, setForm] = useState({name: "", email: ""});
    const { name, email } = form;
    const { tooltip, setTooltip } = useContext(InfoContext);
    const store = useContext(ValidationContext);
    const [requestMessage, setRequestMessage] = useState("");
    const { validationState, setValidationState } = store;
    const [isChange, setIsChange] = useState(false); // смена кнопок редактировать/сохранить
    const [isNewData, setIsNewData] = useState(false); // проверка на внесение изменений
    const [blockButton, setBlockButton] = useState(true);

    function handleChange(event) {
        setRequestMessage("");
        setIsNewData(true);
        const { state } = checkValidation(event, "profile");
        setValidationState(state(validationState));
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const inputError = useMemo(() =>
        Object.values(validationState.profile.errors).some((error) => error), [validationState.profile.errors]
    );

    function changeProfile (event) {
        event.preventDefault();
        setIsChange(true);
        setIsNewData(false);
    }

    useEffect(() => {
        setBlockButton(inputError || !isNewData || (name === currentUser.name && email === currentUser.email));
    }, [inputError, isNewData, form]);

    function saveProfile(event) {
        event.preventDefault();
        onUserUpdate(name, email)
            .then(() => {
                setIsNewData(false);
                setIsChange(false);
                setTooltip({
                ...tooltip,
                isOpen: true,
                message: "Изменения сохранены",
                success: true,
            })})
            .catch(({ status, message }) => {
                console.log(message);
                setIsNewData(false);
                setIsChange(false);
                setRequestMessage(errorMessages[status]);
                setTooltip({
                    ...tooltip,
                    isOpen: true,
                    message: "Ошибка при обновлении данных",
                    success: false,
                });
            })
    }

    function handleLogout (event) {
        event.preventDefault();
        onLogout();
    }

    useEffect(() => {
        setForm({
            name: currentUser.name,
            email: currentUser.email,
        });
    }, [currentUser.name, currentUser.email]);

    return (
        <section className="profile">
            <Header authorized={authorized}/>
            <h1 className="profile__title">Привет, {name}!</h1>
            <form className="profile__forms">
                <Input titleClass="profile__subtitle" errorClass="profile__error" inputClass="profile__input"
                       labelClass="profile__inputs" name="name" type="text" title="Имя"
                       value={name} onChange={handleChange} error={validationState.profile.errors.name}
                       disabled={!isChange} required/>
                <Input titleClass="profile__subtitle" errorClass="profile__error" inputClass="profile__input"
                       labelClass="profile__inputs" name="email" type="text" title="Email"
                       value={email} onChange={handleChange} error={validationState.profile.errors.email}
                       disabled={!isChange} required/>
                <p className="profile__message">{requestMessage}</p>

                <button className={`profile__submit-edit ${isChange && "profile__submit-edit_hidden"}`}
                        type="button" onClick={changeProfile}>Редактировать</button>

                <button className={`profile__submit-edit ${!isChange && "profile__submit-edit_hidden"} ${blockButton && "profile__submit-edit_disabled"}`}
                        type="submit" onClick={saveProfile}
                        disabled={blockButton}>Сохранить</button>

                <Link to="/signin" className="profile__exit-button">
                    <button onClick={handleLogout} className={`profile__exit ${isChange && "profile__exit_hidden"}`}>Выйти из аккаунта</button>
                </Link>
            </form>
        </section>
    );
}

export default Profile;
