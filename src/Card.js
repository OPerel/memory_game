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
        <div className='card'>
            <div className='inner-card' onClick={onClicking}>
                <div className='front-face'>
                    <img src={images[url]} alt='f' />
                </div>
                <div className='back-face'>
                    <img src={images['js-badge.svg']} alt='b' />
                </div>
            </div>
        </div>
    );
};

export default Card;
