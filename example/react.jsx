import React, { useState } from 'react'
import { hot } from 'react-hot-loader/root';

function MyCard () {
  const [ state, setState ] = useState ({ text: "", checked: false });
  const updateState = partialState => setState (oldState => ({
    ...oldState,
    ...partialState
  }));
  const array = [];
  const data = [ 1, 2, 3 ];
  for (let i = data.length - 1; i >= 0; i--) {
    array.push (<span>{data[i]}</span>)
  }
  return (
    <div>
      <input
        type="text"
        value={state.text}
        onChange={(e) => updateState ({ text: e.target.value })}
      />
      <span>{state.text}</span>
      <div>{array}</div>
    </div>
  )
}

export default hot (MyCard);
