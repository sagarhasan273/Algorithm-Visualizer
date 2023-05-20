/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import './Deque.scss';

import { useEffect, useState } from 'react';
import CodeContainer from '../Components/CodeContainer';
import keyValue from '../Components/GenerateKey';
import getRandomInteger from '../Components/GetRandomInteger';
import Element from './Element';

export default function deque() {
  const [deque, setdeque] = useState([
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
  let string = deque.map((item) => item.data).join(', ');
  let code = `import collections

deque = collections.deque([${string}])

# write your code above
print(list(deque)) # you must have this line of code

`;
  const [pythonCode, setPythonCode] = useState(code);

  useEffect(() => {
    const targetDiv = document.querySelector('.glass-container');
    if (deque.length <= 1) {
      targetDiv.style.display = 'none';
      targetDiv.style.width = '0px';
    } else {
      targetDiv.style.display = 'block';
      targetDiv.style.width = `${(((deque.length || 1) - 2) * 50)}px`;
    }
    return () => {};
  }, [deque]);

  let randomNum = getRandomInteger(1, 100);

  const handleEnqueueLast = () => {
    string = deque.map((item) => item.data).join(', ');
    code = `import collections

deque = collections.deque([${string}])
deque.append(${val || randomNum})

# write your code above
print(list(deque)) # you must have this line of code  

`;
    setPythonCode(code);
    setdeque([...deque, { id: keyValue(), data: (val || randomNum) }]);
    let counter = 0;
    const interval = setTimeout(() => {
      counter += 1;
      if (counter === 1) {
        clearInterval(interval);
      }
    }, 500);
    randomNum = getRandomInteger(1, 100);
    setVal('');
  };

  const handleEnqueueFront = () => {
    string = deque.map((item) => item.data).join(', ');
    code = `import collections

deque = collections.deque([${string}])
deque.appendleft(${val || randomNum})

# write your code above
print(list(deque)) # you must have this line of code  

`;
    setPythonCode(code);
    setdeque([{ id: keyValue(), data: (val || randomNum) }, ...deque]);
    let counter = 0;
    const interval = setTimeout(() => {
      counter += 1;
      if (counter === 1) {
        clearInterval(interval);
      }
    }, 500);
    randomNum = getRandomInteger(1, 100);
    setVal('');
  };

  const handleDequeueFront = () => {
    if (deque.length === 0) {
      alert('deque is empty. Cannot pop element.');
      return;
    }

    string = deque.map((item) => item.data).join(', ');
    code = `import collections

deque = collections.deque([${string}])
deque.popleft()

# write your code above
print(list(deque)) # you must have this line of code

`;
    setPythonCode(code);
    const popDiv = document.querySelector('.element0');
    popDiv.classList.add('elementFirst');
    let counter = 0;
    const interval = setTimeout(() => {
      popDiv.classList.remove('elementFirst');
      setdeque((prevdeque) => prevdeque.slice(1));
      counter += 1;
      if (counter === 1) {
        clearInterval(interval);
      }
    }, 500);
  };

  const handleDequeueLast = () => {
    if (deque.length === 0) {
      alert('deque is empty. Cannot pop element.');
      return;
    }

    setdeque(deque.slice(0, deque.length - 1));

    string = deque.map((item) => item.data).join(', ');
    code = `import collections

deque = collections.deque([${string}])
deque.pop()

# write your code above
print(list(deque)) # you must have this line of code

`;
    setPythonCode(code);
  };

  const handleChange = (e) => {
    setVal(e.target.value);
  };

  return (
    <div className="DequeContainer">
      <div className="dequeHorizontal">
        {deque.map((value, index) => (
          <Element value={value} key={value.id} index={index} length={deque.length} />))}
        <div className="glass-container" />
      </div>
      <CodeContainer setData={setdeque} code={pythonCode} setCode={setPythonCode} data={deque} />
      <div className="footer">
        <button type="button" onClick={handleEnqueueFront}>Enqueue Front</button>
        <button className="enqueue" type="button" onClick={handleEnqueueLast}>Enqueue Last</button>
        <input type="text" value={val} onChange={handleChange} placeholder={`Random number.. ${randomNum}`} />
        <button className="dequeue" type="button" onClick={handleDequeueFront}>Dequeue Front</button>
        <button type="button" onClick={handleDequeueLast}>Dequeue Last</button>
      </div>
    </div>
  );
}
