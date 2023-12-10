/**
 * @jest-environment jsdom
 */
import * as React from "react";
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react';
import { getDocs, query, collection, where } from "firebase/firestore";
import RenderStepComponent from "./steps-test-util";
import StepTwo from '../components/Steps/StepTwo';
import { db } from "../utils/fireStore";

jest.mock("firebase/firestore");


test('renders StepTwo component', async () => {
  const mockGetDocs = jest.fn();

  mockGetDocs.mockResolvedValueOnce({ docs: [{
    id: "1", 
    data:() => {
      return {name: "Affordable"}
    } 
  }]});

  getDocs.mockImplementation(mockGetDocs);

  render(<RenderStepComponent previousStep={1} childComponent={<StepTwo />} />);

  await waitFor(() => {
    expect(screen.getByText('What type of area would you like to live in?')).toBeInTheDocument();

    expect(mockGetDocs).toHaveBeenCalledWith(query(collection(db, "areas")));
  
    expect(screen.getByText('Affordable')).toBeInTheDocument();
  });

});