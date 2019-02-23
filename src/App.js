import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from "./components/Header";
import Home from "./components/Home";
import Songs from "./components/Songs";
import axios from "axios";

class App extends Component {

  state = {
    auth: "",
  };

  login = () => {
    axios.post("http://localhost:5000/login",{
      user: {
        email: "pedromrvc@gmail.com",
        password: "omnimon"
      }
    }).then( res => {
      this.setState({auth: res.headers.authorization});
      this.getSongs();
    }).catch(e => console.log(e));
  }

  loadSpotifySongs = () => {
    axios.get("http://localhost:5000/spotify/load",{
      headers: {
        authorization: this.state.auth
      }
    }).then(res => console.log(res)).catch(e => console.log(e))
  }

  playSpotifySongs = (codes) => {
    axios.post("http://localhost:5000/spotify/play",{musicCode: codes},{
      headers: {
        authorization: this.state.auth
      }
    }).then(res => console.log(res)).catch(e => console.log(e))
  }
  createSpotifyPlaylist = (codes) => {
    axios.post("http://localhost:5000/spotify/create_playlist",{musicCode: codes},{
      headers: {
        authorization: this.state.auth
      }
    }).then(res => console.log(res)).catch(e => console.log(e))
  }

  updateSong = (song) => {
    axios.put(`http://localhost:5000/songs/${song.id}`,{song},{
      headers: {
        authorization: this.state.auth
      }
    }).then(res => this.getSongs()).catch(e => console.log(e));
  }

  getSongs= () => {
    axios.get("http://localhost:5000/songs",{
      headers: {
        authorization: this.state.auth
      }
    }).then(res => {
      const songs = res.data.map( song => ({...song, tags: song.tags.map(tag => tag.name)}));
      this.setState({songs});
    }).catch(e => console.log(e))
  }

  componentDidMount(){
    this.login();
  }


  render() {
    return (
      <div className="App">
        <Router>
          <div className="app">
            <Header />
            <Route exact path="/" 
              component={() => <Home loadSpotify={this.loadSpotifySongs} />}
            />
            <Route exact path="/songs" render={ () => <Songs songs={this.state.songs} saveSong={this.updateSong} playSongs={this.playSpotifySongs} createPlaylist={this.createSpotifyPlaylist} getSongs={this.getSongs} />}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
