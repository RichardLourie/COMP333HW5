import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleLogin = () => {
    const { username, password } = this.state;
  
    // Replace with your API endpoint for authentication
    axios
      .post(`http://localhost/index.php/user/verify?username=${username}&password=${password}`)
      .then((response) => {
        const data = response.data;
        if (data && data.response === true) {
          // Login was successful, call the parent component's function to update the state
          this.props.onLoginSuccess();
        } else {
          // Handle login failure, show an error message, etc.
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
      });
  };
  

  render() {
    return (
      <div>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={this.state.username}
          onChange={(e) => this.setState({ username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={(e) => this.setState({ password: e.target.value })}
        />
        <button onClick={this.handleLogin}>Login</button>
      </div>
    );
  }
}

export default Login;
