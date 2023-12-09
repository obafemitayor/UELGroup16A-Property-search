import { useWizard } from "react-use-wizard";
import { Box, Text, Flex, Center, Button, Select } from "@chakra-ui/react";
import { baseUrl, fetchApi } from "../../utils/fetchApi";
import { useState } from "react";

const StepSeven = ({
  query,
  frequency,
  budget,
  setProperties,
  setShowWizard,
}) => {
  const [isGettingIds, setIsGettingIds] = useState(false);
  const { isFirstStep, previousStep } = useWizard();

  const getLocationIds = async () => {
    setIsGettingIds(true);
    const cities = query.map((_item) => _item?.cityName);
    const result = await Promise.all(
      cities.map(async (url) => {
        const resp = await fetchApi(`${baseUrl}/auto-complete?query=${url}`);

        return resp;
      })
    );

    const _externalIds = [];

    result.forEach((_item) => {
      _item?.hits.forEach((_hit) => {
        _externalIds.push(_hit?.externalID);
      });
    });

    return _externalIds.join();
  };

  const fetchProperties = async (locationIds) => {
    try {
      const budgetAmount = budget > 0 ? budget : 0;
      const data = await fetchApi(
        `${baseUrl}/properties/list?locationExternalIDs=${locationIds}&purpose=for-rent&rentFrequency=${frequency}&priceMin=${budgetAmount}&sort=price-desc`
      );

      setProperties(data?.hits);
    } catch (error) {}
    setIsGettingIds(false);
    setShowWizard(false);
  };

  const handleSearch = async () => {
    const Ids = await getLocationIds();
    fetchProperties(Ids);
  };

  return (
    <Box>
      <Flex alignItems="center">
        <Box w="100%" p={4} rounded="md" ml={100} height={"50vh"}>
          <Text fontSize="3xl" fontWeight="bold">
            Do you want a place that is close to social life?
          </Text>
          <Box>
            <Select placeholder="Select option" w="50%">
              <option value="yes">Yes</option>
              <option value="no">No</option>
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

            <Button
              onClick={handleSearch}
              disabled={isGettingIds}
              isLoading={isGettingIds}
            >
              Find me a home
            </Button>
          </Box>
        </Center>
      </Box>
    </Box>
  );
};

export default StepSeven;
