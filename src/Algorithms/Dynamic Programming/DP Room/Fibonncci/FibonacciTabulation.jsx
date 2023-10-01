/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
/* eslint-disable no-continue */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
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
import keyValue from '../../../Components/GenerateKey';
import './FibonacciTabulation.scss';
import PolygonWithCenteredText from './Tabulation Components/PolygonWithCenteredText';
import TableIndexex from './Tabulation Components/TableIndexes';
import TermInfo from './Tabulation Components/TermInfo';

export default function FibonacciTabulation({ reload }) {
  const [isIntervalActive, setIsIntervalActive] = useState(false);
  const [num, setNum] = useState(5);
  const [range, setRange] = useState(3);
  const [numText, setNumText] = useState('');
  const [executionStop, setExecutionStop] = useState(false);
  const [delay, setDelay] = useState(500);
  const nodes = [];
  const listOfBoxes = new Array([]);
  const tableIndexes = new Array([]);
  const dpRenderValues = new Map();
  let col = 0;
  let interval = null;
  const maxCols = parseInt(num, 10);

  for (let j = 2; j <= (maxCols + 2); j += 1) {
    tableIndexes.push([j * 9 + 11, 3 * 6.5, col]);
    col += 1;
    listOfBoxes.push([(j * 9.05) + 1, (3 * 6.01) + 1]);
  }

  function fibonacciTabulation(n) {
    if (n <= 1) { return n; }
    const f = {};
    f[0] = 0;
    nodes.push(`${1 * 9.05 + 1},${(3 * 6.01) + 1}`);
    dpRenderValues.set(`${1 * 9.05 + 1},${(3 * 6.01) + 1}`, f[0]);
    f[1] = 1;
    nodes.push(`${2 * 9.05 + 1},${(3 * 6.01) + 1}`);
    dpRenderValues.set(`${2 * 9.05 + 1},${(3 * 6.01) + 1}`, f[1]);
    for (let i = 2; i <= n; i += 1) {
      f[i] = f[i - 2] + f[i - 1];
      nodes.push(`${(i + 1) * 9.05 + 1},${(3 * 6.01) + 1}`);
      dpRenderValues.set(`${(i + 1) * 9.05 + 1},${(3 * 6.01) + 1}`, f[i]);
    }

    return f[n];
  }
  nodes.push('');
  fibonacciTabulation(num);

  useEffect(() => {
    if (isIntervalActive && range > 0 && range < nodes.length - 1) {
      let counter = range;
      interval = setInterval(() => {
        counter += 1;
        if (counter === nodes.length - 1) {
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

  const handleToggleInterval = (event) => {
    if (event.target.id) {
      setRange(3);
    }
    setIsIntervalActive((prev) => !prev);
  };

  const handleChangePlus = () => {
    if (range === nodes.length - 1) return;
    setRange((prev) => prev + 1);
    setIsIntervalActive(false);
  };
  const handleChangeMinus = () => {
    if (range === 3 || isIntervalActive || num === 0) return;
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

    if (!numText) {
      toast.info('Input is Empty!');
      return;
    }
    if (!(numText >= 3 && numText <= 20)) {
      toast.info('Range is 3 - 20 for better Experiance!');
      return;
    }

    if (!numText) { setNum(num); } else {
      setNum(numText);
    }
    setNumText('');
    setRange(3);
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

  return (
    <div className="svgContainerFT">
      <ToastContainer position="top-center" autoClose={3500} />
      <TermInfo txt="0-1 Fibonacci Bottom-Up approach" />
      <svg viewBox={`0 0 ${(maxCols + 3.5) * 9} ${(5 + 4) * 6}`}>
        <text
          x={((maxCols + 1) * 9) / 2}
          y={5}
          style={{
            alignmentBaseline: 'central',
            fontSize: '3px',
            fontWeight: 'bold',
          }}
        >
          DP Tabulation Approach
        </text>
        {listOfBoxes.map((value, index) => (
          <PolygonWithCenteredText
            key={keyValue()}
            x={value[0]}
            y={value[1]}
            dpRenderValue={dpRenderValues}
            nodes={nodes}
            index={index}
            range={range}
          />
        ))}
        {tableIndexes.map((value) => (
          <TableIndexex key={keyValue()} x={value[0]} y={value[1]} i={value[2]} />))}
      </svg>
      <div style={{
        display: 'flex', alignItems: 'center', justifyItems: 'center', position: 'relative',
      }}
      >

        <button type="button" className="controlbuttonRun" onClick={reload}>Clear</button>
        <input type="text" className="controlInput" value={numText} onChange={onChangeHandleInput} placeholder={`Number ${num}`} />
        <button type="button" className="controlbuttonRun" onClick={handleChangeRun}>Run</button>
        <button type="button" className="controlbutton" onClick={handleChangePlus}> <FontAwesomeIcon icon={faForward} className="controlFont" /></button>
        {executionStop ? <FontAwesomeIcon icon={faHandPointUp} beat className="executionStopKT" /> : null}
        <button type="button" className="controlbutton" onClick={handleToggleInterval}>{!isIntervalActive ? (range === nodes.length - 1)
          ? <FontAwesomeIcon id="replay" icon={faArrowRotateLeft} className="controlFont" />
          : <FontAwesomeIcon icon={faPlay} className="controlFont" /> : <FontAwesomeIcon icon={faPause} className="controlFont" />}
        </button>
        <button type="button" className="controlbutton" onClick={handleChangeMinus}> <FontAwesomeIcon icon={faBackward} className="controlFont" /></button>
        <button type="button" className="controlbutton" onClick={handleChangeSpeedUp}>
          <div className="speedBar" style={{ width: `${76 - (75 * (delay / 1100))}px` }} /> <FontAwesomeIcon icon={faPlus} className="controlFont" />
        </button>
        <button type="button" className="controlbutton" onClick={handleChangeSpeedDown}> <FontAwesomeIcon icon={faMinus} className="controlFont" /></button>
      </div>

    </div>
  );
}
