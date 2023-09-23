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
import './KnapsackTabulation.scss';
import ArrayProfitsWeights from './Tabulation Components/ArrayProfitsWeights';
import PolygonWithCenteredText from './Tabulation Components/PolygonWithCenteredText';
import TableIndexex from './Tabulation Components/TableIndexes';
import TermInfo from './Tabulation Components/TermInfo';

export default function KnapsackTabulation({ reload }) {
  const [isIntervalActive, setIsIntervalActive] = useState(false);
  const [num, setNum] = useState(5);
  const [range, setRange] = useState(1);
  const [numText, setNumText] = useState('');
  const [executionStop, setExecutionStop] = useState(false);
  const [profitText, setProfitText] = useState('[50, 70, 20, 28]');
  const [weightText, setWeightText] = useState('[4, 7, 2, 8]');
  const [profits, setProfits] = useState([0, 50, 70, 20, 28]);
  const [weights, setWeights] = useState([0, 4, 7, 2, 8]);
  const [delay, setDelay] = useState(500);
  const nodes = [];
  const renderNodesColor = [];
  const arrayProfits = [];
  const arrayWeights = [];
  const listOfBoxes = new Array([]);
  const tableIndexes = new Array([]);
  const dpRenderValues = new Map();
  const dp = [];
  let row = 0;
  let col = 0;
  let interval = null;
  const maxRows = profits.length - 1;
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

  for (let i = 0; i <= maxCols; i += 1) {
    nodes.push('');
  }

  for (let i = 2; i <= (maxRows + 2); i += 1) {
    tableIndexes.push([(2 * 10) + 1.5, i * 6.1 + 7, row]);
    arrayProfits.push([(2 * 10) - 10, i * 6.1 + 4, profits[row]]);
    arrayWeights.push([(2 * 10) - 15, i * 6.1 + 4, weights[row]]);
    row += 1;
    const rows = [];
    for (let j = 2; j <= (maxCols + 2); j += 1) {
      if (i === 2) {
        tableIndexes.push([j * 9 + 11, i * 6.5, col]);
        col += 1;
      }
      if (weights[i - 2] <= j) {
        renderNodesColor.push([j * 9.05 + 1, (i - 1) * 6.01 + 1, (j - weights[i - 2]) * 9.05 + 1, (i - 1) * 6.01 + 1]);
      } else {
        renderNodesColor.push([j * 9.05 + 1, (i - 1) * 6.01 + 1, null, null]);
      }
      listOfBoxes.push([(j * 9.05) + 1, (i * 6.01) + 1]);
      rows.push(0);
    }
    dp.push(rows);
  }

  function knapsackTabulation(w) {
    for (let i = 1; i <= maxRows; i += 1) {
      if (i === 1) {
        nodes.push('');
      }
      for (let j = 1; j <= w; j += 1) {
        if (j === 1) {
          nodes.push('');
        }
        if (weights[i] <= j) {
          dp[i][j] = Math.max(profits[i] + dp[i - 1][j - weights[i]], dp[i - 1][j]);
        } else {
          dp[i][j] = dp[i - 1][j];
        }
        nodes.push(`${(j + 2) * 9.05 + 1},${(i + 2) * 6.01 + 1}`);
        dpRenderValues.set(`${(j + 2) * 9.05 + 1},${(i + 2) * 6.01 + 1}`, dp[i][j]);
      }
    }
  }

  knapsackTabulation(maxCols);

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
    setIsIntervalActive((prev) => !prev);
  };

  const handleChangePlus = () => {
    if (range === nodes.length - 1) return;
    setRange((prev) => prev + 1);
    setIsIntervalActive(false);
  };
  const handleChangeMinus = () => {
    if (range <= maxCols + 3 || isIntervalActive || num === 0) return;
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
    if (!(numText >= 1 && numText <= 50)) {
      toast.info('Range is 1 - 25 for better Experiance');
      return;
    }

    const profitArray = getAbsoluteArray(profitText);
    const weightArray = getAbsoluteArray(weightText);
    if ((profitArray === null)
    || (weightArray === null)
    || (profitArray.length !== weightArray.length)) {
      toast.error("Arrays arn't Valide!");
      return;
    }

    setProfits([0, ...profitArray]);
    setWeights([0, ...weightArray]);
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
      case 'profitInput':
        setProfitText(event.target.value);
        break;
      case 'weightInput':
        setWeightText(event.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="svgContainerKT">
      <ToastContainer position="top-center" autoClose={3500} />
      <TermInfo txt="0-1 Knapsack Bottom-Up approach" />
      <svg viewBox={`0 0 ${(maxCols + 3.5) * 9} ${(maxRows + 4) * 6}`}>
        <text
          x={((maxCols + 3) * 9) / 2}
          y={5}
          style={{
            alignmentBaseline: 'central',
            fontSize: '3px',
            fontWeight: 'bold',
          }}
        >
          Capacity
        </text>
        {listOfBoxes.map((value, index) => (
          <PolygonWithCenteredText
            key={keyValue()}
            x={value[0]}
            y={value[1]}
            dpRenderValue={dpRenderValues}
            nodes={nodes}
            renderNodesColor={renderNodesColor}
            index={index}
            range={range}
          />
        ))}
        {tableIndexes.map((value) => (
          <TableIndexex key={keyValue()} x={value[0]} y={value[1]} i={value[2]} />))}
        {arrayWeights.map((value, index) => (<ArrayProfitsWeights key={keyValue()} index={index} value={value} name="weights" use={Math.floor(range / (maxCols + 1))} />))}
        {arrayProfits.map((value, index) => (<ArrayProfitsWeights key={keyValue()} index={index} value={value} name="profits" use={Math.floor(range / (maxCols + 1))} />))}
      </svg>
      <label htmlFor="profitInput" className="profitWeightLabel">
            &nbsp;&nbsp;Profits:&nbsp;
        <input type="text" id="profitInput" className="Profit" value={profitText} onChange={onChangeHandleInputProfitWeight} />
      </label>
      <label htmlFor="weightInput" className="profitWeightLabel">
        Weights:&nbsp;
        <input type="text" id="weightInput" className="Weight" value={weightText} onChange={onChangeHandleInputProfitWeight} />
      </label>
      <div style={{
        display: 'flex', alignItems: 'center', justifyItems: 'center', position: 'relative',
      }}
      >
        <button type="button" className="controlbuttonRun" onClick={reload}>Clear</button>
        <input type="text" className="controlInput" value={numText} onChange={onChangeHandleInput} placeholder={`Bag Capacity ${num}`} />
        <button type="button" className="controlbuttonRun" onClick={handleChangeRun}>Run</button>
        <button type="button" className="controlbutton" onClick={handleChangePlus}> <FontAwesomeIcon icon={faForward} className="controlFont" /></button>
        {executionStop ? <FontAwesomeIcon icon={faHandPointUp} beat className="executionStop" /> : null}
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
