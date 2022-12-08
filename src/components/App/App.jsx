import React from 'react';
import { useState, useEffect } from 'react';
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
import Main from '../Main/Main.jsx';
import Movies from '../Movies/Movies.jsx';
import Login from '../Login/Login.jsx';
import Register from '../Register/Register.jsx';
import Profile from '../Profile/Profile.jsx';
import InfoTooltip from "../InfoToolTip/InfoTooltip.jsx";
import NotFound from '../NotFound/NotFound.jsx';
import SavedMovies from '../SavedMovies/SavedMovies.jsx'
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import mainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/UserContext.js";
import {defaultValidationState, ValidationContext,} from "../../contexts/ValidationContext.js";
import {InfoContext, InfoState} from "../../contexts/InfoContext";

function App() {
    const history = useHistory();
    let location = useLocation();
    const [validationState, setValidationState] = useState(defaultValidationState);
    const [tooltip, setTooltip] = useState(InfoState);
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const authorized = true;
    const [width, setWidth] = useState(window.innerWidth);

    const [storedFilm, setStoredFilm] = useState(JSON.parse(localStorage.getItem('store')) ?? []);
    const [newDigit, setNewDigit] = useState(4);
    const [filmsQuantity, setFilmsQuantity] = useState(16);

    /* -------------------- Авторизация / Регистрация / Профиль -------------------- */

    function onUserUpdate (name, email) {
        return mainApi.updateProfile(name, email)
            .then(userData => setCurrentUser(userData))
    }

    function onRegister (name, email, password) {
         return mainApi.registration(name, email, password)
            .then(() => onLogin(email, password))
    }

    function onLogin (email, password) {
         return mainApi.login(email, password)
             .then(() => {
                 history.push("/movies");
                 checkUserData();
                 // setCurrentUser(email, password);
                 // setLoggedIn(true);
             })
    }

    function checkUserData() {
        mainApi.getUserInfo()
            .then((res) => {
                if (res) {
                    setCurrentUser(res);
                    setLoggedIn(true);
                } else {
                    setLoggedIn(false);
                    setCurrentUser({});
                    localStorage.clear();
                    history.push("/signin");
                }
            })
            .catch((error) => {
                console.log(error);
                setLoggedIn(false);
            })
    }

    useEffect(() => {
        checkUserData();
    }, [loggedIn])

    function onLogout () {
        mainApi.logout()
            .then(() => {
                setLoggedIn(false);
                setCurrentUser({});
                localStorage.clear();
                setStoredFilm([]);
                history.push("/");
            })
            .catch((error) => {
                setLoggedIn(false);
                console.log(error);
            })
    }

    /* -------------------- Отображение и лайк карточек -------------------- */

    function handleFilmClick(film) {
        const like = storedFilm.some((a) => a.movieId === film.id);
        if (!like) {
            saveFilm(film);
        } else {
            const removeLike = storedFilm.find((a) => a.movieId === film.id);
            deleteFilm(removeLike);
        }
    }

    function saveFilm(film) {
        return mainApi.saveFilm(film)
            .then((film) => {
                setStoredFilm([...storedFilm, film]);
                localStorage.setItem('store', JSON.stringify([...storedFilm, film]));
            })
            .catch(error => console.log(error.message))
    }

    function deleteFilm(film) {
        return mainApi.deleteFilm(film)
            .then(() => {
                const filterFilms = storedFilm.filter((a) => a._id !== film._id);
                setStoredFilm(filterFilms);
                localStorage.setItem('store', JSON.stringify(filterFilms));
            })
            .catch(error => console.log(error.message))
    }

    function newWidth() {
        setWidth(window.innerWidth);
    }

    function getMoreFilms() {
        setFilmsQuantity(filmsQuantity + newDigit);
    }

    useEffect(() => {
        if (width >= 1200) {
            setNewDigit(4);
            setFilmsQuantity(16);
        } else if (width < 1200 && width >= 910) {
            setNewDigit(3);
            setFilmsQuantity(12);
        } else if (width < 910 && width >= 758) {
            setNewDigit(2);
            setFilmsQuantity(8);
        }
        else if (width < 758) {
            setNewDigit(2);
            setFilmsQuantity(5);
        }
    }, [width]);

    useEffect(() => {
        window.addEventListener('resize', newWidth);
        return () => window.removeEventListener('resize', newWidth)
    }, []);

    useEffect(() => {
        if (loggedIn && storedFilm.length === 0) {
            mainApi.getSavedFilms()
                .then(savedFilms => {
                    if (savedFilms) { // Сохраняет в локал стор
                        localStorage.setItem('store', JSON.stringify(savedFilms));
                        setStoredFilm(savedFilms);
                    }
                })
                .catch((err) => console.log(err.message));
        }
    }, [loggedIn, storedFilm.length]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <InfoContext.Provider value={{ tooltip, setTooltip }}>
                <ValidationContext.Provider value={{ validationState, setValidationState }}>
                    <div className='page' >
                        <InfoTooltip />
                        <Switch>
                            <Route exact path='/'>
                                <Main loggedIn={loggedIn} />
                            </Route>

                            <ProtectedRoute path='/movies' loggedIn={loggedIn}>
                                <Movies
                                    handleFilmClick={handleFilmClick}
                                    filmsQuantity={filmsQuantity}
                                    getMoreFilms={getMoreFilms}
                                    storedFilm={storedFilm}
                                    authorized={authorized}
                                />
                            </ProtectedRoute>

                            <ProtectedRoute path='/saved-movies' loggedIn={loggedIn}>
                                <SavedMovies
                                    films={storedFilm}
                                    handleFilmClick={deleteFilm}
                                    authorized={authorized}
                                />
                            </ProtectedRoute>

                            <ProtectedRoute path='/profile' loggedIn={loggedIn}>
                                <Profile
                                    onUserUpdate={onUserUpdate}
                                    authorized={authorized}
                                    onLogout={onLogout}
                                />
                            </ProtectedRoute>

                            <Route path='/signin'>
                                <Login
                                    onLogin={onLogin}
                                />
                            </Route>

                            <Route path='/signup'>
                                <Register
                                    onRegister={onRegister}
                                />
                            </Route>

                            <Route path='*'>
                                <NotFound />
                            </Route>
                        </Switch>
                    </div>
                </ValidationContext.Provider>
            </InfoContext.Provider>
        </CurrentUserContext.Provider>
    );
}

export default App;
