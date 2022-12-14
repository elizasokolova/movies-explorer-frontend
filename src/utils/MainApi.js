import { baseUrl } from "./config.js";
import handleResponse from "./handleResponse";

class MainApi {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
        this._headers = {
            "Content-Type": "application/json",
        };
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: this._headers,
            credentials: 'include',
            withCredentials: true,
        }).then(handleResponse);
    }

    registration(name, email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({name, email, password})
        }).then(handleResponse);
    }

    login(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({password, email})
        }).then(handleResponse);
    }

    logout() {
        return fetch(`${this._baseUrl}/signout`, {
            method: "POST",
            credentials: 'include',
            withCredentials: true,
            headers: this._headers,
        }).then(handleResponse);
    }

    updateProfile(name, email) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            withCredentials: true,
            headers: this._headers,
            body: JSON.stringify({ name, email }),
        }).then(handleResponse);
    }

    getSavedFilms() {
        return fetch(`${this._baseUrl}/movies`, {
            method: "GET",
            credentials: 'include',
            withCredentials: true,
            headers: this._headers,
        }).then(handleResponse);
    }

    saveFilm(film) {
        return fetch(`${this._baseUrl}/movies`, {
            method: "POST",
            credentials: 'include',
            withCredentials: true,
            headers: this._headers,
            body: JSON.stringify({
                country: film.country || 'Нет данных',
                director: film.director || 'Нет данных',
                duration: film.duration || 0,
                year: film.year || 'Нет данных',
                description: film.description,
                image: `https://api.nomoreparties.co${film.image.url}`,
                trailerLink: film.trailerLink || 'https://www.youtube.com',
                nameRU: film.nameRU,
                nameEN: film.nameEN,
                thumbnail: `https://api.nomoreparties.co${film.image.formats.thumbnail.url}`,
                movieId: film.id,
            }),
        }).then(handleResponse);
    }

    deleteFilm(film) {
        return fetch(`${this._baseUrl}/movies/${film._id}`, {
            method: "DELETE",
            credentials: 'include',
            withCredentials: true,
            headers:this._headers,
        }).then(handleResponse);
    }
}

const mainApi = new MainApi({ baseUrl });

export default mainApi;
