import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
// import Preloader from '../Preloader/PreLoader.jsx';

function SavedMovies({ loggedIn }) {
  return (
    <main className='saved__movies'>
      <Header loggedIn={loggedIn} />
      <SearchForm />
      {/*<Preloader />*/}
      <MoviesCardList />
      <Footer />
    </main>
  );
}

export default SavedMovies;
