/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';

function LinkedListNode({
  value, x, y, opacity,
}) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        opacity,
        transition: 'all 0.5s',
        backgroundColor: '#eee',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {value}
    </div>
  );
}

function LinkedList() {
  const [nodes, setNodes] = useState([]);

  function addNode() {
    const newNode = { value: 'New Node' };
    setNodes([...nodes, newNode]);
  }

  useEffect(() => {
    if (nodes.length > 0) {
      const node = nodes[nodes.length - 1];
      let x = 0;
      let y = 0;
      let opacity = 0;

      const interval = setInterval(() => {
        x += 5;
        y += 5;
        opacity += 0.1;

        if (x >= 100 && y >= 100 && opacity >= 1) {
          clearInterval(interval);
          setNodes([...nodes, node]);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [nodes]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <button type="button" onClick={addNode}>Add Node</button>
      {nodes.map((node, index) => (
        <LinkedListNode
          key={index}
          value={node.value}
          x={index * 100}
          y={index * 100}
          opacity={1}
        />
      ))}
    </div>
  );
}

export default LinkedList;
