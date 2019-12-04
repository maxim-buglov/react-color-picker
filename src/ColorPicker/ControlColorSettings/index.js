import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import CustomPropTypes from '../../custom-prop-types';
import Dropdown from '../components/Dropdown';
import ColorIndicator from '../components/ColorIndicator';
import InputRangeChannel from '../components/InputRangeChannel';
import { CHANNELS } from '../constants';
import './styles.css';

function ControlColorSettings(props) {
  const { onChange, color } = props;
  const [dropdownOpenState, setOpenDropdown] = useState(false);
  const [tempColorState, setTempColor] = useState(color);
  
  const onCloseDropdown = useCallback(() => setOpenDropdown(false), []);
  const onToggleDropdown = useCallback(() => setOpenDropdown(state => !state), []);
  
  const onTempChangeColor = useCallback(({ color }) => setTempColor(color), []);

  const onCancel = useCallback(() => {
    setOpenDropdown(false);
    setTempColor(color);
  }, [color]);

  const onConfirm = useCallback(() => {
    setOpenDropdown(false);
    onChange({ color: tempColorState });
  }, [onChange, tempColorState]);
  
  useEffect(() => {
    setTempColor(color);
  }, [color])

  return (
    <Dropdown
      isOpen={dropdownOpenState}
      onClose={onCloseDropdown}
      onToggle={onToggleDropdown}
      icon={<ColorIndicator color={tempColorState} />}
    >
      <div className="ControlColorSettings">
        {CHANNELS.map(i => (
          <InputRangeChannel
            key={`color_channel_${i}`}
            channel={i}
            color={tempColorState}
            onChange={onTempChangeColor}
          />
        ))}
        <div className="ControlColorSettings-controls">
          <button 
            className="ControlColorSettings-controlCancel"
            onClick={onCancel}
            type="button"
          >
            {'Cancel'}
          </button>
          <button 
            className="ControlColorSettings-controlConfirm"
            onClick={onConfirm}
            type="button"
          >
            {'Ok'}
          </button>
        </div>
      </div>
    </Dropdown>
  );
}

ControlColorSettings.propTypes = {
  color: CustomPropTypes.hex.isRequired,
  onChange: PropTypes.func,
};

ControlColorSettings.defaultProps = {
  onChange: noop,
};

export default ControlColorSettings;
