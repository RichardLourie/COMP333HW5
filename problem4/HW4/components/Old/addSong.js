import React, { Component } from 'react';

class AddSong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: '', // Initialize these with empty values for adding a new song
      song: '',
      rating: 1, // Initialize with a default rating
    };
  }

  handleAdd = () => {
    // Send a POST request to your API to add a new song
    // Include this.state.artist, this.state.song, and this.state.rating in the request body
    // Handle the response accordingly
    fetch('http://localhost/index.php/song/add', {
      method: 'POST',
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
        // Handle the response data as needed
      })
      .catch((error) => {
        console.error('Error adding song:', error);
      });
  };

  handleCancel = () => {
    // Call the onCancel function passed as a prop (if needed)
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };

  render() {
    return (
      <div>
        <h2>Add New Song</h2>
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
        <button onClick={this.handleAdd}>Add Song</button>
        <button onClick={this.handleCancel}>Cancel</button>
      </div>
    );
  }
}

export default AddSong;
