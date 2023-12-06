import React, { Component } from 'react';
import UpdateSong from './updateSong'; // Use PascalCase for component names
import ViewSong from './viewSong'; // Use PascalCase for component names
import AddSong from './addSong';
import axios from 'axios';

class SongList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      stats: null,
      editingSong: null, // State for editing a song
      viewingSong: null, // State for viewing a song
      addingSong: false,
      user: props.user,
      statsData: null,
    };
  }

  componentDidMount() {
    // Fetch the list of songs when the component mounts
    axios.get('http://localhost/index.php/song/list?limit=20')
      .then((response) => {
        // Check if the response was successful
        if (response.status === 200) {
          // Assuming the response data is an array of songs
          const songs = response.data;
          this.setState({ songs });
          console.log('songs:', songs)
        }
      })
      .catch((error) => {
        console.error('Error fetching songs:', error);
      });

    axios.get('http://localhost/index.php/song/stats')
      .then((response) => {
        // Update the state with the API response data
        this.setState({ statsData: response.data });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  render() {
    const { songs, editingSong, viewingSong , addingSong, user, statsData} = this.state;

    return (
    <div>
      <div>
        <h2>Song List</h2>
        <p>you are logged in as: {user}</p>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Artist</th>
              <th>Song</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <tr key={song.id}>
                {/* <td>{song.username}</td> */}
                <td>{song.username}</td>
                <td>{song.artist}</td>
                <td>{song.song}</td>
                <td>{song.rating}</td>
                <td>
                  {user === song.username && <button onClick={() => this.handleDelete(song.id)}>Delete</button>}
                  {user === song.username && <button onClick={() => this.handleEdit(song)}>Edit</button>}
                  <button onClick={() => this.handleView(song)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!editingSong && !viewingSong && !addingSong && <button onClick={() => this.setState({ addingSong: true })}>Add Song</button>}
        {editingSong && <UpdateSong song={editingSong} onCancel={this.handleCancel} onSongUpdated={this.handleSongUpdated}/>} {/* Render UpdateSong if a song is selected for editing */}
        {viewingSong && <ViewSong song={viewingSong} onCancel={this.handleCancel}/>} {/* Render ViewSong if a song is selected for viewing */}
        {addingSong && <AddSong user = {user} onCancel={this.handleCancel} onSongAdded={this.handleSongAdded}/>}
      </div>
            <div>
            {statsData ? ( // Check if statsData is available
              <div>
                <h2>Artist Statistics</h2>
                <ul>
                  {statsData.artists.map((artistData) => (
                    <li key={artistData.artist}>
                      Artist: {artistData.artist}: Entry Count: {artistData.entry_count}, Average Rating: {artistData.average_rating}
                    </li>
                  ))}
                </ul>
                <h2>Song Statistics</h2>
                <ul>
                  {statsData.songs.map((songData) => (
                    <li key={songData.song}>
                      Song: {songData.song}: Entry Count: {songData.entry_count}, Average Rating: {songData.average_rating}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>Loading statistics...</p>
            )}
          </div>
        </div>
    );
  }

  // Add functions for handling delete, edit, and view actions
  handleDelete = (songId) => {
    // Send an HTTP DELETE request to delete the song
    axios
      .get(`http://localhost/index.php/song/delete?ratingid=${songId}`)
      .then((response) => {
        // Assuming the response contains the deleted songId, you can access it as response.data.songId
        if (response.status === 204 || response.status === 200) {
            // The response status indicates success
            // Handle the success here (e.g., update state)
            console.log('song deleted succesfully')
          } else {
            // The response status indicates an error
            // Handle the error here
            console.error('Error deleting song:', response.status);
          }
      })
      .catch((error) => {
        console.error('Error deleting song:', error);
      });
      //update songs to not include the deleted song
        const updatedSongs = [...this.state.songs];
        const updatedSongIndex = this.state.songs.findIndex((song) => song.id === songId);
        updatedSongs.splice(updatedSongIndex, 1);
        this.setState({ songs: updatedSongs, viewingSong: null, editingSong: null, addingSong: false});
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
  handleCancel = () => {
    this.setState({ viewingSong: null, editingSong: null, addingSong: null}); // Clear the editingSong
  };
  handleSongUpdated = (updatedSongData) => {
    // Find the index of the updated song in the songs array
    // console.log("on song update function started")
    const updatedSongIndex = this.state.songs.findIndex((song) => song.id === updatedSongData.id);
    // console.log("index:", updatedSongIndex)
    // console.log("song data:", updatedSongData)
  
    if (updatedSongIndex !== -1) {
    //   console.log("condition satisfied")
      // Replace the old song data with the updated data
      const updatedSongs = [...this.state.songs];
      updatedSongs[updatedSongIndex] = updatedSongData;
    //   console.log("new info: ",updatedSongs[updatedSongIndex])
  
      // Update the state with the updated songs array
      this.setState({ songs: updatedSongs, viewingSong: null, editingSong: null, addingSong: false});
    }
  };
  handleSongAdded = (updatedSongData) => {

    const updatedSongs = [...this.state.songs];
    updatedSongs.push(updatedSongData);
    //   console.log("new info: ",updatedSongs[updatedSongIndex])
      // Update the state with the updated songs array
    this.setState({ songs: updatedSongs, viewingSong: null, editingSong: null, addingSong: false});
  };
}

export default SongList;
