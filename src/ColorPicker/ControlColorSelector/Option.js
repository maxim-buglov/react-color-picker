import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import CustomPropTypes from '../../custom-prop-types';
import ColorIndicator from '../components/ColorIndicator';
import ButtonCover from '../components/ButtonCover';
import './styles.css';

function Option(props) {
  const { name, color } = props;
  return (
    <div className="ControlColorSelectorOption">
      <div className="ControlColorSelectorOption-title">
        {name}
      </div>
      <div className="ControlColorSelectorOption-indicator">
        <ColorIndicator color={color} />
      </div>
      <ButtonCover onClick={() => props.onClick({ name, color })} />
    </div>
  );
}

Option.propTypes = {
  name: PropTypes.string.isRequired,
  color: CustomPropTypes.hex.isRequired,
  onClick: PropTypes.func,
};

Option.defaultProps = {
  onClick: noop,
};

export default Option;
