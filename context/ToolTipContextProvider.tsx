import React, { createContext, useContext, useEffect, useState } from "react";
import {
  IToolTipContext,
  IToolTipContextProvider,
} from "../interfaces/interfaces";
import { getSteps } from "../services";

const toolTipContext = createContext<IToolTipContext>({
  run: true,
  setRun: () => {},
  stepIndex: 0,
  setStepIndex: () => {},
  activeSteps: [],
  setActiveSteps: () => {},
});

export const useToolTipContext = () => useContext(toolTipContext);

const ToolTipContextProvider: React.FC<IToolTipContextProvider> = ({
  children,
}) => {
  const [run, setRun] = useState(true);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [activeSteps, setActiveSteps] = useState<any>([
    {
      target: "#target",
      content: "Content",
    },
  ]);

  useEffect(() => {
    console.log("useEffect");
    getSteps("tutorial/en/steps1.json").then((response) => {
      console.log(response);
      setActiveSteps(Object.values(response));
    });
  }, []);

  return (
    <toolTipContext.Provider
      value={{
        run,
        setRun,
        activeSteps,
        setActiveSteps,
        stepIndex,
        setStepIndex,
      }}
    >
      {children}
    </toolTipContext.Provider>
  );
};

export default ToolTipContextProvider;
