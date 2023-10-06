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
import MergeNodes from './MergeSort Components/MergeNodes';
import './MergeSorting.scss';

export default function MergeSorting({ reload }) {
  const [isIntervalActive, setIsIntervalActive] = useState(false);
  const [range, setRange] = useState(1);
  const [executionStop, setExecutionStop] = useState(false);
  const [arrayMergeText, setArrayMergeText] = useState('[1, 7, 4, 1, 10, 9, -2]');
  const [arrayMerge, setArrayMerge] = useState([1, 7, 4, 1, 10, 9, -2]);
  const [delay, setDelay] = useState(500);
  const arr = [...arrayMerge];
  const nodes = [];
  const maxLeftPosOfDepth = [8];

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

  function NodeArrayInsert(x, y, i, j) {
    let xi = x;
    const apartNodes = new Array([]);
    for (let n = i; n <= j; n += 1) {
      apartNodes.push(<MergeNodes x={xi} y={y} value={arr[n]} />);
      xi += 4;
    }
    nodes.push(apartNodes);
  }

  function merge(l, m, r) {
    const n1 = m - l + 1;
    const n2 = r - m;

    const L = new Array(n1);
    const R = new Array(n2);

    for (let i = 0; i < n1; i += 1) { L[i] = arr[l + i]; }
    for (let j = 0; j < n2; j += 1) { R[j] = arr[m + 1 + j]; }

    let i = 0;
    let j = 0;
    let k = l;

    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i += 1;
      } else {
        arr[k] = R[j];
        j += 1;
      }
      k += 1;
    }

    while (i < n1) {
      arr[k] = L[i];
      i += 1;
      k += 1;
    }

    while (j < n2) {
      arr[k] = R[j];
      j += 1;
      k += 1;
    }
  }

  function mergeSort(l, r, depth) {
    if (l >= r) {
      NodeArrayInsert(maxLeftPosOfDepth[0], depth, l, r);
      maxLeftPosOfDepth[0] += 4;
      return maxLeftPosOfDepth[0];
    }
    const m = l + parseInt((r - l) / 2, 10);
    const left = mergeSort(l, m, depth + 5);
    maxLeftPosOfDepth[0] += 4;
    const right = mergeSort(m + 1, r, depth + 5);
    merge(l, m, r);

    maxLeftPosOfDepth[0] = Math.max(maxLeftPosOfDepth[0], Math.max(left, right)) + 4;
    NodeArrayInsert((left + right) / 2 - ((r - l + 2) / 2) * 4, depth, l, r);
    return (left + right) / 2;
  }

  const arrSize = arr.length;
  mergeSort(0, arrSize - 1, 3);

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
    const checkArray = getAbsoluteArray(arrayMergeText);
    if (checkArray === null) {
      toast.error("Arrays arn't Valide!");
      return;
    }

    setArrayMerge(checkArray);

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
      case 'ArrayMergeInput':
        setArrayMergeText(event.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="ContainerMergeSort">
      <ToastContainer position="top-center" autoClose={3500} />
      <div className="svgContainerMergeSort">
        <svg viewBox={`0 0 ${maxLeftPosOfDepth[0]} 65`}>
          {nodes.slice(0, range)}
        </svg>
      </div>
      <label htmlFor="ArrayMergeInput" className="ArrayMergeLabel">
              &nbsp;&nbsp;ArrayMerge:&nbsp;
        <input type="text" id="ArrayMergeInput" className="ArrayMerge" value={arrayMergeText} onChange={onChangeHandleInputProfitWeight} />
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
