import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Joyride from "react-joyride";
import { useToolTipContext } from "../context/ToolTipContextProvider";
import dynamic from "next/dynamic";
import { getSteps } from "../services";
import IoClose from "react-icons/io";
const JoyrideNoSSR = dynamic(() => import("react-joyride"), { ssr: false });
import AnotherComponent from "../components/AnotherComponent";
// const Steps: any = dynamic(
//   (): any => import("intro.js-react").then((mod) => mod.Steps),
//   { ssr: false }
// );

// const JoyrideModule: any = dynamic(
//   (): any => import("react-joyride").then((mod) => mod.TooltipRenderProps),
//   { ssr: false }
// );

import { TooltipRenderProps } from "react-joyride";

// console.log(JoyrideModule);

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

  const Tooltip: React.FC<TooltipRenderProps> = ({
    continuous,
    index,
    step,
    skipProps,
    backProps,
    closeProps,
    primaryProps,
    tooltipProps,
    size,
    isLastStep,
  }) => (
    <div id="toolTip" {...tooltipProps}>
      <div id="close" {...skipProps}>
        x
      </div>
      <div id="toolTipBody">
        {step.title && <h3>{step.title}</h3>}
        <div id="toolTipContent">{step.content}</div>
      </div>
      <div id="toolTipButtonContainer">
        {index === 0 && (
          <button className="toolTipButton" {...skipProps}>
            Skip Tutorial
          </button>
        )}
        {index > 0 && (
          <button id="back" className="toolTipButton" {...backProps}>
            Back
          </button>
        )}
        {!isLastStep ? (
          <button id="next" className="toolTipButton" {...primaryProps}>
            Next {(index += 1)}/{size}
          </button>
        ) : (
          <button id="end" className="toolTipButton" {...primaryProps}>
            End Tutorial {(index += 1)}/{size}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Gudea:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div>
        <JoyrideNoSSR
          // steps={activeSteps}
          showProgress
          // debug
          continuous
          showSkipButton
          hideCloseButton
          callback={handleJoyrideCallback}
          run={run}
          styles={{
            options: {
              arrowColor: "#99CC00",
              // backgroundColor: "#ffffff",
              // overlayColor: "rgba(0, 0, 0, 0.5)",
              // primaryColor: "#3366FF",
              // textColor: "#000000",
              // width: 500,
              // zIndex: 1000,
            },
          }}
          steps={activeSteps}
          tooltipComponent={Tooltip}
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
    </>
  );
};

export default Home;
