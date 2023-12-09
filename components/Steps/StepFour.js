import { useEffect } from "react";
import { Box, Text, Flex, Center, Button, Select } from "@chakra-ui/react";
import { useWizard } from "react-use-wizard";

const StepFour = ({ selectedArea, emirateDetails, setFrquency, setQuery }) => {
  const { isLastStep, isFirstStep, previousStep, nextStep } = useWizard();

  const handleChange = (e) => {
    return setFrquency(e.target.value);
  };

  const getCitiesForSelectedArea = () => {
    const _query = { ...emirateDetails };

    const result = _query?.cities.filter(
      (_city) => _city?.category === selectedArea
    );

    return setQuery(result);
  };

  useEffect(() => {
    getCitiesForSelectedArea();
  }, []);

  return (
    <Box>
      <Flex alignItems="center">
        <Box w="100%" p={4} rounded="md" ml={100} height={"50vh"}>
          <Text fontSize="3xl" fontWeight="bold">
            How often do you want to pay rent?
          </Text>
          <Box>
            <Select placeholder="Select option" w="50%" onChange={handleChange}>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
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

export default StepFour;
