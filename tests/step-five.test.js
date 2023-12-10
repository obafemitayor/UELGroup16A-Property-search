/**
 * @jest-environment jsdom
 */
import * as React from "react";
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import RenderStepComponent from "./steps-test-util";
import StepFive from '../components/Steps/StepFive';

const RenderStepFiveComponent = () => {
  const [propertyType, setPropertyType] = React.useState("");

  return (<StepFive setPropertyType={setPropertyType} />);
};

test('renders StepFive component', async () => {
  render(<RenderStepComponent previousStep={0} childComponent={<RenderStepFiveComponent />} />);

  expect(screen.getByText('What type of property do you prefer?')).toBeInTheDocument();

});