"use strict";

const buttons = document.querySelector("#buttons");
const operadores = document.querySelectorAll(".operador");
const btn_equal = document.querySelector(".igual");
const coma = document.querySelector("#coma");
let boxResult = document.querySelector("#total");
let numberA;
let numberB;
let equalWasPressed = false;

// cuando es verdadero me permite printar el seguiente numero
let signStatus = false;
let signWasPressed = false;

// ayuda a realizar operaciones seguidas con los operadores
let contador = 0;

let sign = false;

function operador(type, element) {
  equalWasPressed = false;
  if (!signStatus) {
    if (signWasPressed) {
      numberB = boxResult.textContent;
      calculate(numberA, numberB, sign);
    }

    operadorActive(element);
    numberA = boxResult.textContent;
    signStatus = true;
    sign = type;
    signWasPressed = true;
  } else {
    operadorActive(element);
    numberA = boxResult.textContent;
    sign = type;
  }
}

buttons.addEventListener("click", (e) => {
  if (e.target.dataset.type === "number") {
    let element = e.target;

    if (signStatus === true || equalWasPressed) {
      boxResult.textContent = "";
      signStatus = false;
    }

    if (boxResult.textContent === "0") {
      boxResult.textContent = element.textContent;
    } else {
      boxResult.textContent += element.textContent;
    }
  } else if (e.target.dataset.type === "coma") {
    if (!boxResult.textContent.includes(",")) {
      boxResult.textContent += ",";
    }
  } else if (
    e.target.dataset.type === "sumar" ||
    e.target.dataset.type === "restar" ||
    e.target.dataset.type === "multiplicar" ||
    e.target.dataset.type === "dividir"
  )
    operador(e.target.dataset.type, e.target);
  else if (e.target.dataset.type === "limpiar") {
    clean(e.target.textContent);
    operadorActive();
  } else if (e.target.dataset.type === "igual") {
    if (sign) {
      if (equalWasPressed === true) {
        numberA = boxResult.textContent;
        calculate(numberA, numberB, sign);
        signWasPressed = false;
      } else {
        numberB = boxResult.textContent;
        calculate(numberA, numberB, sign);
        equalWasPressed = true;
      }
      signWasPressed = false;
    }
  }
});

function calculate(v1, v2, sign) {
  if (numberB === "ERROR" || numberA === "ERROR") {
    boxResult.textContent = "ERROR";
    return;
  }
  let a = Number(v1.replace(",", "."));
  let b = Number(v2.replace(",", "."));

  switch (sign) {
    case "sumar":
      boxResult.textContent = (a + b + "").replace(".", ",");
      break;
    case "restar":
      boxResult.textContent = (a - b + "").replace(".", ",");
      break;
    case "multiplicar":
      boxResult.textContent = (a * b + "").replace(".", ",");
      break;
    case "dividir":
      if (b === 0) {
        boxResult.textContent = "ERROR";
      } else {
        boxResult.textContent = (a / b + "").replace(".", ",");
      }
      break;
    default:
      break;
  }
}

function clean(value) {
  if (value === "C") {
    numberA = "";
    numberB = "";
    boxResult.textContent = 0;
    signStatus = false;
    signWasPressed = false;
    equalWasPressed = false;
  }
}
// Show the user which operator has pressed
function operadorActive(element) {
  const operadores = document.querySelectorAll(".operador");
  for (const op of operadores) {
    op.classList.remove("operadorActive");
  }
  if (element) {
    element.classList.toggle("operadorActive");
  }
}
