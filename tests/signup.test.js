/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { getDocs, query, collection, where } from "firebase/firestore";
import userEvent from "@testing-library/user-event";
import SignUp from '../pages/signup';
import { db } from "../utils/fireStore";


jest.mock('next/navigation', () => ({

    ...jest.requireActual('next/navigation'),
  
    useRouter: () =>({replace: jest.fn()}), 
}));

jest.mock("firebase/firestore");

const originalAlert = window.alert;
Object.defineProperty(window, 'alert', {
    value: jest.fn()
});

test('should renders SignUp Page correctly', () => {
  render(<SignUp />);
  expect(screen.getByText('First Name')).toBeInTheDocument();
  expect(screen.getByText('Last Name')).toBeInTheDocument();
  expect(screen.getByText('Email Address')).toBeInTheDocument();
  expect(screen.getByText('Enter Password')).toBeInTheDocument();
  expect(screen.getByText('Confirm Password')).toBeInTheDocument();
  expect(screen.getByText('10 digit Mobile No.')).toBeInTheDocument();
});

test('should display error when email is Invalid', () => {
    render(<SignUp />);
    fireEvent.submit(screen.getByTestId("signup-form"));
    expect(window.alert).toHaveBeenCalledWith("Enter Valid email Address.");
    window.alert = originalAlert;
  });
  
test('should successfully sign up user', async () => {
  const user = userEvent.setup()

  const mockGetDocs = jest.fn();

  mockGetDocs.mockResolvedValueOnce({ docs: []});
  mockGetDocs.mockResolvedValueOnce({docs: []});

  getDocs.mockImplementation(mockGetDocs);

  render(<SignUp />);

  await user.type(screen.getByLabelText(/first name/i), "omotayo");
  await user.type(screen.getByLabelText(/last name/i), "obafemi");
  await user.type(screen.getByLabelText(/email address/i), "obafemitayor@gmail.com");
  await user.type(screen.getByLabelText(/enter password/i), "password");
  await user.type(screen.getByLabelText(/confirm password/i), "password");
  await user.type(screen.getByLabelText(/10 digit mobile no./i), "1234567890");

  await user.click(screen.getByRole('button', { name: /sign up/i }));

  expect(mockGetDocs).toHaveBeenCalledWith(
    query(collection(db, "users"), where('email', '==', 'obafemitayor@gmail.com'))
  );

  expect(mockGetDocs).toHaveBeenCalledWith(
    query(collection(db, "users"), where('mobileNo', '==', '1234567890'))
  );
  jest.resetAllMocks();
});