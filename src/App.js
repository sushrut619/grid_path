import { useCallback, useState } from "react";
import _ from "lodash";

import "./App.css";
import GridRow from "./components/GridRow";
import InputTypeSelect from "./components/InputTypeSelect";
import { inputTypes, maxRows, maxColumns, pathErrorMsg } from "./constants";
import { build2DArray, findPath } from "./utils";

const initialGrid = build2DArray(maxRows, maxColumns);

function App() {
  console.debug("app js...");
  const [grid, setGrid] = useState(initialGrid);
  const [inputType, setInputType] = useState(inputTypes.obstacle);
  const [origin, setOrigin] = useState([-1, -1]);
  const [destination, setDestination] = useState([-1, -1]);
  const [pathError, setPathError] = useState("");

  const onChangeInputType = useCallback(
    (event) => {
      setInputType(event.target.value);
    },
    [setInputType]
  );

  const drawPath = useCallback(() => {
    const gridCopy = _.cloneDeep(grid);
    const shortestPath = findPath(gridCopy, origin, destination);
    console.debug("path: ", shortestPath);
    if (shortestPath === -1) {
      setPathError(pathErrorMsg);
    }
    const newGrid = _.cloneDeep(grid);

    for (let i = 0; i < shortestPath.length; ++i) {
      const row = shortestPath[i][0];
      const column = shortestPath[i][1];
      if (
        (row === origin[0] && column === origin[1]) ||
        (row === destination[0] && column === destination[1])
      ) {
        continue;
      }
      newGrid[row][column] = 4;
    }

    setGrid(newGrid);
  }, [grid, origin, destination, setGrid]);

  const onClickCell = useCallback(
    (row, col) => {
      let cellValue = 1;
      let prevRow = -1,
        prevCol = -1;
      if (inputType === inputTypes.origin) {
        cellValue = 2;
        prevRow = origin[0];
        prevCol = origin[1];
        setOrigin([row, col]);
      } else if (inputType === inputTypes.destination) {
        cellValue = 3;
        prevRow = destination[0];
        prevCol = destination[1];
        setDestination([row, col]);
      } else if (grid[row][col] === 1) {
        cellValue = 0;
      }
      let newGrid = _.cloneDeep(grid);
      newGrid[row][col] = cellValue;
      if (
        prevRow !== -1 &&
        prevCol !== -1 &&
        (prevRow !== row || prevCol !== col)
      ) {
        newGrid[prevRow][prevCol] = 0;
      }
      setGrid(newGrid);
      setPathError("");
    },
    [destination, grid, inputType, origin, setDestination, setGrid, setOrigin, setPathError],
  );

  const resetGrid = useCallback(() => setGrid(initialGrid), [setGrid]);

  return (
    <div className="App">
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          maxWidth: 264,
          flexWrap: "wrap",
          marginTop: 40,
        }}
      >
        {grid.map((item, index) => (
          <GridRow
            grid={grid}
            inputType={inputType}
            key={index}
            onClickCell={onClickCell}
            row={item}
            rowNum={index}
            setGrid={setGrid}
          />
        ))}
      </div>
      <div>
        <InputTypeSelect
          onChangeInputType={onChangeInputType}
          selectedType={inputType}
        />
        <button style={{ margin: 20 }} onClick={() => drawPath()}>
          Find Path
        </button>
        <button style={{ margin: 20 }} onClick={resetGrid}>
          Reset Grid
        </button>
        <p style={{ color: "red" }}>{pathError}</p>
      </div>
    </div>
  );
}

export default App;
