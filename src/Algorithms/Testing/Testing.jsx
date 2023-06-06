/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import './Testing.scss';

export default function Testing() {
  const [currentLine, setCurrentLine] = useState(1);

  // Simulated code execution
  useEffect(() => {
    const executionTimer = setInterval(() => {
      setCurrentLine((line) => line + 1);
    }, 1000); // Simulate execution every 1 second

    // Clean up the timer on component unmount
    return () => clearInterval(executionTimer);
  }, []);
  const pythonCode = `array = [1, 2, 3]
  # write your code Bellow
  
  
  # write your code above
  print(array) # you must have this line of code
  `;

  return (
    <pre>
      {pythonCode.split('\n').map((line, index) => (
        <code
          key={index}
          className={index + 1 === currentLine ? 'highlighted' : ''}
        >
          {line}
        </code>
      ))}
    </pre>
  );
}
