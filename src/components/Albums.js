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


class Albums extends Component {

  state= {
    edit:false,
    tagInput: "",
    tags: []
  }

  saveAlbum = (album) => {
    this.props.saveAlbum(album);
  };

  filterAlbums = () => {
    return this.props.albums ? 
      this.props.albums.filter( album =>  {
        const presentTags = this.state.tags.map(tag => _.includes(album.tags,tag));
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
    const albums = this.filterAlbums();
    console.log(albums);
    return (
      <div className="albums page">
      </div>
    );
  };
}

export default Albums;
