import React from 'react';
import ReactMapboxGl, { GeoJSONLayer } from 'react-mapbox-gl';
const { center, styles, containerStyle, zoom } = require('./mapStyle.json');
const stateCodeGeoJSON = require('./stateCodeGeoJSON.json');
const paintProps = require('./paintProps.json');
const Map = ReactMapboxGl({ accessToken: process.env.REACT_APP_MAPBOX_TOKEN });

export default class DensityMap extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      disasterData: [],
      shouldUseSampleData: false
    };
  }

<<<<<<< HEAD
  componentWillReceiveProps(nextProps) {
    this.determineDensity(nextProps.disasterData);
    this.determineDensityStops(nextProps.disasterData.length);
  }

  determineDensity(data) {
    const dataCount = data.reduce((all, each, index) => {
      all[each.state] = (all[each.state] || 0) + 1;
=======
  static getDerivedStateFromProps(nextProps, prevState) {
    return { disasterData: nextProps.disasterData, shouldUseSampleData: nextProps.shouldUseSampleData };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.disasterData !== prevProps.disasterData) {
      this.determineDensity(this.props.disasterData);
    }
  }

  determineDensity(data) {
    let highest = 0;
    const dataCount = data.reduce((all, each, index) => {
      all[each.state] = (all[each.state] || 0) + 1;
      if (all[each.state] > highest) {
        highest = all[each.state];
      } 
>>>>>>> 74ccf61efc330fe6652dd0c1e8ea3ab76c00ae38
      return all;
    }, {});
    let features = [];
    for (let state in dataCount) {
      if (stateCodeGeoJSON[state]) {
        let feature = stateCodeGeoJSON[state];
        feature.properties.density = dataCount[state];
        features.push(feature);
      }
    }
<<<<<<< HEAD
    this.setState({ filtered: features });
  }
  
  determineDensityStops(disasterCount) {
    if (disasterCount <= 50) {
      this.setState({ paintProp: paintProps['Ten'] });
    } else if (disasterCount <=500) {
      this.setState({ paintProp: paintProps['Hundred'] });
    } else if (disasterCount <=1000) {
      this.setState({ paintProp: paintProps['Thousand'] });
    } else {
      this.setState({ paintProp: paintProps['FourThousand'] });
=======
    this.setState({highestCount : highest});
    this.setState({disasterData : features});
  }

  determineDensityStops(highestdisasterCount) {
    if (this.state.shouldUseSampleData === false) {
      if (highestdisasterCount <= 50) {
        return paintProps['Ten'];
      }
      if (highestdisasterCount <= 100) {
        return paintProps['Hundred'];
      }
      if (highestdisasterCount <= 1000) {
        return paintProps['Thousand'];
      } else {
        return paintProps['FiveThousand'];
      }
    } else {
      return paintProps['Hundred'];
>>>>>>> 74ccf61efc330fe6652dd0c1e8ea3ab76c00ae38
    }
  }

  render() {
<<<<<<< HEAD
    return <div className="Map">
        <Map style={styles.light} containerStyle={containerStyle} center={center} zoom={zoom}>
        <GeoJSONLayer data={{
        "type": "FeatureCollection",
        "features": this.state.filtered}} fillPaint={this.state.paintProp} />
=======
    return (
      <div className="Map">
        <Map
          center={center}
          containerStyle={containerStyle}
          style={styles.light}
          zoom={zoom}
        >
          <GeoJSONLayer
            data={{
              type: 'FeatureCollection',
              features: this.state.disasterData
            }}
            fillPaint={this.determineDensityStops(this.state.highestCount)}
          />
>>>>>>> 74ccf61efc330fe6652dd0c1e8ea3ab76c00ae38
        </Map>
      </div>
    );
  }
}
