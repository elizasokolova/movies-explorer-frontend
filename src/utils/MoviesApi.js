import handleResponse from "./handleResponse";
import {mainApiUrl} from "./config";

class MoviesApi {
    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
        this._headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
    }

    getFilms() {
        return fetch(`${this._baseUrl}/beatfilm-movies`, {
            method: 'GET',
            headers: {...this._headers},
        })
            .then(handleResponse)
    }
}

const moviesApi = new MoviesApi ({
    baseUrl: mainApiUrl,
});
export default moviesApi;
