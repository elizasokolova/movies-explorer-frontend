import React from "react";
import { forwardRef } from "react";

const AboutProject = forwardRef((props, ref) => {
    return (
        <section className="about" id="about-project" ref={ref}>
            <h2 className="about__title">О проекте</h2>
            <div className="about__description">
                <div className="about__item">
                    <h2 className="about__item-title">Дипломный проект включал 5 этапов</h2>
                    <p className="about__item-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about__item">
                    <h2 className="about__item-title">На выполнение диплома ушло 5 недель</h2>
                    <p className="about__item-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about__project">
                <p className="about__project-blue">1 неделя</p>
                <p className="about__project-white">4 недели</p>
            </div>
            <div className="about__project">
                <p className="about__project-backend">Back-end</p>
                <p className="about__project-frontend">Front-end</p>
            </div>
        </section>
    );
});
export default AboutProject;
