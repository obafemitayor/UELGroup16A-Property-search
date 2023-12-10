import { useEffect, useState } from "react";

import { useWizard } from "../../lib/react-use-wizard";
import {
  Box,
  Center,
  Button,
  Text,
  Flex,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../utils/fireStore";

const StepThree = ({ budget, setBudget, selectedArea }) => {
  const [areaDetails, setAreaDetails] = useState([]);
  const [error, setError] = useState("");
  const { previousStep, nextStep, isFirstStep, isLastStep } = useWizard();

  const handleChange = (e) => {
    return setBudget(e.target.value);
  };

  const handleValidateBudget = () => {
    if (budget < areaDetails[0]?.budget) {
      return setError(
        "It seems your budget is not enough for your preferred area"
      );
    }

    return nextStep();
  };

  const getAreaDetails = async () => {
    const emirates_ref = collection(db, "areas");
    const q = query(emirates_ref, where("name", "==", selectedArea));
    const doc_refs = await getDocs(q);

    const res = [];

    doc_refs.forEach((emirate) => {
      res.push({
        id: emirate.id,
        ...emirate.data(),
      });
    });

    return setAreaDetails(res);
  };

  useEffect(() => {
    if (selectedArea) {
      getAreaDetails();
    }
  }, [selectedArea]);

  return (
    <Box>
      <Flex alignItems="center">
        <Box w="100%" p={4} rounded="md" ml={100} height={"50vh"}>
          {error && (
            <Alert status="error" mb={3} w="50%">
              <AlertIcon />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Text fontSize="3xl" fontWeight="bold">
            What is your Budget?
          </Text>
          <Box>
            <Input
              value={budget}
              type="number"
              onChange={handleChange}
              placeholder="Enter Budget"
              label="Enter Budget"
              size="lg"
              w="50%"
            />
          </Box>

          {error && (
            <Flex gap={3} width={"100%"} mt={20} alignItems={"center"}>
              <Button onClick={() => previousStep()}>Change Area?</Button>
              <Button onClick={() => setError("")}>Change Budget?</Button>
              <Button onClick={() => nextStep()}>Continue Exploring</Button>
            </Flex>
          )}
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

            {!error && (
              <Button onClick={handleValidateBudget} disabled={isLastStep}>
                Next
              </Button>
            )}
          </Box>
        </Center>
      </Box>
    </Box>
  );
};

export default StepThree;
