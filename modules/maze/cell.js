class Cell {
    constructor(row,col){
        this.row = row;
        this.col = col;
        this.visited = false;
        this.active = false;
        this.is_entry_exit = null;
        this.walls = {
            top: true,
            right: true,
            bottom: true,
            left: true
        }
        this.neighbors = []
    }

    is_walls_between(neighbor){
        if (self.row - neighbor.row == 1 && self.walls.top && neighbor.walls.bottom){
            return true
        }
        else if (self.row - neighbor.row == -1 && self.walls.bootom && neighbor.walls.top){
            return true
        }
        else if (self.col - neighbor.col == 1 && self.walls.left && neightbor.walls.right){
            return true
        }
        else if(self.col - neighbor.col == -1 && self.walls.right && neightbor.walls.left){
            return true
        }
        
        return false
    }

    remove_walls(neighbor_row,neighbor_col){
        if (self.row - neighbor_row == 1){
            self.walls.top = false;
            return true;
        }
        else if (self.row - neighbor_row == -1){
            self.walls.bottom = false;
            return true;
        }
        else if (self.col - neighbor_col == 1){
            self.walls.left = false;
            return true;
        }
        else if (self.col - neighbor_col == -1){
            self.walls.right = false;
            return true;
        }
        return false
    }

    set_as_entry_exit(entry_exit, row_limit, col_limit){
        if (self.row == 0){
            self.walls.top = false;
        }
        else if (self.row == row_limit){
            self.walls.bottom = false;
        }
        else if (self.col == 0){
            self.walls.left = false;
        }
        else if (self.col == col_limit){
            self.walls.right = false;
        }
        self.is_entry_exit = entry_exit;
    }

}