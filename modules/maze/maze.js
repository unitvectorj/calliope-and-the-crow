import Cell from './cell.js'
import {depth_first_recursive_backtracker} from './algorithm.js'

class Maze {
    constructor(numRows, numCols, id = 0, startCoor = [0,0]) {
        this.numCols = numCols;
        this.numRows = numRows;
        this.id = id;
        this.gridSize = numRows * numCols;
        this.entryCoor = this.pickRandomEntryExit(null);
        this.exitCoor = this.pickRandomEntryExit(this.entryCoor);
        this.generationPath = [];
        this.solutionPath = null;
        this.initialGrid = this.generateGrid();
        this.grid = this.initialGrid;
        this.startCoor = startCoor;
    }

    generateGrid(){
        /*
        Creates 2D grid of Cells. N maze carved out yet.

        return: a list of Cell objects at each position
        */

        // Create an empty array
        let grid = [];

        // Place a cell at each location on the grid
        for (let i = 0; i < this.numRows; i++){
            grid.push([]);
            for (let j = 0; j < this.numCols; j++){
                grid[i].push(Cell(i,j));
            }
        }

        return grid;
    }

    findNeighbors(cellRow,cellCol){
        /*
        Finds all neighbors of the current Cell in the grid.
        returns: 
            null, if there are no unvisited neighbors
            list, a list of unvisited neighbors
        */
        let neighbors = [];

        function checkNeighbor(row,col){
            if (row >= 0 && row < this.numRows && col >= 0 && col < this.numCols){
                neighbors.push([row,col]);
            }
        }

        checkNeighbor(cellRow-1,cellCol); // top
        checkNeighbor(cellRow,cellCol+1); // right
        checkNeighbor(cellRow+1,cellCol); // bottom
        checkNeighbor(cellRow,cellCol-1); // left

        return neighbors.length > 0 ? neighbors : null;

    }

    validateNeighbors_Generate(neighborIndeces){
        /*
        returns:
        */

        let neighborList = neighborIndeces.filter(n => !this.grid[n[0]][n[1]].visited);
        return neighborList.length > 0 ? neighborList : null;
    }

    validateNeighbors_Solve(neighborIndeces,k,l,k_end,l_end){
        /*
        returns:
        */
        let neighList = [];
        let minDistToTarget = 100000;

        for (let [k_n, l_n] of neighbourIndices) {
            if (!this.grid[k_n][l_n].visited && !this.grid[k][l].isWallsBetween(this.grid[k_n][l_n])) {
                let distToTarget = Math.sqrt((k_n - kEnd) ** 2 + (l_n - lEnd) ** 2);

                if (distToTarget < minDistToTarget) {
                    minDistToTarget = distToTarget;
                    var minNeigh = [k_n, l_n];
                }
            }
        }

        if (typeof minNeigh !== "undefined") {
            neighList.push(minNeigh);
        }
    }

    pickRandomEntryExit(usedEntryExit = null){
        let rngEntryExit = usedEntryExit;  // Initialize with used value

        // Try until unused location along boundary is found.
        while (rngEntryExit === usedEntryExit) {
            let rngSide = Math.floor(Math.random() * 4);  // Generate a random integer between 0 and 3

            if (rngSide === 0) {     // Top side
                rngEntryExit = [0, Math.floor(Math.random() * this.numCols)];

            } else if (rngSide === 2) {   // Right side
                rngEntryExit = [this.numRows - 1, Math.floor(Math.random() * this.numCols)];

            } else if (rngSide === 1) {   // Bottom side
                rngEntryExit = [Math.floor(Math.random() * this.numRows), this.numCols - 1];

            } else if (rngSide === 3) {   // Left side
                rngEntryExit = [Math.floor(Math.random() * this.numRows), 0];
            }
        }

        return rngEntryExit;  // Return entry/exit that is different from exit/entry

    }

    generateMaze(startCoor = [0,0]){
        depth_first_recursive_backtracker(this, startCoor);
    }
}