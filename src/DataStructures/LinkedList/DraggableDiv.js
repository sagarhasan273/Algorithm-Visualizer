/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useState } from 'react';

export default function DraggableDiv(props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 });
  const { className } = props;

  useEffect(() => {
    function handleMouseMove(event) {
      if (dragging) {
        setPosition({
          x: event.clientX - cursorOffset.x,
          y: event.clientY - cursorOffset.y,
        });
      }
    }

    function handleMouseUp() {
      setDragging(false);
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, cursorOffset]);

  function handleMouseDown(event) {
    console.log(event.target.className);
    setDragging(true);
    setCursorOffset({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    });
  }

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: 'red',
        cursor: `${dragging ? 'grabbing' : 'grab'}`,
      }}
      onMouseDown={handleMouseDown}
    />
  );
}
