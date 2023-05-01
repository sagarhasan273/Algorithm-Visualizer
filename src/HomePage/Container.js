import './Container.css';
import HideShowMenu from './HideShowMenu/HideShowMenu';

export default function Container(props) {
  const headingNameStyle = { paddingLeft: '15px', margin: '10px' };
  const { active, sideBarHideShowHandle, sideBarHideShow } = props;
  return (
    <div className="container">
      <div id="startingWindow" className={`sectionContainer ${active === 'homebtn' ? 'active' : ''}`}>
        <h1>Welcome, to Our Site!</h1>
        <button type="button" className="buttonRemove startButton" onClick={sideBarHideShowHandle}>Start</button>
      </div>

      <div id="arraySectionContainer" className={`sectionContainer ${active === 'buttonArray' ? 'active' : ''}`}>
        <HideShowMenu
          sideBarHideShow={sideBarHideShow}
          sideBarHideShowHandle={sideBarHideShowHandle}
        />
        <h2 style={headingNameStyle}>Array Visualization</h2>
        <div className="horizontal-line" />
      </div>

      <div id="stackSectionConatiner" className={`sectionContainer ${active === 'buttonStack' ? 'active' : ''}`}>
        <HideShowMenu
          sideBarHideShow={sideBarHideShow}
          sideBarHideShowHandle={sideBarHideShowHandle}
        />
        <h2 style={headingNameStyle}>Stack Visualization</h2>
        <div className="horizontal-line" />
      </div>
      <div id="queueSectionConatiner" className={`sectionContainer ${active === 'buttonQueue' ? 'active' : ''}`}>
        <HideShowMenu
          sideBarHideShow={sideBarHideShow}
          sideBarHideShowHandle={sideBarHideShowHandle}
        />
        <h2 style={headingNameStyle}>Queue Visualization</h2>
        <div className="horizontal-line" />
      </div>
      <div id="dequeSectionConatiner" className={`sectionContainer ${active === 'buttonDeque' ? 'active' : ''}`}>
        <HideShowMenu
          sideBarHideShow={sideBarHideShow}
          sideBarHideShowHandle={sideBarHideShowHandle}
        />
        <h2 style={headingNameStyle}>Deque Visualization</h2>
        <div className="horizontal-line" />
      </div>
      <div id="linkedListSectionConatiner" className={`sectionContainer ${active === 'buttonLinkedList' ? 'active' : ''}`}>
        <HideShowMenu
          sideBarHideShow={sideBarHideShow}
          sideBarHideShowHandle={sideBarHideShowHandle}
        />
        <h2 style={headingNameStyle}>Linked list Visualization</h2>
        <div className="horizontal-line" />
      </div>
      <div id="doublyLinkedListSectionConatiner" className={`sectionContainer ${active === 'buttonDoublyLinkedList' ? 'active' : ''}`}>
        <HideShowMenu
          sideBarHideShow={sideBarHideShow}
          sideBarHideShowHandle={sideBarHideShowHandle}
        />
        <h2 style={headingNameStyle}>Doubly linked list Visualization</h2>
        <div className="horizontal-line" />
      </div>
      <div id="binaryTreeSectionConatiner" className={`sectionContainer ${active === 'buttonBinaryTree' ? 'active' : ''}`}>
        <HideShowMenu
          sideBarHideShow={sideBarHideShow}
          sideBarHideShowHandle={sideBarHideShowHandle}
        />
        <h2 style={headingNameStyle}>Binary Tree Visualization</h2>
        <div className="horizontal-line" />
      </div>
      <div id="bruteForceSectionConatiner" className={`sectionContainer ${active === 'buttonBruteForce' ? 'active' : ''}`}>
        <HideShowMenu
          sideBarHideShow={sideBarHideShow}
          sideBarHideShowHandle={sideBarHideShowHandle}
        />
        <h2 style={headingNameStyle}>Brute Force Visualization</h2>
        <div className="horizontal-line" />
      </div>
      <div id="recursiveSectionConatiner" className={`sectionContainer ${active === 'buttonRecursive' ? 'active' : ''}`}>
        <HideShowMenu
          sideBarHideShow={sideBarHideShow}
          sideBarHideShowHandle={sideBarHideShowHandle}
        />
        <h2 style={headingNameStyle}>Recursive Visualization</h2>
        <div className="horizontal-line" />
      </div>
      <div id="backtrackingSectionConatiner" className={`sectionContainer ${active === 'buttonBacktracking' ? 'active' : ''}`}>
        <HideShowMenu
          sideBarHideShow={sideBarHideShow}
          sideBarHideShowHandle={sideBarHideShowHandle}
        />
        <h2 style={headingNameStyle}>Backtracking Visualization</h2>
        <div className="horizontal-line" />
      </div>
      <div id="sortingSectionConatiner" className={`sectionContainer ${active === 'buttonSorting' ? 'active' : ''}`}>
        <HideShowMenu
          sideBarHideShow={sideBarHideShow}
          sideBarHideShowHandle={sideBarHideShowHandle}
        />
        <h2 style={headingNameStyle}>Sorting Visualization</h2>
        <div className="horizontal-line" />
      </div>
      <div id="HashingSectionConatiner" className={`sectionContainer ${active === 'buttonHashing' ? 'active' : ''}`}>
        <HideShowMenu
          sideBarHideShow={sideBarHideShow}
          sideBarHideShowHandle={sideBarHideShowHandle}
        />
        <h2 style={headingNameStyle}>Hashing Visualization</h2>
        <div className="horizontal-line" />
      </div>
      <div id="dynamicProgrammingSectionConatiner" className={`sectionContainer ${active === 'buttonDynamicProgramming' ? 'active' : ''}`}>
        <HideShowMenu
          sideBarHideShow={sideBarHideShow}
          sideBarHideShowHandle={sideBarHideShowHandle}
        />
        <h2 style={headingNameStyle}>Dynamic Programming Visualization</h2>
        <div className="horizontal-line" />
      </div>
    </div>
  );
}
