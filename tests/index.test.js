/**
 * @jest-environment jsdom
 */
import { signIn as signInMock } from "next-auth/react";
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import SignIn from '../pages/index';

jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  signIn: jest.fn(),
}));

jest.mock('next/navigation', () => ({

    ...jest.requireActual('next/navigation'),
  
    useRouter: () =>({replace: jest.fn()}), 
}));

test('should renders Index Page correctly', () => {
  render(<SignIn />);
  expect(screen.getByText('Email Address')).toBeInTheDocument();
  expect(screen.getByText('Password')).toBeInTheDocument();
});

test('should display error when sign in form is invalid', async () => {
  const user = userEvent.setup();

  render(<SignIn />);

  const formValiditySpy = jest.spyOn(HTMLFormElement.prototype, 'checkValidity');
  
  await user.click(screen.getByRole('button', { name: /sign in/i }));

  expect(formValiditySpy).toHaveBeenCalled();

  expect(formValiditySpy).toHaveReturnedWith(false);

  formValiditySpy.mockRestore();
});

test('should sign in user successfully into application', async () => {
  const user = userEvent.setup();

  signInMock.mockReturnValue({ status: 200 });

  render(<SignIn />);

  const formValiditySpy = jest.spyOn(HTMLFormElement.prototype, 'checkValidity');
  
  await user.type(screen.getByLabelText(/email address/i), "obafemitayor@gmail.com");

  await user.type(screen.getByLabelText(/password/i), "password");
  
  await user.click(screen.getByRole('button', { name: /sign in/i }));

  expect(signInMock).toHaveBeenCalledWith("credentials", {
    email: "obafemitayor@gmail.com",
    password: "password",
    redirect: false,
  });

  formValiditySpy.mockRestore();

  jest.resetAllMocks();
});
