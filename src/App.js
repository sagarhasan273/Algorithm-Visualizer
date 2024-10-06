import React from 'react';
import './App.css';
import Container from './HomePage/Container';
import SideBar from './HomePage/Sidebar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sideBarActive: 'homebtn', containerActive: 'homebtn', sideBarHideShow: true };
  }

  sectionActiveHandle = (event) => {
    event.preventDefault();
    this.setState({
      sideBarActive: event.target.id,
      containerActive: event.target.id,
      sideBarHideShow: false,
    });
  };

  homeStage = () => {
    this.setState({ sideBarActive: 'homebtn', containerActive: 'homebtn', sideBarHideShow: true });
  };

  sideBarHideShowHandle = (event) => {
    event.preventDefault();
    // this.setState((prevState) => ({ sideBarHideShow: !prevState.sideBarHideShow }));
    this.setState({ sideBarActive: 'homebtn', containerActive: 'homebtn', sideBarHideShow: true });
  };

  render() {
    const { sideBarActive, containerActive, sideBarHideShow } = this.state;
    return (
      <div className="App">
        <SideBar active={sideBarActive} sectionActiveHandle={this.sectionActiveHandle} sideBarHideShow={sideBarHideShow ? { display: 'block' } : { display: 'none' }} />
        <Container
          active={containerActive}
          sideBarHideShowHandle={this.sideBarHideShowHandle}
          sideBarHideShow={sideBarHideShow}
          homeStage={this.homeStage}
        />
      </div>
    );
  }
}

export default App;
