import React, { Component } from 'react';
import SongList from './components/songList';
import UpdateSong from './components/updateSong';
import ViewSong from './components/viewSong'; // Import your ViewSong component
import Login from './components/login'; // Import the Login component

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEditSong: null, // State for editing a song
      selectedViewSong: null, // State for viewing a song
      loggedIn: false,
      user: null,
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

  handleLoginSuccess = (username) => {
    this.setState({ loggedIn: true , user: username}, () => {
      console.log('logged in: ', this.state.loggedIn);
      console.log("user that logged in: ", this.state.user);
    });
  };

  handleLogout = () => {
    // Perform logout logic here and set loggedIn to false when logout is successful
    this.setState({ loggedIn: false });
  };

  render() {
    const { selectedEditSong, selectedViewSong, loggedIn, user} = this.state;

    return (
      // <div>
      //   <SongList onEdit={this.handleEdit} onView={this.handleView} />
      //   {selectedEditSong && (<UpdateSong song={selectedEditSong} onCancel={this.handleCancel} />)}
      //   {selectedViewSong && (<ViewSong song={selectedViewSong} onCancel={this.handleCancel} />)}
      // </div>
      <div>
        {/* <h1>User: {user}</h1> */}
      { /* Render the Login component when not logged in */}
      { !loggedIn && <Login onLoginSuccess={this.handleLoginSuccess} /> }
      {loggedIn && <SongList user ={user} onEdit={this.handleEdit} onView={this.handleView} />}
      {selectedEditSong && (<UpdateSong song={selectedEditSong}/>)}
      {selectedViewSong && <ViewSong song={selectedViewSong} onCancel={this.handleCancel}/>}
      {loggedIn && <button onClick={this.handleLogout}>Logout</button> }
      </div>
    );
  }
}

export default App;



// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="Song List">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// 'use strict';

// const e = React.createElement;

// class LikeButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { liked: false };
//   }

//   render() {
//     if (this.state.liked) {
//       return 'You liked this.';
//     }

//     return e(
//       'button',
//       { onClick: () => this.setState({ liked: true }) },
//       'Like'
//     );
//   }
// }

// const domContainer = document.querySelector('#like_button_container');
// ReactDOM.render(e(LikeButton), domContainer);