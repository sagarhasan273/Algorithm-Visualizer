/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import './Testing.scss';

export default function App() {
  const [isVisible, setIsVisible] = useState(true);
  const handleClick = () => {
    setIsVisible(false);
  };
  return (
    <div>
      {(isVisible) ? (
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleClick}>&times;</span>
            <div className="email text-center">
              hello
            </div>
          </div>
        </div>
      ) : <div>hello</div>}
    </div>
  );
}
