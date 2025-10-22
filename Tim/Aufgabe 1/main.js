console.log("text");
window.onload = function() {
    const add = document.getElementById("add");
    const substract = document.getElementById("substract");
    const counter = document.getElementById("counter");
    let count = 0;
    let intervalId;

    console.log("add", add);
    add.addEventListener("mousedown", () =>{
        intervalId = setInterval(() => {
        count++;
        console.log("mousedown", count);
        counter.innerText = count;
        }, 100);
    });

    substract.addEventListener("mousedown", () =>{
        intervalId = this.setInterval(() => {
        count--;
        console.log("mousedown", count);
        counter.innerText = count;
        }, 100);
    });

    add.addEventListener("mouseup", () => clearInterval(intervalId));
    add.addEventListener("mouseleave", () => this.clearInterval(intervalId));
    substract.addEventListener("mouseup", () => clearInterval(intervalId));
    substract.addEventListener("mouseleave", () => this.clearInterval(intervalId));

    const canvas = document.getElementById("cursorCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.heigth = window.innerHeight;

    let trails = [];
    let cssWidth = 0;
    let cssHeigth = 0;

    function resizeCanvas(){
        const dpr = window.devicePixelRatio || 1;
        cssWidth = window.innerWidth;
        cssHeigth = window.innerHeight;

        canvas.style.width = cssWidth + "px";
        canvas.style.height = cssHeigth + "px";

        canvas.width = Math.round(cssWidth * dpr);
        canvas.height = Math.round(cssHeigth * dpr);

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    window.addEventListener("resize", ()=> {
        resizeCanvas();
    });

    window.addEventListener("mousemove", (e) => {
        trails.push({x: e.clientX, y: e.clientY, alpha: 1});
        if(trails.length > 200) trails.shift();
    });

    function draw() {
        ctx.clearRect(0, 0, cssWidth, cssHeigth);
       for(let i = 0; i < trails.length; i++){
        const t = trails[i];
        const size = 6 * (t.alpha);
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 150, 255, ${t.alpha})";
        ctx.arc(t.x, t.y, 6, 0, Math.PI * 2);
        ctx.fill();

        t.alpha -= 0.02;
       }

        trails = trails.filter((t)=> t.alpha > 0);
        requestAnimationFrame(draw);
    }

    resizeCanvas();
    draw();
}