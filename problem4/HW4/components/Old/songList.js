import React, { Component } from 'react';
import UpdateSong from './updateSong'; // Use PascalCase for component names
import ViewSong from './viewSong'; // Use PascalCase for component names

class SongList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [1,'justin beiber','baby', 5],
      editingSong: null, // State for editing a song
      viewingSong: null, // State for viewing a song
      addingSong: false,
    };
  }

  componentDidMount() {
    // Fetch the list of songs when the component mounts
    // Replace 'YOUR_API_ENDPOINT/songs' with your actual API endpoint
    // fetch('http://localhost/index.php/song/list?limit=20')
    //   .then((response) => response.json())
    //   .then((data) => this.setState({ songs: data }));
    // songs = [1,'justin beiber','baby', 5]
  }

  render() {
    const { songs, editingSong, viewingSong , addingSong} = this.state;

    return (
      <div>
        <h2>Song List</h2>
        <table>
          <thead>
            <tr>
              <th>Artist</th>
              <th>Song</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <tr key={song.id}>
                <td>{song.artist}</td>
                <td>{song.title}</td>
                <td>{song.rating}</td>
                <td>
                  <button onClick={() => this.handleDelete(song.id)}>Delete</button>
                  <button onClick={() => this.handleEdit(song)}>Edit</button>
                  <button onClick={() => this.handleView(song)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!editingSong && !viewingSong && <button onClick={() => this.setState({ addingSong: true })}>Add Song</button>}
        {editingSong && <UpdateSong song={editingSong} />} {/* Render UpdateSong if a song is selected for editing */}
        {viewingSong && <ViewSong song={viewingSong} />} {/* Render ViewSong if a song is selected for viewing */}
      </div>
    );
  }

  // Add functions for handling delete, edit, and view actions
  handleDelete = (songId) => {
    // Send an HTTP DELETE request to delete the song
    fetch(`/api/songs/${songId}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status === 200) {
          // Song deleted successfully, show a notification
          // You can use a notification library or create a custom notification component
        //   showNotification('Song deleted successfully', 'success');
          // Update your song list to reflect the changes
          // For example, fetch the updated song list from the server
        } else {
        //   showNotification('Error deleting song', 'error');
        }
      })
      .catch((error) => {
        console.error('Error deleting song:', error);
        // showNotification('Error deleting song', 'error');
      });
  };

  handleEdit = (song) => {
    this.setState({ editingSong: song, viewingSong: null, addingSong: false}); // Clear the viewingSong
  };

  handleView = (song) => {
    this.setState({ viewingSong: song, editingSong: null, addingSong: false}); // Clear the editingSong
  };
  handleAdd = () => {
    this.setState({ viewingSong: null, editingSong: null, addingSong: true}); // Clear the editingSong
  };
}

export default SongList;
