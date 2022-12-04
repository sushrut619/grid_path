const inputTypes = {
    origin: "origin",
    destination: "destination",
    obstacle: "obstacle",
};

const maxRows = 10;
const maxColumns = 10;

const gridRow = [];
for (let i = 0; i < maxColumns; ++i) {
    gridRow.push(0);
}

const initialGrid = [];
for (let i = 0; i < maxRows; ++i) {
    initialGrid.push(Array.from(gridRow));
}

export { initialGrid, inputTypes };