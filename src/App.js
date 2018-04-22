import React from 'react';
import MapContainer from './MapContainer';
import YearRange from './YearRange';
import './App.css';
import { interactiveQuery } from './dataConfig';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      interactiveQuery: null
    }

    this.handleYearChange = this.handleYearChange.bind(this);
  }

  handleYearChange(years) {
    years = years.map(numStr => Number(numStr));
    const yearFill = [];
    for (let i = 0; i <= years[1] - years[0]; i+=1) {
      const year = years[0] + i;
      yearFill.push(year.toString());
    }
    interactiveQuery.args.where = {
      fyDeclared: {
        "$in": yearFill
      }
    };
    this.setState({ interactiveQuery: interactiveQuery });
  }
  
  render() {
    return (
      <div className="App">
        <MapContainer interactiveQuery={this.state.interactiveQuery}/>
        <YearRange handleYearChange={this.handleYearChange}/>
      </div>
    )
  }
}