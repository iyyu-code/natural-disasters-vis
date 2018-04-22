import React from 'react';
import DensityMap from './DensityMap';
import { initialConfig, interactiveConfig } from './dataConfig';
import { sampleData } from './sampleData.js';
const axios = require('axios');

export default class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sampleData: sampleData
    }
  }

  componentDidMount() {
    axios(initialConfig)
      .then(response => {
        this.setState({disasterData :response.data});
      })
      .catch(err => {
        console.log('Error: ' + err);
      });
  }

  componentWillReceiveProps(nextProps) {
    interactiveConfig.data = nextProps.interactiveQuery;
    axios(interactiveConfig)
      .then(response => {
        this.setState({ disasterData: response.data });
      })
      .catch(err => {
        console.log('Error: ' + err);
      });
  }

  
  render() {
    return this.state.disasterData ? <div className="MapContainer">
        <DensityMap disasterData={this.state.disasterData} />
      </div> : <div className="MapContainer">
        <DensityMap disasterData={this.state.sampleData} />
      </div>;
  }
}