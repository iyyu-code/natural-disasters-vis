import React from 'react';
import MapLayer from './MapLayer';
import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
          <MapLayer />
      </div>
    )
  }
}
