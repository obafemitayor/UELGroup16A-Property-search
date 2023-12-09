/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import SignIn from '../pages/index';


jest.mock('next/navigation', () => ({

    ...jest.requireActual('next/navigation'),
  
    useRouter: () =>({replace: jest.fn()}), 
}));

test('should renders Index Page correctly', () => {
  render(<SignIn />);
  expect(screen.getByText('Email Address')).toBeInTheDocument();
  expect(screen.getByText('Password')).toBeInTheDocument();
});
