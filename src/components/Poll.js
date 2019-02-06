import React, { Component } from 'react';
import PollResultComponent from './PollResultComponent';
// import Noty from 'noty';

import '../../node_modules/noty/lib/noty.css';
import '../../node_modules/noty/lib/themes/mint.css';
const Noty = require('noty');

class Poll extends Component {

  constructor( props ){
    super(props);
    this.state = {
      randomObj: this.setRandomObj(),
      isDataAvailable: this.getItemFromStorage("PollResult")
    };

  }

  setRandomObj(){
    let records = this.props.sportObj;
    let sportObject = records[Math.floor(Math.random()*records.length)]
    return sportObject
  }

  loadBG(){
    let body = document.getElementsByTagName("BODY")[0];
    
    body.className = '';
    let randomObj = this.state.randomObj.sport;
    body.classList.add(randomObj);
  }
  
  showNewPoll = (e) =>{
    e.preventDefault();
    this.setState({
      randomObj : this.setRandomObj()
    })

    this.loadBG();

  }

  onSubmit(e, sportObj) {
    e.preventDefault();
    let selectedVal = document.querySelector('input[name="sportOptions"]:checked');
    if(selectedVal === null){
      alert('Please Vote');
      return false;
    }
    let result = [];

    let obj = {
      "sportID" : sportObj.id,
      "result" : selectedVal.value,
      "sportName": sportObj.sport,
      "sportGroup": sportObj.name,
      "count": 1
    };
    
    let AllRecords = this.getItemFromStorage("PollResult");
    
    if( AllRecords === null ){
      result.push(obj)
      this.setItemInStorage("PollResult", result);

    }else{
      let index = AllRecords.findIndex( record => record.sportID === obj.sportID);

      if(index !== -1){
        AllRecords[index] = obj;
        AllRecords[index].count = AllRecords[index].count+1;
        
        this.setItemInStorage("PollResult", AllRecords)
      }else{
        AllRecords.push(obj)
        this.setItemInStorage("PollResult", AllRecords)
      }
      
    }

    new Noty({
      text: 'You Selected ' + obj.result+ ' option',
      theme: 'mint',
      timeout: 1000
    }).show();

    this.setState({
      isDataAvailable: true
    })
    // refreshing poll
    this.showNewPoll(e);

    //refreshing Poll Result
    this.renderPollResult(e)
  }

  setItemInStorage(dataKey, data){
    localStorage.setItem(dataKey, JSON.stringify(data));
  }

  getItemFromStorage(dataKey){
    var data = localStorage.getItem(dataKey);
    return data ? JSON.parse(data): null ;
  }

  renderPollResult(){
    let records = this.getItemFromStorage("PollResult");
    let arr = [];
    if( records ){
      records.map( (records, i) => {
        arr.push(<PollResultComponent data={records} key={i}/>)
      })
      return arr
    }
  }

  render() {
    this.loadBG();
    return(
      <React.Fragment>
          <div id="poll"> 
          <button id="newPoll" onClick={ (e) => { this.showNewPoll(e)}}>New Poll</button>
          <h1>Which Team will win {this.state.randomObj.sport} "{this.state.randomObj.name}" Match?</h1>
          <label htmlFor="teamA">
            <span>Team "{this.state.randomObj.awayName}":</span>
            <input id="teamA" type="radio" name="sportOptions" value={this.state.randomObj.awayName} />
          </label>
          <label htmlFor="teamB">
            <span>Team "{this.state.randomObj.homeName}":</span>
            <input id="teamB" type="radio" name="sportOptions" value={this.state.randomObj.homeName} />
          </label>
          <br />
          <button id="submitBtn" onClick={ (e) => {this.onSubmit(e, this.state.randomObj) }}>Submit</button> &nbsp;
          </div>

          <hr />
          <h3>Result of Voting is as under:-</h3>
          {
            this.state.isDataAvailable ? 
          
            <table border='0' cellPadding="5px">
              <thead>
                <tr>
                  <td>Sports Name</td>
                  <td>Teams</td>
                  <td>Voted Team</td>
                  <td>Voted Received</td>
                </tr>
              </thead>
              <tbody>
                {this.renderPollResult()}
              </tbody>
            </table>
            : 
            null
          }

      </React.Fragment>
    )
  }
}
 
export default Poll;