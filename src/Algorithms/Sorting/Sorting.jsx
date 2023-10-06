/* eslint-disable max-len */
/* eslint-disable no-constant-condition */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import keyValue from '../Components/GenerateKey';
import BubbleSorting from './Bubble Sorting/BubbleSorting';
import CarouselSorting from './CarouselSorting';
import InsertionSorting from './Insertion Sorting/InsertionSorting';
import MergeSorting from './Merge Sorting/MergeSorting';
import QuickSorting from './Quick Sorting/QuickSorting';
import SelectionSorting from './Selection Sorting/SelectionSorting';
import './Sorting.scss';

export default function Sorting({ homeStage }) {
  const [haveSelect, setHaveSelect] = useState('');
  const [reload, setReload] = useState(true);
  const [order, setOrder] = useState(true);
  const handleClick = () => {
    setHaveSelect(null);
    homeStage();
  };
  const reloadContent = () => {
    setReload((prev) => !prev);
  };
  function renderContentSorting() {
    switch (haveSelect) {
      case '':
        return (
          <div className="termsMenu">
            <div className="termsMenu-content">
              <span className="close" onClick={handleClick}>&times;</span>
              <CarouselSorting setHaveSelect={setHaveSelect} order={order} setOrder={setOrder} />
            </div>
          </div>
        );

      case 'Quick Sorting':
        return (reload) ? <QuickSorting key={keyValue()} reload={reloadContent} />
          : <QuickSorting key={keyValue()} reload={reloadContent} />;
      case 'Merge Sorting':
        return (reload) ? <MergeSorting key={1} reload={reloadContent} order={order} setOrder={setOrder} />
          : <MergeSorting key={2} reload={reloadContent} order={order} setOrder={setOrder} />;
      case 'Selection Sorting':
        return (reload) ? <SelectionSorting key={1} reload={reloadContent} />
          : <SelectionSorting key={2} reload={reloadContent} />;
      case 'Bubble Sorting':
        return (reload) ? <BubbleSorting key={1} reload={reloadContent} />
          : <BubbleSorting key={2} reload={reloadContent} />;
      case 'Insertion Sorting':
        return (reload) ? <InsertionSorting key={1} reload={reloadContent} />
          : <InsertionSorting key={2} reload={reloadContent} />;

      default:
        return null;
    }
  }
  return (
    <div style={{ width: '100%', height: 'calc(100% - 2em)', overflow: 'auto' }}>
      {renderContentSorting()}
    </div>
  );
}
