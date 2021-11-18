import React from "react";
import Style, { keyframes } from "styled-components";

function AlertBox({ success, message }) {
  const animation = keyframes`
       to{
                      
              width: 0;
              height: 0;
       }
       from{
              display:none;
       }
       `;
  const Div = Style.div`
       display:flex;
       justify-content:center;
       border-radius:3px;
       line-height:0.2;
       padding:0px;
       margin:5px;
       color:white;
       background-color:${success ? "green" : "red"}  ;
       transition:all 200ms ease-in;   
       animation: ${animation} 0s ease-in 6s;
       animation-fill-mode: forwards;
       `;
  const Para = Style.p`
              font-size:14px;
              font-weight:bold
       `;

  return (
    <Div>
      <Para>{message}</Para>
    </Div>
  );
}

export default AlertBox;
