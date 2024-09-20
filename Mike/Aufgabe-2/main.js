"use strict";

window.addEventListener("load", function () {
  let numbers1 = [];
  let numbers2 = [];
  let allNums = null;
  let operator = null;
  let isOperatorSelected = false;
  let result = null;
  let input = null;
  let output = document.getElementById("p1");
  let buttons = document.querySelectorAll("button");
  let isInset = false;
  let insetButton = null;

  const inset = (btn) => {
    if (!isInset)
      btn.style.borderStyle =
        btn.style.borderStyle !== "inset" ? "inset" : "outset";
    insetButton = btn;
  };

  const outset = () => {
    insetButton.style.borderStyle = "outset";
  };

  const addDecimal = () => {
    !isOperatorSelected ? numbers1.push(".") : numbers2.push(".");
  };

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      input = this.innerText;

      if (isOperatorSelected === true && operator === "/" && input === "0") {
        output.innerHTML = 0;
      } else {
        if (input != null && isNaN(input)) {
          switch (input) {
            case "AC":
              actionClear();
              break;
            case "DEL":
              actionDelete();
              break;
            case ".":
              addDecimal();
              break;
            case "=":
              actionCalculation();
              break;
            default:
              operator = input;
              isOperatorSelected = true;
              outputValues();
              inset(this);
              isInset = true;
              break;
          }
        } else {
          setValues();
          outputValues();
        }
      }
    });

    function actionClear() {
      numbers1 = [];
      numbers2 = [];
      operator = null;
      isOperatorSelected = false;
      if (isInset) {
        outset();
      }
      isInset = false;
      output.innerHTML = "0";
    }

    function actionDelete() {
      const arrayNums = numbers1.concat(numbers2);
      arrayNums.pop();
      output.innerHTML = arrayNums.join("");
    }

    function actionCalculation() {
      let nums1 = numbers1.join("");
      let nums2 = numbers2.join("");
      switch (operator) {
        case "+":
          result = Number(nums1) + Number(nums2);
          break;
        case "-":
          result = nums1 - nums2;
          break;
        case "*":
          result = nums1 * nums2;
          break;
        case "/":
          result = nums1 / nums2;
          break;
        default:
      }
      output.innerHTML = result;
      outset();
      numbers1 = result;
    }

    function setValues() {
      if (isOperatorSelected === true && operator != "=") {
        numbers2.push(input);
      } else {
        numbers1.push(input);
      }
    }

    function outputValues() {
      if (operator != null) {
        let numsAndOp = `${numbers1.join("")} ${operator} ${numbers2.join("")}`;
        output.innerHTML = numsAndOp;
      } else {
        allNums = numbers2.concat(numbers1).join("");
        output.innerHTML = allNums;
      }
    }
  });
});
