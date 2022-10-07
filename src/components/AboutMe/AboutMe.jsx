import React from "react";
import { forwardRef } from "react";
import avatar from '../../images/Avatar.jpg';

const AboutMe = forwardRef((props, ref) => {
    return (
        <section className="aboutme" id='about-me' ref={ref}>
            <h2 className="aboutme__student">Студент</h2>
            <div className="aboutme__main">
                <div className="aboutme__info">
                <h3 className="aboutme__title">Елизавета</h3>
                <p className="aboutme__subtitle">Фронтенд-разработчик, 23 года</p>
                <p className="aboutme__description">Родилась в Челябинске, защитила диплом в Южно-Уральском Государственном Университете по специальности «Программная инженерия». С 2020 года совершенствуюсь в разработке сайтов. Увлекаюсь компьютерными играми, занимаюсь плаванием и люблю путешествовать.</p>
                <ul className="aboutme__links">
                    <li><a href="https://vk.com/lizsokol" className="aboutme__link" target='_blank' rel='noreferrer'>VK</a></li>
                    <li><a href="https://github.com/elizasokolova" className="aboutme__link" target='_blank' rel='noreferrer'>GitHub</a></li>
                </ul>
                </div>
                <div className="aboutme__img">
                <img className='aboutme__avatar' src={avatar} alt='Аватар' />
                </div>
            </div>
        </section>
    );
});
export default AboutMe;
