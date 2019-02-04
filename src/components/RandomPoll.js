import React, { Component } from 'react';

class RandomPoll extends Component {
  constructor( props ){
    super( props);
    // this.setState({
    //   sport: this.props.sportForPoll
    // })
    debugger;
    this.state = {
      data: this.props.sportForPoll
    }
  }
  render() {
    console.log(111)
    return(
      <React.Fragment>
          <div id="contentBox">
          aa
          {this.state.data}
            {/* <h1>{this.state.sport.awayName}</h1> */}
            {/* <button onClick={this.onClose}>Close</button> */}
          </div>
      </React.Fragment>
    )
  }
}
 
export default RandomPoll;