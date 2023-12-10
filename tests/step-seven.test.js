/**
 * @jest-environment jsdom
 */
import * as React from "react";
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import RenderStepComponent from "./steps-test-util";
import StepSeven from '../components/Steps/StepSeven';
import { fetchApi as fetchApiMock } from "../utils/fetchApi";

jest.mock('../utils/fetchApi', () => ({

  ...jest.requireActual('../utils/fetchApi'),

  fetchApi: jest.fn(), 
}));

const RenderStepSevenComponent = () => {
  const [query, setQuery] = React.useState([{cityName: "Dubai" }]);
  const [budget, setBudget] = React.useState("1000");
  const [frequency, setFrquency] = React.useState("weekly");
  const [properties, setProperties] = React.useState([]);
  const [showWizard, setShowWizard] = React.useState(true);

  return (<StepSeven query={query} budget={budget} frequency={frequency}
    setProperties={setProperties}
    setShowWizard={setShowWizard}
  />);
};

test('renders StepSeven component', async () => {
  render(<RenderStepComponent previousStep={0} childComponent={<RenderStepSevenComponent />} />);

  expect(screen.getByText('Do you want a place that is close to social life?')).toBeInTheDocument();

});

test('should display properties on click of the find me a home button', async () => {
  const user = userEvent.setup();

  fetchApiMock.mockImplementation((url) => {
    if (url === 'https://bayut.p.rapidapi.com/auto-complete?query=Dubai') {
      return {hits: [{externalID: "1"}]};
    } else {
      return { data: {hits: []} };
    }
  });

  render(<RenderStepComponent previousStep={0} childComponent={<RenderStepSevenComponent />} />);

  await user.click(screen.getByRole('button', { name: /find me a home/i }));

  await waitFor(() => {
    expect(fetchApiMock).toHaveBeenCalledWith('https://bayut.p.rapidapi.com/auto-complete?query=Dubai');
    expect(fetchApiMock).toHaveBeenCalledWith('https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=1&purpose=for-rent&rentFrequency=weekly&priceMin=1000&sort=price-desc');
  });

});