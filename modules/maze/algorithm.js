/*
This script stores the algorithms used for creating, 
traversing, and solving grid-based mazes.

Algorithms:
Depth-First Search (backtracking)
Binary Search Tree
*/

const algorithm_list = ["dfs_backtrack","bin_tree"];

function depth_first_recursive_backtracker( maze, startCoor){
    let [k_curr, l_curr] = startCoor;
    let k_next, l_next;
    let path = [[k_curr,l_urr]];
    maze.grid[k_curr][l_curr].visited = true;
    let visitCounter = 1;
    let visitedCells = [];

    console.log("Generating maze with Depth First Search");
    let time_start = Date.now();

    while (visitCounter < maze.grid.size){
        let neighborIndeces = maze.find_neighbors(k_curr, l_curr); // Find neighbor indeces
        neighborIndeces = maze.validateNeighborsGenerate(neighborIndeces);

        if (neighborIndeces != null){
            visitedCells.push([k_curr,l_curr]); // Add current cell to the stack
            [k_next, l_next] = neighborIndeces[Math.floor(Math.random() * neighborIndeces.length)]; // Choose a random neighbor
            maze.grid[k_curr][l_curr].remove_walls(k_next,l_next) // remove the wall on current 
            maze.grid[k_next][l_next].remove_walls(k_curr,l_curr) // remove the wall on next one
            k_curr = k_next;
            l_curr = l_next;
            path.push([k_curr,l_curr]); // add coordinates to the generation path for backtracking
            visitCounter += 1;
        }
        else if (visitedCells.length > 0){ // if there are no unvisited neighbor cells (???)
            [k_curr, l_curr] = visitedCells.pop(); // pop previous cell (backtracking)
            path.push([k_curr,l_curr]); // add coordinates to the generation path (???)
        }
    }
    
    console.log("number of moves performed: " + path.length);
    console.log("Time taken to generate maze: " + Date.now()- time_start);

    maze.grid[maze.entryCoor[0]][maze.entryCoor[1]].set_as_entry_exit("entry", maze.numRows-1, maze.numCols-1);
    maze.grid[maze.exitCoor[0]][maze.exitCoor[1]].set_as_entry_exit("exit", maze.numRows-1, maze.numCols-1);
    
    for (let i = 0; i < maze.numRows; i++){
        for (let j = 0; j < maze.numCols; j++){
            maze.grid[i][j].visited = false;
        }
    }

    maze.generationPath = path;
}