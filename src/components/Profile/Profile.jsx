import React, {useState, useContext, useMemo} from "react";
import { Link } from "react-router-dom";
import Header from '../Header/Header.jsx';
import { CurrentUserContext } from "../../contexts/UserContext";
import { ValidationContext } from "../../contexts/ValidationContext";
import { checkValidation } from "../../utils/validation.js";
import { InfoContext } from '../../contexts/InfoContext';
import Input from "../Input/Input";
import {errorMessages} from "../../utils/config";

function Profile ({loggedIn, onUserUpdate, onLogout}) {
    const currentUser = useContext(CurrentUserContext);
    const [form, setForm] = useState({ name: currentUser.name, email: currentUser.email });
    const { name, email } = form;
    const { tooltip, setTooltip } = useContext(InfoContext);
    const store = useContext(ValidationContext);
    const [requestMessage, setRequestMessage] = useState("");
    const { validationState, setValidationState } = store;
    const [isEdit, setIsEdit] = useState(false); // смена кнопок редактировать/сохранить
    const [isNewData, setIsNewData] = useState(true); // проверка на внесение изменений

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

    function handleChangeProfile (event) {
        event.preventDefault();
        setIsEdit(true);
        setIsNewData(false);
    }

    function handleSaveProfile(event) {
        event.preventDefault();
        onUserUpdate(name, email)
            .then(() => {
                setIsEdit(false);
                setTooltip({
                ...tooltip,
                isOpen: true,
                message: "Изменения сохранены",
                success: true,
            })})
            .catch(({ status, message }) => {
                console.log(message);
                setIsEdit(true);
                setRequestMessage(errorMessages[status]);
                setTooltip({
                    ...tooltip,
                    isOpen: true,
                    message: "Ошибка при обновлении данных",
                    success: false,
                });
            })
    }

    const blockButton = (inputError && isEdit) || !isNewData;

    function handleLogout (event) {
        event.preventDefault();
        onLogout();
    }

    return (
        <section className="profile">
            <Header loggedIn={loggedIn}/>
            <h1 className="profile__title">Привет, {name}!</h1>
            <form className="profile__forms">
                <Input titleClass="profile__subtitle" errorClass="profile__error" inputClass="profile__input"
                       labelClass="profile__inputs" name="name" type="text" title="Имя"
                       value={name} onChange={handleChange} error={validationState.profile.errors.name}
                       disabled={!isEdit} required/>
                <Input titleClass="profile__subtitle" errorClass="profile__error" inputClass="profile__input"
                       labelClass="profile__inputs" name="email" type="text" title="Email"
                       value={email} onChange={handleChange} error={validationState.profile.errors.email}
                       disabled={!isEdit} required/>
                <p className="profile__message">{requestMessage}</p>
                <button className={`profile__submit-edit ${blockButton && "profile__submit-edit_disabled"}`}
                        type={isEdit ? "submit" : "button"} onClick={isEdit ? handleSaveProfile : handleChangeProfile}
                        disabled={blockButton}>{isEdit ? "Сохранить" : "Редактировать"}</button>
                <Link to="/signin" className="profile__exit-button">
                    <button onClick={handleLogout} className="profile__exit">Выйти из аккаунта</button>
                </Link>
            </form>
        </section>
    );
}

export default Profile;
