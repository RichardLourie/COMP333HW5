import React, { Component } from 'react';

class ViewSong extends Component {
  constructor(props) {
    super(props);
    this.state = {
        songId: props.song.id, // Access the song's id from props.song
        artist: props.song.artist, // Access the song's artist from props.song
        song: props.song.song, // Access the song's title from props.song
        rating: props.song.rating, // Initialize with the current rating
    };
  }

  componentDidMount() {
    // Fetch song details from your API
    fetch(`/api/songs/${this.state.songId}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          artist: data.artist,
          song: data.song,
          rating: data.rating,
        });
      })
      .catch((error) => {
        console.error('Error fetching song details:', error);
      });
  }

  handleCancel = () => {
    // Call the onCancel function passed as a prop
    this.props.onCancel();
  };

  render() {
    return (
      <div>
        <h2>View Song</h2>
        <p>Artist: {this.state.artist}</p>
        <p>Song: {this.state.song}</p>
        <p>Rating: {this.state.rating}</p>
        <button onClick={this.handleCancel}>Back</button>
      </div>
    );
  }
}

export default ViewSong;
