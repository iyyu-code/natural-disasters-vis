import React from 'react';
import PropTypes from 'prop-types';
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
      highestCount: 0,
      shouldUseSampleData: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      disasterData: nextProps.disasterData,
      shouldUseSampleData: nextProps.shouldUseSampleData
    };
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
    this.setState({ highestCount: highest });
    this.setState({ disasterData: features });
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
    }
  }

  render() {
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
        </Map>
      </div>
    );
  }
}

DensityMap.propTypes = {
  disasterData: PropTypes.array,
  highestCount: PropTypes.number,
  shouldUseSampleData: PropTypes.bool
};