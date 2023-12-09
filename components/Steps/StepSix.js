import { useEffect, useState } from "react";

import { useWizard } from "react-use-wizard";
import {
  Box,
  Text,
  Flex,
  Center,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Select,
} from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../utils/fireStore";

const StepSix = () => {
  const { isFirstStep, isLastStep, previousStep, nextStep } = useWizard();

  return (
    <Box>
      <Flex alignItems="center">
        <Box w="100%" p={4} rounded="md" ml={100} height={"50vh"}>
          <Text fontSize="3xl" fontWeight="bold">
            Do you want a place that is not far from public transportation?
          </Text>
          <Box>
            <Select placeholder="Select option" w="50%">
              <option value="weekly">Yes</option>
              <option value="monthly">No</option>
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

export default StepSix;
