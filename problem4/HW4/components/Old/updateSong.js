import React, { Component } from 'react';

class UpdateSong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songId: props.song.id, // Access the song's id from props.song
      artist: props.song.artist, // Access the song's artist from props.song
      song: props.song.title, // Access the song's title from props.song
      rating: props.song.rating, // Access the song's rating from props.song
    };
  }

  handleUpdate = () => {
    // Send a PUT request to your API to update the song with this.state.songId
    // Include this.state.artist, this.state.song, and this.state.rating in the request body
    // Handle the response accordingly
    fetch(`http://localhost/index.php/song/update?ratingid=${this.state.songId}&artist=${this.state.artist}&song=${this.state.song}&rating=${this.state.rating}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        artist: this.state.artist,
        song: this.state.song,
        rating: this.state.rating,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          songId: data.songId,
        });
      })
      .catch((error) => {
        console.error('Error updating song:', error);
      });
  };

  handleCancel = () => {
    // Call the onCancel function passed as a prop
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
