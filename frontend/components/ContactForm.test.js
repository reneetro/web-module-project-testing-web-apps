import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

beforeEach (()=> {
    render(<ContactForm />);
}); 



test('renders without errors', () => {

});

test('renders the contact form header', () => {
    const header = screen.getByText('Contact Form', {exact: false});
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    const errorName = 'bob';
    const firstNameInput = screen.getByPlaceholderText('Edd');

    userEvent.type(firstNameInput, errorName);

    const error = await screen.findByTestId('error');

    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent('firstName must have at least 5 characters.', {exact: false});
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    
    const button = screen.getByRole('button');
    userEvent.click(button);

    const errors = await screen.findAllByTestId('error');
    expect(errors).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    const firstNameInput = screen.getByPlaceholderText('Edd');
    const lastNameInput = screen.getByPlaceholderText('Burke');

    userEvent.type(firstNameInput, 'Rebecca');
    userEvent.type(lastNameInput, 'Adams');

    const button = screen.getByRole('button');
    userEvent.click(button);
    
    const error = await screen.findByTestId('error');
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent('email must be a valid email address.', {exact: false});
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    const emailInput = screen.getByPlaceholderText('bluebill1049@hotmail.com');
    userEvent.type(emailInput, 'foo');

    const error = await screen.findByTestId('error');
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent('email must be a valid email address.', {exact: false});
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    const button = screen.getByRole('button');
    userEvent.click(button);

    const errors = await screen.findAllByTestId('error');
    expect(errors[1]).toHaveTextContent('lastName is a required field');
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    const firstNameInput = screen.getByPlaceholderText('Edd');
    const lastNameInput = screen.getByPlaceholderText('Burke');
    const emailInput = screen.getByPlaceholderText('bluebill1049@hotmail.com');

    userEvent.type(firstNameInput, 'Rebecca');
    userEvent.type(lastNameInput, 'Rebecca');
    userEvent.type(emailInput, 'anemail@email.com');
    
    const button = screen.getByRole('button');
    userEvent.click(button);

    const firstResult = screen.getByTestId('firstnameDisplay');
    const lastResult = screen.getByTestId('lastnameDisplay');
    const emailResult = screen.getByTestId('emailDisplay');
    const messageResult = screen.queryByTestId('messageDisplay');

    expect(firstResult).toBeInTheDocument();
    expect(firstResult).toHaveTextContent('Rebecca', {exact: false});
    expect(lastResult).toBeInTheDocument();
    expect(lastResult).toHaveTextContent('Rebecca', {exact: false});
    expect(emailResult).toBeInTheDocument();
    expect(emailResult).toHaveTextContent('anemail@email.com', {exact: false});
    expect(messageResult).not.toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
    const firstNameInput = screen.getByPlaceholderText('Edd');
    const lastNameInput = screen.getByPlaceholderText('Burke');
    const emailInput = screen.getByPlaceholderText('bluebill1049@hotmail.com');
    const messageInput = screen.getByLabelText('Message');

    userEvent.type(firstNameInput, 'Rebecca');
    userEvent.type(lastNameInput, 'Rebecca');
    userEvent.type(emailInput, 'anemail@email.com');
    userEvent.type(messageInput, 'testing is great');
    
    const button = screen.getByRole('button');
    userEvent.click(button);

    const firstResult = await screen.findByTestId('firstnameDisplay');
    const lastResult = await screen.findByTestId('lastnameDisplay');
    const emailResult = await screen.findByTestId('emailDisplay');
    const messageResult = await screen.findByTestId('messageDisplay');


    expect(firstResult).toBeInTheDocument();
    expect(firstResult).toHaveTextContent('Rebecca', {exact: false});
    expect(lastResult).toBeInTheDocument();
    expect(lastResult).toHaveTextContent('Rebecca', {exact: false});
    expect(emailResult).toBeInTheDocument();
    expect(emailResult).toHaveTextContent('anemail@email.com', {exact: false});
    expect(messageResult).toBeInTheDocument();
    expect(messageResult).toHaveTextContent('testing is great');
});
