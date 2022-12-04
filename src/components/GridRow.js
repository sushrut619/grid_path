import GridBox from "./GridBox";

function GridRow(props) {
    const { row, rowNum } = props;
    return (
        <div style={{ flexDirection: "row", display: "flex" }}>
        {row.map((item, index) => <GridBox rowNum={rowNum} colNum={index} />)}
        </div>
    );
}

export default GridRow;