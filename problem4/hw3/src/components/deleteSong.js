import React, { Component } from 'react';
import axios from 'axios';

class DeleteSong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songId: props.songId,
    };
  }

  handleDelete = () => {
    const { songId } = this.state;
    console.log('song ID: ',songId)
    // Send a DELETE request to your API to delete the song with songId
    axios
      .get(`http://localhost/index.php/song/delete?ratingid=${songId}`)
      .then((response) => {
        // Assuming the response contains the deleted songId, you can access it as response.data.songId
        if (response.status === 204 || response.status === 200) {
            // The response status indicates success
            // Handle the success here (e.g., update state)
            this.setState({
              songId: response.data.songId,
            });
          } else {
            // The response status indicates an error
            // Handle the error here
            console.error('Error deleting song:', response.status);
          }
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
