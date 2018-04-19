import React from 'react';
import DensityMap from './DensityMap.js';
import './App.css';
const sampleData = require('./sampleData');

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
          <DensityMap disasterData={sampleData} />
      </div>
    )
  }
}
