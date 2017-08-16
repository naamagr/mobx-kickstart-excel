import {observable, computed, action} from 'mobx';

const cells = observable.map({});

const selectedCell = observable({index: '0_0'});

const setCell = action((index, cell) => {
  cells.set(index, cell);
});

function setSelectedCellValue(formula) {
  const cellData = {formula, content: getComputedContent(formula)};
  setCell(selectedCell.index, cellData);
}

const getCellValue = index => {
  return cells.has(index) ? cells.get(index).content : '';
};

const getCellFormula = index => {
  console.log('in getCellFormula index: ' + index);
  return cells.has(index) ? cells.get(index).formula : '';
};


const setSelectedCell = action(function (row, column) {
  selectedCell.index = `${row}_${column}`;
});

function isSelectedCell(row, column) {
  const isSelected = computed(() => selectedCell.index === `${row}_${column}`);
  return isSelected.get();
}

function getSelectedCellFormula() {
  return getCellFormula(selectedCell.index);
}

function getComputedContent(formula) {
  return computed(function () {
    if (!isNaN(formula)) {
      return formula;
    } else if (formula[0] === '=') {
      return evaluate(formula);
    } else {
      return '';
    }
  });
}

function evaluate(formula) {

  const relevantCells = getRelevantCells(formula);

  relevantCells.forEach((cell) => {
    const replaceValue = computed(()=> (getCellValue(cell.indexCell) ? getCellValue(cell.indexCell) : 0));
    formula = formula.replace(cell.tableCell, replaceValue);
  });

  formula = formula.replace('=', '');


  return (eval(formula));

}

function getRelevantCells(formula) {
  const matches = formula.match(/[A-J]*[1-9]/g);
  return matches.map(match => ({tableCell: match, indexCell: convertTableCellToIndex(match)}));
}

function convertTableCellToIndex(tableCell) {
  return ((tableCell[1] - 1) + '_' + convertLetterToIndex(tableCell[0]));
}

function convertLetterToIndex(letter) {
  return letter.charCodeAt(0) - 'A'.charCodeAt(0);
}

export {getCellValue, setSelectedCell, setSelectedCellValue, isSelectedCell, getSelectedCellFormula};
