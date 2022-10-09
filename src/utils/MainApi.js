import { baseUrl } from "./config.js";

class MainApi {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
        this._headers = {
            "Content-Type": "application/json",
        };
    }

    _handleResponse = (response) => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject({
            message: response.statusText,
            status: response.status,
        });
    };

    login(data) {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            credentials: "include",
            headers: this._headers,
            body: JSON.stringify(data),
        }).then(this._handleResponse);
    }

    registration(data) {
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(data),
        }).then(this._handleResponse);
    }

    async getUserInfo() {
        return await fetch(`${this._baseUrl}/users/me`, {
            credentials: "include",
            headers: this._headers,
        }).then(this._handleResponse);
    }

    patchUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            credentials: "include",
            headers: this._headers,
            body: JSON.stringify(data),
        }).then(this._handleResponse);
    }

    logout() {
        return fetch(`${this._baseUrl}/signout`, {
            credentials: "include",
            headers: this._headers,
        }).then(this._handleResponse);
    }

    getSavedMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            credentials: "include",
            headers: this._headers,
        }).then(this._handleResponse);
    }

    saveMovie(movie) {
        return fetch(`${this._baseUrl}/movies`, {
            method: "POST",
            credentials: "include",
            headers: this._headers,
            body: JSON.stringify(movie),
        }).then(this._handleResponse);
    }

    deleteMovie(id) {
        return fetch(`${this._baseUrl}/movies/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: this._headers,
        }).then(this._handleResponse);
    }
}

const mainApi = new MainApi({
    baseUrl: baseUrl,
});

export default mainApi;
