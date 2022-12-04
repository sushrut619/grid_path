import colors from "../colors";

function getCellColor(cellValue) {
    let cellColor = colors.white;
    switch (cellValue) {
        case 1: {
            cellColor = colors.black;
            break;
        }
        case 2: {
            cellColor = colors.blue;
            break;
        }
        case 3: {
            cellColor = colors.green;
            break;
        }
        default: {
            cellColor = colors.white;
            break;
        }
    }

    return cellColor;
}

function GridBox(props) {
    const { grid, rowNum, colNum, onClickCell } = props;
    const cellValue = grid[rowNum][colNum];
    let cellColor = getCellColor(cellValue);
    // console.log("row: ", rowNum, " column: ", colNum);
    return (
        <div
            style={{
                height: 24,
                width: 24,
                borderWidth: 1,
                borderStyle: "solid",
                backgroundColor: cellColor,
            }}
            onClick={() => onClickCell(rowNum, colNum)}
        />
    );
}

export default GridBox;
