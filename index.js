//initialization
const container=document.getElementById("big-box");
const solve_btn=document.getElementById("solve-btn");
const clear_btn=document.getElementById("clear-btn");
//matrix declaration
var matrix = [];
for(var i=0; i<9; i++) {
    matrix[i] = [];
    for(var j=0; j<9; j++) {
        matrix[i][j] = undefined;
    }
}
//creating the 81 small boxes with js
for(var i=0;i<81;i++)
{
    //creation
    const tile=document.createElement("input");
    tile.setAttribute('type','number');
    tile.setAttribute('min',0)
    tile.setAttribute('max',9)
    tile.classList.add("tile-css")
    container.appendChild(tile);

    //borders
    if(i%3==0)
    tile.classList.add("left-border")
    if((i>=0 && i<9)||(i>=27 && i<36)||(i>=54 && i<63))
    tile.classList.add("top-border")
    if(i>=72)
    tile.classList.add("bottom-border")
    if(i%9==8)
    tile.classList.add("right-border")
}
console.log("Initialised successfully")
//after clicking solve  button the input is fed to the matrix the empty cells are filled with 0
function fill_the_matrix(){
    const inpt=document.getElementsByTagName('input')
    
    for(var j=0;j<9;j++)
    for(var k=0;k<9;k++)
    {
        let index=j*9+k;
        if(inpt[index].value<=9 && inpt[index].value>0)
        matrix[j][k]=inpt[index].value;
        else
        {
            if(inpt[index]>9)
            return false;
            else
            matrix[j][k]=0;
        }

    }
    return true;
    console.log(matrix)
    

}
//checks if the number at particular cell is consistent with the other cell values
function isSafe(row,col,num) 
    { 
     
        for (let d = 0; d < 9; d++)  
        { 
            
            if (matrix[row][d] == num) { 
                return false; 
            } 
        } 
  
        for (let r = 0; r < 9; r++)  
        { 
               
            if (matrix[r][col] == num)  
            { 
                return false; 
            } 
        }  
         
        let boxRowStart = row - row % 3; 
        let boxColStart = col - col % 3; 
  
        for (let r = boxRowStart; 
             r < boxRowStart + 3; r++)  
        { 
            for (let d = boxColStart; 
                 d < boxColStart + 3; d++)  
            { 
                if (matrix[r][d] == num)  
                { 
                    return false; 
                } 
            } 
        } 
  
        return true; 
    }

//function to check if the input given is solvable or not
function solvable(){
    for(let i=0;i<9;i++)
    for(let j=0;j<9;j++)
    if(matrix[i][j]!=0) {
        let k=matrix[i][j]
        matrix[i][j]=0
        if(!isSafe(i,j,k))
        {  
            return false;
        }
        matrix[i][j]=k;
        } 
        return true
}

//main solving recursive function
function solving_algo(){
    let row = -1; 
    let col = -1; 
    let isEmpty = true; 
        for (let i = 0; i < 9; i++)  
        { 
            for (let j = 0; j < 9; j++)  
            { 
                if (matrix[i][j] == 0)  
                { 
                    row = i; 
                    col = j; 
                    isEmpty = false; 
                    break; 
                }
                
            } 
            if (!isEmpty) { 
                break; 
            } 
        } 
  
        if (isEmpty)  
        { 
            return true; 
        } 
        
        for (let num = 1; num <= 9; num++)  
        { 
            if (isSafe(row, col, num))  
            { 
                matrix[row][col] = num; 
                if (solving_algo())  
                { 
                    // print(board, n); 
                    return true; 
                } 
                else 
                { 
                    matrix[row][col] = 0; 
                } 
            } 
            // console.log(row ,col)
        } 
        return false; 
}


//It consists of filling matrix function,then if solvable we apply the solving algo which updates the predefined matrix if solvable then algo returns true and we display the output
solver_function=()=>{
    
    console.log(solvable())
    if(fill_the_matrix())
    if(solvable()==true)
    {
        if(solving_algo())
        {
            const inpt=document.getElementsByTagName('input')
    
            for(var x=0;x<9;x++)
            for(var y=0;y<9;y++)
            {
                var index=x*9+y;
                inpt[index].value=matrix[x][y];
            }
        }
    }
    

    console.log(matrix)
}
// after clicking solve button it trigers solver_function which first fills the matrix
solve_btn.addEventListener('click',solver_function)


// clearing the tiles on clear button being pressed
clear_btn.addEventListener('click',()=>{
    const inpt=document.getElementsByTagName('input')
    for(let i=0;i<81;i++)
    {
        inpt[i].value=undefined
    }
})