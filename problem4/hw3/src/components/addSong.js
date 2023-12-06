import React, { Component } from 'react';
import axios from 'axios';

class AddSong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: '',
      song: '',
      rating: 1,
      user: props.user,
    };
  }

  handleAdd = () => {
    const newSongData = {
        username: this.state.user,
        artist: this.state.artist,
        song: this.state.song,
        rating: this.state.rating,
      };
    // Send a POST request to your API to add a new song using Axios
    const { artist, song, rating, user} = this.state;
    axios.post(`http://localhost/index.php/song/create?username=${user}&artist=${artist}&song=${song}&rating=${rating}`)
      .then((response) => {
        // Check if the response was successful (you can further validate the response as needed)
        if (response.status === 200) {
          // Handle the response data as needed
          // For example, you can show a success message or navigate to another page
          console.log('Song added successfully');
          this.props.onSongAdded(newSongData);
          console.log('new song data: ', newSongData)
        }
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
