import validator from "validator";
import { validationMessages } from "./config.js";

export const fieldName = /[a-z-. а-яё]+/g;
export const fieldPassword = /[0-9a-z-а-яё]+/g;
export const fieldLetters = /[_~!@#$%^&*()[\]+`'';:<>/\\|=]/g;

export const isEmail = (email) => {
    return !validator.isEmail(email) ? validationMessages.email : "";
};

export const validationPassword = (str) => {
    const password = String(str).toLowerCase();
    const aloneMatch = password.match(fieldPassword).length;
    return aloneMatch > 1 || fieldLetters.test(password) ? validationMessages.password : "";
};

export const validationName = (str) => {
    const name = String(str).toLowerCase();
    const aloneMatch = name.match(fieldName);
    const digitMatch = name.match(/[0-9]/);
    return !aloneMatch || aloneMatch.length > 1 || fieldLetters.test(name) || digitMatch?.length >= 1 ? validationMessages.name : "";
};

export const _setState =
    ({ form, input, errorMessage }) => (state) => {
            if (form === "") return state;
            return {...state, [form]: {...state[form], errors: {...state[form].errors, [input]: errorMessage}}};
};

export function checkValidation(event, form) {
    let errorMessage = event.target.validationMessage;

    switch (event.target.name) {
        case "name":
            errorMessage = errorMessage || validationName(event.target.value);
            return {state: _setState({form, input: "name", errorMessage})};
        case "email":
            errorMessage = errorMessage || isEmail(event.target.value);
            return {state: _setState({form, input: "email", errorMessage})};
        case "password":
            errorMessage = errorMessage || validationPassword(event.target.value);
            return {state: _setState({form, input: "password", errorMessage})};
        default:
            return {state: _setState({form: "", input: event.target.name, errorMessage})};
    }
}
