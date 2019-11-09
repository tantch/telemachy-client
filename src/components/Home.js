import React, { Component } from 'react';


class Home extends Component {

  render() {
    const uri = encodeURIComponent(process.env.REACT_APP_SERVER_URI + "/spotify");
    console.log("uri ofr spotify",uri);
    console.log("user email",this.props.user);
    const email = this.props.user;
    return (
      <div className="home page">
        <a className="text"
          href={"https://accounts.spotify.com/en/authorize/?client_id=fb72db22478a4db595b843f299c90fae&response_type=code&redirect_uri=" + uri + "&scope=user-read-private%20user-read-email%20user-library-read%20user-modify-playback-state%20playlist-modify-public%20playlist-modify-private%20user-read-playback-state%20user-top-read%20user-read-currently-playing%20playlist-read-private%20playlist-read-collaborative&state=" + email}
        >
          Relog / Log into spotify
        </a>
        <button className="button" onClick={this.props.loadSpotify}>Load all spotify songs to server</button>
      </div>
    );
  }
  
}

export default Home;
