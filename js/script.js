const GRID_WIDTH = 700.0;
const GRID_HEIGHT = 700.0;
const grid = document.querySelector('.grid');
const modes = document.querySelectorAll('.btn');


function cellStandardColoring(event) {
    event.target.style.backgroundColor = 'rgb(0,0,0)';
}

function cellShadingColoring(event) {
    const moreBlack = moreBlackValue(event.target.style.backgroundColor);
    event.target.style.removeProperty('background-color');
    event.target.style.cssText += `background-color: rgb(${moreBlack},${moreBlack},${moreBlack});`;
}

function cellRandomColoring(event) {
    event.target.style.removeProperty('background-color');
    event.target.style.cssText += `background-color: rgb(${getRandomRgbValue()},${getRandomRgbValue()},${getRandomRgbValue()})`;
}

modes.forEach((btn)=> {
    btn.addEventListener('click', () => {
        if (isSelected(btn)) return;
        else {
            const cells = document.querySelectorAll('.cell');
            const mode = getSelectedMode();
            let functionToDelete;
            if (mode === 'standard') functionToDelete = cellStandardColoring;
            else if (mode === 'shading') functionToDelete = cellShadingColoring;
            else functionToDelete = cellRandomColoring;
            cells.forEach(cell => {
                cell.removeEventListener('mouseover', functionToDelete);
            })
            selectMode(btn);
        }
    });
});

function isSelected(btn) {
    selectionFlag = false;
    for (let i = 0; i < btn.classList.length; i++) {
        if (btn.classList[i] === 'selected') selectionFlag = true;
    }
    return selectionFlag;
}

function getRandomRgbValue() {
    return Math.floor(Math.random() * 255 + 1);
}

function parseRgbValue(rgb) {
    return parseFloat(rgb.split(',')[1]);
}


function moreBlackValue(currentValue) {
    let colorVal;
    if (currentValue === '') colorVal = 229.5;
    else colorVal = parseRgbValue(currentValue);
    colorVal -= 25.5;
    if (colorVal < 0.0) return 0.0;
    return colorVal;
}


function chooseColoringStyle(mode) {
    const cells = document.querySelectorAll('.cell');
    if (mode === 'standard') {
        cells.forEach(cell => {
            cell.addEventListener('mouseover', cellStandardColoring);
        });
    } else if (mode === 'shading') {
        cells.forEach(cell => {
            cell.addEventListener('mouseover', cellShadingColoring);
        });
    } else {
        cells.forEach(cell=>{
            cell.addEventListener('mouseover', cellRandomColoring);
        })
    }
}

function selectMode(btn) {

    for (let i = 0; i < modes.length; i++) {
        if (isSelected(modes[i])) modes[i].classList.remove('selected');
    }
    const mode = btn.classList[0];
    btn.classList.add('selected');
    chooseColoringStyle(mode);
}

function adjustBorderSizes(gridSize) {
    const cells = document.querySelectorAll('.cell');
    let calculatedWidth = null;

    if (gridSize > 66) {
        calculatedWidth = '1px';
    } else if (gridSize > 33) {
        calculatedWidth = '2px';
    } else {
        calculatedWidth = '3px';
    }

    cells.forEach((cell)=> {
        cell.style.borderWidth = calculatedWidth;
    });

}

function getSelectedMode() {
    let selectedMode = '';
    modes.forEach(btn=> {
        if (isSelected(btn)) {
            selectedMode = btn.classList[0];
        } 
    });
    return selectedMode;
}

function createGrid(gridSize) {
    grid.style.cssText = `
    width: ${GRID_HEIGHT};
    height: ${GRID_HEIGHT};
    grid-template-rows: repeat(${gridSize},${(GRID_WIDTH/gridSize).toFixed(4)}px);
    grid-template-columns: repeat(${gridSize}, ${(GRID_HEIGHT/gridSize).toFixed(4)}px);`;
    populateGrid(gridSize);
    adjustBorderSizes(gridSize);
    chooseColoringStyle(getSelectedMode());
}



function populateGrid(gridSize) {
    grid.innerHTML = '';
    for (let i = 0; i < Math.pow(gridSize,2); i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        grid.appendChild(cell);
    }
}

function modifyGrid() {
    let gridSize = prompt("Enter new grid side size:");
    if (gridSize === null) return;

    while(gridSize > 100 || gridSize < 0) {
        gridSize = prompt("Enter valid grid size (between 1 and 100)");
    }

    createGrid(gridSize);
}


createGrid(10);