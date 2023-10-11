/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-constant-condition */
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
import QuickPrinting from './QuickSort Components/QuickPrinting';
import './QuickSorting.scss';

export default function QuickSorting({ reload }) {
  const [isIntervalActive, setIsIntervalActive] = useState(false);

  const [range, setRange] = useState(1);

  const [executionStop, setExecutionStop] = useState(false);
  const [arrayQuickText, setArrayQuickText] = useState('[1, 7, 4, 1, 10, 9, -2, 5, 2, 9, 3, 4, 6, 8, 1, 7]');
  const [arrayQuick, setArrayQuick] = useState([1, 7, 4, 1, 10, 9, -2, 5, 2, 9, 3, 4, 6, 8, 1, 7]);
  const [delay, setDelay] = useState(500);
  const nodes = [];
  const mostLeftDepthPos = {};
  const nodesInPositions = {};
  const svgWeightHeight = [0, 0];

  const arr = [...arrayQuick];

  let interval = null;

  function getAbsoluteArray(string) {
    let array = null;
    try {
      array = JSON.parse(string);
    } catch (err) {
      toast.error(err);
    }
    return array;
  }

  function NodesArrayInsert(l, h, p, d) {
    let newArray = new Array([]);
    if (mostLeftDepthPos[d] === undefined) { mostLeftDepthPos[d] = 5; }
    nodes.push(`${p}+${p}`);
    newArray.push([mostLeftDepthPos[d] + 5 * (p + 1) + 1, d, arr[p], p]);
    nodesInPositions[`${p}+${p}`] = [];
    nodesInPositions[`${p}+${p}`].push(newArray);

    newArray = new Array([]);
    nodes.push(`${l}+${p - 1}`);
    nodesInPositions[`${l}+${p - 1}`] = [];
    for (let i = l; i < p; i += 1) {
      newArray.push([mostLeftDepthPos[d] + (5 * (i + 1)), d, arr[i], i]);
    }
    nodesInPositions[`${l}+${p - 1}`].push(newArray);

    newArray = new Array([]);
    for (let i = p + 1; i <= h; i += 1) {
      newArray.push([mostLeftDepthPos[d] + (5 * (i + 1)) + 2, d, arr[i], i]);
      svgWeightHeight[1] = Math.max(svgWeightHeight[1], mostLeftDepthPos[d] + (5 * (i + 1)) + 2);
    }
    nodes.push(`${p + 1}+${h}`);
    nodesInPositions[`${p + 1}+${h}`] = [];
    nodesInPositions[`${p + 1}+${h}`].push(newArray);
    mostLeftDepthPos[d] += 5;
  }

  function partition(low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j <= high - 1; j += 1) {
      if (arr[j] <= pivot) {
        i += 1;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    return i + 1;
  }

  function quickSort(low, high, depth) {
    svgWeightHeight[0] = Math.max(svgWeightHeight[0], depth);
    if (low < high) {
      const pi = partition(low, high, depth);
      NodesArrayInsert(low, high, pi, depth);
      quickSort(low, pi - 1, depth + 8);
      quickSort(pi + 1, high, depth + 8);
    }
  }

  const arrSize = arr.length;
  const newArr = new Array([]);
  if (mostLeftDepthPos[8] === undefined) { mostLeftDepthPos[8] = 5; }
  nodes.push(`${0}+${arrSize - 1}`);
  nodesInPositions[`${0}+${arrSize - 1}`] = [];
  for (let i = 0; i < arrSize; i += 1) {
    newArr.push([mostLeftDepthPos[8] + (5 * (i + 1)), 8, arr[i], i]);
  }
  nodesInPositions[`${0}+${arrSize - 1}`].push(newArr);
  quickSort(0, arrSize - 1, 16);

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
    const checkArray = getAbsoluteArray(arrayQuickText);
    if (checkArray === null) {
      toast.error("Arrays arn't Valide!");
      return;
    }

    setArrayQuick(checkArray);

    setRange(1);
    setIsIntervalActive(true);
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
      case 'ArrayQuickInput':
        setArrayQuickText(event.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="ContainerquickSort">
      <ToastContainer position="top-center" autoClose={3500} />
      <div className="svgContainerquickSort">
        <svg viewBox={`0 0 ${svgWeightHeight[1] + 15} ${svgWeightHeight[0] + 8}`}>
          <QuickPrinting nodes={nodes.slice(0, range)} nodesInPositions={nodesInPositions} />
        </svg>
      </div>
      <label htmlFor="ArrayQuickInput" className="ArrayQuickLabel">
              &nbsp;&nbsp;ArrayQuick:&nbsp;
        <input type="text" id="ArrayQuickInput" className="ArrayQuick" value={arrayQuickText} onChange={onChangeHandleInputProfitWeight} />
      </label>
      <div style={{
        display: 'flex', alignItems: 'center', justifyItems: 'center', position: 'relative',
      }}
      >
        <button type="button" className="controlbuttonRun" onClick={reload}>Clear</button>
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
