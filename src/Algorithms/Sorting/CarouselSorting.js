/* eslint-disable max-len */
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import AceEditor from 'react-ace';
import 'react-toastify/dist/ReactToastify.css';
import changeCode from './Sorting Components/ChangeCode';

function CarouselSorting({ setHaveSelect }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [whichSort, setLinearSorting] = useState(false);
  const [ascending, setAscending] = useState(true);
  const [copy, setCopy] = useState(false);
  const [code, setCode] = useState(`def partition(array, low, high):
    pivot = array[high]
    i = low - 1

    for j in range(low, high):
        if array[j] <= pivot:
            i = i + 1
            (array[i], array[j]) = (array[j], array[i])

    (array[i + 1], array[high]) = (array[high], array[i + 1])

    return i + 1
    
def quickSort(array, low, high):
    if low < high:
        di = partition(array, low, high)
        quickSort(array, low, di - 1)
        quickSort(array, di + 1, high)

array = [1, 7, 4, 1, 10, 9, -2]
print("Unsorted Array")
print(array)

length = len(array)

quickSort(array, 0, length - 1)
  
print('Sorted Array in Ascending Order:')
print(array)
`);
  const editorRef = useRef(null);
  const items = [
    'Quick Sorting',
    'Merge Sorting',
    'Selection Sorting',
    'Insertion Sorting',
    'Bubble Sorting',
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
    setLinearSorting(items[(currentIndex + 1) % items.length]);
    changeCode(items[(currentIndex + 1) % items.length], ascending, setCode);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
    setLinearSorting(items[(currentIndex === 0 ? items.length - 1 : currentIndex - 1)]);
    changeCode(items[(currentIndex === 0 ? items.length - 1 : currentIndex - 1)], ascending, setCode);
  };

  const goButton = () => {
    if (whichSort) setHaveSelect(`${items[currentIndex]}`);
    else setHaveSelect(`${items[currentIndex]}`);
  };

  const ascendingDescendingHandle = (event) => {
    event.preventDefault();
    if (event.target.id === 'ascending') {
      setAscending(true);
      changeCode(items[currentIndex], true, setCode);
    } else {
      setAscending(false);
      changeCode(items[currentIndex], false, setCode);
    }
  };

  return (
    <div className="carouselSorting">
      <div className="codeContainerSorting">
        <AceEditor
          className="aceEditorSorting"
          ref={editorRef}
          mode="python"
          theme="github"
          value={code}
          onChange={(value) => setCode(value)}
        />
        <button className="copySorting" type="button" onClick={handleCopy} style={{ display: 'block', color: (copy) ? '#08aa02' : 'black' }}>
          <FontAwesomeIcon icon={faCopy} style={(copy) ? { color: '#08aa02' } : null} /> {(!copy) ? 'Copy' : 'Copied!'}
        </button>
      </div>
      <div className="carousel-item">{items[currentIndex]}</div>
      <div className="buttonSortings">
        <button type="button" className="previous" onClick={goToPrev}>Previous</button>
        <button type="button" id="ascending" className={`order ${ascending ? 'active' : ''}`} onClick={ascendingDescendingHandle}>Ascending</button>
        <button type="button" id="descending" className={`order ${!ascending ? 'active' : ''}`} onClick={ascendingDescendingHandle}>Descending</button>
        <button type="button" className="go" onClick={goButton}>Go</button>
        <button type="button" className="next" onClick={goToNext}>Next</button>
      </div>
    </div>
  );
}

export default CarouselSorting;
