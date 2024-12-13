import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Header from './Header';

// Mock navigasi
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

const mockStore = configureStore([]);

describe('Header Component', () => {
  let store;

  const renderComponent = (initialState = {}) => {
    store = mockStore({
      auth: {
        isLoggedIn: false,
        role: null,
        ...initialState
      }
    });

    return render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );
  };

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders logo', () => {
    renderComponent();
    
    const logo = screen.getByText('Pawfect Shelter');
    expect(logo).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    renderComponent();
    
    const links = [
      'Home', 'About Us', 'Articles', 'FAQ', 'Contact'
    ];

    links.forEach(link => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  test('renders login and signup buttons when not logged in', () => {
    renderComponent();
    
    const loginButton = screen.getByText('Login 🔑');
    const signupButton = screen.getByText('Sign Up 🐱');
    
    expect(loginButton).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
  });

  test('navigates to login page when login button is clicked', () => {
    renderComponent();
    
    const loginButton = screen.getByText('Login 🔑');
    fireEvent.click(loginButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  test('navigates to register page when signup button is clicked', () => {
    renderComponent();
    
    const signupButton = screen.getByText('Sign Up 🐱');
    fireEvent.click(signupButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/register');
  });

  test('renders logout button and user role when logged in', () => {
    renderComponent({ isLoggedIn: true, role: 'user' });
    
    const logoutButton = screen.getByText('Logout 👋');
    const userRole = screen.getByText('User');
    
    expect(logoutButton).toBeInTheDocument();
    expect(userRole).toBeInTheDocument();
  });

  test('renders admin role when logged in as admin', () => {
    renderComponent({ isLoggedIn: true, role: 'admin' });
    
    const adminRole = screen.getByText('Admin');
    
    expect(adminRole).toBeInTheDocument();
  });
});