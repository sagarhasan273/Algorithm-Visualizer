/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  faArrowRotateLeft,
  faBackward, faForward,
  faHandPointUp,
  faMinus,
  faPause, faPlay,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import keyValue from '../Components/GenerateKey';
import PolygonWithCenteredText from './BinaryComponent/PolygonWithCenteredText';
import './BinarySearch.scss';

export default function BinarySearch({ reload }) {
  const [isIntervalActive, setIsIntervalActive] = useState(false);
  const [num, setNum] = useState(5);
  const [range, setRange] = useState(1);
  const [numText, setNumText] = useState('');
  const [executionStop, setExecutionStop] = useState(false);
  const [binaryArrayText, setBinaryArrayText] = useState('[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]');
  const [binaryArray, setbinaryArray] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]);
  const [delay, setDelay] = useState(500);
  const nodes = [];

  let interval = null;
  const maxCols = parseInt(num, 10);

  function getAbsoluteArray(string) {
    let array = null;
    try {
      array = JSON.parse(string);
    } catch (err) {
      toast.error(err);
    }
    return array;
  }

  function ListOfBoxesFill(x, y, r, mid) {
    const demmo = new Array([]);
    for (let i = x; i <= y; i += 1) {
      demmo.push(<PolygonWithCenteredText
        key={keyValue()}
        x={((i + 2) * 9) + 1}
        y={((r + 0.5) * 15) + 1}
        value={binaryArray[i]}
        i={i}
        range={range}
        left={i === x}
        right={i === y}
        mid={mid ? mid === i : false}
      />);
    }
    nodes.push(demmo);
  }

  function binSearch(target) {
    let low = 0;
    let high = binaryArray.length - 1;
    let j = 0;

    while (low <= high) {
      ListOfBoxesFill(low, high, j, null);
      const mid = low + Math.floor((high - low) / 2);
      ListOfBoxesFill(low, high, j, mid);
      j += 1;
      if (binaryArray[mid] === target) {
        if (low !== mid || high !== mid) { ListOfBoxesFill(mid, mid, j, mid); }
        return true;
      }

      if (binaryArray[mid] > target) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    return false;
  }

  const targetFound = binSearch(maxCols);

  useEffect(() => {
    if (isIntervalActive && range > 0 && range < nodes.length - 1) {
      let counter = range;
      interval = setInterval(() => {
        counter += 1;
        if (counter === nodes.length) {
          clearInterval(interval);
          setIsIntervalActive((prev) => !prev);
        } setRange((prevCount) => prevCount + 1);
      }, delay);
    } else {
      clearInterval(interval);
      setIsIntervalActive(false);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isIntervalActive]);

  const handleToggleInterval = () => {
    if (range === nodes.length) { setRange(1); }
    setIsIntervalActive((prev) => !prev);
  };

  const handleChangePlus = () => {
    if (range === nodes.length || isIntervalActive) return;
    setRange((prev) => prev + 1);
  };
  const handleChangeMinus = () => {
    if (range <= 1 || isIntervalActive) return;
    setRange((prev) => prev - 1);
    setIsIntervalActive(false);
  };
  const handleChangeRun = (e) => {
    e.preventDefault();
    if (isIntervalActive) {
      let ecounter = 0;
      setExecutionStop(true);
      const executeInterval = setInterval(() => {
        if (ecounter) {
          setExecutionStop(false);
          clearInterval(executeInterval);
        }
        ecounter += 1;
      }, 1500);
      return;
    }
    const profitArray = getAbsoluteArray(binaryArrayText);
    if (profitArray === null) {
      toast.error("Arrays arn't Valide!");
      return;
    }
    if (!numText) {
      toast.info('Target is Empty!');
      return;
    }
    if (!(numText >= 1 && numText <= 50)) {
      toast.info('Target range is 1 - 50 for better Experiance!');
      return;
    }

    setbinaryArray(profitArray);
    if (!numText) { setNum(num); } else {
      setNum(numText);
    }
    setNumText('');
    setRange(1);
    setIsIntervalActive(true);
  };

  const onChangeHandleInput = (event) => {
    event.preventDefault();
    setNumText(event.target.value);
  };

  const handleChangeSpeedUp = () => {
    if (delay <= 0) return;
    setDelay((prev) => prev - 100);
    setIsIntervalActive(false);
  };

  const handleChangeSpeedDown = () => {
    if (delay >= 1000) return;
    setDelay((prev) => prev + 100);
    setIsIntervalActive(false);
  };

  const onChangeHandleInputProfitWeight = (event) => {
    switch (event.target.id) {
      case 'binaryArrayInput':
        setBinaryArrayText(event.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="svgContainerBS">
      <ToastContainer position="top-center" autoClose={3500} />
      <svg viewBox={`0 0 ${(binaryArray.length + 4) * 9} ${(binaryArray.length / 2 + 0.8) * 9}`}>
        {nodes.slice(0, range)}
        <text
          x={((binaryArray.length + 2) * 9) / 2}
          y={(binaryArray.length / 2 + 0.5) * 9}
          style={{
            alignmentBaseline: 'central',
            fontSize: '4px',
            fontWeight: '500',
          }}
        >
          Target: {num} {range === nodes.length
          ? targetFound ? 'Found!' : 'Not Found!' : null}
        </text>
      </svg>
      <label htmlFor="binaryArrayInput" className="binaryArrayLabel">
              &nbsp;&nbsp;BinaryArray:&nbsp;
        <input type="text" id="binaryArrayInput" className="binaryArray" value={binaryArrayText} onChange={onChangeHandleInputProfitWeight} />
      </label>
      <div style={{
        display: 'flex', alignItems: 'center', justifyItems: 'center', position: 'relative',
      }}
      >
        <button type="button" className="controlbuttonRun" onClick={reload}>Clear</button>
        <input type="text" className="controlInput" value={numText} onChange={onChangeHandleInput} placeholder={`Target ${num}`} />
        <button type="button" className="controlbuttonRun" onClick={handleChangeRun}>Run</button>
        <button type="button" className="controlbutton" onClick={handleChangePlus}> <FontAwesomeIcon icon={faForward} className="controlFont" /></button>
        {executionStop ? <FontAwesomeIcon icon={faHandPointUp} beat className="executionStopKT" /> : null}
        <button type="button" className="controlbutton" onClick={handleToggleInterval}>{!isIntervalActive ? (range === 0) ? <FontAwesomeIcon icon={faArrowRotateLeft} className="controlFont" /> : <FontAwesomeIcon icon={faPlay} className="controlFont" /> : <FontAwesomeIcon icon={faPause} className="controlFont" />}</button>
        <button type="button" className="controlbutton" onClick={handleChangeMinus}> <FontAwesomeIcon icon={faBackward} className="controlFont" /></button>
        <button type="button" className="controlbutton" onClick={handleChangeSpeedUp}>
          <div className="speedBar" style={{ width: `${76 - (75 * (delay / 1100))}px` }} /> <FontAwesomeIcon icon={faPlus} className="controlFont" />
        </button>
        <button type="button" className="controlbutton" onClick={handleChangeSpeedDown}> <FontAwesomeIcon icon={faMinus} className="controlFont" /></button>
      </div>

    </div>
  );
}
