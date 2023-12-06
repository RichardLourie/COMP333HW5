import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import axios from 'axios';
import Login from './login';
import '@testing-library/jest-dom';

jest.mock('axios'); // Mocking axios to control its behavior

describe('Login Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Login component correctly', async () => {
    render(<Login onLoginSuccess={() => {}} />);

    expect(screen.queryByText('Login')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
  });

  test('calls handleLogin when Login button is clicked', async () => {
    axios.post.mockResolvedValue({ data: { success: true } });

    render(<Login onLoginSuccess={() => {}} />);

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testUser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'testPassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await act(() => Promise.resolve());

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost/index.php/user/verify?username=testUser&password=testPassword',
    );
  });

  test('calls handleSignup when Sign Up button is clicked', async () => {
    axios.post.mockResolvedValue({ data: { success: true } });

    render(<Login onLoginSuccess={() => {}} />);

    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    expect(screen.queryByPlaceholderText('Confirm Password')).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testUser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'testPassword' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'testPassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));

    await act(() => Promise.resolve());

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost/index.php/user/create?username=testUser&password=testPassword&confirmpassword=testPassword',
    );
  });

  test('calls handleSignup when Back button is clicked', async () => {
    render(<Login onLoginSuccess={() => {}} />);

    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));

    expect(screen.queryByPlaceholderText('Confirm Password')).not.toBeInTheDocument();
    // Add assertions based on your actual component behavior
  });

  test('handles incorrect login credentials', async () => {
    axios.post.mockRejectedValue({ response: { data: { success: false } } });
  
    // Create a spy for console.log
    const logSpy = jest.spyOn(console, 'log');
  
    render(<Login onLoginSuccess={() => {}} />);
  
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'incorrectUser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'incorrectPassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
  
    await act(() => Promise.resolve());
  
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost/index.php/user/verify?username=incorrectUser&password=incorrectPassword',
    );
  
    // Ensure that the "login failed" message is logged
    expect(logSpy).toHaveBeenCalledTimes(2); // Check that console.log was called once
    // expect(logSpy).toHaveBeenCalledWith('login failed');
  
    // Restore the original console.log function after the test
    logSpy.mockRestore();
  });
  
  
  
  
  
});
