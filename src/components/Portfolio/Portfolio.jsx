import React from "react";
import arrow from "../../images/Arrow.svg";

function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <div className="portfolio__info">
                <ul className="portfolio__list">
                    <li>
                        <a href="https://github.com/elizasokolova/how-to-learn" className="portfolio__item" target='_blank' rel='noreferrer'>
                            <p className="portfolio__link">Статичный сайт</p>
                            <img className="portfolio__image" src={arrow} alt="Стрелка"/>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/elizasokolova/russian-travel" className="portfolio__item" target='_blank' rel='noreferrer'>
                            <p className="portfolio__link">Адаптивный сайт</p>
                            <img className="portfolio__image" src={arrow} alt="Стрелка"/>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/elizasokolova/react-mesto-api-full" className="portfolio__item portfolio__item-no-border" target='_blank' rel='noreferrer'>
                            <p className="portfolio__link">Одностраничное приложение</p>
                            <img className="portfolio__image" src={arrow} alt="Стрелка"/>
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    )}

export default Portfolio;
