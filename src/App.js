import React, { Component } from 'react';
import JSONObj from './db.json';
import Poll from './components/Poll';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      'data': JSONObj.data
    }
  }

  renderHTML(){
    let items = this.state.data;
    return <Poll sportObj={items} />
  }

  render() {
    return (
      <React.Fragment>
        <div id="wrapper">
          <form id="pollType">
            {this.renderHTML()}
          </form>
        </div>
      </React.Fragment>
    );
  }
}
 
export default App;
