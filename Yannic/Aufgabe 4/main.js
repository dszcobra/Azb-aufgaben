window.onload = function() {
  const search = document.getElementById("search");
  const input = document.getElementById("input");
  const box1 = document.getElementById("b1");
  const box2 = document.getElementById("b2");
  const box3 = document.getElementById("b3");
  const box4 = document.getElementById("b4");
  const slider = document.getElementById("sl");
  const slidertitle = document.getElementById("slidertitle");

  const dates = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
  
  let currentlocation, currentday, today, currentbutton, location, currenthour;

  function changeVisibility(vbl)
  {
    [box1, box2, box3, box4, slider, slidertitle].forEach(x => x.style.visibility = vbl);
  }

  changeVisibility("hidden");

  addEventListener("resize", adjustSliderText);

  addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
      location = input.value;
      box4.innerHTML = "";
      displayData();
    }
  });

  input.addEventListener("click", function() {
    input.value = "";
    changeVisibility("hidden");
  })
  
  search.addEventListener("click", function() {
    location = input.value;
    displayData();
  })

  slider.addEventListener("input", function() {
    fillWithData(currentday.hour[slider.value]);
    adjustSliderText();
    slidertitle.innerText = (slider.value == currenthour && currentday == today) ? "Jetzt" : `${slider.value}:00`;
  });

  function adjustSliderText() {
    const sliderRect = slider.getBoundingClientRect();
    slidertitle.style.left = `${(slider.value / slider.max) * sliderRect.width}px`;
  }

  function addTextElement(size, parent, content, margin, color) {
    let text = document.createElement("span");
    Object.assign(text.style, { fontSize: size, margin: "5vh", marginTop: 0, marginBottom: margin, color });
    text.textContent = content;
    parent.appendChild(text);
  }
  
  async function getData() {
    const data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=91ee694787254b16bd392537242608&q=${location}&days=10&aqi=yes&alerts=yes&lang=de`);
    
    if (!data.ok) 
      throw new Error("Failed to fetch data");
  
    return data.json();
  }

  function fillWithData(element) {
    [box1, box2, box3].forEach(x => x.innerHTML = "");

    let img = document.createElement("img");
    Object.assign(img, { src: element.condition.icon, style: { width: "7vh", height: "7vh", gridRow: 1, gridColumn: 1, margin: 0, marginBottom: "2vh" }});
    box1.appendChild(img);

    addTextElement("4vh", box1, `${element.condition.text}`, "3vh", "black");
    addTextElement("2.5vh", box1, `${element.temp_c}°C`, "0.5vh");

    addTextElement("2.5vh", box3, "Wind", "0.5vh", "black");
    addTextElement("2vh", box3, `${element.wind_kph}km/h`, "2vh");
    addTextElement("2.5vh", box3, "Windböen", "0.5vh", "black");
    addTextElement("2vh", box3, `${element.gust_kph}km/h`, "2vh");
    addTextElement("2.5vh", box3, `Richtung`, "0.5vh", "black");
    addTextElement("2vh", box3, `${element.wind_dir}`, "2vh");
    addTextElement("2.5vh", box3, "Sichtweite", "0.5vh", "black");
    addTextElement("2vh", box3, `${element.vis_km} km`, "2vh");

    addTextElement("2.5vh", box2, "Luftdruck", "0.5vh", "black");
    addTextElement("2vh", box2, `${element.pressure_mb} hPa`, "2vh");
    addTextElement("2.5vh", box2, "Luftfeuchtigkeit", "0.5vh", "black");
    addTextElement("2vh", box2, `${element.humidity} %`, "2vh");
    addTextElement("2.5vh", box2, "Taupunkt", "0.5vh", "black");
    addTextElement("2vh", box2, `${element.dewpoint_c} °C`, "2vh");
    addTextElement("2.5vh", box2, "UV-Index", "0.5vh", "black");
    addTextElement("2vh", box2, `${element.uv}`, "2vh");
  }

  async function displayData() {
    try {
      const data = await getData();

      [box1, box2, box3, box4].forEach(el => el.innerHTML = "");
      currentlocation = data.location;
      today = currentday = data.forecast.forecastday[0];
      slider.value = currenthour = new Date(currentlocation.localtime.replace(" ", "T")).getHours();

      slidertitle.innerText = "Jetzt";
      adjustSliderText();
      fillWithData(currentday.hour[slider.value]);
      input.value = `${data.location.name}, ${data.location.country}`;

      data.forecast.forecastday.forEach((element, count) => addForecastElement(element, count + 1));
      changeVisibility("visible");
    } catch (error) {
      input.value = "";
      changeVisibility("hidden");
    }
  }

  function addForecastElement (element, count) {
    let button = document.createElement("button");
    let icon = document.createElement("img");
    let high = document.createElement("span");
    let low = document.createElement("span");
    let day = document.createElement("span");

    let date = (new Date().getDay() + count - 2) % 7;
    day.textContent = count == 1 ? "Heute" : dates[date];
    Object.assign(day.style, { gridRow: 2, fontSize: "2vh", color: "black" });
    
    icon.src = element.day.condition.icon;
    icon.style.gridRow = 3;
  
    low.textContent = `\u2193 ${element.day.mintemp_c}°C`;
    low.style.gridRow = 5;

    high.textContent = `\u2191 ${element.day.maxtemp_c}°C`;
    high.style.gridRow = 4;

    button.className = "forecast";
    button.style.gridColumn = count;
    button.append(day, icon, high, low);
    
    if(count == 1) {
      button.style.backgroundColor = "rgb(230, 230, 255)";
      currentbutton = button;
    }

    button.addEventListener("click", function() {
      currentday = element;
      if(currentday == today) {
        slider.value = new Date(currentlocation.localtime.replace(" ", "T")).getHours();
        slidertitle.innerText = "Jetzt";
      }
      else {
        slider.value = 0;
        slidertitle.innerText = "0:00";
      }

      adjustSliderText();
      fillWithData(currentday.hour[slider.value]);

      if(currentbutton != button) {
        currentbutton.style.backgroundColor = "rgb(220, 220, 220)"
        button.style.backgroundColor = "rgb(230, 230, 255)";
      }
      currentbutton = button;
    });

    box4.appendChild(button)
  }
}
    