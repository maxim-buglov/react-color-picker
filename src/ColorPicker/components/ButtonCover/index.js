import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

function ButtonCover(props) {
  return (
    <button
      className="ButtonCover"
      onClick={props.onClick}
      type="button"
    />
  );
}

ButtonCover.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonCover;
