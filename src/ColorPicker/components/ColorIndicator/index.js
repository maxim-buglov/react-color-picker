import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

function ColorIndicator(props) {
  return (
    <div className="ColorIndicator">
      <svg width="100%" height="100%" viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg">
        <rect fill={props.color} x="0" y="0" width="1" height="1"/>
      </svg>
    </div>  
  );
}

ColorIndicator.propTypes = {
  color: PropTypes.string.isRequired,
};

export default ColorIndicator;
