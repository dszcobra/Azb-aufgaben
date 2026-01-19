window.onload = function() {
  const gridContainer = document.getElementById("gridContainer");
  const searchButton = document.getElementById("searchButton");
  const cityInputField = document.getElementById("cityInputField");
  const infoBox1 = document.getElementById("infoBox1");
  const infoBox2 = document.getElementById("infoBox2");
  const infoBox3 = document.getElementById("infoBox3");
  const infoBox4 = document.getElementById("infoBox4");
  const forecastSlider = document.getElementById("forecastSlider");
  const forecastSliderTitle = document.getElementById("forecastSliderTitle");

  const dates = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
  
  let currentlocation, currentday, today, currentbutton, location, currenthour, currentShownBox, mode;

  function calcRes() {
    return window.innerWidth / window.innerHeight;
  }

  function changeVisibility(vbl) {
    [infoBox1, infoBox2, infoBox3, infoBox4, forecastSlider, forecastSliderTitle].forEach(x => x.style.visibility = vbl);
  }

  addEventListener("resize", function() {
    adjustSliderText();

    if(calcRes() < 1.2 && mode === "horizontal" || calcRes() >= 1.2 && mode === "vertical") {
      infoBox4.innerHTML = "";
      displayData();
    }
  });

  function setMode() {
    if(calcRes() < 1.2) {
      [infoBox2, infoBox3].forEach(x => x.style.visibility = "hidden");
      currentShownBox = infoBox1;
      [infoBox1, infoBox2, infoBox3].forEach(x => {
        x.style.gridColumnStart = 1;
        x.style.gridColumnEnd = 4;
      });
      mode = "vertical";
    }
    else {
      [infoBox2, infoBox3].forEach(x => x.style.visibility = "visible");
      currentShownBox = null;
      [infoBox1, infoBox2, infoBox3].forEach(x => {
        x.style.gridColumnStart = null;
        x.style.gridColumnEnd = null;
      });
      mode = "horizontal";
    }
  }

  addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
      location = cityInputField.value;
      infoBox4.innerHTML = "";
      displayData();
    }
  });

  cityInputField.addEventListener("click", function() {
    cityInputField.value = "";
    changeVisibility("hidden");
  })
  
  searchButton.addEventListener("click", function() {
    location = cityInputField.value;
    displayData();
  })

  forecastSlider.addEventListener("input", function() {
    fillWithData(currentday.hour[forecastSlider.value]);
    adjustSliderText();
    forecastSliderTitle.innerText = (forecastSlider.value == currenthour && currentday == today) ? "Jetzt" : `${forecastSlider.value}:00`;
  });

  function adjustSliderText() {
    const sliderRect = forecastSlider.getBoundingClientRect();
    forecastSliderTitle.style.left = `${(forecastSlider.value / forecastSlider.max) * sliderRect.width}px`;
  }

  function addTextElement(size, parent, content, margin, color) {
    let text = document.createElement("span");
    Object.assign(text.style, { fontSize: size, marginTop: margin, marginBottom: 0, color });
    text.textContent = content;
    parent.appendChild(text);
  }
  
  async function getData() {
    const data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=91ee694787254b16bd392537242608&q=${location}&days=3&aqi=yes&alerts=yes&lang=de`);
    
    if (!data.ok) 
      throw new Error("Failed to fetch data");
    
    return data.json();
  }

  function fillWithData(element) {
    [infoBox1, infoBox2, infoBox3].forEach(x => x.innerHTML = "");

    let img = document.createElement("img");
    Object.assign(img, { src: element.condition.icon, style: { width: "7vh", height: "7vh", gridRow: 1, gridColumn: 1}});
    infoBox1.appendChild(img);

    const boxesConfig = [
      { size: "4vh", parent: infoBox1, text: `${element.condition.text}`, marginTop: "0.5vh", color: "black" },
      { size: "3vh", parent: infoBox1, text: `${element.temp_c}°C`, marginTop: "2vh"},
      { size: "2.5vh", parent: infoBox3, text: "Wind", marginTop: "2vh", color: "black" },
      { size: "2vh", parent: infoBox3, text: `${element.wind_kph}km/h`, marginTop: "0.5vh" },
      { size: "2.5vh", parent: infoBox3, text: "Windböen", marginTop: "2vh", color: "black" },
      { size: "2vh", parent: infoBox3, text: `${element.gust_kph}km/h`, marginTop: "0.5vh" },
      { size: "2.5vh", parent: infoBox3, text: "Richtung", marginTop: "2vh", color: "black" },
      { size: "2vh", parent: infoBox3, text: `${element.wind_dir}`, marginTop: "0.5vh" },
      { size: "2.5vh", parent: infoBox3, text: "Sichtweite", marginTop: "2vh", color: "black" },
      { size: "2vh", parent: infoBox3, text: `${element.vis_km} km`, marginTop: "0.5vh" },
      { size: "2.5vh", parent: infoBox2, text: "Luftdruck", marginTop: "2vh", color: "black"},
      { size: "2vh", parent: infoBox2, text: `${element.pressure_mb} km`, marginTop: "0.5vh" },
      { size: "2.5vh", parent: infoBox2, text: "Luftfeuchtigkeit", marginTop: "2vh", color: "black"},
      { size: "2vh", parent: infoBox2, text: `${element.humidity} km`, marginTop: "0.5vh" },
      { size: "2.5vh", parent: infoBox2, text: "Taupunkt", marginTop: "2vh", color: "black"},
      { size: "2vh", parent: infoBox2, text: `${element.dewpoint_c} km`, marginTop: "0.5vh" },
      { size: "2.5vh", parent: infoBox2, text: "UV-Index", marginTop: "2vh", color: "black"},
      { size: "2vh", parent: infoBox2, text: `${element.uv} km`, marginTop: "0.5vh" },
    ]

    for (const data of boxesConfig) 
      addTextElement(data.size, data.parent, data.text, data.marginTop, data.color);
  }

  async function displayData() {
    try {
      const data = await getData();
      console.log(data);

      [infoBox1, infoBox2, infoBox3, infoBox4].forEach(x => x.innerHTML = "");
      currentlocation = data.location;
      today = currentday = data.forecast.forecastday[0];
      forecastSlider.value = currenthour = new Date(currentlocation.localtime.replace(" ", "T")).getHours();

      forecastSliderTitle.innerText = "Jetzt";
      adjustSliderText();
      fillWithData(currentday.hour[forecastSlider.value]);
      cityInputField.value = `${data.location.name}, ${data.location.country}`;

      data.forecast.forecastday.forEach((element, count) => addForecastElement(element, count + 1));
      changeVisibility("visible");

      setMode();
      
      gridContainer.addEventListener("wheel", function() {
        switch(currentShownBox)
        {
          case infoBox1: {
            infoBox1.style.visibility = "hidden";
            infoBox2.style.visibility = "visible";
            currentShownBox = infoBox2;
          }
          break;
          case infoBox2: {
            infoBox2.style.visibility = "hidden";
            infoBox3.style.visibility = "visible";
            currentShownBox = infoBox3;
          }
          break;
          case infoBox3: {
            infoBox3.style.visibility = "hidden";
            infoBox1.style.visibility = "visible";
            currentShownBox = infoBox1;
          }
          break;
        }
      });

    } catch (error) {
      cityInputField.value = "";
      changeVisibility("hidden");
    }
  }

  function addForecastElement (element, count) {
    let button = document.createElement("button");
    let icon = document.createElement("img");
    let left = document.createElement("div");
    let right = document.createElement("div");
    let middle = document.createElement("div");
    let day = document.createElement("div");
    let info = document.createElement("div");


    left.className = "forecastSplit";
    right.className = "forecastSplit";
    middle.className = "forecastSplit";
   
    let date = (new Date().getDay() + count - 2) % 7;
    icon.src = element.day.condition.icon;
    Object.assign(day.style, { fontSize: "2.3vh", margin: 0, color: "black" });
    day.textContent = count == 1 ? "Heute" : dates[date];
    Object.assign(info.style, { fontSize: "1.7vh", margin: "0.7vh"});
    info.textContent = element.day.condition.text;

    const forecastConfig = [
      {size: "1.8vh", parent: right, content: `\u2191 ${element.day.maxtemp_c}°C`},
      {size: "1.8vh", parent: right, content: `\u2193 ${element.day.mintemp_c}°C`},
      {size: "1.8vh", parent: left, content: `\u2602 ${element.day.daily_chance_of_rain} %`},
    ]

    for (const data of forecastConfig) 
      addTextElement(data.size, data.parent, data.content, data.margin, data.color);

    middle.append(day);
    button.className = "forecast";
    button.style.gridColumn = count; 

    if(calcRes() < 1.2) {
      day.style.fontSize = "1.8vh";
      button.style.gridTemplateColumns = "1fr";
      button.append(middle);
    }
    else {
        middle.append(info);
        button.append(left, middle, right);
    }

    middle.append(icon);
    
    if(count == 1) {
      button.style.backgroundColor = "rgb(230, 230, 255)";
      currentbutton = button;
    }

    button.addEventListener("click", function() {
      currentday = element;
      if(currentday == today) {
        forecastSlider.value = new Date(currentlocation.localtime.replace(" ", "T")).getHours();
        forecastSliderTitle.innerText = "Jetzt";
      }
      else {
        forecastSlider.value = 0;
        forecastSliderTitle.innerText = "0:00";
      }

      adjustSliderText();
      fillWithData(currentday.hour[forecastSlider.value]);

      if(currentbutton != button) {
        currentbutton.style.backgroundColor = "rgb(220, 220, 220)"
        button.style.backgroundColor = "rgb(230, 230, 255)";
      }
      currentbutton = button;
    });
    infoBox4.appendChild(button)
  }
}