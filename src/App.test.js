import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from './App';

afterEach(() => {
    cleanup();
});

const renderWithRouter = () => {
    const history = createMemoryHistory();
    return render(
      <Router history={history}>
        <App />
      </Router>
    );
};

describe('App', () => {
    test('renders main page', () => {
        renderWithRouter();
        expect(screen.getByText('TheBookishClub')).toBeInTheDocument();
        expect(screen.getByRole('heading')).toBeInTheDocument();
        expect(screen.getByText('See a Best Seller')).toBeInTheDocument();
    });
    test('navigation - Not login', () => {
        renderWithRouter();
        expect(screen.getByText('account')).toBeInTheDocument();
        userEvent.hover(screen.getByText('account'));
        userEvent.click(screen.getByText('profile'));
        expect(screen.getByText('Login')).toBeInTheDocument();
        //screen.debug();
    });
    test('navigation - Signup', () => {
        renderWithRouter();
        expect(screen.getByText('Create New Account')).toBeInTheDocument();
        userEvent.click(screen.getByText('Create New Account'));
        expect(screen.getByText('Sign Up')).toBeInTheDocument();
        //screen.debug();
    });
    test('navigation - Contact Us', () => {
        renderWithRouter();
        expect(screen.getByText('contact_us')).toBeInTheDocument();
        userEvent.click(screen.getByText('contact_us'));
        expect(screen.getByText('Contact Us')).toBeInTheDocument();
        //screen.debug();
    });
});

describe('Login', () => {
    test('Enter fields', async () => {
        renderWithRouter();
        userEvent.click(screen.getByTestId('main'));

        userEvent.type(screen.getByAltText('name'), 'Bob Smith');
        userEvent.type(screen.getByAltText('email'), 'bobby2@yahoo.com');
        userEvent.type(screen.getByAltText('password'), 'bobman');
        expect(screen.getByDisplayValue('Bob Smith')).toBeInTheDocument();
        expect(screen.getByDisplayValue('bobby2@yahoo.com')).toBeInTheDocument();
        expect(screen.getByDisplayValue('bobman')).toBeInTheDocument();
        //screen.debug();
    });
});

describe('Sign Up', () => {
    test('Email Check', async () => {
        renderWithRouter();
        userEvent.click(screen.getByText('Create New Account'));

        userEvent.type(screen.getByAltText('name'), 'New User');
        expect(screen.getByDisplayValue('New User')).toBeInTheDocument();

        userEvent.type(screen.getByAltText('email'), 'invalid email');
        expect(screen.getByText('Invalid email')).toBeInTheDocument();

        userEvent.clear(screen.getByAltText('email'));
        expect(screen.getByAltText('email')).toHaveAttribute('value', '');

        userEvent.type(screen.getByAltText('email'), 'admin@admin.com');
        //screen.debug();
    });
    test('Password Check', async () => {
        renderWithRouter();

        userEvent.type(screen.getByAltText('password'), 'bad');
        expect(screen.getByText('Password too short')).toBeInTheDocument();

        userEvent.clear(screen.getByAltText('password'));
        expect(screen.getByAltText('password')).toHaveAttribute('value', '');

        userEvent.type(screen.getByAltText('password'), 'admin123');
        //screen.debug();
    });
    test('Confirm Password', async () => {
        renderWithRouter();

        userEvent.type(screen.getByAltText('password'), 'admin123');
        expect(screen.getByDisplayValue('admin123')).toBeInTheDocument();

        userEvent.type(screen.getByAltText('confirm'), 'notmatch');
        expect(screen.getByText('Password does not match')).toBeInTheDocument();

        userEvent.clear(screen.getByAltText('confirm'));
        expect(screen.getByAltText('confirm')).toHaveAttribute('value', '');
        
        //screen.debug();
    });
});