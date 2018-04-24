import React from 'react';
import { Statistic, StatisticGroup, StatisticValue, StatisticLabel } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class InfoContainer extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state ={
      disasterCount: 0
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.disasterCount !== prevProps.disasterCount) {
      let disasterCount = this.props.disasterCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      console.log(disasterCount);
      this.setState({ disasterCount: disasterCount });
    }
  }

  render () {
    return this.props.years[1] ? <div className="info-container">
      <p>
        {`From the year ${this.props.years[0]} to ${
          this.props.years[1]
        } with the current selection of disaster types, at the county level, FEMA recorded:`}
      </p>
      <StatGroup disasterCount={this.state.disasterCount} />
    </div> : <div className="info-container">
      <p>
        {`In the year ${
          this.props.years[0]
        }, with the current selection of disaster types, at the county level, FEMA recorded:`}
      </p>
      <StatGroup disasterCount={this.state.disasterCount} />
    </div>;
  }
  
}

const StatGroup = (props) => {
    return(
      <div className="stat-group">
        <Statistic.Group>
          <Statistic>
            <Statistic.Value>{props.disasterCount}</Statistic.Value>
            <Statistic.Label>Total Disasters</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </div>
    )
}

InfoContainer.propType = {
  disasterCount: PropTypes.number
}