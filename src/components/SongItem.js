import React, { Component } from 'react';
import _ from "lodash";


class SongItem extends Component {

  state= {
    newTagValue: "",
  };

  saveNewTag= (e) => {
    this.props.saveSong({...this.props.song, tags:[...this.props.song.tags,this.state.newTagValue]});
    this.setState({newTagValue: ""});
    e.preventDefault();
  };
  deleteTag= (dTag) => {
    const tags = _.filter(this.props.song.tags,tag => tag !== dTag );
    this.props.saveSong({...this.props.song, tags});
  };

  render() {
    const song = this.props.song;

    if(this.props.edit){
      return (
        <div className="song" key={song.id}>
          <div className="song__name">{song.name}</div>
          <div className="song__artist">{song.artist}</div>
          <div className="song__tags">
            {song.tags.map( tag => (<div className="tag tag--edit" onClick={ () => this.deleteTag(tag)}>{tag  +" x"}</div>))}
            <form onSubmit={e => this.saveNewTag(e)}>
              <input placeholder="new tag" value={this.state.newTagValue} onChange={(e) => this.setState({newTagValue: e.target.value})}/>
              <input type="submit" value="+" />
            </form>
          </div>
        </div>
      );
    }else{
      return (
        <div className="song" key={song.id}>
          <div className="song__name">{song.name}</div>
          <div className="song__artist">{song.artist}</div>
          <div className="song__tags">{song.tags.map( tag => (<div key={tag} className="tag">{tag}</div>))}</div>
        </div>
      );
    }
  };
}

export default SongItem;
