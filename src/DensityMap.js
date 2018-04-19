import React from 'react';
import ReactMapboxGl, { GeoJSONLayer } from 'react-mapbox-gl';
const { center, styles, containerStyle, zoom } = require('./mapStyle.json');
const stateCodeGeoJSON = require('./stateCodeGeoJSON.json');
const paintProps = require('./paintProps.json');
const Map = ReactMapboxGl({ accessToken: process.env.REACT_APP_MAPBOX_TOKEN });

export default class DensityMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filtered: [],
      paintProp: {}
    }
  }

  componentDidMount() {
    this.setState({filtered: this.determineDensity()})
    this.setState({paintProp :this.determineDensityStops()});
  }

  determineDensity() {
    let dataCount = {};
    for (let i = 0; i < this.props.disasterData.length; i+=1) {
      let state = this.props.disasterData[i].state;
      dataCount[state] = (dataCount[state] || 0) + 1;
    }
    let mapped = [];
    for (let state in dataCount) {
      if (stateCodeGeoJSON[state]) {
      let feature = stateCodeGeoJSON[state];
        feature.properties.density = dataCount[state];
        mapped.push(feature);
      }
    }
    return mapped;
  }
  
  determineDensityStops() {
    const count = this.props.disasterData.length;
    if (count <= 50) {
      return paintProps["Ten"];
    }
    if (count <=500) {
      return paintProps["Hundred"];
    }
    if (count <=1000) {
      return paintProps["Thousand"];
    }
    return paintProps["FourThousand"];
  }

  render() {
    return <div className="Map">
        {}
        <Map style={styles.light} containerStyle={containerStyle} center={center} zoom={zoom}>
        <GeoJSONLayer data={{
        "type": "FeatureCollection",
        "features": this.state.filtered}} fillPaint={this.state.paintProp} />
        </Map>
      </div>;
  }
}
