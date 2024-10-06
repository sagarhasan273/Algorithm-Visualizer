/* eslint-disable max-len */
import './Sidebar.css';

const sectionAvailablePopUpStyle = {
  display: 'none',
  position: 'absolute',
  backgroundColor: '#fff',
  border: '1px solid #000',
  padding: '5px',
};

export default function SideBar(props) {
  const { active, sectionActiveHandle, sideBarHideShow } = props;
  return (
    <div className="Sidebar" style={sideBarHideShow}>
      <ul>
        <div id="sectionAvailablePopUp" style={sectionAvailablePopUpStyle}>{}</div>
        <button type="button" id="homebtn" className={`buttonRemove buttonsCommonStyle homeButton ${active === 'homeButton' ? 'active' : ''}`} onClick={sectionActiveHandle}>Home</button>
        <hr />
        <h4 className="sectionName">Data Structure</h4>
        <hr />
        <li><button id="buttonArray" type="button" className={`buttonRemove buttonsCommonStyle ${active === 'buttonArray' ? 'active' : ''}`} onClick={sectionActiveHandle}>Array</button></li>
        <li><button id="buttonStack" type="button" className={`buttonRemove buttonsCommonStyle ${active === 'buttonStack' ? 'active' : ''}`} onClick={sectionActiveHandle}>Stack</button></li>
        <li><button id="buttonQueue" type="button" className={`buttonRemove buttonsCommonStyle ${active === 'buttonQueue' ? 'active' : ''}`} onClick={sectionActiveHandle}>Queue</button></li>
        <li><button id="buttonDeque" type="button" className={`buttonRemove buttonsCommonStyle ${active === 'buttonDeque' ? 'active' : ''}`} onClick={sectionActiveHandle}>Deque</button></li>
        <li><button id="buttonLinkedList" type="button" className={`buttonRemove buttonsCommonStyle ${active === 'buttonLinkedList' ? 'active' : ''}`} onClick={sectionActiveHandle}>Singly Linked list</button></li>
        {/* <li><button id="buttonDoublyLinkedList" type="button" className={`buttonRemove buttonsCommonStyle ${active === 'buttonDoublyLinkedList' ? 'active' : ''}`} onClick={sectionActiveHandle}>Doubly linked list</button></li> */}
        {/* <li><button id="buttonBinaryTree" type="button" className={`buttonRemove buttonsCommonStyle ${active === 'buttonBinaryTree' ? 'active' : ''}`} onClick={sectionActiveHandle}>Binary Tree</button></li> */}
        <hr />
        <h4 className="sectionName">Algorithms</h4>
        <hr />
        {/* <li><button id="buttonBruteForce" type="button" className={`buttonRemove buttonsCommonStyle ${active === 'buttonBruteForce' ? 'active' : ''}`} onClick={sectionActiveHandle}>Brute Force</button></li> */}
        <li><button id="buttonRecursive" type="button" className={`buttonRemove buttonsCommonStyle ${active === 'buttonRecursive' ? 'active' : ''}`} onClick={sectionActiveHandle}>Recursive</button></li>
        {/* <li><button id="buttonBacktracking" type="button" className={`buttonRemove buttonsCommonStyle ${active === 'buttonBacktracking' ? 'active' : ''}`} onClick={sectionActiveHandle}>Backtracking</button></li> */}
        <li><button id="buttonSearch" type="button" className={`buttonRemove buttonsCommonStyle ${active === 'buttonSearch' ? 'active' : ''}`} onClick={sectionActiveHandle}>Search</button></li>
        <li><button id="buttonSorting" type="button" className={`buttonRemove buttonsCommonStyle ${active === 'buttonSorting' ? 'active' : ''}`} onClick={sectionActiveHandle}>Sorting</button></li>
        {/* <li><button id="buttonHashing" type="button" className={`buttonRemove buttonsCommonStyle ${active === 'buttonHashing' ? 'active' : ''}`} onClick={sectionActiveHandle}>Hashing</button></li> */}
        <li><button id="buttonDynamicProgramming" type="button" className={`buttonRemove buttonsCommonStyle ${active === 'buttonDynamicProgramming' ? 'active' : ''}`} onClick={sectionActiveHandle}>Dynamic Programming</button></li>
        {/* <li><button id="buttonTesting" type="button" className={`buttonRemove buttonsCommonStyle ${active === 'buttonTesting' ? 'active' : ''}`} onClick={sectionActiveHandle}>Testing</button></li> */}
      </ul>
    </div>
  );
}
