import React, { Component } from 'react';
import _ from "lodash";

import SongItem from "./SongItem";

const stringToColour = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}


class Songs extends Component {

  state= {
    edit:false,
    tagInput: "",
    tags: []
  }

  saveSong = (song) => {
    this.props.saveSong(song);
  };

  filterSongs = () => {
    return this.props.songs ? 
      this.props.songs.filter( song =>  {
        const presentTags = this.state.tags.map(tag => _.includes(song.tags,tag));
        return presentTags.every(o => o);
      })
      : [];
  }

  removeTagFilter = (tagName) => {
    this.setState( ({tags}) =>({tags: tags.filter(tag => tag !== tagName)}));
  }

  addTagFilter = (e) => {
    this.setState( ({tags,tagInput}) =>({tags: _.uniq([...tags,tagInput]), tagInput: ""}));
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    const songs = this.filterSongs();
    console.log(songs);
    return (
      <div className="songs page">
        <div className="songs__actions">
          <button className="button" onClick={() => this.props.playSongs(songs.map(song => song.code))} >Play</button>
          <button className="button" onClick={() => this.props.createPlaylist(songs.map(song => song.code))} >Create Playlist</button>
          <button className="button" onClick={() => this.props.createDancingPlaylist(songs.map(song => song.code))} >Create Dancing Playlist</button>
          <button className="button" onClick={() => this.setState(({edit}) => ({edit:!edit}))} >Edit</button>
        </div>
        <div className="songs__filters">
          <form onSubmit={this.addTagFilter}>
            <input className="input" placeholder="enter tag name" type="text" value={this.state.tagInput} onChange={(e) => this.setState({tagInput: e.target.value})}/>
            <input className="button" type="submit" value="Filter"/>
          </form>
          <div className="songs__filters__tags">{this.state.tags.map(tag => <div className="tag" key={tag} style={{backgroundColor: stringToColour(tag)}} onClick={() => this.removeTagFilter(tag)}>{tag + "   x"}</div>)}</div>
        </div>
        <div className="songs__container">
          {songs.map( (song,i) => <SongItem key={song.id} song={song} saveSong={(svSong) => this.saveSong(svSong)} edit={this.state.edit}/> )}
        </div>
      </div>
    );
  };
}

export default Songs;
