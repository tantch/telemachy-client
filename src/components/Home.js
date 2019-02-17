import React, { Component } from 'react';


class Home extends Component {

  render() {
    const uri = encodeURIComponent(process.env.REACT_APP_SERVER_URI + "/spotify");
    console.log("uri ofr spotify",uri);

    return (
      <div>
        <a
          href={"https://accounts.spotify.com/en/authorize/?client_id=fb72db22478a4db595b843f299c90fae&response_type=code&redirect_uri=" + uri + "&scope=user-read-private%20user-read-email%20user-library-read%20user-modify-playback-state&state=pedromrvc@gmail.com"}
        >
          spotify
        </a>
        <button onClick={this.props.loadSpotify}>load to server</button>
      </div>
    );
  }
  
}

export default Home;
