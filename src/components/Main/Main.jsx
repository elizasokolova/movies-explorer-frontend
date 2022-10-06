import React from 'react';
import Header from '../Header/Header.jsx';
import Promo from '../Promo/Promo.jsx'
import NavTab from '../NavTab/NavTab.jsx';
import AboutProject from '../AboutProject/AboutProject.jsx';
import Techs from '../Techs/Techs.jsx';
import AboutMe from '../AboutMe/AboutMe.jsx';
import Portfolio from '../Portfolio/Portfolio.jsx';
import Footer from '../Footer/Footer.jsx';

function Main() {
    return(
        <main className='content'>
            <Header/>
            <Promo/>
            <NavTab/>
            <AboutProject/>
            <Techs/>
            <AboutMe/>
            <Portfolio/>
            <Footer/>
        </main>
    )
}

export default Main;