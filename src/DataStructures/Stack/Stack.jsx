/* eslint-disable no-unused-expressions */
/* eslint-disable no-alert */
/* eslint-disable react/no-array-index-key */

import { useEffect, useState } from 'react';
import CodeContainer from './CodeContainer';
import Element from './Element';
import './Stack.scss';
import StackHolder from './StackHolder';

function getRandomInteger(min, max) {
  const mn = Math.ceil(min);
  const mx = Math.floor(max);
  return Math.floor(Math.random() * (mx - mn + 1)) + mn;
}

export default function Stack() {
  const [stack, setStack] = useState([1, 2, 3, 3]);
  const string = stack.join(', ');
  const code = `stack = [${string}]

# write your code above
print(stack) # you must have this line of code
`;
  const [pythonCode, setPythonCode] = useState(code);
  let randomNum = getRandomInteger(1, 100);
  const [val, setVal] = useState('');

  useEffect(() => {
    const targetDiv = document.querySelector('.glass-container');
    targetDiv.style.height = `${(stack.length * 35) - 27}px`;
    return () => {};
  }, [stack]);

  const pushElement = () => {
    setStack([...stack, val || randomNum]);
    setPythonCode(`stack = [${stack.join(', ')}]
stack.append(${val || randomNum})

# write your code above
print(stack) # you must have this line of code
`);
    randomNum = getRandomInteger(1, 100);
    setVal('');
    const targetDiv = document.querySelector(`.elementStack${0}`);
    targetDiv.classList.add('elementTop');

    let counter = 0;
    const interval = setTimeout(() => {
      targetDiv.classList.remove('elementTop');
      counter += 1;
      if (counter === 1) {
        clearInterval(interval);
      }
    }, 500);
  };

  const popElement = () => {
    if (stack.length === 0) {
      alert('Stack is empty. Cannot pop element.');
      return;
    }

    const targetDiv = document.querySelector(`.element${stack.length - 1}`);
    targetDiv.classList.add('fade-out');
    const elementTopPop = document.querySelector(`.elementStack${0}`);
    elementTopPop.classList.add('elementTopPop');

    let counter = 0;
    const interval = setTimeout(() => {
      setStack(stack.slice(0, stack.length - 1));
      elementTopPop.classList.remove('elementTopPop');
      counter += 1;
      if (counter === 1) {
        clearInterval(interval);
      }
    }, 500);
    setPythonCode(`stack = [${stack.join(', ')}]
stack.pop()

# write your code above
print(stack) # you must have this line of code
`);
  };

  const handleInput = (e) => {
    setVal(e.target.value);
  };

  const reverseStack = stack.slice().reverse();
  return (
    <div className="StackContainer">
      <div className="stackList">
        {stack.map((value, index) => (<Element value={value} key={index} index={index} />))}
      </div>
      <div className="stackVirtical">
        <div className="glassElements">
          {reverseStack.map(
            (value, index) => (<StackHolder value={value} key={index} index={index} />),
          )}
          <div className="glass-container" />
        </div>
        <CodeContainer setStack={setStack} code={pythonCode} setCode={setPythonCode} />
      </div>
      <div className="footer">
        <button className="push" type="button" onClick={pushElement}>Push</button>
        <input type="text" value={val} onChange={handleInput} placeholder={`random number.. ${randomNum}`} />
        <button className="pop" type="button" onClick={popElement}>Pop</button>
      </div>
    </div>
  );
}
