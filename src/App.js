import React from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField'

const textFieldProps = {
  color: "primary",
  fullWidth: true
}

function App() {
  return (
    <div className="App">
      <h3>Quotle</h3>
      <TextField id="standard-basic" label="Search" inputProps = {textFieldProps} />
    </div>
  );
}

export default App;
