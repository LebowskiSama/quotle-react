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
      omdbResponse: [],
      tt: "",
      title: ""
    }
    
    this.handleChange = this.handleChange.bind(this)
    this.handleChoice = this.handleChoice.bind(this)
  }

  handleChange = e => {
    this.setState({searchQuery: e.target.value}, () => {
      axios.get("http://www.omdbapi.com/?apikey=2a5e533b&s="+this.state.searchQuery)
      .then(response => this.setState({omdbResponse: response.data.Search}))
    })    
  }

  handleChoice(tt, title) {
    this.setState(({tt: tt, title: title}),
      console.log(this.state.tt)
    )
  }

  render() {
    return (
      <div className="App">
        <div className= "container">
          <div className="base">
            <h1>Quotle</h1>
            <div className="searchDiv">
              <TextField label="Search" onInput={ this.handleChange } inputProps={ textFieldStyle } />
            </div>
          </div>
          <div className="choiceDiv">
            {this.state.omdbResponse &&
              this.state.omdbResponse.map(option => (
                <div className="card" onClick={ () => this.handleChoice(option.imdbID, option.Title) }>
                    <div className="card-image">
                      <img src={ option.Poster } alt={ option.Title } />
                    </div>
                    <div className="card-text">
                      <p>{ option.Title }</p>
                    </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
