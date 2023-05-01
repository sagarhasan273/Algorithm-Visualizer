/* eslint-disable react/destructuring-assignment */
import React from 'react';
import './LinkedList.css';

export default class LinkedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    console.log('yes');
  }

  handleMouseMove = (event) => {
    this.setState({ x: event.clientX, y: event.clientY });
  };

  render() {
    const { x, y } = this.state;
    console.log(x, y);
    return (
      <div className="LinkedListContainer">
        <h1>Mouse position: {x}, {y}</h1>
      </div>
    );
  }
}
