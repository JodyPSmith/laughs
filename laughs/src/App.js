import React, { Component } from 'react';
import './App.css';
import tags from './tags';

const backEnd = 'http://jodysmith:5000';


class App extends Component {
  constructor() {
    super();
    this.state = {
      joke: "test",
      bgImage: 'pic1.jpg'
    }
  }

  componentDidMount() {
    this.setState({ joke: this.getAJoke() })
  }

  getAJoke = () => {
    fetch(backEnd + '/getRandomJoke')
      .then(x => x.json())
      .then(x => x.body)
      .then(x => this.setState({ joke: x }))
  }

  getTagJoke = (tag) => {
    fetch(backEnd + '/getTagJoke?tag=' + tag)
      .then(x => x.json())
      .then(x => x.body)
      .then(x => this.setState({ joke: x }))

      let picNum = Math.floor(Math.random() * (15-1) + 1)
      document.body.style.backgroundImage = "url('" + backEnd + "/pic"+ picNum + ".jpg')";

  }

  render() {
    return (
      <div className="App">
        <h1>A Joke a Day </h1>
        <h1><button className="btn pill green" onClick={() => { this.getAJoke() }}> Random Joke </button></h1>
        <div className="joke">
          {this.state.joke}
        </div>
        <div className="tags">
          { tags.tags.map((tag, index) => {
            return (
              <button key={index} className="btn pill" onClick={() => { this.getTagJoke(tag) }}>{tag} </button>  
            )
          })}
        </div>


      </div>
    );
  }
}

export default App;
