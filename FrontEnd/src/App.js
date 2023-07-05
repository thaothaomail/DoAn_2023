import React from 'react';
import { useState } from 'react';
import './App.css';

function App() {
  const [state, setState] = useState({ value: 'disnable' })
  const onChangeRadio = (e) => {
    setState({ value: e.target.value })
  }
  const { value } = state

  return (
    <div className="App">
      <div>
        <form >
          <input type="radio" className="ml-5" checked={value === 'enable'} onChange={onChangeRadio} value="enable" />enable
          <input type="radio" className="ml-5" checked={value === 'disnable'} onChange={onChangeRadio} value="disnable" />disnable
        </form>
      </div>
    </div>
  );
}

export default App;
