import './Container.css';

export default function Container(props) {
  const { active, sideBarHideShowHandle } = props;
  return (
    <div className="container">
      <div id="startingWindow" className={`sectionContainer ${active === 'homebtn' ? 'active' : ''}`}>
        <h1>Welcome, to Our Site!</h1>
        <button type="button" className="buttonRemove startButton" onClick={sideBarHideShowHandle}>Start</button>
      </div>

      <div id="arraySectionContainer" className={`sectionContainer ${active === 'buttonArray' ? 'active' : ''}`}>
        <h2>Array Visualization</h2>
        <div className="horizontal-line" />
      </div>

      <div id="stackSectionConatiner" className={`sectionContainer ${active === 'buttonStack' ? 'active' : ''}`}>
        <h2>Stack Visualization</h2>
        <div className="horizontal-line" />
      </div>
      <div id="queueSectionConatiner" className={`sectionContainer ${active === 'buttonQueue' ? 'active' : ''}`}>
        <h2>Queue Visualization</h2>
        <div className="horizontal-line" />
      </div>
      <div id="dequeSectionConatiner" className={`sectionContainer ${active === 'buttonDeque' ? 'active' : ''}`}>
        <h2>Deque Visualization</h2>
        <div className="horizontal-line" />
      </div>
      <div id="linkedListSectionConatiner" className={`sectionContainer ${active === 'buttonLinkedList' ? 'active' : ''}`}>
        <h2>Linked list Visualization</h2>
        <div className="horizontal-line" />
      </div>
      <div id="doublyLinkedListSectionConatiner" className={`sectionContainer ${active === 'buttonDoublyLinkedList' ? 'active' : ''}`}>
        <h2>Doubly linked list Visualization</h2>
        <div className="horizontal-line" />
      </div>
      <div id="binaryTreeSectionConatiner" className={`sectionContainer ${active === 'buttonBinaryTree' ? 'active' : ''}`}>
        <h2>Binary Tree Visualization</h2>
        <div className="horizontal-line" />
      </div>

    </div>
  );
}
