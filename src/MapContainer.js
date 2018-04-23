import React from 'react';
import DensityMap from './DensityMap';
import { initialConfig, interactiveConfig } from './dataConfig';
import { sampleData } from './sampleData.js';
const axios = require('axios');

<<<<<<< HEAD
export default class MapContainer extends React.Component {
=======
export default class MapContainer extends React.PureComponent {
>>>>>>> 74ccf61efc330fe6652dd0c1e8ea3ab76c00ae38
  constructor(props) {
    super(props);

    this.state = {
<<<<<<< HEAD
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
=======
      disasterData: [],
      interactiveConfig: interactiveConfig,
      shouldUseSampleData: false
    }
    this.loadData = this.loadData.bind(this);
  }
  
  loadData = (config, initial = false) => {
    const context = this;
    axios(config)
    .then(response => {
      if (!initial) {
        context.setState({ disasterData: response.data });
      } else if (response.status !== 200 && response.data.count < 1) {
        context.setState({disasterData: sampleData, shouldUseSampleData: true});
      }
    })
    .catch(err => {
        console.log(`ERROR ${err}`);
        context.setState({disasterData: sampleData, shouldUseSampleData: true});
      });
  }

  componentDidMount() {
    this.loadData(initialConfig, true);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.disasterSelections !== prevProps.disasterSelections || this.props.years !== prevProps.years) {
      if (this.props.disasterSelections[0] === "") {
        this.setState({disasterData: []});
      } else {
        axios(interactiveConfig)
          .then(response => {
            this.setState({ disasterData: response.data });
          })
          .catch(err => {
            console.log(`ERROR ${err}`);
          });
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.disasterSelections.length && nextProps.years) {
      interactiveConfig.data = nextProps.interactiveQuery;
        return { interactiveConfig };
    } else {
      return null;
    }
  }
  
  render() {
    return (
      <div className="map-container">
        <DensityMap 
          disasterData={this.state.disasterData} 
          shouldUseSampleData={this.state.shouldUseSampleData}/>
      </div>
      )
>>>>>>> 74ccf61efc330fe6652dd0c1e8ea3ab76c00ae38
  }
}