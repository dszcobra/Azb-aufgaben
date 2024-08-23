console.log("calculator");
window.onload = function() {
    const score = document.getElementById("score");
    let result = 0;
    let lastSelectedSign = null;
    let selectedSign = null;

    const elements = document.querySelectorAll("[data-action]");

    elements.forEach(element => {
        const action = element.getAttribute("data-action");
        const value = element.getAttribute("data-value");

        element.addEventListener("click", function() {
            switch(action) {
                case "clear":
                    clearScore();
                    break;
                case "toggleSign":
                    toggleSign();
                    break;
                case "applyPercent":
                    applyPercent();
                    break;
                case "handleArithmetic":
                    handleArithmetic(value);
                    break;
                case "handleNumber":
                    handleNumber(value);
                    break;
                case "equals":
                    calculate();
                    break;
            }
        });
    });

    function clearScore() {
        score.innerText = "0";
        result = 0;
        lastSelectedSign = null;
        selectedSign = null;
    }

    function toggleSign() {
        score.innerText = (score.innerText.startsWith("-") ? score.innerText.slice(1) : "-" + score.innerText);
    }

    function applyPercent() {
        score.innerText = (parseFloat(score.innerText) / 100).toString();
    }

    function handleArithmetic(sign) {
        if (lastSelectedSign) {
            result = operate(result, parseFloat(score.innerText), lastSelectedSign);
            score.innerText = result.toString();
        } else {
            result = parseFloat(score.innerText);
        }
        lastSelectedSign = sign;
        selectedSign = sign;
    }

    function handleNumber(number) {
        if (selectedSign !== null || score.innerText === "0") {
            score.innerText = "";
        }
        score.innerText += number;
        selectedSign = null;
    }

    function calculate() {
        if (lastSelectedSign) {
            score.innerText = operate(result, parseFloat(score.innerText), lastSelectedSign).toString();
            lastSelectedSign = null;
        }
    }

    function operate(a, b, sign) {
        switch(sign) {
            case "+": return a + b;
            case "-": return a - b;
            case "*": return a * b;
            case "/": return a / b;
            default: return b;
        }
    }
}
