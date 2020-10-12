import React from 'react';
import Pop from './images/pop.jpg'
import './App.css';
import TextField from '@material-ui/core/TextField'
import CardActionArea from '@material-ui/core/CardActionArea'
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
      title: "",
      quotes: []
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

  handleChoice(tt, title, year) {
    this.setState(({tt: tt, title: title}), () => {
      axios.get("https://quotle-go.herokuapp.com/movie/?tt=" + tt)
      .then(response => this.setState({quotes: response}))
    })
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
                
                  <div className="card" onClick={ () => this.handleChoice(option.imdbID, option.Title, option.Year) }>
                    <CardActionArea>
                      <div className="card-image">
                        <img src={ (option.Poster === "N/A") ? Pop : option.Poster } alt={ option.Title } />
                      </div>
                      <div className="card-text">
                        <p>{ option.Title } ({ option.Year })</p>
                      </div>
                      </CardActionArea>
                  </div>
            ))}
          </div>
          <div className="quotesDiv">
            {this.state.quotes.data && 
            this.state.quotes.data.map(quote => (
              <p  dangerouslySetInnerHTML={{ __html: quote }}></p>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
