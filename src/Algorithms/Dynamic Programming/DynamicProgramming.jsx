/* eslint-disable no-constant-condition */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import keyValue from '../Components/GenerateKey';
import CarouselDP from './CarouselDP';
import KnapsackTabulation from './DP Room/0-1knapsack/KnapsackTabulation';
import Knapsack from './DP Room/0-1knapsack/knapsack';
import Fibonacci from './DP Room/Fibonncci/Fibonacci';
import FibonacciTabulation from './DP Room/Fibonncci/FibonacciTabulation';
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

      case 'FibonacciRecursion':
        return (reload) ? <Fibonacci key={keyValue()} reload={reloadContent} />
          : <Fibonacci key={keyValue()} reload={reloadContent} />;
      case 'FibonacciTabulation':
        return (reload) ? <FibonacciTabulation key={1} reload={reloadContent} />
          : <FibonacciTabulation key={2} reload={reloadContent} />;
      case '0-1KnapsackRecursion':
        return (reload) ? <Knapsack key={1} reload={reloadContent} />
          : <Knapsack key={2} reload={reloadContent} />;
      case '0-1KnapsackTabulation':
        return (reload) ? <KnapsackTabulation key={1} reload={reloadContent} />
          : <KnapsackTabulation key={2} reload={reloadContent} />;
      case 'Item3':
        return <div>item 3</div>;
      case 'Item4':
        return <div>item 4</div>;
      default:
        return null;
    }
  }
  return (
    <div style={{ width: '100%', height: 'calc(100% - 2em)', overflow: 'auto' }}>
      {renderContentDP()}
    </div>
  );
}
