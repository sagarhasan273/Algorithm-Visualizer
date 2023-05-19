/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import './Array.scss';

import { useEffect, useState } from 'react';
import CodeContainer from '../Components/CodeContainer';
import keyValue from '../Components/GenerateKey';
import getRandomInteger from '../Components/GetRandomInteger';
import Element from './Element';

let randomNum = getRandomInteger(1, 100);

export default function array() {
  const [array, setarray] = useState([
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
  const [indexToDelete, setIndexToDelete] = useState(array.length - 1);
  const [indexToAdd, setIndexToAdd] = useState(array.length - 1);

  let string = array.map((item) => item.data).join(', ');
  let code = `array = [${string}]
# write your code Bellow


# write your code above
print(array) # you must have this line of code
`;
  const [pythonCode, setPythonCode] = useState(code);

  useEffect(() => {
    const targetDiv = document.querySelector('.glass-container');
    setIndexToDelete('');
    setIndexToAdd('');
    if (array.length <= 1) {
      targetDiv.style.display = 'none';
      targetDiv.style.width = '0px';
    } else {
      targetDiv.style.display = 'block';
      targetDiv.style.width = `${(((array.length || 1) - 2) * 50)}px`;
    }
    return () => {};
  }, [array]);

  const handleIndexAdd = () => {
    randomNum = getRandomInteger(1, 100);
    string = array.map((item) => item.data).join(', ');
    code = `array = [${string}]

array.insert(${indexToAdd || (array.length)}, ${val || randomNum})

# write your code above
print(array) # you must have this line of code  

`;
    setPythonCode(code);
    setarray((prevArray) => {
      const newArray = [...prevArray];
      newArray.splice(indexToAdd || (array.length), 0, { id: keyValue(), data: (val || randomNum) });
      return newArray;
    });
    setVal('');
  };

  const handleEnqueueFront = () => {
    randomNum = getRandomInteger(1, 100);
    string = array.map((item) => item.data).join(', ');
    code = `array = [${string}]
# write your code Bellow
array.append(${val || randomNum})

# write your code Above
print(array) # you must have this line of code  
`;
    setPythonCode(code);
    setarray([...array, { id: keyValue(), data: (val || randomNum) }]);
    let counter = 0;
    const interval = setTimeout(() => {
      counter += 1;
      if (counter === 1) {
        clearInterval(interval);
      }
    }, 500);

    setVal('');
  };

  const handleDeleteFront = () => {
    if (array.length === 0) {
      alert('array is empty. Cannot pop element.');
      return;
    }

    string = array.map((item) => item.data).join(', ');
    code = `array = [${string}]
# write your code Bellow
array.pop(0)
        
# write your code Above
print(array) # you must have this line of code 
`;
    setPythonCode(code);
    const popDiv = document.querySelector('.element0');
    popDiv.classList.add('elementOut');
    let counter = 0;
    const interval = setTimeout(() => {
      popDiv.classList.remove('elementOut');
      setarray((prevarray) => prevarray.slice(1));
      counter += 1;
      if (counter === 1) {
        clearInterval(interval);
      }
    }, 500);
  };

  const handleDeleteLast = () => {
    if (array.length === 0 || indexToDelete >= array.length) {
      alert('array is empty. Cannot pop element.');
      return;
    }
    const index = indexToDelete || array.length - 1;
    const popDiv = document.querySelector(`.element${index}`);
    popDiv.classList.add('elementOut');
    let counter = 0;
    const interval = setTimeout(() => {
      popDiv.classList.remove('elementOut');

      setarray((prevArray) => {
        const newArray = [...prevArray];
        newArray.splice(index, 1);
        return newArray;
      });
      counter += 1;
      if (counter === 1) {
        clearInterval(interval);
      }
    }, 500);

    string = array.map((item) => item.data).join(', ');
    code = `import collections

array = collections.array([${string}])
array.pop()

# write your code above
print(list(array)) # you must have this line of code

`;
    setPythonCode(code);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setVal(e.target.value);
  };
  const handleChangeIndex = (e) => {
    e.preventDefault();
    setIndexToDelete(e.target.value);
  };

  const handleChangeIndexAdd = (e) => {
    e.preventDefault();
    setIndexToAdd(e.target.value);
  };

  return (
    <div className="arrayContainer">
      <div className="arrayHorizontal">
        {array.map((value, index) => (
          <Element value={value} key={value.id} index={index} length={array.length} />))}
        <div className="glass-container" />
      </div>
      <CodeContainer setData={setarray} code={pythonCode} setCode={setPythonCode} />
      <div className="footer">
        <button type="button" onClick={handleEnqueueFront}>Add</button>
        <input type="text" className="valueInput" value={val} onChange={handleChange} placeholder={`Random number.. ${randomNum}`} />
        <button className="enqueue" type="button" onClick={handleIndexAdd}>Add By Index</button>
        <input type="text" className="indexInputAdd" value={indexToAdd} onChange={handleChangeIndexAdd} placeholder={`Index ${array.length}`} />
        <button className="deleteFront" type="button" onClick={handleDeleteFront}>Delete Front</button>
        <button type="button" onClick={handleDeleteLast}>Delete</button>
        <input type="text" className="indexInputDelete" value={indexToDelete} onChange={handleChangeIndex} placeholder={`Index to delete.. ${array.length - 1}`} />
      </div>
    </div>
  );
}
