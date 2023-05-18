/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import './Queue.scss';

import { useEffect, useState } from 'react';
import CodeContainer from '../Components/CodeContainer';
import keyValue from '../Components/GenerateKey';
import getRandomInteger from '../Components/GetRandomInteger';
import Element from './Element';

export default function Queue() {
  const [queue, setQueue] = useState([
    { id: keyValue(), data: 10 },
    { id: keyValue(), data: 12 },
    { id: keyValue(), data: 23 },
    { id: keyValue(), data: 14 },
    { id: keyValue(), data: 25 },
    { id: keyValue(), data: 39 },
    { id: keyValue(), data: 17 },
    { id: keyValue(), data: 20 },
  ]);

  const [val, setVal] = useState('');
  const [fade, setFade] = useState(false);
  let string = queue.map((item) => item.data).join(', ');
  let code = `import collections

queue = collections.deque([${string}])

# write your code above
print(list(queue)) # you must have this line of code

`;
  const [pythonCode, setPythonCode] = useState(code);

  useEffect(() => {
    const targetDiv = document.querySelector('.glass-container');
    if (queue.length <= 1) {
      targetDiv.style.display = 'none';
      targetDiv.style.width = '0px';
    } else {
      targetDiv.style.display = 'block';
      targetDiv.style.width = `${(((queue.length || 1) - 1) * 50)}px`;
    }
    return () => {};
  }, [queue]);

  let randomNum = getRandomInteger(1, 100);

  const handleEnqueue = () => {
    string = queue.map((item) => item.data).join(', ');
    code = `import collections

queue = collections.deque([${string}])
queue.append(${val || randomNum})

# write your code above
print(list(queue)) # you must have this line of code  

`;
    setPythonCode(code);
    setFade(true);
    setQueue([...queue, { id: keyValue(), data: (val || randomNum) }]);
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
    if (!queue.length) return;
    string = queue.map((item) => item.data).join(', ');
    code = `import collections

queue = collections.deque([${string}])
queue.popleft()

# write your code above
print(list(queue)) # you must have this line of code

`;
    setPythonCode(code);
    setFade(false);
    const popDiv = document.querySelector('.element0');
    popDiv.classList.add('elementFirst');
    let counter = 0;
    const interval = setTimeout(() => {
      popDiv.classList.remove('elementFirst');
      setQueue((prevqueue) => prevqueue.slice(1));
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
          <Element value={value} key={value.id} index={index} length={queue.length} fade={fade} />))}
        <div className="glass-container" />
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
