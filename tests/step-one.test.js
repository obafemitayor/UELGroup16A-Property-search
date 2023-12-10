/**
 * @jest-environment jsdom
 */
import * as React from "react";
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react';
import { getDocs, query, collection, where } from "firebase/firestore";
import RenderStepComponent from "./steps-test-util";
import StepOne from '../components/Steps/StepOne';
import { db } from "../utils/fireStore";

jest.mock("firebase/firestore");


test('renders StepOne component', async () => {
  const mockGetDocs = jest.fn();

  mockGetDocs.mockResolvedValueOnce({ docs: [{
    id: "1", 
    data:() => {
      return {name: "Tayo Emirate"}
    } 
  }]});

  getDocs.mockImplementation(mockGetDocs);

  render(<RenderStepComponent previousStep={0} childComponent={<StepOne />} />);

  await waitFor(() => {
    expect(screen.getByText('In which emirate would you like to live in?')).toBeInTheDocument();

    expect(mockGetDocs).toHaveBeenCalledWith(query(collection(db, "emirates")));
  
    expect(screen.getByText('Tayo Emirate')).toBeInTheDocument();
  });

});