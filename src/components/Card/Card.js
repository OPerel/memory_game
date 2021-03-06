import React from 'react';
import { motion } from 'framer-motion';

import './Card.css';
import back from '../../img/back.svg'

const Card = ({ classes, url, onClick }) => {

  return (
    // <motion.div
    //   className='card'
    //   animate={{
    //     x: [-500, 0],
    //     y: [500 - i * 40, 0],
    //     rotate: [-270, -90, -45, 0]
    //   }}
    //   transition={{
    //     duration: 0.9,
    //   }}
    // >
    <div className={`card ${classes}`}>
      <div className={`inner-card ${classes}`} onClick={onClick}>
        <div className='front-face'>
          <img src={url} alt='f' />
        </div>
        <motion.div
          className='back-face'
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0 }
          }}>
          <img src={back} alt='b' />
        </motion.div>
      </div>
    </div>
    // </motion.div>
  );
};

export default Card;
