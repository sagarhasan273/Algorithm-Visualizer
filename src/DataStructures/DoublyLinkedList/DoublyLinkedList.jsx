/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import {
  faArrowRotateLeft,
  faBackward, faForward,
  faHandPointDown,
  faMinus,
  faPause, faPlay, faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
// import keyValue from '../Components/GenerateKey';

import './DoublyLinkedList.scss';
import PrintLinkedListAdd from './PrintingLinkedList/PrintLinkedListAdd';
import PrintLinkedListInsert from './PrintingLinkedList/PrintLinkedListInsert';
import PrintLinkedList from './PrintingLinkedList/PrintLinkedList';

export default function DoublyLinkedlist({ reload }) {
  const [range, setRange] = useState(1);
  const [isIntervalActive, setIsIntervalActive] = useState(false);
  const [numTextAddValue, setNumTextAddValue] = useState('');
  const [numTextInsertIndex, setNumTextInsertIndex] = useState('');
  const [numTextInsertValue, setNumTextInsertValue] = useState('');
  const [numTextSetIndex, setNumTextSetIndex] = useState('');
  const [numTextSetValue, setNumTextSetValue] = useState('');
  const [numTextRemoveIndex, setNumTextRemoveIndex] = useState('');
  const [numTextRemoveValue, setNumTextRemoveValue] = useState('');
  const [action, setAction] = useState('');
  const [executionStop, setExecutionStop] = useState(false);
  const [delay, setDelay] = useState(700);
  const [linkedlist, setLinkedlist] = useState([12, 25, 34, 23]);
  const [nodeArray, setNodeArray] = useState([[...linkedlist, null, null], [...linkedlist, 0, null]]);
  let interval;

  useEffect(() => {
    if (isIntervalActive && range > 0 && range < nodeArray.length - 1) {
      let counter = range;
      interval = setInterval(() => {
        counter += 1;
        if (counter === nodeArray.length - 1) {
          clearInterval(interval);
          setIsIntervalActive((prev) => !prev);
        } setRange((prevCount) => prevCount + 1);
      }, delay);
    } else {
      document.querySelectorAll(`.animate${range - 1}`).forEach((element) => {
        if (element) { element.beginElement(); }
      });
      clearInterval(interval);
      setIsIntervalActive(false);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isIntervalActive]);

  const handleToggleInterval = () => {
    console.log(range, nodeArray.length);
    setRange(1);
    setIsIntervalActive((prev) => !prev);
  };

  const handleChangePlus = () => {
    if (range === nodeArray.length - 1 || isIntervalActive) return;
    setRange((prev) => prev + 1);
  };
  const handleChangeMinus = () => {
    if (range === 1 || isIntervalActive) return;
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
      }, 2000);
      return;
    }
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
    setRange(1);
    setIsIntervalActive(true);
  };
  const handleChangeRunAdd = () => {
    const list = linkedlist.slice();
    setLinkedlist((prev) => [...prev, parseInt(numTextAddValue, 10)]);
    setNodeArray([[...list, null, null]]);
    for (let i = 0; i < list.length + 1; i += 1) {
      setNodeArray((prev) => [...prev, [...[...list, parseInt(numTextAddValue, 10)], i, null]]);
    }
    setRange(1);
    setIsIntervalActive(true);
    setAction('add');
  };

  const handleChangeRunInsert = () => {
    setAction('insert');
  };

  const onChangeHandleInput = (event) => {
    event.preventDefault();
    if (event.target.id === 'input1') {
      setNumTextAddValue(event.target.value);
}
    if (event.target.id === 'input2') { setNumTextInsertIndex(event.target.value); }
    if (event.target.id === 'input3') { setNumTextInsertValue(event.target.value); }
    if (event.target.id === 'input4') setNumTextSetIndex(event.target.value);
    if (event.target.id === 'input5') setNumTextSetValue(event.target.value);
    if (event.target.id === 'input6') setNumTextRemoveIndex(event.target.value);
    if (event.target.id === 'input7') setNumTextRemoveValue(event.target.value);
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

  const LinkedListContainerNodesButtons = {
    width: '100%', height: 'calc(100% - 5em)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '50px', justifyContent: 'center',
  };

  return (
    <div style={{ width: '100%', height: '90vh', display: 'flex' }}>
      <div style={LinkedListContainerNodesButtons}>
        <svg viewBox="0 0 250 100" style={{ width: '850px', height: '300px' }}>
          {(range > 0 && range < nodeArray.length && action === '') ? <PrintLinkedList array={nodeArray[range]} range={range} /> : null}
          {(range > 0 && range < nodeArray.length && action === 'add') ? <PrintLinkedListAdd array={nodeArray[range]} range={range} /> : null}
          {(range > 0 && range < nodeArray.length && action === 'insert') ? <PrintLinkedListInsert array={nodeArray[range]} range={range} /> : null}
        </svg>
        <div style={{
          display: 'flex', alignItems: 'center', justifyItems: 'center', position: 'relative',
          }}
        >
          <div>
            <button id="buttonLinkedlist" type="button" className="controlbuttonRun" onClick={reload}>Reload</button><br />
            <button id="buttonLinkedlistAdd" type="button" className="controlbuttonRun" onClick={handleChangeRunAdd}>Add</button><br />
            <input type="text" id="input1" className="controlInput" value={numTextAddValue} onChange={onChangeHandleInput} placeholder="Value..." /><br />
          </div>
          <div>
            <button id="buttonLinkedlist" type="button" className="controlbuttonRun" onClick={handleChangeRunInsert}>Insert</button><br />
            <input type="text" id="input2" className="controlInput" value={numTextInsertIndex} onChange={onChangeHandleInput} placeholder="Index..." /><br />
            <input type="text" id="input3" className="controlInput" value={numTextInsertValue} onChange={onChangeHandleInput} placeholder="Value..." />
          </div>
          <div>
            <button id="buttonLinkedlist" type="button" className="controlbuttonRun" onClick={handleChangeRun}>Set</button><br />
            <input type="text" id="input4" className="controlInput" value={numTextSetIndex} onChange={onChangeHandleInput} placeholder="Index..." /><br />
            <input type="text" id="input5" className="controlInput" value={numTextSetValue} onChange={onChangeHandleInput} placeholder="Value..." />
          </div>
          <div>
            <button id="buttonLinkedlist" type="button" className="controlbuttonRun" onClick={handleChangeRun}>Remove</button><br />
            <input type="text" id="input6" className="controlInput" value={numTextRemoveIndex} onChange={onChangeHandleInput} placeholder="Index..." /><br />
            <input type="text" id="input7" className="controlInput" value={numTextRemoveValue} onChange={onChangeHandleInput} placeholder="Value..." />
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <div>
            <button type="button" className="controlbutton" onClick={handleChangePlus}> <FontAwesomeIcon icon={faForward} className="controlFont" /></button>
            {executionStop ? <FontAwesomeIcon icon={faHandPointDown} beat className="executionStopRecursion" /> : null}
            <button type="button" className="controlbutton" onClick={handleToggleInterval}>{!isIntervalActive ? (range === nodeArray.length) ? <FontAwesomeIcon icon={faArrowRotateLeft} className="controlFont" /> : <FontAwesomeIcon icon={faPlay} className="controlFont" /> : <FontAwesomeIcon icon={faPause} className="controlFont" />}</button>
            <button type="button" className="controlbutton" onClick={handleChangeMinus}> <FontAwesomeIcon icon={faBackward} className="controlFont" /></button>
            <button type="button" className="controlbutton" onClick={handleChangeSpeedUp}>
              <div className="speedBar" style={{ width: `${76 - (75 * (delay / 1000))}px` }} /> <FontAwesomeIcon icon={faPlus} className="controlFont" />
            </button>
            <button type="button" className="controlbutton" onClick={handleChangeSpeedDown}> <FontAwesomeIcon icon={faMinus} className="controlFont" /></button>
          </div>
        </div>

      </div>

    </div>
  );
}
