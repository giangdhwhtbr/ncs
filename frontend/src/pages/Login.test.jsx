import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import Login from './Login';
const { handleFetch } = require('../helper/fetch');

describe('Login Component', () => {
  const mockHandleSignIn = jest.fn();

  beforeEach(() => {
    useAuthContext.mockReturnValue({
      handleSignIn: mockHandleSignIn,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form correctly', () => {
    render(<Login />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('displays error message on failed login', async () => {
    const errorMessage = 'Incorrect email or password';
    handleFetch.mockRejectedValueOnce(new Error(errorMessage));

    render(<Login />);

    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: 'wrong@localhost.dev' },
    });
    fireEvent.input(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  test('calls handleSignIn on successful login', async () => {
    const mockResponse = {
      tokens: {
        access: { token: 'access-token' },
        refresh: { token: 'refresh-token' },
      },
      user: { id: 1, name: 'Admin' },
    };
    handleFetch.mockResolvedValueOnce(mockResponse);

    render(<Login />);

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockHandleSignIn).toHaveBeenCalledWith(
        'access-token',
        'refresh-token',
        mockResponse.user
      );
    });
  });
});