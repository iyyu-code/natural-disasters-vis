import React from 'react';
import DensityMap from './DensityMap';
import YearRange from './YearRange';
import './App.css';
const { sampleData } = require('./sampleData.js');

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleYearChange = this.handleYearChange.bind(this);
  }

  handleYearChange(years) {
    console.log(years);
  }
  
  render() {
    return (
      <div className="App">
        <DensityMap disasterData={sampleData} />
        <YearRange handleYearChange={this.handleYearChange}/>
      </div>
    )
  }
}