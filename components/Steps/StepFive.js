import { useState } from "react";

import { useWizard } from "react-use-wizard";
import { Box, Text, Flex, Button, Center, Select } from "@chakra-ui/react";

const StepFive = ({ setPropertyType }) => {
  const { isFirstStep, isLastStep, previousStep, nextStep } = useWizard();

  const handleChange = (e) => {
    return setPropertyType(e.target.value);
  };

  return (
    <Box>
      <Flex alignItems="center">
        <Box w="100%" p={4} rounded="md" ml={100} height={"50vh"}>
          <Text fontSize="3xl" fontWeight="bold">
            What type of property do you prefer?
          </Text>
          <Box>
            <Select placeholder="Select option" w="50%" onChange={handleChange}>
              <option value="furnished">Furnished</option>
              <option value="unfurnished">Unfurnished</option>
            </Select>
          </Box>
        </Box>
      </Flex>
      <Box>
        <Center>
          <Box>
            <Button
              mr={2}
              onClick={() => previousStep()}
              disabled={isFirstStep}
            >
              Previous
            </Button>

            <Button onClick={() => nextStep()} disabled={isLastStep}>
              Next
            </Button>
          </Box>
        </Center>
      </Box>
    </Box>
  );
};

export default StepFive;
