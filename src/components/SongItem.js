import React, { Component } from 'react';
import _ from "lodash";


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

class SongItem extends Component {

  state= {
    newTagValue: "",
  };

  saveNewTag= (e) => {
    const {color,id} = this.props.song;
    this.props.saveSong({color, id, tags:[...this.props.song.tags,this.state.newTagValue]});
    this.setState({newTagValue: ""});
    e.preventDefault();
  };
  deleteTag= (dTag) => {
    const tags = _.filter(this.props.song.tags,tag => tag !== dTag );
    this.props.saveSong({...this.props.song, tags});
  };

  render() {
    const songItem = this.props.song;

    if(this.props.edit){
      return (
        <div className="song" key={songItem.id}>
          <div className="song__name">{songItem.name}</div>
          <div className="song__tags">
            {songItem.tags.map( tag => (<div className="tag tag--edit" onClick={ () => this.deleteTag(tag)}>{tag  +" x"}</div>))}
            <form onSubmit={e => this.saveNewTag(e)}>
              <input placeholder="new tag" value={this.state.newTagValue} onChange={(e) => this.setState({newTagValue: e.target.value})}/>
              <input type="submit" value="+" />
            </form>
          </div>
        </div>
      );
    }else{
      return (
        <div className="song" key={songItem.id}>
          <div className="song__name">{songItem.name}</div>
          <div className="song__tags">{songItem.tags.map( tag => (<div key={tag} style={{backgroundColor: stringToColour(tag)}} className="tag">{tag}</div>))}</div>
        </div>
      );
    }
  };
}

export default SongItem;
