export const mainApiUrl = "https://api.nomoreparties.co";
// export const baseUrl = "https://api.lizasokol.nomorepartiesxyz.ru";
export const baseUrl = "http://localhost:3001";

export const validationMessages = {
    name: "Имя содержит недопустимые символы. Имя может содержать латинские буквы, кириллицу, пробел и дефис.",
    email: "Введен некорректный формат эл.почты",
    password: "Пароль содержит недопустимые символы. Пароль может содержать цифры, латиницу, кириллицу, дефис.",
};

export const errorMessages = {
    409: "Пользователь с таким email уже существует",
    401: "Введен неправильный логин или пароль / пользователь не зарегистрирован",
    500: "Ошибка сервера",
    400: "Введены некорректные данные, проверьте правильность ввода данных",
};
