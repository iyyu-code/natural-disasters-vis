import React from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
const Map = ReactMapboxGl({ accessToken: process.env.REACT_APP_MAPBOX_TOKEN });

export default class MapLayer extends React.Component {
  constructor (props) {
    super(props);

    this.state = { 
      center: [-106.402786, 42.353889], 
      style: 'mapbox://styles/mapbox/light-v9', 
      containerStyle: { height: '70vh', width: '100vw' }
    }
  }
   
  render() {
    
    return <div>
        <Map style={this.state.style} containerStyle={this.state.containerStyle} center={this.state.center} zoom={[2.6]}>
        </Map>
      </div>;
  }
}