import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from "./components/Header";
import Home from "./components/Home";
import Songs from "./components/Songs";
import Login from "./components/Login";
import AuthedPage from "./wrappers/AuthedPage";
import axios from "axios";
import Cookies from 'js-cookie'

const getAccessToken = () => Cookies.get('access_token')

class App extends Component {

  state = {
    auth: "",
  };


  checkSavedAuth = () => {
    const token  = getAccessToken();
    if(!!token){
      this.setState({auth: token},this.getSongs);
    }
  }

  login = (email, password) => {
    axios.post(`${process.env.REACT_APP_SERVER_URI}/login`,{
      user: {
        email: email,
        password: password
      }
    }).then( res => {
      this.setState({auth: res.headers.authorization});
      const inOneHour = new Date(new Date().getTime() + 60*60*1000)
      Cookies.set('access_token', res.headers.authorization, { expires: inOneHour })
      this.getSongs();
    }).catch(e => console.log(e));
  }

  loadSpotifySongs = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URI}/spotify/load`,{
      headers: {
        authorization: this.state.auth
      }
    }).then(res => console.log(res)).catch(e => console.log(e))
  }

  playSpotifySongs = (codes) => {
    axios.post(`${process.env.REACT_APP_SERVER_URI}/spotify/play`,{musicCode: codes},{
      headers: {
        authorization: this.state.auth
      }
    }).then(res => console.log(res)).catch(e => console.log(e))
  }
  createSpotifyPlaylist = (codes) => {
    axios.post(`${process.env.REACT_APP_SERVER_URI}/spotify/create_playlist`,{musicCode: codes},{
      headers: {
        authorization: this.state.auth
      }
    }).then(res => console.log(res)).catch(e => console.log(e))
  }

  updateSong = (song) => {
    axios.put(`${process.env.REACT_APP_SERVER_URI}/songs/${song.id}`,{song},{
      headers: {
        authorization: this.state.auth
      }
    }).then(res => this.getSongs()).catch(e => console.log(e));
  }

  getSongs= () => {
    axios.get(`${process.env.REACT_APP_SERVER_URI}/songs`,{
      headers: {
        authorization: this.state.auth
      }
    }).then(res => {
      const songs = res.data.map( song => ({...song, tags: song.tags.map(tag => tag.name)}));
      this.setState({songs});
    }).catch(e => console.log(e))
  }

  componentDidMount(){
    this.checkSavedAuth();
  }


  render() {


    return (
      <div className="App">
        <Router>
          <div className="app">
            <Header />
            <Route 
              exact 
              path="/" 
              component={ () => 
                  <AuthedPage auth={this.state.auth} >
                    <Home loadSpotify={this.loadSpotifySongs} />
                  </AuthedPage>
              }
            />
            <Route exact path="/login" 
              component={() => <Login login={this.login} auth={this.state.auth}/>}
            />
            <Route
              exact
              path="/songs"
              render={ () =>
                  <AuthedPage auth={this.state.auth} >
                    <Songs songs={this.state.songs} saveSong={this.updateSong} playSongs={this.playSpotifySongs} createPlaylist={this.createSpotifyPlaylist} getSongs={this.getSongs} />
                </AuthedPage>
              }
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
