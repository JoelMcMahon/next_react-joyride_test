import React from "react";

export interface IToolTipContext {
  run: boolean;
  setRun: React.Dispatch<React.SetStateAction<boolean>>;
  activeSteps: step[];
  setActiveSteps: React.Dispatch<React.SetStateAction<step[]>>;
  stepIndex: number;
  setStepIndex: React.Dispatch<React.SetStateAction<number>>;
}

export type step = {
  target: string;
  content: string;
};

export interface IToolTipContextProvider {
  children?: React.ReactNode;
}
