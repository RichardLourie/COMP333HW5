import React, { Component } from 'react';

class DeleteSong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songId: props.songId,
    };
  }

  handleDelete = () => {
    // Send a DELETE request to your API to delete the song with this.state.songId
    // Handle the response accordingly
    fetch(`http://localhost/index.php/song/delete?ratingid=${this.state.songId}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          songId: data.songId,
        });
      })
      .catch((error) => {
        console.error('Error deleting song:', error);
      });
  };

  render() {
    return (
      <div>
        <h2>Delete Song</h2>
        <button onClick={this.handleDelete}>Delete Song</button>
      </div>
    );
  }
}

export default DeleteSong;
