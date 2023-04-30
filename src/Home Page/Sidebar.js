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
        <li><button id="buttonLinkedList" type="button" className={`buttonRemove buttonsCommonStyle ${active === 'buttonLinkedList' ? 'active' : ''}`} onClick={sectionActiveHandle}>Linked list</button></li>
        <li><button id="buttonDoublyLinkedList" type="button" className={`buttonRemove buttonsCommonStyle ${active === 'buttonDoublyLinkedList' ? 'active' : ''}`} onClick={sectionActiveHandle}>Doubly linked list</button></li>
        <li><button id="buttonBinaryTree" type="button" className={`buttonRemove buttonsCommonStyle ${active === 'buttonBinaryTree' ? 'active' : ''}`} onClick={sectionActiveHandle}>Binary Tree</button></li>
        <hr />
        <h4 className="sectionName">Algorithms</h4>
        <hr />
      </ul>
    </div>
  );
}
