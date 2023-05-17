/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import './Queue.scss';

import { useState } from 'react';
import getRandomInteger from '../Components/GetRandomInteger';
import Element from './Element';

export default function Queue() {
  const [queue, setQueue] = useState([1, 2, 3, 4]);
  const [val, setVal] = useState('');
  let randomNum = getRandomInteger(1, 100);
  const handleEnqueue = () => {
    setQueue([val || randomNum, ...queue]);
    randomNum = getRandomInteger(1, 100);
    setVal('');
  };
  const handleDequeue = () => {

  };
  const handleChange = () => {

  };
  return (
    <div className="QueueContainer">
      <div className="queueHorizontal">
        {queue.map((value, index) => (<Element value={value} key={index} index={index} />))}
      </div>
      <div className="footer">
        <button type="button" onClick={handleEnqueue}>Enqueue</button>
        <input type="text" value={val} onChange={handleChange} placeholder={`random number.. ${randomNum}`} />
        <button type="button" onClick={handleDequeue}>Dequeue</button>
      </div>
    </div>
  );
}
