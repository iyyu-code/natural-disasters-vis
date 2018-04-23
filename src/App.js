import React from 'react';
import PropTypes from 'prop-types';
import MapContainer from './MapContainer';
import YearRange from './YearRange';
import DropdownContainer from './DropdownContainer';
import { interactiveQuery } from './dataConfig';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disasterSelections: [''],
      interactiveQuery: null,
      years: ['2018']
    };

    this.filterDisaster = this.filterDisaster.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
  }

  filterDisaster(disasterSelections) {
    interactiveQuery.args.where.incidentType = {
      $in: disasterSelections
    };
    this.setState({ disasterSelections });
    this.setState({ interactiveQuery: interactiveQuery });
  }

  handleYearChange(years) {
    years = years.map(numStr => Number(numStr));
    const yearFill = [];
    for (let i = 0; i <= years[1] - years[0]; i += 1) {
      const year = years[0] + i;
      yearFill.push(year.toString());
    }
    interactiveQuery.args.where = {
      fyDeclared: {
        $in: yearFill
      }
    };
    this.setState({ interactiveQuery: interactiveQuery });
    this.setState({ years: yearFill });
  }

  render() {
    return (
      <div className="App">
        <MapContainer
          disasterSelections={this.state.disasterSelections}
          interactiveQuery={this.state.interactiveQuery}
          years={this.state.years}
        />
        <YearRange handleYearChange={this.handleYearChange} />
        <DropdownContainer filterDisaster={this.filterDisaster} />
      </div>
    );
  }
}

App.propTypes = {
  disasterSelections: PropTypes.array,
  handleYearChange: PropTypes.func,
  filterDisaster: PropTypes.func,
  interactiveQuery: PropTypes.object,
  years: PropTypes.arrayOf(PropTypes.string)
}