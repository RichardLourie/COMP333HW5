import React, { Component } from 'react';
import axios from 'axios';

class UpdateSong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songId: props.song.id, // Access the song's id from props.song
      artist: props.song.artist, // Access the song's artist from props.song
      song: props.song.song, // Access the song's title from props.song
      rating: props.song.rating, // Access the song's rating from props.song
    };
  }

  handleUpdate = () => {
    const updatedSongData = {
      id: this.state.songId,
      artist: this.state.artist,
      song: this.state.song,
      rating: this.state.rating,
    };
  
    // Send a PUT request to your API to update the song with this.state.songId
    // Include this.state.artist, this.state.song, and this.state.rating in the request body
    axios.post(`http://localhost/index.php/song/update?ratingid=${this.state.songId}&artist=${this.state.artist}&song=${this.state.song}&rating=${this.state.rating}`)
      .then((response) => {
        // Check if the response was successful
        if (response.status === 200) {
          // Pass the updatedSongData to the parent component
          this.props.onSongUpdated(updatedSongData);
          console.log("Song updated successfully");
        }
      })
      .catch((error) => {
        console.error('Error updating song:', error);
      });
  };
  

  handleCancel = () => {
    // Set selectedEditSong to null
    this.props.onCancel();
  };

  render() {
    return (
      <div>
        <h2>Update Song</h2>
        <input
          type="text"
          placeholder="Artist"
          value={this.state.artist}
          onChange={(e) => this.setState({ artist: e.target.value })}
        />
        <input
          type="text"
          placeholder="Song"
          value={this.state.song}
          onChange={(e) => this.setState({ song: e.target.value })}
        />
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={this.state.rating}
          onChange={(e) => this.setState({ rating: e.target.value })}
        />
        <button onClick={this.handleUpdate}>Update Song</button>
        <button onClick={this.handleCancel}>Cancel</button>
      </div>
    );
  }
}

export default UpdateSong;
