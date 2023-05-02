import React from 'react';
import DraggableDiv from './DraggableDiv';
import './LinkedList.css';

export default class LinkedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deg: 0 };
  }

  render() {
    const { deg } = this.state;
    const style = {
      transform: `rotate(${deg}deg)`,
    };
    return (
      <div className="LinkedListContainer">
        <div className="line" style={style} />
        <DraggableDiv className="movingDiv1" />
        <DraggableDiv className="movingDiv2" />
      </div>

    );
  }
}
