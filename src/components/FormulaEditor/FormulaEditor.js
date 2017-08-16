import React from 'react';
import PropTypes from 'prop-types';
import s from './FormulaEditor.scss';
import {observer} from 'mobx-react' ;
import {setSelectedCellValue, getSelectedCellFormula} from '../../store';

const InputWithState = observer(class extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.state = {
      value: this.props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({value: nextProps.value});
    }
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      console.log('enter pressed ' + e.target.value);
      setSelectedCellValue(e.target.value);
    }
  }

  onChange(e) {
    console.log('set new input ' + e.target.value);
    this.setState({value: e.target.value});
  }


  render() {
    return (
      <input type="text"
             className={s.formulaInput}
             onChange={this.onChange}
             onKeyPress={this.onKeyPress}
             value={this.state.value}
      />
    )
  }
});

InputWithState.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

const FormulaEditor = observer(() => (
  <div className={s.formulaEditor}>
    Formula: <InputWithState value={getSelectedCellFormula()} onChange={() => {
  }}/>
  </div>
));

export default FormulaEditor;