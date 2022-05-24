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
        // setStepIndex(0);
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
      />
      <div className="header">
        <p id="title">Title</p>
        <button onClick={handleRelauchTutorial}>Tutorial</button>
      </div>
      <section className="main">
        {/* <button id="button" onClick={handleRelauchTutorial}>
          Tutorial
        </button> */}
        <div className="box one">
          <p id="one">1</p>
        </div>
        <div id="two" className="box">
          2
        </div>
        <div id="three" className="box">
          3
        </div>
      </section>
      <section className="main">
        <div id="four" className="box">
          4
        </div>
        <div id="five" className="box">
          5
        </div>
      </section>
      <section id="another">
        <AnotherComponent></AnotherComponent>
      </section>
    </div>
  );
};

export default Home;
