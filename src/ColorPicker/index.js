import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import CustomPropTypes from './../custom-prop-types';
import ControlColorSettings from './ControlColorSettings';
import ControlColorSelector from './ControlColorSelector';
import './styles.css';

function ColorPicker(props) {
  const { onChange } = props;
  const [stringColorState, setStringColor] = useState(props.value);
  const [indicatorColorState, setIndicatorColor] = useState(props.value);
  
  const onChangeColor = useCallback(({ color }) => {
    setIndicatorColor(color);
    setStringColor(color);
    onChange({ color });
  }, [onChange]);

  const onTempChangeSettings = useCallback(({ color }) => {
    setIndicatorColor(color)
  }, []);
  
  return (
    <div className="ColorPicker">
      <div className="DisplayColorString">
        {stringColorState}
      </div>
      <ControlColorSettings
        color={indicatorColorState}
        onChange={onChangeColor}
        onTempChange={onTempChangeSettings}
      />
      <ControlColorSelector
        colors={props.colors}
        onChange={onChangeColor}
      />
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
