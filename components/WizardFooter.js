import * as React from "react";

import { useWizard } from "react-use-wizard";
import { Button, Box, Center } from "@chakra-ui/react";

// const Button = styled.button`
//   border: 1px solid red;
//   margin-right: 2rem;
//   padding: 0.5rem;
//   border-radius: 5px;
//   cursor: pointer;
// `

// export const Actions = styled('div')`
//   display: flex;
//   justify-content: center;
//   margin: 1rem 0;
//   gap: 1rem;
//   flex-direction: row;
// `;

// export const Info = styled('div')`
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
//   gap: 0;

//   & > p {
//     margin: 0.25rem 0;
//   }

//   @media screen and (min-width: 768px) {
//     flex-direction: row;
//     gap: 1rem;

//     & > p {
//       margin: initial;
//     }
//   }
// `;

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
