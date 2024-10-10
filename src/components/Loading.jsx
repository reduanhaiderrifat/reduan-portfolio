import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-236px)]">
      <div className="loader">
        <p style={{ "--i": 1 }}>L</p>
        <p style={{ "--i": 2 }}>o</p>
        <p style={{ "--i": 3 }}>a</p>
        <p style={{ "--i": 4 }}>d</p>
        <p style={{ "--i": 5 }}>i</p>
        <p style={{ "--i": 6 }}>n</p>
        <p style={{ "--i": 7 }}>g</p>
        <p style={{ "--i": 8 }}>.</p>
        <p style={{ "--i": 9 }}>.</p>
        <p style={{ "--i": 10 }}>.</p>
      </div>
    </div>
  );
};

export default Loading;
