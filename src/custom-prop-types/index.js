import isString from 'lodash/isString';

function isRequired(props, propName, componentName) {
  if (props[propName] == null) {
    return new Error(
      `Required prop '${propName}' was not specified in '${componentName}'.`
    );
  }
  return this(props, propName, componentName);
}

function hex(props, propName, componentName) {
  const value = props[propName];
  if (!isString(value) || !/^#?([a-f0-9]{6}|[a-f0-9]{3})$/gi.test(value)) {
    return new Error(
      `Invalid prop '${propName}' supplied to '${componentName}'. Validation failed.`
    );
  }
}

hex.isRequired = isRequired.bind(hex);

export default {
  hex,
};
