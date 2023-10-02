import { useState } from 'react';
import keyValue from '../Algorithms/Components/GenerateKey';
import DynamicProgramming from '../Algorithms/Dynamic Programming/DynamicProgramming';
import Recursive from '../Algorithms/Recursion/Recursive';
import Search from '../Algorithms/Search/Search';
import Array from '../DataStructures/Array/Array';
import Deque from '../DataStructures/Deque/Deque';
import LinkedList from '../DataStructures/LinkedList/LinkedList';
import Queue from '../DataStructures/Queue/Queue';
import Stack from '../DataStructures/Stack/Stack';
import Testing from '../DataStructures/Testing/Testing';
import './Container.css';
import HideShowMenu from './HideShowMenu/HideShowMenu';

export default function Container(props) {
  const [reloadContainer, setReloadContainer] = useState(true);
  const headingNameStyle = {
    paddingLeft: '15px', margin: '10px', marginBottom: '5px',
  };
  const {
    active, sideBarHideShowHandle, sideBarHideShow,
  } = props;

  const handleReloadFromInside = () => {
    setReloadContainer((prev) => !prev);
  };

  return (
    <div className="container">
      {active === 'homebtn' ? (
        <div id="startingWindow" className="sectionContainer">
          <h1>Welcome, to Our Site!</h1>
          <button type="button" className="buttonRemove startButton" onClick={sideBarHideShowHandle}>Start</button>
        </div>
      ) : null}

      {active === 'buttonArray' ? (
        <div id="arraySectionContainer" className="sectionContainer">
          <HideShowMenu
            sideBarHideShow={sideBarHideShow}
            sideBarHideShowHandle={sideBarHideShowHandle}
          />
          <h2 style={headingNameStyle}>Array Visualization</h2>
          <div className="horizontal-line" />
          <Array />
        </div>
      ) : null}

      {active === 'buttonStack' ? (
        <div id="stackSectionConatiner" className="sectionContainer">
          <HideShowMenu
            sideBarHideShow={sideBarHideShow}
            sideBarHideShowHandle={sideBarHideShowHandle}
          />
          <h2 style={headingNameStyle}>Stack Visualization</h2>
          <div className="horizontal-line" />
          <Stack />
        </div>
      ) : null}

      {active === 'buttonQueue' ? (
        <div id="queueSectionConatiner" className="sectionContainer">
          <HideShowMenu
            sideBarHideShow={sideBarHideShow}
            sideBarHideShowHandle={sideBarHideShowHandle}
          />
          <h2 style={headingNameStyle}>Queue Visualization</h2>
          <div className="horizontal-line" />
          <Queue />
        </div>
      ) : null}
      {active === 'buttonDeque' ? (
        <div id="dequeSectionConatiner" className="sectionContainer">
          <HideShowMenu
            sideBarHideShow={sideBarHideShow}
            sideBarHideShowHandle={sideBarHideShowHandle}
          />
          <h2 style={headingNameStyle}>Deque Visualization</h2>
          <div className="horizontal-line" />
          <Deque />
        </div>
      ) : null}
      {active === 'buttonLinkedList' ? (
        <div id="linkedListSectionConatiner" className="sectionContainer">
          <HideShowMenu
            sideBarHideShow={sideBarHideShow}
            sideBarHideShowHandle={sideBarHideShowHandle}
          />
          <h2 style={headingNameStyle}>Singly Linked list Visualization</h2>
          <div className="horizontal-line" />
          <LinkedList />
        </div>
      ) : null}
      {active === 'buttonDoublyLinkedList' ? (
        <div id="doublyLinkedListSectionConatiner" className="sectionContainer">
          <HideShowMenu
            sideBarHideShow={sideBarHideShow}
            sideBarHideShowHandle={sideBarHideShowHandle}
          />
          <h2 style={headingNameStyle}>Doubly linked list Visualization</h2>
          <div className="horizontal-line" />
        </div>
      ) : null}
      {active === 'buttonBinaryTree' ? (
        <div id="binaryTreeSectionConatiner" className="sectionContainer">
          <HideShowMenu
            sideBarHideShow={sideBarHideShow}
            sideBarHideShowHandle={sideBarHideShowHandle}
          />
          <h2 style={headingNameStyle}>Binary Tree Visualization</h2>
          <div className="horizontal-line" />
        </div>
      ) : null}
      {active === 'buttonBruteForce' ? (
        <div id="bruteForceSectionConatiner" className="sectionContainer">
          <HideShowMenu
            sideBarHideShow={sideBarHideShow}
            sideBarHideShowHandle={sideBarHideShowHandle}
          />
          <h2 style={headingNameStyle}>Brute Force Visualization</h2>
          <div className="horizontal-line" />
        </div>
      ) : null}
      {active === 'buttonRecursive' ? (
        <div id="recursiveSectionConatiner" className="sectionContainer">
          <HideShowMenu
            sideBarHideShow={sideBarHideShow}
            sideBarHideShowHandle={sideBarHideShowHandle}
          />
          <h2 style={headingNameStyle}>Recursive Visualization</h2>
          <div className="horizontal-line" />
          {(reloadContainer) ? <Recursive key={keyValue()} reload={handleReloadFromInside} />
            : <Recursive key={keyValue()} reload={handleReloadFromInside} />}
        </div>
      ) : null}
      {active === 'buttonBacktracking' ? (
        <div id="backtrackingSectionConatiner" className="sectionContainer">
          <HideShowMenu
            sideBarHideShow={sideBarHideShow}
            sideBarHideShowHandle={sideBarHideShowHandle}
          />
          <h2 style={headingNameStyle}>Backtracking Visualization</h2>
          <div className="horizontal-line" />
        </div>
      ) : null}
      {active === 'buttonSearch' ? (
        <div id="searchingSectionConatiner" className="sectionContainer">
          <HideShowMenu
            sideBarHideShow={sideBarHideShow}
            sideBarHideShowHandle={sideBarHideShowHandle}
          />
          <h2 style={headingNameStyle}>Searching Visualization</h2>
          <div className="horizontal-line" />
          <Search reload={handleReloadFromInside} />
        </div>
      ) : null}
      {active === 'buttonSorting' ? (
        <div id="sortingSectionConatiner" className="sectionContainer">
          <HideShowMenu
            sideBarHideShow={sideBarHideShow}
            sideBarHideShowHandle={sideBarHideShowHandle}
          />
          <h2 style={headingNameStyle}>Sorting Visualization</h2>
          <div className="horizontal-line" />
        </div>
      ) : null}
      {active === 'buttonHashing' ? (
        <div id="HashingSectionConatiner" className="sectionContainer">
          <HideShowMenu
            sideBarHideShow={sideBarHideShow}
            sideBarHideShowHandle={sideBarHideShowHandle}
          />
          <h2 style={headingNameStyle}>Hashing Visualization</h2>
          <div className="horizontal-line" />
        </div>
      ) : null}
      {active === 'buttonDynamicProgramming' ? (
        <div id="dynamicProgrammingSectionConatiner" className="sectionContainer">
          <HideShowMenu
            sideBarHideShow={sideBarHideShow}
            sideBarHideShowHandle={sideBarHideShowHandle}
          />
          <h2 style={headingNameStyle}>Dynamic Programming Visualization</h2>
          <div className="horizontal-line" />
          <DynamicProgramming />
        </div>
      ) : null}
      {active === 'buttonTesting' ? (
        <div id="testingSectionConatiner" className="sectionContainer">
          <HideShowMenu
            sideBarHideShow={sideBarHideShow}
            sideBarHideShowHandle={sideBarHideShowHandle}
          />
          <h2 style={headingNameStyle}>Testing Visualization</h2>
          <div className="horizontal-line" />
          <Testing />
        </div>
      ) : null}
    </div>
  );
}
