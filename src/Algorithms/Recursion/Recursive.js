/* eslint-disable indent */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import {
  faBackward, faForward, faPause, faPlay, faReply,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import keyValue from '../Components/GenerateKey';
import LinkedLine from './LinkedLine';
import Node from './Node';
import './Recursive.scss';

export default function Recursive() {
  const [range, setRange] = useState(1);
  const [isIntervalActive, setIsIntervalActive] = useState(false);
  const [num, setNum] = useState(0);
  const [numText, setNumText] = useState(0);
  const delay = 500;
  const mx = [0, 20];
  const nodes = {};
  const nodeArray = [];
  const callerStack = [[num]];
  const stack = [num];
  const tempEdges = [];
  const edgesList = new Map();
  let interval;

  function fb(n, d, path) {
    if (n === 1 || n === 0) {
      nodeArray.push(path);
      nodes[path] = [mx[0] + 20, d * 30, n, n];

      mx[0] += 20;
      mx[1] = Math.max(mx[1], d * 30);
      return [mx[0], n];
    }
    nodeArray.push(path);
    stack.push(n - 1);
    callerStack.push(stack.slice(0));

    const l = fb(n - 1, d + 1, `${path}L`);
    stack.pop();
    callerStack.push(stack.slice(0));
    nodeArray.push(path);
    stack.push(n - 2);
    callerStack.push(stack.slice(0));

    const r = fb(n - 2, d + 1, `${path}R`, stack);

    stack.pop();
    callerStack.push(stack.slice(0));

    nodeArray.push(path);
    nodes[path] = [(l[0] + r[0]) / 2, d * 30, n, l[1] + r[1]];
    return [(l[0] + r[0]) / 2, l[1] + r[1]];
  }

  fb(num, 1, 'R');

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
    nodeArray.length = 0;
    nodes.length = 0;
    stack.length = 0;
    tempEdges.length = 0;
    edgesList.length = 0;
    fb(num, 1, 'R');
    setRange(1);
    setNum(numText);
    setIsIntervalActive(true);
  };
  const onChangeHandleInput = (event) => {
    event.preventDefault();
    setNumText(event.target.value);
  };

  for (let index = 1; index < range; index += 1) {
    const x1 = nodes[nodeArray[index - 1]][0];
    const x2 = nodes[nodeArray[index]][0];
    const y1 = nodes[nodeArray[index - 1]][1];
    const y2 = nodes[nodeArray[index]][1];
    const edgeNumString = (x1 + y1 > x2 + y2) ? `${x1 + y1}${x2 + y2}` : `${x2 + y2}${x1 + y1}`;
    let val = -1;
    if (edgesList.has(edgeNumString)) {
      val = Math.min(nodes[nodeArray[index]][3], nodes[nodeArray[index - 1]][3]);
    }
    edgesList.set(edgeNumString, [x1, x2, y1, y2, index, val]);
  }

  edgesList.forEach((value, key) => {
    tempEdges.push(
      <LinkedLine
        key={key + value[4]}
        xy={key}
        x1={value[0]}
        x2={value[1]}
        y1={value[2]}
        y2={value[3]}
        index={value[4]}
        val={value[5]}
      />,
    );
  });
  return (
    <div style={{ width: '100%', height: '90vh', display: 'flex' }}>
      <div style={{
        width: '85%', height: 'calc(100% - 5em)', display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}
      >
        <svg viewBox={`0 0 ${mx[0] + 30} ${mx[1] + 30}`} style={{ width: '100%', height: '100%' }}>
          {nodeArray.slice(0, range).map((value, index) => (
            <Node key={keyValue()} value={value} nodes={nodes} last={range - 1} i={index} />))}
          {tempEdges}
        </svg>
        <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
          <input type="text" className="controlInput" value={numText} onChange={onChangeHandleInput} />
          <button type="button" className="controlbuttonRun" onClick={handleChangeRun}>Run</button>
          <button type="button" className="controlbutton" onClick={handleChangePlus}> <FontAwesomeIcon icon={faForward} className="controlFont" /></button>
          <button type="button" className="controlbutton" onClick={handleToggleInterval}>{!isIntervalActive ? (range === nodeArray.length) ? <FontAwesomeIcon icon={faReply} className="controlFont" /> : <FontAwesomeIcon icon={faPlay} className="controlFont" /> : <FontAwesomeIcon icon={faPause} className="controlFont" />}</button>
          <button type="button" className="controlbutton" onClick={handleChangeMinus}> <FontAwesomeIcon icon={faBackward} className="controlFont" /></button>
        </div>

      </div>
      <div className="callerStack">{callerStack[range - 1]
      .map((value, index) => (<h1 className={`callerStackItems${value <= 1 ? 'leaf' : (index === callerStack[range - 1].length - 1) ? 'last' : ''}`}>fn({value})</h1>))}
      </div>
    </div>
  );
}
