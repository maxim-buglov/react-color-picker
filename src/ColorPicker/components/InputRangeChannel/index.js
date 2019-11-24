import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import colorString from 'color-string';
import { CHANNELS } from '../../constants';
import './styles.css';

function InputRangeChannel(props) {
  const colorRGB = colorString.get.rgb(props.color);
  const colorChannel = colorRGB[CHANNELS.indexOf(props.channel)];
  const onChangeChannel = e => {
    colorRGB[CHANNELS.indexOf(props.channel)] = parseInt(e.currentTarget.value, 10);
    props.onChange({ color: colorString.to.hex(colorRGB) });
  };

  return (
    <label>
      <div className="InputRangeChannel">
        <div className="InputRangeChannel-label">
          {Array.from(props.channel)[0]}
        </div>
        <div className="InputRangeChannel-inputWrapper">
          <input
            className={classNames('InputRangeChannel-input', props.channel)}
            value={colorChannel}
            onChange={onChangeChannel}
            type="range"
            min="0"
            max="255"
            step="1"
          />
      </div>
      </div>
    </label>
  );
}

InputRangeChannel.propTypes = {
  color: PropTypes.string.isRequired,
  channel: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputRangeChannel;
