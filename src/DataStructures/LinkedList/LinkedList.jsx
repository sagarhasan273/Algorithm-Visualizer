/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import keyValue from '../Components/GenerateKey';
import getRandomInteger from '../Components/GetRandomInteger';
import Element from './Element';
import './LinkedList.scss';

export default function LinkedList() {
  // eslint-disable-next-line no-unused-vars
  const [dataKey, setDataKey] = useState(['845dab75-622e-4cd5-908b-52924f10e193', '3908fd4e-0793-4555-987c-092ed653e2f5']);
  const [hashMap, setHashMap] = useState({ '845dab75-622e-4cd5-908b-52924f10e193': 76, '3908fd4e-0793-4555-987c-092ed653e2f5': 28 });
  const [indexToAdd, setIndexToAdd] = useState(dataKey.length);

  const addElement = () => {
    const k = keyValue();
    const x = getRandomInteger(1, 100);
    setDataKey((prevState) => [...prevState, k]);
    setHashMap((prevHashMap) => {
      const newHashMap = { ...prevHashMap };
      newHashMap[k] = x;
      return newHashMap;
    });
  };

  const handleRemove = (e) => {
    e.preventDefault();
    const index = parseInt(indexToAdd);
    console.log(index);
    const key = dataKey[index];
    const popDiv = document.querySelector(`.element${index}`);
    popDiv.classList.add('elementOut');
    const popDiv1 = document.querySelector(`.element${index - 1}`);
    popDiv1.classList.add('prevElementAni');

    let counter = 0;
    const interval = setTimeout(() => {
      popDiv.classList.remove('elementOut');
      popDiv1.classList.remove('prevElementAni');
      popDiv1.classList.add('prevElementAnimation');
      setDataKey((prevState) => [...prevState.slice(0, index), ...prevState.slice(index + 1, prevState.length)]);
      setHashMap((prevHashMap) => {
        const newHashMap = { ...prevHashMap };
        delete newHashMap[key];
        return newHashMap;
      });
      counter += 1;
      if (counter === 1) {
        clearInterval(interval);
      }
    }, 500);

    counter = 0;
    const interval1 = setTimeout(() => {
      popDiv1.classList.remove('prevElementAnimation');
      counter += 1;
      if (counter === 1) {
        clearInterval(interval1);
      }
    }, 1000);
  };

  const addMiddleElement = () => {
    const k = keyValue();
    const x = getRandomInteger(1, 100);

    setDataKey((prevState) => [...prevState.slice(0, 1),
      k,
      ...prevState.slice(1),
    ]);
    setHashMap((prevHashMap) => {
      const newHashMap = { ...prevHashMap };
      newHashMap[k] = x;
      return newHashMap;
    });
  };

  const handleChangeIndexAdd = (e) => {
    e.preventDefault();
    setIndexToAdd(e.target.value);
  };
  return (
    <div className="LinkedListContainer">
      <div className="elements">
        {dataKey.map((value, index) => <Element value={hashMap[value]} key={value} index={index} length={dataKey.length} />)}
        <Element value="Null" index={dataKey.length} length={dataKey.length} />
      </div>
      <div className="bottomContainer">
        <button type="button" onClick={addElement}>add element</button>
        <input type="text" className="indexInputAdd" value={indexToAdd} onChange={handleChangeIndexAdd} placeholder={`Index ${dataKey.length}`} />
        <button type="button" onClick={handleRemove}>add element</button>
        <button type="button" onClick={addMiddleElement}>add middle element</button>
      </div>
    </div>
  );
}
