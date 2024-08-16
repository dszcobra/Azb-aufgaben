console.log("calculator");
window.onload = function() 
{
    const score = document.getElementById("score");
    const clear = document.getElementById("clear");
    const sign = document.getElementById("sign");
    const percent = document.getElementById("percent");
    const divide = document.getElementById("divide");
    const seven = document.getElementById("seven");
    const eight = document.getElementById("eight");
    const nine = document.getElementById("nine");
    const multiply = document.getElementById("multiply");
    const four = document.getElementById("four");
    const five = document.getElementById("five");
    const six = document.getElementById("six");
    const minus = document.getElementById("minus");
    const one = document.getElementById("one");
    const two = document.getElementById("two");
    const three = document.getElementById("three");
    const plus = document.getElementById("plus");
    const zero = document.getElementById("zero");
    const comma = document.getElementById("comma");
    const equals = document.getElementById("equals");

    const numbers = [zero, one, two, three, four, five, six, seven, eight, nine];
    
    let result = 0;
    let lastSelectedSign = 0;
    let selectedSign = null;
    let isFirstNegative = false;
    let isSecondNegative = false;

    function calcScore(number) {
        if(isFirstNegative) {
            result *= 1;
            isFirstNegative = false;
        }
        isSecondNegative = false;

        switch(lastSelectedSign) {
            case multiply: result *= parseFloat(number); 
                break;
            case divide: result /= parseFloat(number); 
                break;
            case plus: result += parseFloat(number); 
                break;
            case minus: result -= parseFloat(number); 
                break;
            case 0: result = parseFloat(number); 
                break;
        }
        score.innerText = result;
        formatScore();
    }
    
    function formatScore()
    {
        if(score.innerText.length > 8)
            score.innerText = score.innerText.slice(0, 9);
        //trim for . at the end
    }

    function select(item) {
        item.style.backgroundColor="rgb(254, 254, 254)";
        item.style.color="rgb(247, 162, 43)";
    }

    function unSelect() {
        if(selectedSign != null) {
            selectedSign.style.backgroundColor="rgb(247, 162, 43)";
            selectedSign.style.color="rgb(254, 254, 254)";
            selectedSign = null;
        }
    }

    function handleNumber(text) {
        if(selectedSign != null || score.innerText == "0")
            score.innerText = "";
        if(score.innerText == "-0")
            score.innerText = "-";
        else if(isSecondNegative)
        {
            score.innerText = "-" + score.innerText;
            isSecondNegative = false;
        }
        
        score.innerText += text;
        formatScore();
        unSelect();
        console.log(window.innerHeight);
        console.log(window.innerWidth);
    }

    function handleArithmetics(element) {
        if(selectedSign == null)
        {
            calcScore(parseFloat(score.innerText));
            lastSelectedSign = element;
        }
        unSelect();
        select(element);
        selectedSign = element;
    }

    for(let i = 0; i < numbers.length; i++)
    {
        numbers[i].addEventListener("click", function() {
            handleNumber(i);
        });
    }
    
    clear.addEventListener("click", function() {
        score.innerText = 0;
        unSelect();
        lastSelectedSign = 0;
        result = 0;
        isFirstNegative = false;
        isSecondNegative = false;
    });

    sign.addEventListener("click", function()
    {
        if(selectedSign != null)
            score.innerText = "0";
        
        if(score.innerText.startsWith("-"))
            score.innerText = score.innerText.substring(1);
        else
            score.innerText = "-" + score.innerText;

        isSecondNegative = true;
    })

    plus.addEventListener("click", function() {
        handleArithmetics(plus);
    });

    minus.addEventListener("click", function() {
        if(lastSelectedSign == 0)
            isFirstNegative = true;

        handleArithmetics(minus);
    });

    divide.addEventListener("click", function() {
        handleArithmetics(divide);
    });

    multiply.addEventListener("click", function() {
        handleArithmetics(multiply);
    });

    equals.addEventListener("click", function() {
        calcScore(parseFloat(score.innerText));
        selectedSign = null;
        lastSelectedSign = 0;
    });

    comma.addEventListener("click", function() {
        score.innerText += ".";
        isSecondNegative = false;
        unSelect();
    });

    percent.addEventListener("click", function() {
        score.innerText = score.innerText / 100;
        formatScore();
    });

}