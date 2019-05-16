import React from 'react';
import './Card.css';

const importAll = (r) => {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('./img', false, /\.(svg)$/));

const Card = ({ url, onClicking }) => {
    return (
        <div className='card' onClick={onClicking}>
            <img className='front-face' src={images[url]} alt='f' />
            <img className='back-face' src={images['js-badge.svg']} alt='b' />
        </div>
    );
};

export default Card;
