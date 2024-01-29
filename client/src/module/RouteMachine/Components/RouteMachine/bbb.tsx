import React, { useEffect } from 'react';

const YourJSXComponent = () => {

  useEffect(() => {
    const button = document.getElementById("button");

    if (button) {
      
      button.addEventListener("click", handleClick);
    }
  }, []); // Empty dependency array to run the effect only once on mount

  
  const handleClick = () => {
    console.log("Button Clicked");
  };

  return (
    <div>
      <button id="button">Click me</button>
    </div>
  );
};

export default YourJSXComponent;
