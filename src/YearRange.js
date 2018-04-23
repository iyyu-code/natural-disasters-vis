import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import debounce from './debounce';
const Range = Slider.createSliderWithTooltip(Slider.Range);

const YearRange = props => {
  const marks = {
    1950: 1950,
    1960: 1960,
    1970: 1970,
    1980: 1980,
    1990: 1990,
    2000: 2000,
    2010: 2010,
    2018: 2018
  };
  return (
    <div className="range">
      <Range
        min={1950}
        max={2018}
        defaultValue={[2018, 2018]}
        marks={marks}
        tipFormatter={value => value}
        onChange={debounce(props.handleYearChange, 200)}
      />
    </div>
  );
};

export default YearRange;