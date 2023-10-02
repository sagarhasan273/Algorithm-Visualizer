/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import {
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
import PolygonWithCenteredTextLinear from './BinaryComponent/PolygonWithCenteredTextLinear';
import './LinearSearch.scss';

export default function LinearSearch({ reload }) {
  const [isIntervalActive, setIsIntervalActive] = useState(false);
  const [num, setNum] = useState(5);
  const [range, setRange] = useState(0);
  const [numText, setNumText] = useState('');
  const [executionStop, setExecutionStop] = useState(false);
  const [linearArrayText, setlinearArrayText] = useState('[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]');
  const [linearArray, setlinearArray] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]);
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

  function ListOfBoxesFill(y, r, mid) {
    const demmo = new Array([]);
    for (let i = 0; i <= y; i += 1) {
      demmo.push(<PolygonWithCenteredTextLinear
        key={keyValue()}
        x={((i + 1) * 9) + 1}
        y={((r + 0.5) * 15) + 1}
        value={linearArray[i]}
        i={i}
        range={range}
        mid={mid}
      />);
    }
    nodes.push(demmo);
  }

  function binSearch(target) {
    for (let i = 0; i < linearArray.length; i += 1) {
      ListOfBoxesFill(linearArray.length - 1, 1, i);
      if (linearArray[i] === target) {
        ListOfBoxesFill(linearArray.length - 1, 1, i);
        return true;
      }
    }
    return false;
  }

  ListOfBoxesFill(linearArray.length - 1, 1, null);
  const targetFound = binSearch(maxCols);

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

  const handleToggleInterval = () => {
    if (range === nodes.length) { setRange(0); }
    setIsIntervalActive((prev) => !prev);
  };

  const handleChangePlus = () => {
    if (range === nodes.length - 1 || isIntervalActive) return;
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
    const dummyArray = getAbsoluteArray(linearArrayText);
    if (dummyArray === null) {
      toast.error("Arrays arn't Valide!");
      return;
    }
    for (let i = 0; i < dummyArray.length; i += 1) {
      if (dummyArray[i] < -999 || dummyArray[i] >= 999) {
        toast.error('Integer Range -999 to 999');
        return;
      }
    }
    if (!numText) {
      toast.info('Target is Null!');
      return;
    }
    if (!(numText >= -999 && numText <= 999)) {
      toast.info('Capacity range is 1 - 999 for better Experiance!');
      return;
    }

    setlinearArray(dummyArray);
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
      case 'linearArrayInput':
        setlinearArrayText(event.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="svgContainerLS">
      <ToastContainer position="top-center" autoClose={3500} />
      <h1>Linear Search</h1>

      <svg viewBox={`0 0 ${(linearArray.length + 2) * 9} ${50}`}>
        {(range !== nodes.length) ? nodes[range] : nodes[0]}
      </svg>

      <h1>Target: {num} {range === nodes.length - 1
        ? targetFound ? 'Found!' : 'Not Found!' : null}
      </h1>
      <label htmlFor="linearArrayInput" className="linearArrayLabel">
              &nbsp;&nbsp;Linear Array:&nbsp;
        <input type="text" id="linearArrayInput" className="linearArray" value={linearArrayText} onChange={onChangeHandleInputProfitWeight} />
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
        <button type="button" className="controlbutton" onClick={handleToggleInterval}>{!isIntervalActive ? <FontAwesomeIcon icon={faPlay} className="controlFont" /> : <FontAwesomeIcon icon={faPause} className="controlFont" />}</button>
        <button type="button" className="controlbutton" onClick={handleChangeMinus}> <FontAwesomeIcon icon={faBackward} className="controlFont" /></button>
        <button type="button" className="controlbutton" onClick={handleChangeSpeedUp}>
          <div className="speedBar" style={{ width: `${76 - (75 * (delay / 1100))}px` }} /> <FontAwesomeIcon icon={faPlus} className="controlFont" />
        </button>
        <button type="button" className="controlbutton" onClick={handleChangeSpeedDown}> <FontAwesomeIcon icon={faMinus} className="controlFont" /></button>
      </div>

    </div>
  );
}
