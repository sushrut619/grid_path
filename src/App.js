import { useState } from 'react';

import './App.css';
import GridRow from './components/GridRow';
import InputTypeSelect from './components/InputTypeSelect';

const initialGrid = Array(10).fill(Array(10).fill(0))

function App() {
  console.debug("app js...");
  const [grid, setGrid] = useState(initialGrid);
  return (
    <div className="App">
      <div style={{ flexDirection: "row", display: "flex", maxWidth: 264, flexWrap: "wrap" }}>
        {grid.map((item, index) => <GridRow key={index} row={item} rowNum={index} />)}
      </div>
      <InputTypeSelect />
    </div>
  );
}

export default App;
