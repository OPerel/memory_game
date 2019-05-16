import React from 'react';
import './Card.css';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('./img', false, /\.(svg)$/));

const Card = ({ url }) => {
    return (
        <div className='card'>
            <img className='front-face' src={images[url]} alt='f' />
            <img className='back-face' src={images['js-badge.svg']} alt='b' />
        </div>
    );
};

export default Card;
