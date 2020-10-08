import React from 'react';
import './LevelSelector.css'

import { useRecoilState } from 'recoil';
import { levelAtom } from '../../utils/recoil';

const LevelSelector = () => {
  const [level, setLevel] = useRecoilState(levelAtom);

  const levelHandler = e => {
    const { value } = e.target;
    setLevel(value);
  };

  return (
    <div>
      <label htmlFor="level-selector">Choose Level:</label>
      <select id="level-selector" value={level} onChange={levelHandler}>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="expert">Expert</option>
      </select>
    </div>
  )
}

export default LevelSelector;