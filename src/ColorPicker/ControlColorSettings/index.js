import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import CustomPropTypes from '../../custom-prop-types';
import Dropdown from '../components/Dropdown';
import ColorIndicator from '../components/ColorIndicator';
import InputRangeChannel from '../components/InputRangeChannel';
import { CHANNELS } from '../constants';
import './styles.css';

function ControlColorSettings(props) {
  const { onChange, onTempChange, color } = props;
  const [dropdownOpenState, setOpenDropdown] = useState(false);
  const [tempColorState, setTempColor] = useState(color);
  
  const onCloseDropdown = useCallback(() => setOpenDropdown(false), []);
  const onToggleDropdown = useCallback(() => setOpenDropdown(state => !state), []);
  
  const onCancel = useCallback(() => {
    setOpenDropdown(false);
    onTempChange({ color: tempColorState });
  }, [onTempChange, tempColorState]);

  const onConfirm = useCallback(() => {
    setOpenDropdown(false);
    setTempColor(color);
    onChange({ color });
  }, [onChange, color]);
  
  return (
    <Dropdown
      isOpen={dropdownOpenState}
      onClose={onCloseDropdown}
      onToggle={onToggleDropdown}
      icon={<ColorIndicator color={color} />}
    >
      <div className="ControlColorSettings">
        {CHANNELS.map(i => (
          <InputRangeChannel
            key={`color_channel_${i}`}
            channel={i}
            color={color}
            onChange={onTempChange}
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
  onTempChange: PropTypes.func,
};

ControlColorSettings.defaultProps = {
  onChange: noop,
  onTempChange: noop,
};

export default ControlColorSettings;
