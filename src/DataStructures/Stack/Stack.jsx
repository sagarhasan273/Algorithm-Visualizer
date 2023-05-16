/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable no-alert */
import { useState } from 'react';
import './Stack.scss';
import Element from './Element';

export default function Stack() {
  const [stack, setStack] = useState([1, 2, 3, 3]);

  const pushElement = () => {
    const newElement = prompt('Enter an element to push:');
    setStack([...stack, newElement]);
  };

  const popElement = () => {
    if (stack.length === 0) {
      alert('Stack is empty. Cannot pop element.');
      return;
    }
    const poppedElement = stack[stack.length - 1];
    setStack(stack.slice(0, stack.length - 1));
    alert(`Popped element: ${poppedElement}`);
  };

  return (
    <div className="StackContainer">
      <div className="stackList">
        {stack.map((value, index) => (<Element value={value} key={index} />))}
      </div>

      <button type="button" onClick={pushElement}>Push</button>
      <button type="button" onClick={popElement}>Pop</button>
    </div>
  );
}
