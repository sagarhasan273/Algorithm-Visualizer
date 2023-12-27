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

import './LinkedList.scss';

export default function Linkedlist({ reload }) {
  const [range, setRange] = useState(1);
  const [isIntervalActive, setIsIntervalActive] = useState(false);
  const [num, setNum] = useState(0);
  const [numText, setNumText] = useState(null);
  const [numTextAddValue, setNumTextAddValue] = useState(null);
  const [numTextInsertIndex, setNumTextInsertIndex] = useState(null);
  const [numTextInsertValue, setNumTextInsertValue] = useState(null);
  const [numTextSetIndex, setNumTextSetIndex] = useState(null);
  const [numTextSetValue, setNumTextSetValue] = useState(null);
  const [numTextRemoveIndex, setNumTextRemoveIndex] = useState(null);
  const [numTextRemoveValue, setNumTextRemoveValue] = useState(null);
  const [executionStop, setExecutionStop] = useState(false);
  const [valideRange, setValideRange] = useState(false);
  const [delay, setDelay] = useState(500);
  const nodeArray = [];
  let interval;

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
    if (!(numText >= 0 && numText <= 10) || !numText) {
      setValideRange(true);
      let ecounter = 0;
      const executeInterval = setInterval(() => {
        if (ecounter) {
          setValideRange(false);
          clearInterval(executeInterval);
        }
        ecounter += 1;
      }, 1000);
      return;
    }
    setNum(numText);
    setRange(1);
    setIsIntervalActive(true);
  };
  const onChangeHandleInput = (event) => {
    event.preventDefault();
    if (event.target.id === 'input1') { setNumTextAddValue(event.target.value); }
    if (event.target.id === 'input2') { setNumTextInsertIndex(event.target.value); }
    if (event.target.id === 'input3') { setNumTextInsertValue(event.target.value); }
    if (event.target.id === 'input4') setNumTextSetIndex(event.target.value);
    if (event.target.id === 'input5') setNumTextSetValue(event.target.value);
    if (event.target.id === 'input6') setNumTextRemoveIndex(event.target.value);
    if (event.target.id === 'input7') setNumTextRemoveValue(event.target.value);
    else { setNumText(event.target.value); }
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
        <svg viewBox="0 0 100 100" style={{ width: '850px', height: '300px', backgroundColor: 'aqua' }} />
        <div style={{
          display: 'flex', alignItems: 'center', justifyItems: 'center', position: 'relative',
          }}
        >
          <button id="buttonLinkedlist" type="button" className="controlbuttonRun" onClick={reload}>Reload</button>
          <div>
            <button id="buttonLinkedlist" type="button" className="controlbuttonRun" onClick={handleChangeRun}>Add</button><br />
            <input type="text" id="input1" className="controlInput" value={numTextAddValue} onChange={onChangeHandleInput} placeholder="Value..." /><br />
          </div>
          <div>
            <button id="buttonLinkedlist" type="button" className="controlbuttonRun" onClick={handleChangeRun}>Insert</button><br />
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
          <div>
            <button type="button" className="controlbutton" onClick={handleChangePlus}> <FontAwesomeIcon icon={faForward} className="controlFont" /></button>
            {executionStop ? <FontAwesomeIcon icon={faHandPointDown} beat className="executionStopRecursion" /> : null}
            {valideRange ? <div className="controlbutton valideRange">Range 0-10</div> : null}
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
