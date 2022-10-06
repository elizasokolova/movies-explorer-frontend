import React from 'react';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import Header from '../Header/Header.jsx';
import Preloader from '../Preloader/PreLoader.jsx';
import Footer from '../Footer/Footer.jsx';

function Movies({ loggedIn }) {
    return (
        <main className="movies">
            <Header loggedIn={loggedIn}/>
            <SearchForm />
            {/*<Preloader />*/}
            <MoviesCardList />
            <Footer />
        </main>
)}

export default Movies;
