import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import CustomPropTypes from './../custom-prop-types';
import ControlColorSettings from './ControlColorSettings';
import ControlColorSelector from './ControlColorSelector';
import './styles.css';

function ColorPicker(props) {
  const { value, onChange, colors } = props;
  const [colorState, setColor] = useState(value);
  
  const onChangeColor = useCallback(({ color }) => {
    setColor(color);
    onChange({ color });
  }, [onChange]);

  useEffect(() => {
    setColor(value);
  }, [value])
  
  return (
    <div className="ColorPicker">
      <div className="DisplayColorString">{colorState}</div>
      <ControlColorSettings color={colorState} onChange={onChangeColor} />
      <ControlColorSelector colors={colors} onChange={onChangeColor} />
    </div>
  );
}

ColorPicker.propTypes = {
  value: CustomPropTypes.hex,
  onChange: PropTypes.func,
  colors: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: CustomPropTypes.hex.isRequired,
  })),
};

ColorPicker.defaultProps = {
  value: '#fff',
  onChange: noop,
  colors: [],
};

export default ColorPicker;
