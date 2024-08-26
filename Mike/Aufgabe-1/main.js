
let number = null; 

document.getElementById("button-addition").onclick = function() { numberAddition() };
document.getElementById("button-substraction").onclick = function() { numberSubstraction() };

function numberAddition() 
{
    number += 1;
    document.getElementById("p-number").innerHTML = "Die Nummer lautet: " + number;
}

function numberSubstraction() 
{
    number -= 1;
    document.getElementById("p-number").innerHTML = "Die Nummer lautet: " + number;
}