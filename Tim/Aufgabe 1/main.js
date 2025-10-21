console.log("text");
window.onload = function() {
    const add = document.getElementById("add");
    const substract = document.getElementById("substract");
    const counter = document.getElementById("counter");
    let count = 0;

    console.log("add", add);
    add.addEventListener("click", function(){
        count++;
        console.log("click", count);
        counter.innerText = count;
    });
    substract.addEventListener("click", function(){
        count--;
        console.log("click", count);
        counter.innerText = count;
    });  
}