import React from "react";
import "./port.css";

const Portfolio = () => {
  const cursor = document.querySelector('.cursor');

 document.addEventListener('mousemove' , e => {
  cursor.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX - 10)+"px;");
 })

  function spark(event) {
    let i = document.createElement("i");

   
    i.style.left = event.pageX + "px";
    i.style.top = event.pageY + "px";
   

    i.style.scale = `${Math.random() * 2 + 1}`;
    i.style.setProperty("--x", getRandomTransitionValue());
    i.style.setProperty("--y", getRandomTransitionValue());

    document.body.appendChild(i);

    setTimeout(() => {
      document.body.removeChild(i);
    }, 2000);
  }

  function getRandomTransitionValue() {
    return `${Math.random() * 400 - 200}px`;
  }

  document.addEventListener("mousemove", spark);



  return (
    <div className="port-page">

      <div className="cursor"></div>

      <div className="block"></div>
      <div className="block1"></div>
      <div className="block"></div>
      <div className="block1"></div>
      <div className="block"></div>
      <div className="block1"></div>
      <div className="block"></div>
      <div className="block1"></div>
      <div className="block"></div>
      <div className="block1"></div>
      <div className="block"></div>
      <div className="block1"></div>
      <div className="block"></div>
      <div className="block1"></div>
      <div className="block"></div>
      <div className="block1"></div>
    </div>
  );
};

export default Portfolio;
