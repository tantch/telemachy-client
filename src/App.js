import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';

import './App.css';

import AuthedPage from "./wrappers/AuthedPage";
import Header from "./components/Header";
import Home from "./components/Home";
import Songs from "./components/Songs";
import Login from "./components/Login";
import Tasks from "./components/Tasks";

const getAccessToken = () => Cookies.get('access_token')

class App extends Component {

  state = {
    auth: "",
    user: "",
    songs: [],
    tasks: [],
  };


  checkSavedAuth = () => {
    const token  = getAccessToken();
    if(!!token){
      this.setState({auth: token},() => {this.getUserInfo();this.getSongs();this.getTasks();this.getPlaylists()});
    }
  }

  login = (email, password) => {
    axios.post(`${process.env.REACT_APP_SERVER_URI}/login`,{
      user: {
        email: email,
        password: password
      }
    }).then( res => {
      this.setState({auth: res.headers.authorization,user: email});
      const inOneHour = new Date(new Date().getTime() + 60*60*1000)
      Cookies.set('access_token', res.headers.authorization, { expires: inOneHour })
      this.getSongs();
      this.getPlaylists();
      this.getTasks();
    }).catch(e => console.log(e));
  }

  getUserInfo = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URI}/me`,{
      headers: {
        authorization: this.state.auth
      }
    }).then(res => this.setState({user: res.data})).catch(e => console.log(e))
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

  createDancingSpotifyPlaylist = (codes) => {
    axios.post(`${process.env.REACT_APP_SERVER_URI}/spotify/create_dancing_playlist`,{musicCode: codes},{
      headers: {
        authorization: this.state.auth
      }
    }).then(res => console.log(res)).catch(e => console.log(e))
  }

  updateSong = (song) => {
    axios.put(`${process.env.REACT_APP_SERVER_URI}/library_songs/${song.id}`,{library_song: song},{
      headers: {
        authorization: this.state.auth
      }
    }).then(res => this.getSongs()).catch(e => console.log(e));
  }

  updateTask = (task) => {
    axios.put(`${process.env.REACT_APP_SERVER_URI}/tasks/${task.id}`,{task},{
      headers: {
        authorization: this.state.auth
      }
    }).then(res => this.getTasks()).catch(e => console.log(e));
  }

  createTask = (task) => {
    axios.post(`${process.env.REACT_APP_SERVER_URI}/tasks/`,{task},{
      headers: {
        authorization: this.state.auth
      }
    }).then(res => this.getTasks()).catch(e => console.log(e));
  }

  createTaskEvent = (task_id,task_event) => {
    axios.post(`${process.env.REACT_APP_SERVER_URI}/tasks/${task_id}/task_events`,{task_event},{
      headers: {
        authorization: this.state.auth
      }
    }).then(res => console.log(res)).catch(e => console.log(e));
  }

  getSongs= () => {
    axios.get(`${process.env.REACT_APP_SERVER_URI}/library_songs`,{
      headers: {
        authorization: this.state.auth
      }
    }).then(res => {
      const songs = res.data.map( song => ({...song, tags: song.tags.map(tag => tag.name)}));
      this.setState({songs});
    }).catch(e => console.log(e))
  }

  getPlaylists= () => {
    axios.get(`${process.env.REACT_APP_SERVER_URI}/spotify/playlists`,{
      headers: {
        authorization: this.state.auth
      }
    }).then(res => {
      const playlists = res.data.map( pl => ({ collaborative: pl.collaborative, id: pl.id, name: pl.name, public: pl.public, tracks: pl.tracks.href }));
      this.setState({playlists});
    }).catch(e => console.log(e))
  }

  getTasks= () => {
    axios.get(`${process.env.REACT_APP_SERVER_URI}/tasks`,{
      headers: {
        authorization: this.state.auth
      }
    }).then(res => {
      const tasks = res.data;
      this.setState({tasks});
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
                    <Home loadSpotify={this.loadSpotifySongs} user={this.state.user} />
                  </AuthedPage>
              }
            />
            <Route
              exact
              path="/login" 
              component={() => <Login login={this.login} auth={this.state.auth}/>}
            />
            <Route
              exact
              path="/songs"
              render={ () =>
                  <AuthedPage auth={this.state.auth} >
                    <Songs
                      songs={this.state.songs}
                      playlists={this.state.playlists}
                      saveSong={this.updateSong}
                      playSongs={this.playSpotifySongs}
                      createDancingPlaylist={this.createDancingSpotifyPlaylist}
                      createPlaylist={this.createSpotifyPlaylist}
                      getSongs={this.getSongs}
                    />
                </AuthedPage>
              }
            />
            <Route
              exact
              path="/tasks"
              render={ () =>
                  <AuthedPage auth={this.state.auth} >
                    <Tasks
                      tasks={this.state.tasks}
                      createTask={this.createTask}
                      createTaskEvent={this.createTaskEvent}
                      saveTask={this.updateTask}
                      getTasks={this.getTasks}
                    />
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
