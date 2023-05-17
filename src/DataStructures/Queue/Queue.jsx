/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import './Queue.scss';

import { useState } from 'react';
import CodeContainer from '../Components/CodeContainer';
import getRandomInteger from '../Components/GetRandomInteger';
import Element from './Element';

export default function Queue() {
  const [queue, setQueue] = useState([1, 2, 3, 4]);
  const [val, setVal] = useState('');
  const [fade, setFade] = useState(false);
  const string = queue.join(', ');
  const code = `queue = [${string}]

# write your code above
print(queue) # you must have this line of code
`;
  const [pythonCode, setPythonCode] = useState(code);
  let randomNum = getRandomInteger(1, 100);
  const handleEnqueue = () => {
    setFade(true);
    setQueue([...queue, val || randomNum]);
    let counter = 0;
    const interval = setTimeout(() => {
      const popDiv = document.querySelector(`.element${queue.length}`);
      popDiv.classList.remove('elementLast');
      counter += 1;
      if (counter === 1) {
        clearInterval(interval);
      }
    }, 500);
    randomNum = getRandomInteger(1, 100);
    setVal('');
  };
  const handleDequeue = () => {
    setFade(false);
    const popDiv = document.querySelector('.element0');
    popDiv.classList.add('elementFirst');
    let counter = 0;
    const interval = setTimeout(() => {
      setQueue(queue.slice(1, queue.length));
      popDiv.classList.remove('elementFirst');
      counter += 1;
      if (counter === 1) {
        clearInterval(interval);
      }
    }, 500);
  };
  const handleChange = (e) => {
    setVal(e.target.value);
  };
  return (
    <div className="QueueContainer">
      <div className="queueHorizontal">
        {queue.map((value, index) => (
          <Element value={value} key={index} index={index} length={queue.length} fade={fade} />))}
      </div>
      <CodeContainer setData={setQueue} code={pythonCode} setCode={setPythonCode} />
      <div className="footer">
        <button className="enqueue" type="button" onClick={handleEnqueue}>Enqueue</button>
        <input type="text" value={val} onChange={handleChange} placeholder={`Random number.. ${randomNum}`} />
        <button className="dequeue" type="button" onClick={handleDequeue}>Dequeue</button>
      </div>
    </div>
  );
}
