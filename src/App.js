import { useCallback, useState } from "react";
import _ from "lodash";

import "./App.css";
import GridRow from "./components/GridRow";
import InputTypeSelect from "./components/InputTypeSelect";
import { initialGrid, inputTypes, maxRows, maxColumns } from "./constants";

function calcPath(grid, origin, destination) {
  // console.debug("dest: ", destination);
  let shortestPath = [];
  const row = destination[0], column = destination[1];
  if (row < 0 || row >= maxRows || column < 0 || column >= maxColumns) {
    return shortestPath;
  }

  if (grid[row][column] === 1) {
    return shortestPath;
  }

  if (grid[row][column] === 5) {
    return shortestPath;
  }

  if (origin[0] === row && origin[1] === column) {
    console.debug("reached origin...");
    shortestPath.push(origin);
    return shortestPath;
  }

  const newGrid = Array.from(grid);
  newGrid[row][column] = 5;

  // we start from destination and move towards origin
  let possiblePaths = [];
  for (let i = -1; i <= 1; ++i) {
    for (let j = -1; j <= 1; ++j) {
      if (i === 0 && j === 0) {
        continue;
      }
      // mark the cell as visited

      const newDest = [row + i, column + j];
      let newPath = calcPath(newGrid, origin, newDest);
      if (newPath.length > 0) {
        newPath.push(destination);
        possiblePaths.push(newPath);
        // console.debug("new path: ", newPath);
      }
    }
  }

  let shortestPathLen = -1;
  for (let i = 0; i < possiblePaths.length; ++i) {
    if (
      shortestPathLen === -1 ||
      possiblePaths[i].length < shortestPathLen
    ) {
      shortestPathLen = possiblePaths[i].length;
      shortestPath = possiblePaths[i];
      console.debug("shortest path len: ", shortestPathLen);
    }
  }
  return shortestPath;
}

function App() {
  console.debug("app js...");
  const [grid, setGrid] = useState(initialGrid);
  const [inputType, setInputType] = useState(inputTypes.obstacle);
  const [origin, setOrigin] = useState([-1, -1]);
  const [destination, setDestination] = useState([-1, -1]);

  const onChangeInputType = useCallback(
    (event) => {
      setInputType(event.target.value);
    },
    [setInputType],
  );

  const drawPath = useCallback(async () => {
    const path = calcPath(grid, origin, destination);
    console.debug("path: ", path);
    const newGrid = Array.from(grid);
    for (let i = 0; i < path.length; ++i) {
      const row = path[i][0];
      const column = path[i][1];
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

  const onClickCell = useCallback((row, col) => {
    let cellValue = 1;
    let prevRow = -1, prevCol = -1;
    console.debug("row: ", row, " col: ", col, " inputType: ", inputType);
    if (inputType === inputTypes.origin) {
      cellValue = 2;
      prevRow = origin[0];
      prevCol = origin[1];
      setOrigin([row, col]);
    }
    else if (inputType === inputTypes.destination) {
      cellValue = 3;
      prevRow = destination[0];
      prevCol = destination[1];
      setDestination([row, col]);
    } else if (grid[row][col] === 1) {
      cellValue = 0;
    }
    let newGrid = _.cloneDeep(grid);
    newGrid[row][col] = cellValue;
    if (prevRow !== -1 && prevCol !== -1 && (prevRow !== row || prevCol !== col)) {
      newGrid[prevRow][prevCol] = 0;
    }
    setGrid(newGrid);
  }, [origin, destination, grid, inputType, setOrigin, setGrid, setDestination]);

  console.log("origin: ", origin, " dest: ", destination);

  return (
    <div className="App">
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          maxWidth: 264,
          flexWrap: "wrap",
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
        <button
          style={{ marginTop: 20 }}
          onClick={() => drawPath()}>Find Path</button>
      </div>
    </div>
  );
}

export default App;
