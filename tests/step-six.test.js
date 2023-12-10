/**
 * @jest-environment jsdom
 */
import * as React from "react";
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import RenderStepComponent from "./steps-test-util";
import StepSix from '../components/Steps/StepSix';

test('renders StepSix component', async () => {
  render(<RenderStepComponent previousStep={0} childComponent={<StepSix />} />);

  expect(screen.getByText('Do you want a place that is not far from public transportation?')).toBeInTheDocument();

});