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

  componentWillReceiveProps(nextProps) {
    this.determineDensity(nextProps.disasterData);
    this.determineDensityStops(nextProps.disasterData.length);
  }

  determineDensity(data) {
    const dataCount = data.reduce((all, each, index) => {
      all[each.state] = (all[each.state] || 0) + 1;
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
    }
  }

  render() {
    return <div className="Map">
        <Map style={styles.light} containerStyle={containerStyle} center={center} zoom={zoom}>
        <GeoJSONLayer data={{
        "type": "FeatureCollection",
        "features": this.state.filtered}} fillPaint={this.state.paintProp} />
        </Map>
      </div>;
  }
}
