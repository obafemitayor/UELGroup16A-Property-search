/**
 * @jest-environment jsdom
 */
import * as React from "react";
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react';
import { getDocs, query, collection, where } from "firebase/firestore";
import userEvent from "@testing-library/user-event";
import RenderStepComponent from "./steps-test-util";
import StepThree from '../components/Steps/StepThree';
import { db } from "../utils/fireStore";

jest.mock("firebase/firestore");

jest.mock('../lib/react-use-wizard', () => ({

  ...jest.requireActual('../lib/react-use-wizard'),

  useWizard: () =>({previousStep: jest.fn(), nextStep: jest.fn(), isFirstStep: false, isLastStep: false}), 
}));

const RenderStepThreeComponent = () => {
  const [budget, setBudget] = React.useState("");
  const [selectedArea, setSelectedArea] = React.useState("affordable");

  return (<StepThree budget={budget} setBudget={setBudget} selectedArea={selectedArea} />);
};


test('should render StepThree Component',  async () => {
  const mockGetDocs = jest.fn();

  mockGetDocs.mockResolvedValueOnce([{
    id: "1", 
    data:() => {
      return {name: "Affordable", budget: 1000}
    } 
  }]);

  getDocs.mockImplementation(mockGetDocs);

  render(<RenderStepComponent previousStep={2} childComponent={<RenderStepThreeComponent />} />);

  await waitFor(() => {
    expect(screen.getByText('What is your Budget?')).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/enter budget/i)).toBeInTheDocument();

    expect(mockGetDocs).toHaveBeenCalledWith(
      query(collection(db, "areas"), where('name', '==', 'affordable'))
    );
  });

});

test('should render button options when budget is less than area budget',  async () => {
  const user = userEvent.setup()

  const mockGetDocs = jest.fn();

  mockGetDocs.mockResolvedValueOnce([{
    id: "1", 
    data:() => {
      return {name: "Affordable", budget: 1000}
    } 
  }]);

  getDocs.mockImplementation(mockGetDocs);

  render(<RenderStepComponent previousStep={2} childComponent={<RenderStepThreeComponent />} />);

  await waitFor(() => {
    expect(screen.getByText('What is your Budget?')).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/enter budget/i)).toBeInTheDocument();

    expect(mockGetDocs).toHaveBeenCalledWith(
      query(collection(db, "areas"), where('name', '==', 'affordable'))
    );
  });

  await user.type(screen.getByPlaceholderText(/enter budget/i), "100");
  
  await user.click(screen.getByRole('button', { name: /next/i }));

  expect(screen.getByText('It seems your budget is not enough for your preferred area')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /change area?/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /change budget?/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /continue exploring?/i })).toBeInTheDocument();

  jest.restoreAllMocks();

});