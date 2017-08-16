import React from 'react';
import PropTypes from 'prop-types';
import s from './Cell.scss';
import {observer} from 'mobx-react' ;
import {getCellValue, setSelectedCell, isSelectedCell} from '../../store';

const Cell = observer(({rowIndex, cellIndex}) => (
    <td className={(isSelectedCell(rowIndex, cellIndex) ? s.selectedCell : s.cell)}
        onClick={() => setSelectedCell(rowIndex, cellIndex)}>
      {getCellValue(`${rowIndex}_${cellIndex}`)}
    </td>
  ));

Cell.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  cellIndex: PropTypes.number.isRequired
};

export default Cell;

