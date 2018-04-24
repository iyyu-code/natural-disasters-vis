import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import disasterOptions from '../disasterOptions';

export default class DropdownContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disasterOptions: disasterOptions,
      selectAll: [{ label: 'Select All', value: 'Select All' }],
      dropdownOptions: disasterOptions
    }
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(value) {
    const lastTen = value.substring(value.length - 10);
    if (value.length > 0 && lastTen === 'Select All') {
        this.setState({
          value: disasterOptions,
          dropdownOptions: disasterOptions
        });
        this.props.filterDisaster(disasterOptions.map(option => option.value));
    } else {
      this.setState({ value: value });
      this.setState({dropdownOptions: this.state.selectAll.concat(disasterOptions)});
      this.props.filterDisaster(value.split(','));
    }
	}

  render() {
    return (
      <div className="disaster-dropdown">
        <Select
          closeOnSelect={false}
          joinValues={true}
          multi={true}
          onChange={this.handleSelectChange}
          options={this.state.selectAll.concat(disasterOptions)}
          placeholder="Filter by disaster type..."
          removeSelected={true}
          simpleValue
          value={this.state.value}
        />
      </div>
      
    )   
  }
}

DropdownContainer.propTypes = {
  disasterOptions: PropTypes.arrayOf(PropTypes.object),
  dropdownOptions: PropTypes.arrayOf(PropTypes.object),
  handleSelectChange: PropTypes.func,
  selectAll: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.string
};