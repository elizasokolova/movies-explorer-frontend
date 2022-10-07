import React from 'react';

function NavTab() {
    return (
        <section className='navtab'>
            <ul className='navtab__list'>
                <li class='navtab__caption'><a className='navtab__link' href="#about-project">О проекте</a></li>
                <li class='navtab__caption'><a className='navtab__link' href="#techs">Технологии</a></li>
                <li class='navtab__caption'><a className='navtab__link' href="#about-me">Студент</a></li>
            </ul>
        </section>
    );
}
export default NavTab;
