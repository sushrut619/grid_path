function GridBox(props) {
    const { grid, rowNum, colNum } = props;
    console.log("row: ", rowNum, " column: ", colNum);
    return (
        <div style={{ height: 24, width: 24, borderWidth: 1, borderStyle: "solid" }} />
    )
}

export default GridBox;