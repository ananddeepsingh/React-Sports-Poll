import React, { Component } from 'react';

class PollResultComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: this.props.data
    }
  }

  render() {
    let record = this.state.data;
    return(
      <React.Fragment>
        <tr>
          <td>{record.sportName}</td>
          <td>{record.sportGroup}</td>
          <td>{record.result}</td>
          <td>{record.count}</td>
        </tr>
      </React.Fragment>
    )
  }
}
 
export default PollResultComponent;