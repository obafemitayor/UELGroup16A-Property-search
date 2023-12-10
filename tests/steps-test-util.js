import * as React from "react";
import { AnimatePresence } from "framer-motion";
import { Wizard } from "../lib/react-use-wizard";
import AnimatedStep from "../components/AnimatedStep";

const RenderStepComponent = ({ childComponent, previousStep}) => {
  const previousStepRef = React.useRef(previousStep);

  return (
    <Wizard wrapper={<AnimatePresence initial={false} exitBeforeEnter />}>
      <AnimatedStep previousStep={previousStepRef}>
        {childComponent}
      </AnimatedStep>
    </Wizard>
  );
};

export default RenderStepComponent;