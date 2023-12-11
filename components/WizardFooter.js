import * as React from "react";

import { useWizard } from "../lib/react-use-wizard";
import { Button, Box, Center } from "@chakra-ui/react";

const WizardFooter = () => {
  const {
    nextStep,
    previousStep,
    isLoading,
    activeStep,
    stepCount,
    isLastStep,
    isFirstStep,
  } = useWizard();

  return (
    <>
      <Center>
        <Box>
          <Button
            mr={2}
            onClick={() => previousStep()}
            disabled={isLoading || isFirstStep}
          >
            Previous
          </Button>

          <Button onClick={() => nextStep()} disabled={isLoading || isLastStep}>
            Next
          </Button>
        </Box>
      </Center>
    </>
  );
};

export default WizardFooter;
