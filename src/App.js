import React from 'react';
import MapContainer from './MapContainer';
import YearRange from './YearRange';
import DropdownContainer from './DropdownContainer';
import { interactiveQuery } from './dataConfig';
import './App.css';
<<<<<<< HEAD
import { interactiveQuery } from './dataConfig';
=======
>>>>>>> 74ccf61efc330fe6652dd0c1e8ea3ab76c00ae38

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
<<<<<<< HEAD
      interactiveQuery: null
    }

=======
      interactiveQuery: null,
      disasterSelections: [''],
      years: ["2018"]
    }

    this.filterDisaster = this.filterDisaster.bind(this);
>>>>>>> 74ccf61efc330fe6652dd0c1e8ea3ab76c00ae38
    this.handleYearChange = this.handleYearChange.bind(this);
  }

  filterDisaster(disasterSelections) {
    interactiveQuery.args.where.incidentType = {
        "$in": disasterSelections
    };
    this.setState({ disasterSelections });
      this.setState({ interactiveQuery: interactiveQuery });
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
<<<<<<< HEAD
=======
    this.setState({years: yearFill});
>>>>>>> 74ccf61efc330fe6652dd0c1e8ea3ab76c00ae38
  }
  
  render() {
    return (
      <div className="App">
<<<<<<< HEAD
        <MapContainer interactiveQuery={this.state.interactiveQuery}/>
=======
        <MapContainer 
        disasterSelections={this.state.disasterSelections}
        interactiveQuery={this.state.interactiveQuery} 
        years={this.state.years} />
>>>>>>> 74ccf61efc330fe6652dd0c1e8ea3ab76c00ae38
        <YearRange handleYearChange={this.handleYearChange}/>
        <DropdownContainer filterDisaster={this.filterDisaster} />
      </div>
    )
  }
}