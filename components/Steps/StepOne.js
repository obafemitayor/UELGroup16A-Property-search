import { useWizard } from "react-use-wizard";
import { collection, getDocs } from "firebase/firestore";
import {
  Box,
  Text,
  Flex,
  Stack,
  Radio,
  RadioGroup,
  Button,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { db } from "../../utils/fireStore";
import Image from "next/image";

const StepOne = ({ setEmirateDetails, emirateDetails }) => {
  const [emirates, setEmirates] = useState([]);
  const [selectedEmirate, setSelectedEmirate] = useState("");

  const { previousStep, nextStep, isLastStep, isFirstStep } = useWizard();

  const handleChange = (e) => {
    return setSelectedEmirate(e.target.value);
  };

  const fetchEmirates = () => {
    getDocs(collection(db, "emirates")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setEmirates(newData);
    });
  };

  const getSelectedEmirateDetails = () => {
    const _emirates = [...emirates];
    const result = _emirates.find(
      (_emirate) => _emirate?.name === selectedEmirate
    );

    return setEmirateDetails(result);
  };

  useEffect(() => {
    fetchEmirates();
  }, []);

  useEffect(() => {
    if (selectedEmirate) {
      getSelectedEmirateDetails();
    }
  }, [selectedEmirate]);

  console.log("emirateDetails: ", emirateDetails);

  return (
    <Box>
      <Flex alignItems="center">
        <Box p={4} rounded="md" ml={100} height={"50vh"}>
          <Text fontSize="3xl" fontWeight="bold">
            In which emirate would you like to live in?
          </Text>
          <Flex pl={4} justifyContent="space-between">
            <Box>
              <RadioGroup defaultValue="1" name="emirate">
                <Stack>
                  {emirates.map((_emirate) => (
                    <Radio
                      key={_emirate?.id}
                      size="lg"
                      name="emirate"
                      colorScheme="orange"
                      value={_emirate?.name}
                      onChange={handleChange}
                    >
                      {_emirate?.name}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </Box>

            {emirateDetails?.image && (
              <Box width="50%">
                <Image src={emirateDetails?.image} width={250} height={150} />
                <Text wordBreak="break-word">{emirateDetails?.overview}</Text>
              </Box>
            )}
          </Flex>
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

export default StepOne;
