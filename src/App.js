import React from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField'
import axios from 'axios'

const textFieldStyle = {
  height: 300
}

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      searchQuery: "",
      omdbResponse: ""
    }
    
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = e => {
    this.setState({searchQuery: e.target.value}, () => {
      axios.get("http://www.omdbapi.com/?apikey=2a5e533b&s="+this.state.searchQuery)
      .then(response => this.setState({omdbResponse: response.data}))
    })    
  }


  render() {
    return (
      <div className="App">
        <div className= "container">
          <h3>Quotle</h3>
          <div className="searchDiv">
            <TextField label="Search" onInput={ this.handleChange } inputProps={ textFieldStyle } />
          </div>
          <div className="choiceDiv">
            
          </div>
        </div>
      </div>
    );
  }
}

export default App;
