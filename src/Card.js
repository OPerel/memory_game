import React from 'react';
import './Card.css';
import back from './img/back.svg'

const importImages = (r) => {
    let images = {};
    r.keys().forEach((item, index) => {
        images[item.replace('./', '')] = r(item);
    });
    return images;
}

const images = importImages(require.context('./img', false, /\.(svg)$/));

const Card = ({ url, onClicking }) => {
    return (
        <div className='card'>
            <div className='inner-card' onClick={onClicking}>
                <div className='front-face'>
                    <img src={url} alt='f' />
                </div>
                <div className='back-face'>
                    <img src={back} alt='b' />
                </div>
            </div>
        </div>
    );
};

export default Card;
