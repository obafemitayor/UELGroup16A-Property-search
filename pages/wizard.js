import * as React from "react";

import { Wizard } from "react-use-wizard";
import { AnimatePresence } from "framer-motion";
import AnimatedStep from "../components/AnimatedStep";
import StepOne from "../components/Steps/StepOne";
import StepTwo from "../components/Steps/StepTwo";
import StepThree from "../components/Steps/StepThree";
import { Box, Flex, Button } from "@chakra-ui/react";
import StepFour from "../components/Steps/StepFour";
import StepSix from "../components/Steps/StepSix";
import StepFive from "../components/Steps/StepFive";
import StepSeven from "../components/Steps/StepSeven";
import Property from "../components/Property";

const AnimatedSection = () => {
  const [budget, setBudget] = React.useState("");
  const [selectedArea, setSelectedArea] = React.useState("");
  const [emirateDetails, setEmirateDetails] = React.useState({});
  const [frequency, setFrquency] = React.useState("");
  const [propertyType, setPropertyType] = React.useState("");
  const [query, setQuery] = React.useState([]);
  const [properties, setProperties] = React.useState([]);
  const [showWizard, setShowWizard] = React.useState(true);

  const previousStep = React.useRef(0);

  const handleGoBack = () => {
    setProperties([]);
    setShowWizard((prev) => !prev);
  };

  return (
    <Box h="calc(100vh)">
      <Flex justifyContent="flex-end" mt={2} mb={2}>
        <Button onClick={handleGoBack}>Go Back</Button>
      </Flex>

      {showWizard && (
        <Box mb={5}>
          <Wizard wrapper={<AnimatePresence initial={false} exitBeforeEnter />}>
            <AnimatedStep previousStep={previousStep}>
              <StepOne
                setEmirateDetails={setEmirateDetails}
                emirateDetails={emirateDetails}
              />
            </AnimatedStep>
            <AnimatedStep previousStep={previousStep}>
              <StepTwo
                setSelectedArea={setSelectedArea}
                selectedArea={selectedArea}
              />
            </AnimatedStep>
            <AnimatedStep previousStep={previousStep}>
              <StepThree
                budget={budget}
                setBudget={setBudget}
                selectedArea={selectedArea}
              />
            </AnimatedStep>
            <AnimatedStep previousStep={previousStep}>
              <StepFour
                emirateDetails={emirateDetails}
                selectedArea={selectedArea}
                setQuery={setQuery}
                setFrquency={setFrquency}
              />
            </AnimatedStep>
            <AnimatedStep previousStep={previousStep}>
              <StepFive setPropertyType={setPropertyType} />
            </AnimatedStep>
            <AnimatedStep previousStep={previousStep}>
              <StepSix />
            </AnimatedStep>
            <AnimatedStep previousStep={previousStep}>
              <StepSeven
                query={query}
                budget={budget}
                frequency={frequency}
                setProperties={setProperties}
                setShowWizard={setShowWizard}
              />
            </AnimatedStep>
          </Wizard>
        </Box>
      )}

      <Flex flexWrap="wrap">
        {properties &&
          properties.length > 0 &&
          properties.map((property) => (
            <Property
              property={property}
              key={property.id}
              frequency={frequency}
              budget={budget}
            />
          ))}
      </Flex>
    </Box>
  );
};

export default AnimatedSection;
