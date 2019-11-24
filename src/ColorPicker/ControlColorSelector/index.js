import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import noop from 'lodash/noop';
import CustomPropTypes from '../../custom-prop-types';
import Dropdown from '../components/Dropdown';
import Option from './Option';
import './styles.css';

function ControlColorSelector(props) {
  const { onChange } = props;
  const [dropdownOpenState, setOpenDropdown] = useState(false);
  const onCloseDropdown = useCallback(() => setOpenDropdown(false), []);
  const onToggleDropdown = useCallback(() => setOpenDropdown(state => !state), []);
  const onClickOption = useCallback((e) => {
    setOpenDropdown(false);
    onChange(e);
  }, [onChange]);

  if (isEmpty(props.colors)) {
    return null;
  }

  return (
    <Dropdown
      isOpen={dropdownOpenState}
      onClose={onCloseDropdown}
      onToggle={onToggleDropdown}
    >
      {props.colors.map((color, i) => (
        <Option 
          key={`color_option_${i}`}
          onClick={onClickOption}
          {...color}
        />
      ))}
    </Dropdown>
  );
}

ControlColorSelector.propTypes = {
  onChange: PropTypes.func,
  colors: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: CustomPropTypes.hex.isRequired,
  })),
};

ControlColorSelector.defaultProps = {
  onChange: noop,
  colors: [],
};

export default ControlColorSelector;
