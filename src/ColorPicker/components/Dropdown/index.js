import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from 'lodash/noop';
import './styles.css';

function ControlItem(props) {
  const refAction = React.createRef();
  const refDropdown = React.createRef();

  useOnClickOutside([refDropdown, refAction], props.onClose, props.isOpen);

  return (
    <React.Fragment>
      <div className="Dropdown-controlItem">
        {props.isOpen ? <div className="Dropdown-modalArrow" /> : null}
        {props.icon || (
          <div className={classNames('Dropdown-stateIndicator', {
            'active': props.isOpen,
          })} />
        )}
        <button
          className="ButtonCover"
          onClick={props.onToggle}
          type="button"
          ref={refAction}
        />
      </div>
      {props.isOpen ? (
        <div className="Dropdown-modal" ref={refDropdown}>
          {props.children}
        </div>
      ) : null}
    </React.Fragment>
  );
}

ControlItem.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onToggle: PropTypes.func,
  children: PropTypes.node,
  icon: PropTypes.node,
};

ControlItem.defaultProps = {
  isOpen: true,
  onClose: noop,
  onToggle: noop,
  children: null,
  icon: null,
};

export default ControlItem;

function useOnClickOutside(refs, handler, isOpen) {
  useEffect(() => {
    const listener = event => {
      for (let i = 0; i < refs.length; i++) {
        const ref = refs[i].current;
        if (!ref || ref.contains(event.target)){ 
          return;
        }
      }
      handler(event);
    };

    const unbind = () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };

    if(isOpen) {
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
    } else {
      unbind();
    }

    return () => {
      unbind();
    };
  }, [refs, handler, isOpen]);
}
