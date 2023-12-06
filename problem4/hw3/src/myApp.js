import React, { Component } from 'react';
import SongList from './components/songList';
import UpdateSong from './components/updateSong';
import ViewSong from './components/viewSong'; // Import your ViewSong component
import DeleteSong from './components/deleteSong';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEditSong: null, // State for editing a song
      selectedViewSong: null, // State for viewing a song
    };
  }

  handleEdit = (song) => {
    this.setState({
      selectedEditSong: song,
      selectedViewSong: null, // Clear the selectedViewSong when editing
    });
  };

  handleView = (song) => {
    this.setState({
      selectedViewSong: song,
      selectedEditSong: null, // Clear the selectedEditSong when viewing
    });
  };

  render() {
    const { selectedEditSong, selectedViewSong } = this.state;

    return (
      <div>
        <SongList onEdit={this.handleEdit} onView={this.handleView} />
        {selectedEditSong && <UpdateSong song={selectedEditSong} />}
        {selectedViewSong && <ViewSong song={selectedViewSong} />}
      </div>
    );
  }
}

export default App;
