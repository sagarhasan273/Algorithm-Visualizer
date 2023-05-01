import React from 'react';
import './App.css';
import Container from './Home Page/Container';
import SideBar from './Home Page/Sidebar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sideBarActive: 'homebtn', containerActive: 'homebtn', sideBarHideShow: true };
  }

  sectionActiveHandle = (event) => {
    const { sideBarActive } = this.state;
    if (sideBarActive !== event.target.id) {
      this.setState({ sideBarActive: event.target.id, containerActive: event.target.id });
    }
  };

  sideBarHideShowHandle = () => {
    this.setState((prevState) => ({ sideBarHideShow: !prevState.sideBarHideShow }));
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
        />
      </div>
    );
  }
}

export default App;
