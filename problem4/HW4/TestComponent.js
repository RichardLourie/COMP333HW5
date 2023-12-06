// TestComponent.js
import React, { useContext } from 'react';
import UserContext from './UserContext';

const TestComponent = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <h1>Current User</h1>
      <p>{user ? `User: ${user}` : 'No user logged in'}</p>
      <button onClick={() => setUser('NewUser')}>Log In</button>
    </div>
  );
};

export default TestComponent;
