import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import AceEditor from 'react-ace';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CarouselDP({ setHaveSelect }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecursionActive, setIsRecursionActive] = useState(false);
  const [isRecursionStyle, setIsRecursionStyle] = useState(null);
  const [isTabulationActive, setIsTabulationActive] = useState(false);
  const [isTabulationStyle, setIsTabulationStyle] = useState(null);
  const [copy, setCopy] = useState(false);
  const [code, setCode] = useState(`import collections # Optional line

def fibonacci(n):
    if n == 0 or n == 1:
        return n

    return fibonacci(n-1) + fibonacci(n-2)

fibonacci(int(input("Enter Value: ")))

`);
  const editorRef = useRef(null);
  const items = [
    'Fibonacci',
    '0-1Knapsack',
  ];
  function changeCode(index, end) {
    let endString = end;
    if (isRecursionActive && end === '') endString = 'Recursion';
    if (isTabulationActive && end === '') endString = 'Tabulation';
    switch (`${items[index]}${endString}`) {
      case 'Fibonacci':
        setCode(`import collections # Optional line

def fibonacci(n):
    if n == 0 or n == 1:
        return n

    return fibonacci(n-1) + fibonacci(n-2)

number = int(input("Enter Number: "))
fibonacci(number)
        
        `);
        break;
      case 'FibonacciRecursion':
        setCode(`import collections # Optional line

def fibonacciRecursion(n):
    if n == 0 or n == 1:
        return n

    return fibonacciRecursion(n-1) + fibonacciRecursion(n-2)

number = int(input("Enter Number: "))
fibonacciRecursion(number)
        
        `);
        break;
      case 'FibonacciTabulation':
        setCode(`import collections # Optional line

def fibonacciTabulation(n):
    if n == 0 or n == 1:
        return n

    return fibonacci(n-1) + fibonacci(n-2)

number = int(input("Enter Value: "))
fibonacciTabulation(number)
        
        `);
        break;
      case '0-1Knapsack':
        setCode(`import collections # Optional line

def Knapsack(n):
    if n == 0 or n == 1:
        return n

    return fibonacci(n-1) + fibonacci(n-2)

fibonacci(int(input("Enter Value: ")))
        
        `);
        break;
      case '0-1KnapsackRecursion':
        setCode(`def KnapsackRecursion(i, s):
    if i == n:
        return 0
    if s < 0:
        return -inf

    return max(KnapsackRecursion(i+1, s), profits[i] + KnapsackRecursion(i+1, s - weights[i]))

n = 4
W = int(input("Enter Bag Capacity: "))
profits = [50, 70, 20, 28]
weigths = [4, 7, 2, 8]
answer = KnapsackRecursion(i, W)
print(answer)
`);
        break;
      case '0-1KnapsackTabulation':
        setCode(`import collections # Optional line

def KnapsackTabulation(n):
    if n == 0 or n == 1:
        return n

    return fibonacci(n-1) + fibonacci(n-2)

fibonacci(int(input("Enter Value: ")))
        
        `);
        break;
      default:
        break;
    }
  }
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
    changeCode((currentIndex + 1) % items.length, '');
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
    changeCode(currentIndex === 0 ? items.length - 1 : currentIndex - 1, '');
  };
  const mouseEntered = (event) => {
    event.preventDefault();
    switch (event.target.id && !(isRecursionActive || isTabulationActive)) {
      case 'recursion':
        setIsRecursionActive(true);
        setIsRecursionStyle({
          color: '#ffffff',
          backgroundColor: '#f77153',
          border: '1px solid rgb(255, 0, 0)',
        });
        break;
      case 'tabulation':
        setIsTabulationActive(true);
        setIsTabulationStyle({
          color: '#ffffff',
          backgroundColor: '#f77153',
          border: '1px solid rgb(255, 0, 0)',
        });
        break;
      default:
        break;
    }
  };
  const mouseLeftOver = (event) => {
    event.preventDefault();
    switch (event.target.id && !(isRecursionActive || isTabulationActive)) {
      case 'recursion':
        setIsRecursionActive(false);
        setIsRecursionStyle(null);
        break;
      case 'tabulation':
        setIsTabulationActive(false);
        setIsTabulationStyle(null);
        break;
      default:
        break;
    }
  };

  const selectButtonHandle = (event) => {
    event.preventDefault();
    switch (event.target.id) {
      case 'recursion':
        setIsRecursionActive(true);
        setIsTabulationActive(false);
        setIsTabulationStyle(null);
        setIsRecursionStyle({
          color: '#ffffff',
          backgroundColor: 'rgb(0, 189, 9)',
          border: '1px solid rgb(1 163 9)',
        });
        changeCode(currentIndex, 'Recursion');
        break;
      case 'tabulation':
        setIsTabulationActive(true);
        setIsRecursionActive(false);
        setIsRecursionStyle(null);
        setIsTabulationStyle({
          color: '#ffffff',
          backgroundColor: 'rgb(0, 189, 9)',
          border: '1px solid rgb(1 163 9)',
        });
        changeCode(currentIndex, 'Tabulation');
        break;
      default:
        break;
    }
  };

  const goButton = () => {
    if (!isRecursionActive && !isTabulationActive) {
      toast.info('Select Any! Either Recursion or Tabulation.');
    } else if (isRecursionStyle) setHaveSelect(`${items[currentIndex]}Recursion`);
    else if (isTabulationStyle) setHaveSelect(`${items[currentIndex]}Tabulation`);
  };

  return (
    <div className="carouselDP">
      <div className="codeContainerDP">
        <AceEditor
          className="aceEditorDP"
          ref={editorRef}
          mode="python"
          theme="github"
          value={code}
          onChange={(value) => setCode(value)}
        />
        <button className="copyDP" type="button" onClick={handleCopy} style={{ display: 'block', color: (copy) ? '#08aa02' : 'black' }}>
          <FontAwesomeIcon icon={faCopy} style={(copy) ? { color: '#08aa02' } : null} /> {(!copy) ? 'Copy' : 'Copied!'}
        </button>
      </div>
      <div className="carousel-item">{items[currentIndex]}</div>
      <ToastContainer position="top-center" />
      <div className="buttonDPs">
        <button type="button" className="previous" onClick={goToPrev}>Previous</button>
        <button id="recursion" type="button" onClick={selectButtonHandle} onMouseEnter={mouseEntered} onMouseLeave={mouseLeftOver} style={isRecursionStyle}>Recursion</button>
        <button id="tabulation" type="button" onClick={selectButtonHandle} onMouseEnter={mouseEntered} onMouseLeave={mouseLeftOver} style={isTabulationStyle}>Tabulation</button>
        <button type="button" className="next" onClick={goToNext}>Next</button>
        <button type="button" className="go" onClick={goButton}>Go</button>
      </div>
    </div>
  );
}

export default CarouselDP;
