/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import {
  faArrowRotateLeft,
  faBackward, faForward,
  faHandPointUp,
  faMinus,
  faPause, faPlay, faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import keyValue from '../../../Components/GenerateKey';
import TermInfo from '../DP Components/TermInfo';
import LinkedLine from './LinkedLine';
import Node from './Node';
import './knapsack.scss';

export default function Knapsack({ reload }) {
  const [range, setRange] = useState(1);
  const [isIntervalActive, setIsIntervalActive] = useState(false);
      const [num, setNum] = useState(5);
      const [numText, setNumText] = useState(5);
      const [executionStop, setExecutionStop] = useState(false);
      const [isMemo, setIsMemo] = useState(false);
      const [isMemoAvailable, setIsMemoAvailable] = useState(false);
      const [memoStyle, setMemoStyle] = useState({});
      const [profitText, setProfitText] = useState('[50, 70, 20, 28]');
      const [weightText, setWeightText] = useState('[4, 7, 2, 8]');
      const [profits, setProfits] = useState([50, 70, 20, 28]);
      const [weights, setWeights] = useState([4, 7, 2, 8]);
      const delay = 500;
      const mx = [0, 20];
      const nodes = {};
      const nodeArray = [];
      const callerStack = [[`0, ${num}`]];
      const stack = [`0, ${num}`];
      const tempEdges = [];
      const edgesList = new Map();
      const memo = new Map();
      let interval;

      function getAbsoluteArray(string) {
        let array = null;
        try {
          array = JSON.parse(string);
        } catch (err) {
          toast.error(err);
        }
        return array;
      }

      function fn(i, s, d, path) {
        if (isMemo && (memo.has((i, s)))) {
          nodeArray.push(path);
          nodes[path] = [mx[0] + 20, d * 30, memo[(i, s)], `${i}, ${s}`, true];

          mx[0] += 20;
          mx[1] = Math.max(mx[1], d * 30);
          return [mx[0], memo[(i, s)]];
        }
        if (i === weights.length) {
          nodeArray.push(path);
          nodes[path] = [mx[0] + 20, d * 30, 0, `${i}, ${s}`, true];
          mx[0] += 20;
          mx[1] = Math.max(mx[1], d * 30);
          return [mx[0], 0];
        }
        if (s < 0) {
          nodeArray.push(path);
          nodes[path] = [mx[0] + 20, d * 30, -Infinity, `${i}, ${s}`, true];
          mx[0] += 20;
          mx[1] = Math.max(mx[1], d * 30);
          return [mx[0], -Infinity];
        }

        nodeArray.push(path);
        stack.push(`${i + 1}, ${s}`);
        callerStack.push(stack.slice(0));

        const l = fn(i + 1, s, d + 1, `${path}L`, stack);
        stack.pop();
        callerStack.push(stack.slice(0));
        nodeArray.push(path);
        stack.push(`${i + 1}, ${s - weights[i]}`);
        callerStack.push(stack.slice(0));

        const r = fn(i + 1, s - weights[i], d + 1, `${path}R`, stack);

        stack.pop();
        callerStack.push(stack.slice(0));

        nodeArray.push(path);

        nodes[path] = [(l[0] + r[0]) / 2, d * 30, Math.max(l[1], r[1] + profits[i]), `${i}, ${s}`, false];

        memo.set((i, s), Math.max(l[1], r[1] + profits[i]));
        return [(l[0] + r[0]) / 2, Math.max(l[1], r[1] + profits[i])];
      }

      fn(0, num, 1, 'R');

      useEffect(() => {
        if (isIntervalActive && range > 0 && range < nodeArray.length - 1) {
          let counter = range;
          interval = setInterval(() => {
            counter += 1;
            if (counter === nodeArray.length) {
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
        if (range === nodeArray.length) { setRange(1); }
        setIsIntervalActive((prev) => !prev);
      };

      const handleChangePlus = () => {
        if (range === nodeArray.length || isIntervalActive) return;
        setRange((prev) => prev + 1);
      };
      const handleChangeMinus = () => {
        if (range === 0 || isIntervalActive || num === 0) return;
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
        if (!(numText >= 1 && numText <= 15)) {
          toast.info('Range is 1 - 15 for better Experiance');
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
        setProfits(profitArray);
        setWeights(weightArray);
        setIsMemoAvailable(true);
        setNum(numText);
        setRange(1);
        setIsIntervalActive(true);
      };
      const onChangeHandleInput = (event) => {
        event.preventDefault();
        setNumText(event.target.value);
      };
      const handleChangeIsMemo = () => {
        if (isIntervalActive || isMemoAvailable) return;
        if (!isMemo) {
          setMemoStyle({
            color: '#ffffff',
            backgroundColor: 'rgb(0, 189, 9)',
            border: '1px solid rgb(1 163 9)',
          });
        } else {
          setMemoStyle({
            color: '#ffffff',
            backgroundColor: '#f77153',
            border: '1px solid rgb(255, 0, 0)',
          });
        }
        setIsMemo((prev) => !prev);
      };

      const handleStyleChangeMemoOver = () => {
        if (!isMemo) {
          setMemoStyle({
            color: '#ffffff',
            backgroundColor: '#f77153',
            border: '1px solid rgb(255, 0, 0)',
          });
        }
      };
      const handleStyleChangeMemoLeave = () => {
        if (!isMemo) {
          setMemoStyle({
            color: 'black',
            border: '1px solid black',
          });
        }
      };

      for (let index = 1; index < range; index += 1) {
        const x1 = nodes[nodeArray[index - 1]][0];
        const x2 = nodes[nodeArray[index]][0];
        const y1 = nodes[nodeArray[index - 1]][1];
        const y2 = nodes[nodeArray[index]][1];
        const edgeNumString = (x1 * 10 + y1 > x2 * 10 + y2) ? `${x1 * 10 + y1}${x2 * 10 + y2}` : `${x2 * 10 + y2}${x1 * 10 + y1}`;
        let val = -1;
        if (edgesList.has(edgeNumString)) {
          val = Math.min(nodes[nodeArray[index]][2], nodes[nodeArray[index - 1]][2]);
        }
        edgesList.set(edgeNumString, [x1, x2, y1, y2, index, val]);
      }

      edgesList.forEach((value, key) => {
        tempEdges.push(
          <LinkedLine
            key={key + value[4]}
            xy={key + keyValue()}
            x1={value[0]}
            x2={value[1]}
            y1={value[2]}
            y2={value[3]}
            index={value[4]}
            val={value[5]}
          />,
        );
      });

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
        <div style={{ width: '100%', height: '90vh', display: 'flex' }}>
          <ToastContainer position="top-center" autoClose={3500} />
          <div style={{
            width: '85%',
            height: 'calc(100% - 2em)',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            alignItems: 'center',
            position: 'relative',
            }}
          >
            <TermInfo txt="0-1 Knapsack Top-down approach" />
            <svg viewBox={`0 0 ${mx[0] + 30} ${mx[1] + 30}`} style={{ width: '100%', height: '100%' }}>
              {nodeArray.slice(0, range).map((value) => (
                <Node key={keyValue()} value={value} nodes={nodes} />))}
              {tempEdges}
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
              <button
                type="button"
                className="controlbuttonIsMemo"
                onClick={handleChangeIsMemo}
                onMouseEnter={handleStyleChangeMemoOver}
                onMouseLeave={handleStyleChangeMemoLeave}
                style={memoStyle}
              >Memoization
              </button>
              <input type="text" className="controlInput" value={numText} onChange={onChangeHandleInput} />
              <button type="button" className="controlbuttonRun" onClick={handleChangeRun}>Run</button>
              <button type="button" className="controlbutton" onClick={handleChangePlus}> <FontAwesomeIcon icon={faForward} className="controlFont" /></button>
              {executionStop ? <FontAwesomeIcon icon={faHandPointUp} beat className="executionStop" /> : null}
              <button type="button" className="controlbutton" onClick={handleToggleInterval}>{!isIntervalActive ? (range === nodeArray.length) ? <FontAwesomeIcon icon={faArrowRotateLeft} className="controlFont" /> : <FontAwesomeIcon icon={faPlay} className="controlFont" /> : <FontAwesomeIcon icon={faPause} className="controlFont" />}</button>
              <button type="button" className="controlbutton" onClick={handleChangeMinus}> <FontAwesomeIcon icon={faBackward} className="controlFont" /></button>
              <button type="button" className="controlbutton" onClick={handleChangeMinus}> <FontAwesomeIcon icon={faPlus} className="controlFont" /></button>
              <button type="button" className="controlbutton" onClick={handleChangeMinus}> <FontAwesomeIcon icon={faMinus} className="controlFont" /></button>
            </div>

          </div>
          <div className="callerStack">{callerStack[range - 1]
          .map((value, index) => (<h1 key={keyValue()} className={`callerStackItems${value <= 1 ? 'leaf' : (index === callerStack[range - 1].length - 1) ? 'last' : ''}`}>knapsack({value})</h1>))}
          </div>
        </div>
      );
    }
