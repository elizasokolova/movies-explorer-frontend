import React, { useContext, useEffect } from 'react';
import { InfoContext } from '../../contexts/InfoContext';
import error from '../../images/error.svg';
import access from '../../images/access.svg';

function InfoToolTip() {
    const { tooltip, setTooltip } = useContext(InfoContext);
    const { isOpen, message, success } = tooltip;

    function handleClosePopup() {
        setTooltip({ ...tooltip, isOpen: false, message: '' });
    }

    function removeListeners() {
        document.removeEventListener('keydown', closePopupEscape);
        document.removeEventListener('click', closePopupOverlay);
    }

    function closePopupEscape(event) {
        if (event.code === 'Escape') {
            removeListeners();
            return handleClosePopup();
        }
    }

    function closePopupOverlay(event) {
        const element = event.target;
        if (element.classList.contains('popup_opened')) {
            removeListeners();
            handleClosePopup();
        }
    }

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', closePopupEscape);
            document.addEventListener('click', closePopupOverlay);
        }
        return () => {
            removeListeners();
        };
    }, [isOpen]);

    return (
        <div className={`popup ${isOpen && 'popup_opened'}`}>
            <div className='popup__container'>
                <img className='popup__img' src={success ? access : error} alt='Ошибка'/>
                <button className='popup__close' onClick={handleClosePopup} type='button'/>
                <h2 className='popup__heading'>{message}</h2>
            </div>
        </div>
    );
}
export default InfoToolTip;
