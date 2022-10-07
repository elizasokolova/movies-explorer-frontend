import React from 'react';
import { Route } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import bookseller from '../../images/Bookseller.jpg';

function MoviesCardList() {
    return (
        <section className="cards">
            <ul className="cards__movies">
                <MoviesCard preview={bookseller} title={'Книготорговцы'} time={'1ч 42м'} />
                <MoviesCard preview={bookseller} title={'Книготорговцы'} time={'1ч 42м'} />
                <MoviesCard preview={bookseller} title={'Книготорговцы'} time={'1ч 42м'} />
                <MoviesCard preview={bookseller} title={'Книготорговцы'} time={'1ч 42м'} />
                <MoviesCard preview={bookseller} title={'Книготорговцы'} time={'1ч 42м'} />
                <MoviesCard preview={bookseller} title={'Книготорговцы'} time={'1ч 42м'} />
                <MoviesCard preview={bookseller} title={'Книготорговцы'} time={'1ч 42м'} />
                <MoviesCard preview={bookseller} title={'Книготорговцы'} time={'1ч 42м'} />
                <MoviesCard preview={bookseller} title={'Книготорговцы'} time={'1ч 42м'} />
                <MoviesCard preview={bookseller} title={'Книготорговцы'} time={'1ч 42м'} />
                <MoviesCard preview={bookseller} title={'Книготорговцы'} time={'1ч 42м'} />
                <MoviesCard preview={bookseller} title={'Книготорговцы'} time={'1ч 42м'} />
                <MoviesCard preview={bookseller} title={'Книготорговцы'} time={'1ч 42м'} />
                <MoviesCard preview={bookseller} title={'Книготорговцы'} time={'1ч 42м'} />
                <MoviesCard preview={bookseller} title={'Книготорговцы'} time={'1ч 42м'} />
                <MoviesCard preview={bookseller} title={'Книготорговцы'} time={'1ч 42м'} />
            </ul>
            <Route path="/movies">
                <div className="cards__more">
                    <button className="cards__button">Ещё</button>
                </div>
            </Route>
        </section>
    )
}
export default MoviesCardList;
