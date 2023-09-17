/* eslint-disable no-constant-condition */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import keyValue from '../Components/GenerateKey';
import Fibonacci from './DP Room/Fibonncci/Fibonacci';
import './DynamicProgramming.scss';

export default function DynamicProgramming() {
  // const [isVisible, setIsVisible] = useState(true);
  const [haveNotSelect, setHaveNotSelect] = useState(true);
  const [reload, setReload] = useState(true);
  const handleClick = () => {
    setHaveNotSelect(false);
  };
  const reloadContent = () => {
    setReload((prev) => !prev);
  };
  return (
    <div>
      {(haveNotSelect) ? (
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleClick}>&times;</span>
            <div className="email text-center">
              hello
            </div>
          </div>
        </div>
      ) : (reload)
        ? <Fibonacci key={keyValue()} reload={reloadContent} />
        : <Fibonacci key={keyValue()} reload={reloadContent} />}
    </div>
  );
}
