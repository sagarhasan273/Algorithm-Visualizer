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

  const handleRemove = () => {
    setHashMap((prevHashMap) => {
      // Create a new hash map by copying the previous hash map and removing a key-value pair
      const newHashMap = { ...prevHashMap };
      const keys = Object.keys(newHashMap);
      const lastKey = keys[2];
      delete newHashMap[lastKey];
      return newHashMap;
    });
    setDataKey((prevState) => [...prevState.slice(0, 1), ...prevState.slice(2, prevState.length - 1)]);
    console.log(dataKey);
  };
  return (
    <div className="LinkedListContainer">
      <div className="elements">
        {dataKey.map((value, index) => <Element value={hashMap[value]} key={value} index={index} />)}
      </div>
      <div className="bottomContainer">
        <button type="button" onClick={addElement}>add element</button>
        <button type="button" onClick={handleRemove}>add element</button>
      </div>
    </div>
  );
}
