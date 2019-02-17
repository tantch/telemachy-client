import React, { Component } from 'react';
import _ from "lodash";

import SongItem from "./SongItem";


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
    this.setState( ({tags,tagInput}) =>({tags: [...tags,tagInput], tagInput: ""}));
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    const songs = this.filterSongs();
    console.log(songs);
    return (
      <div className="songs-container">
        <button onClick={() => this.props.playSongs(songs.map(song => song.code))} >Play</button>
        <button onClick={() => this.setState(({edit}) => ({edit:!edit}))} >Edit</button>
        <form onSubmit={this.addTagFilter}>
          <input type="text" value={this.state.tagInput} onChange={(e) => this.setState({tagInput: e.target.value})}/>
          <input type="submit" value="Filter"/>
        </form>
        <div >{this.state.tags.map(tag => <div key={tag} onClick={() => this.removeTagFilter(tag)}>{tag}</div>)}</div>
        <div className="songs">
          {songs.map( (song,i) => <SongItem key={song.id} song={song} saveSong={(svSong) => this.saveSong(svSong)} edit={this.state.edit}/> )}
        </div>
      </div>
    );
  };
}

export default Songs;
