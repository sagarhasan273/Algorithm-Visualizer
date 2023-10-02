import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import AceEditor from 'react-ace';
import 'react-toastify/dist/ReactToastify.css';
import changeCode from './BinaryComponent/ChangeCode';

function CarouselSearch({ setHaveSelect }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLinearSearch, setLinearSearch] = useState(false);
  const [copy, setCopy] = useState(false);
  const [code, setCode] = useState(`import collections # Optional line

def LinearSearch(numbers, target):
    for i in range(len(numbers)):
        if numbers[i] == target:
            return True

    return False

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
target = int(input("Enter target: "))
LinearSearch(numbers, target)

`);
  const editorRef = useRef(null);
  const items = [
    'Linear Search',
    'Binary Search',
  ];

  const handleCopy = () => {
    if (editorRef.current) {
      const codePy = editorRef.current.editor.getValue();
      navigator.clipboard.writeText(codePy);
    }
    setCopy(true);
    const interval = setTimeout(() => {
      setCopy(false);
      clearInterval(interval);
    }, 2000);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    changeCode(isLinearSearch, setCode);
    setLinearSearch((prev) => !prev);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
    changeCode(isLinearSearch, setCode);
    setLinearSearch((prev) => !prev);
  };

  const goButton = () => {
    if (isLinearSearch) setHaveSelect(`${items[currentIndex]}`);
    else setHaveSelect(`${items[currentIndex]}`);
  };

  return (
    <div className="carouselSearch">
      <div className="codeContainerSearch">
        <AceEditor
          className="aceEditorSearch"
          ref={editorRef}
          mode="python"
          theme="github"
          value={code}
          onChange={(value) => setCode(value)}
        />
        <button className="copySearch" type="button" onClick={handleCopy} style={{ display: 'block', color: (copy) ? '#08aa02' : 'black' }}>
          <FontAwesomeIcon icon={faCopy} style={(copy) ? { color: '#08aa02' } : null} /> {(!copy) ? 'Copy' : 'Copied!'}
        </button>
      </div>
      <div className="carousel-item">{items[currentIndex]}</div>
      <div className="buttonSearchs">
        <button type="button" className="previous" onClick={goToPrev}>Previous</button>
        <button type="button" className="go" onClick={goButton}>Go</button>
        <button type="button" className="next" onClick={goToNext}>Next</button>
      </div>
    </div>
  );
}

export default CarouselSearch;
