import React from "react";

const AnotherComponent = () => {
  const dummyArray = ["six", "seven", "eight", "nine", "ten"];

  return (
    <>
      <div className="main">
        {dummyArray.map((number) => {
          return (
            <p key={number} className="box" id={number}>
              {number}
            </p>
          );
        })}
        <button id="button">Press</button>
      </div>
      <section className="main">
        <textarea id="text"></textarea>
      </section>
    </>
  );
};

export default AnotherComponent;
