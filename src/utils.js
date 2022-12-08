import _ from "lodash";

import { maxColumns, maxRows } from "./constants";

function build2DArray(numRows, numCols, cellValue = 0) {
    const gridRow = [];
    for (let i = 0; i < maxColumns; ++i) {
        gridRow.push(cellValue);
    }

    const grid = [];
    for (let i = 0; i < maxRows; ++i) {
        grid.push(Array.from(gridRow));
    }

    return grid;
}

function findPath(grid, origin, destination) {
    const visitedNodes = _.cloneDeep(grid);
    let shortestPath = -1;
    const memo = build2DArray(maxRows, maxColumns, -1);

    const originRow = origin[0], originColumn = origin[1];
    const destRow = destination[0], destColumn = destination[1];
    // we start by visiting origin
    const nodeQueue = [[originRow, originColumn]];
    visitedNodes[originRow][originColumn] = 5;
    memo[originRow][originColumn] = null;

    let nextNode;
    while (nodeQueue.length > 0) {
        nextNode = nodeQueue.shift();
        // if we reached the destination then we are done
        if (nextNode[0] === destRow && nextNode[1] === destColumn) {
            break;
        }
        // get a list of all neighbours not previously visited and not containing obstacles
        const neighbours = getNeighbours(nextNode, visitedNodes);
        for (let i = 0; i < neighbours.length; ++i) {
            const currentRow = neighbours[i][0];
            const currentColumn = neighbours[i][1];
            // if we have not already visited the node
            if (visitedNodes[currentRow][currentColumn] !== 5) {
                // add neighbour to the queue
                nodeQueue.push([currentRow, currentColumn]);
                // set current node as the parent of neighbour
                memo[currentRow][currentColumn] = nextNode;
                // mark the neighbour as visited
                visitedNodes[currentRow][currentColumn] = 5;
            }
        }

    }

    if (nextNode[0] === destRow && nextNode[1] === destColumn) {
        shortestPath = []
        while (nextNode !== null) {
            shortestPath.push(Array.from(nextNode));
            nextNode = memo[nextNode[0]][nextNode[1]];
        }
    }
    console.debug("shortest path: ", shortestPath);

    return shortestPath;
}

function getNeighbours(node, grid) {
    console.debug("node: ", node, " grid: ", grid);
    let neighbours = [];
    const deltaRow = [1, -1, 0, 0];
    const deltaColumn = [0, 0, 1, -1];

    for (let i = 0; i < 4; ++i) {
        const nextRow = node[0] + deltaRow[i];
        const nextColumn = node[1] + deltaColumn[i];
        console.debug("next row: ", nextRow, " nextColumn: ", nextColumn);

        if (nextRow < 0 || nextRow >= maxRows || nextColumn < 0 || nextColumn >= maxColumns) {
            continue;
        }

        if (grid[nextRow][nextColumn] === 5 || grid[nextRow][nextColumn] === 1) {
            continue;
        }

        neighbours.push([nextRow, nextColumn]);
    }

    return neighbours;
}

export { build2DArray, findPath };