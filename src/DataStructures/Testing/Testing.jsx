/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import './Testing.scss';

function App() {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
    { id: 4, text: 'Item 4' },
    { id: 5, text: 'Item 5' },
  ]);

  const handleDeleteFirst = () => {
    setItems((prevItems) => prevItems.slice(1));
  };

  const handleDeleteLast = () => {
    setItems((prevItems) => prevItems.slice(0, prevItems.length - 1));
  };

  return (
    <div className="containerT">
      <div className="list">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="listItem"
            style={{ left: `${index * 60}px` }}
          >
            {item.text}
          </div>
        ))}
      </div>
      <button onClick={handleDeleteFirst}>Delete First</button>
      <button onClick={handleDeleteLast}>Delete Last</button>
      <div className="arrow-container">
        <div className="arrow" />
      </div>

    </div>
  );
}

export default App;
