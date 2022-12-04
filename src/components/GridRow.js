import GridBox from "./GridBox";

function GridRow(props) {
    const { grid, row, rowNum, onClickCell } = props;
    return (
        <div style={{ flexDirection: "row", display: "flex" }}>
            {row.map((item, index) => (
                <GridBox onClickCell={onClickCell} grid={grid} rowNum={rowNum} colNum={index} key={index} />
            ))}
        </div>
    );
}

export default GridRow;
