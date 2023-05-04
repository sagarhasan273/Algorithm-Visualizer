import React from 'react';
import DraggableDiv from './DraggableDiv';
import './LinkedList.css';

export default class LinkedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deg: 0 };
  }

  changePositionHandle = (event) => {
    this.setState({ deg: event.target.className });
  };

  render() {
    const { deg } = this.state;
    const style = {
      transform: `rotate(${deg}deg)`,
    };
    return (
      <div className="LinkedListContainer">
        <div className="line" style={style} />
        <DraggableDiv className="movingDiv1" onChange={this.changePositionHandle} />
        <DraggableDiv className="movingDiv2" />
        <script src="./position.js" />
      </div>

    );
  }
}
