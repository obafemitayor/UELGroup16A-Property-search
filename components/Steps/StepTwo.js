import { useWizard } from "../../lib/react-use-wizard";
import { collection, getDocs } from "firebase/firestore";
import {
  Box,
  Text,
  Flex,
  Stack,
  Radio,
  RadioGroup,
  Center,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { db } from "../../utils/fireStore";

const StepTwo = ({ setSelectedArea }) => {
  const [areas, setAreas] = useState([]);
  const { previousStep, nextStep, isFirstStep, isLastStep } = useWizard();

  const handleChange = (e) => {
    return setSelectedArea(e.target.value);
  };

  const fetchAreas = () => {
    getDocs(collection(db, "areas")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setAreas(newData);
    });
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  return (
    <Box>
      <Flex alignItems="center">
        <Box p={4} rounded="md" ml={100} height={"50vh"}>
          <Text fontSize="3xl" fontWeight="bold">
            What type of area would you like to live in?
          </Text>
          <Box pl={4}>
            <RadioGroup defaultValue="1" name="emirate">
              <Stack>
                {areas.map((_area) => (
                  <Radio
                    key={_area?.id}
                    size="lg"
                    name="emirate"
                    colorScheme="orange"
                    value={_area?.name}
                    onChange={handleChange}
                  >
                    {_area?.name}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
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

export default StepTwo;
