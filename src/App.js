import React from 'react';
import ColorPicker from './ColorPicker';
import './App.css';

const DEFAULT_VALUE = '#1cef6d';
const DEFAULT_COLORS = [{
  name: 'red',
  color: '#F00',
}, {
  name: 'yellow',
  color: '#FF0',
}, {
  name: 'green',
  color: '#0F0',
}, {
  name: 'blue',
  color: '#00F',
}];

function App() {
  return (
    <div className="App">
      <ColorPicker 
        value={DEFAULT_VALUE}
        colors={DEFAULT_COLORS}
        onChange={({ color }) => {
          console.log('Color picker change color:', color);
        }}
      />
    </div>
  );
}

export default App;
