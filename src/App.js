import React from 'react';
import Pop from './images/pop.jpg'
import './App.css';
import TextField from '@material-ui/core/TextField'
import CardActionArea from '@material-ui/core/CardActionArea'
import axios from 'axios'

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      searchQuery: "",
      omdbResponse: [],
      tt: "",
      title: "",
      year: "",
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
    this.setState(({tt: tt, title: title, year: year}), () => {
      axios.get("https://quotle-go.herokuapp.com/movie/?tt=" + tt)
      .then(response => this.setState({quotes: response}))
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if ( this.state.quotes && prevState.quotes !== this.state.quotes){
      document.getElementById("quotesDiv").scrollIntoView({ behavior: "smooth" });
    }
  }

  render() {
    return (
      <div className="App">
        <div className= "container">
          <div className="base">
            <h1>Quotle</h1>
            <div className="searchDiv">
              <TextField id="textField" label="Search" onInput={ this.handleChange } />
            </div>
          </div>
          <div className="choiceDiv">
            {this.state.omdbResponse &&
              this.state.omdbResponse.map((option, key) => (
                  <div className="card" onClick={ () => this.handleChoice(option.imdbID, option.Title, option.Year) } key={key}>
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
          <div id="quotesDiv">
            { this.state.title && this.state.year &&
              <h2 style={{ marginBottom: "25px" }}>{ this.state.title } ({this.state.year})</h2>
            }
            {this.state.quotes.data && 
            this.state.quotes.data.map((quote, key) => (
              <p dangerouslySetInnerHTML={{ __html: quote }} key={key}></p>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
