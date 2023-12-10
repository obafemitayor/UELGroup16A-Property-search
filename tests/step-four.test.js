/**
 * @jest-environment jsdom
 */
import * as React from "react";
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import RenderStepComponent from "./steps-test-util";
import StepFour from '../components/Steps/StepFour';

const RenderStepFourComponent = () => {
  const [selectedArea, setSelectedArea] = React.useState("affordable");
  const [emirateDetails, setEmirateDetails] = React.useState({cities:[{category: 'affordable'}]});
  const [frequency, setFrquency] = React.useState("");
  const [query, setQuery] = React.useState([]);

  return (<StepFour selectedArea={selectedArea} emirateDetails={emirateDetails} setQuery={setQuery} setFrquency={setFrquency} />);
};

test('renders StepFour component', async () => {
  render(<RenderStepComponent previousStep={0} childComponent={<RenderStepFourComponent />} />);

  expect(screen.getByText('How often do you want to pay rent?')).toBeInTheDocument();

});