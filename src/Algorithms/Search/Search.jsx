/* eslint-disable no-constant-condition */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import keyValue from '../Components/GenerateKey';
import BinarySearch from './BinarySearch';
import CarouselSearch from './CarouselSearch';
import LinearSearch from './LinearSearch';
import './Search.scss';

export default function Search() {
  const [haveSelect, setHaveSelect] = useState('');
  const [reload, setReload] = useState(true);
  const handleClick = () => {
    setHaveSelect(null);
  };
  const reloadContent = () => {
    setReload((prev) => !prev);
  };
  function renderContentSearch() {
    switch (haveSelect) {
      case '':
        return (
          <div className="termsMenu">
            <div className="termsMenu-content">
              <span className="close" onClick={handleClick}>&times;</span>
              <CarouselSearch setHaveSelect={setHaveSelect} />
            </div>
          </div>
        );

      case 'Binary Search':
        return (reload) ? <BinarySearch key={keyValue()} reload={reloadContent} />
          : <BinarySearch key={keyValue()} reload={reloadContent} />;
      case 'Linear Search':
        return (reload) ? <LinearSearch key={1} reload={reloadContent} />
          : <LinearSearch key={2} reload={reloadContent} />;

      default:
        return null;
    }
  }
  return (
    <div style={{ width: '100%', height: 'calc(100% - 2em)', overflow: 'auto' }}>
      {renderContentSearch()}
    </div>
  );
}
