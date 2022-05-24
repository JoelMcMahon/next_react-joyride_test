import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Joyride from "react-joyride";
import { useToolTipContext } from "../context/ToolTipContextProvider";
import dynamic from "next/dynamic";
import { getSteps } from "../services";
const JoyrideNoSSR = dynamic(() => import("react-joyride"), { ssr: false });
import AnotherComponent from "../components/AnotherComponent";

const Home: NextPage = () => {
  const { activeSteps, run, setRun, setActiveSteps, setStepIndex, stepIndex } =
    useToolTipContext();

  console.log(activeSteps, "<<<<<<<< in index");

  const handleRelauchTutorial = () => {
    getSteps("tutorial/en/steps1.json")
      .then((response) => {
        setActiveSteps(Object.values(response));
      })
      .then(() => {
        setRun(true);
      });
  };
  const handleSecondTutorialClick = () => {
    getSteps("tutorial/en/steps2.json")
      .then((response) => {
        setActiveSteps(Object.values(response));
      })
      .then(() => {
        setRun(true);
      });
  };

  const handleJoyrideCallback = (data: any) => {
    console.log(data);
    if (data.action === "reset") {
      setRun(false);
    }
  };

  console.log(run);

  return (
    <div>
      <JoyrideNoSSR
        steps={activeSteps}
        showProgress
        debug
        continuous
        showSkipButton
        hideCloseButton
        callback={handleJoyrideCallback}
        run={run}
        styles={{
          options: {
            arrowColor: "#3366FF",
            backgroundColor: "#ffffff",
            overlayColor: "rgba(0, 0, 0, 0.5)",
            primaryColor: "#3366FF",
            textColor: "#3366FF",
            width: 900,
            zIndex: 1000,
          },
        }}
      />
      <div className="header">
        <p id="title">Title</p>
        <button onClick={handleRelauchTutorial}>Tutorial</button>
      </div>

      <div className="main">
        <div className="box">
          <p id="one">1</p>
        </div>
        <div id="two" className="box">
          2
        </div>
        <div id="three" className="box">
          3
        </div>
      </div>
      <div className="main">
        <div id="four" className="box">
          4
        </div>
        <div id="five" className="box">
          5
        </div>
      </div>
      <div className="main">
        <button id="button" onClick={handleSecondTutorialClick}>
          Load Second Tutorial
        </button>
      </div>
      <div id="another">
        <AnotherComponent></AnotherComponent>
      </div>
    </div>
  );
};

export default Home;
