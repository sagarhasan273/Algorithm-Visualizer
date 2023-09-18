/* eslint-disable no-constant-condition */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import keyValue from '../Components/GenerateKey';
import CarouselDP from './CarouselDP';
import Knapsack from './DP Room/0-1knapsack/knapsack';
import Fibonacci from './DP Room/Fibonncci/Fibonacci';
import './DynamicProgramming.scss';

export default function DynamicProgramming() {
  // const [isVisible, setIsVisible] = useState(true);
  const [haveSelect, setHaveSelect] = useState('');
  const [reload, setReload] = useState(true);
  const handleClick = () => {
    setHaveSelect(null);
  };
  const reloadContent = () => {
    setReload((prev) => !prev);
  };
  function renderContentDP() {
    switch (haveSelect) {
      case '':
        return (
          <div className="termsMenu">
            <div className="termsMenu-content">
              <span className="close" onClick={handleClick}>&times;</span>
              <CarouselDP setHaveSelect={setHaveSelect} />
            </div>
          </div>
        );

      case 'Fibonacci':
        return (reload) ? <Fibonacci key={keyValue()} reload={reloadContent} />
          : <Fibonacci key={keyValue()} reload={reloadContent} />;
      case '0-1Knapsack':
        return (reload) ? <Knapsack key={keyValue()} reload={reloadContent} />
          : <Knapsack key={keyValue()} reload={reloadContent} />;
      case 'Item3':
        return <div>item 3</div>;
      case 'Item4':
        return <div>item 4</div>;
      default:
        return null;
    }
  }
  return (
    <div>
      {renderContentDP()}
    </div>
  );
}
