import React from 'react';
import { useHistory } from 'react-router-dom';

function NotFound() {
  const history = useHistory();
  return (
    <div className='not-found'>
      <h1 className='not-found__title'>404</h1>
      <p className='not-found__subtitle'>Страница не найдена</p>
      <button onClick={history.goBack} className='not-found__back'>Назад</button>
    </div>
  );
}

export default NotFound;
