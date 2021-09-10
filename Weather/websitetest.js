window.addEventListener('load', () => {
  const date = new Date();
  const day = date.getDate();
  let long, lat;
  lat = 1;
  long = 1;
  let x = 0;
  let weatherDescription = document.querySelector('.weather-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let locationTimezone3 = document.querySelector('.location-timezone3');
  let temperatureType = document.querySelector('.temperature-type');
  let weatherTemperature = document.querySelector('.weather-temperature');
  let windSection = document.querySelector('.wind');
  let humiditySection = document.querySelector('.humidity');
  let todayButton = document.querySelector('.today');
  let threeButton = document.querySelector('.threeDay');
  let threeDay = document.querySelector('.weather3');
  let oneDay = document.querySelector('.weather');
  let location = document.querySelector('.location');
  let high1 = document.querySelector('.one-high');
  let high2 = document.querySelector('.two-high');
  let high3 = document.querySelector('.three-high');
  let low1 = document.querySelector('.one-low');
  let low2 = document.querySelector('.two-low');
  let low3 = document.querySelector('.three-low');
  let description1 = document.querySelector('.description-one');
  let description2 = document.querySelector('.description-two');
  let description3 = document.querySelector('.description-three');
  let temperatureType1 = document.querySelector('.temperature-type1');
  let temperatureType2 = document.querySelector('.temperature-type2');
  let temperatureType3 = document.querySelector('.temperature-type3');
  let home = document.querySelector('.button');
  let icon2 = document.querySelector('.icon2');
  let icon3 = document.querySelector('.icon3');
  let day1 = document.querySelector('.dayOne');
  let day2 = document.querySelector('.dayTwo');
  let day3 = document.querySelector('.dayThree');
  let weather3 = document.querySelector('.weather3');
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: 'white' });
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
  const daysGraph = () => {
    if (day === 1) {
      day1.textContent = 'Tuesday';
      day2.textContent = 'Wednesday';
      day3.textContent = 'Thursday';
      return;
    }
    if (day === 2) {
      day1.textContent = 'Wednesday';
      day2.textContent = 'Thursday';
      day3.textContent = 'Friday';
      return;
    }
    if (day === 3) {
      day1.textContent = 'Thursday';
      day2.textContent = 'Friday';
      day3.textContent = 'Saturday';
      return;
    }
    if (day === 4) {
      day1.textContent = 'Friday';
      day2.textContent = 'Saturday';
      day3.textContent = 'Sunday';
      return;
    }
    if (day === 5) {
      day1.textContent = 'Saturday';
      day2.textContent = 'Sunday';
      day3.textContent = 'Monday';
      return;
    }
    if (day === 6) {
      day1.textContent = 'Sunday';
      day2.textContent = 'Monday';
      day3.textContent = 'Tuesday';
      return;
    }
    if (day === 7) {
      day1.textContent = 'Monday';
      day2.textContent = 'Tuesday';
      day3.textContent = 'Wednesday';
      return;
    }
  };
  const weatherSwitch = () => {
    threeButton.addEventListener('click', () => {
      threeDay.classList.add('fadeIn');
      threeDay.classList.remove('fadeOut');
      oneDay.classList.add('fadeOut');
      oneDay.classList.remove('fadeIn');
      location.classList.add('fadeOut');
      location.classList.remove('fadeIn');
    });
    todayButton.addEventListener('click', () => {
      threeDay.classList.add('fadeOut');
      threeDay.classList.remove('fadeIn');
      oneDay.classList.add('fadeIn');
      oneDay.classList.remove('fadeOut');
      location.classList.add('fadeIn');
      location.classList.remove('fadeOut');
    });
  };
  navigator.geolocation.getCurrentPosition(function (position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    console.log(lat, long);
    let x = 0;
    while (lat != undefined && x == 0) {
      console.log('API has been fetched');
      fetchAPI();
      x = 1;
    }
  });
  const fetchAPI = () => {
    console.log('Hello');
    const proxy = 'https://api.allorigins.win/raw?url=';
    const APIkey = 'fd9d9c6418c23d94745b836767721ad1';
    const api = `${proxy}https://api.darksky.net/forecast/${APIkey}/${lat},${long}`;
    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);
        let dayOne = [
          responseData.daily.data[0].apparentTemperatureHigh,
          responseData.daily.data[0].apparentTemperatureLow,
          responseData.daily.data[0].summary,
          responseData.daily.data[0].icon,
        ];
        let dayTwo = [
          responseData.daily.data[1].apparentTemperatureHigh,
          responseData.daily.data[1].apparentTemperatureLow,
          responseData.daily.data[1].summary,
          responseData.daily.data[1].icon,
        ];
        let dayThree = [
          responseData.daily.data[2].apparentTemperatureHigh,
          responseData.daily.data[2].apparentTemperatureLow,
          responseData.daily.data[2].summary,
          responseData.daily.data[2].icon,
        ];
        high1.textContent = `High: ${Math.floor(dayOne[0])}`;
        high2.textContent = `High: ${Math.floor(dayTwo[0])}`;
        high3.textContent = `High: ${Math.floor(dayThree[0])}`;
        low1.textContent = `Low: ${Math.floor(dayOne[1])}`;
        low2.textContent = `Low: ${Math.floor(dayTwo[1])}`;
        low3.textContent = `Low: ${Math.floor(dayThree[1])}`;
        description1.textContent = dayOne[2];
        description2.textContent = dayTwo[2];
        description3.textContent = dayThree[2];
        setIcons(dayOne[3], document.querySelector('.icon1'));
        setIcons(dayTwo[3], document.querySelector('.icon2'));
        setIcons(dayThree[3], document.querySelector('.icon3'));

        const { temperature, summary, icon, windSpeed, windGust, humidity } =
          responseData.currently;
        temperatureDegree.textContent = Math.floor(temperature);
        weatherDescription.textContent = summary;
        locationTimezone.textContent = responseData.timezone
          .replace(/_/g, ' ')
          .replace(/\//g, ', ');
        locationTimezone3.textContent = responseData.timezone
          .replace(/_/g, ' ')
          .replace(/\//g, ', ');
        windSection.textContent = `Wind: ${Math.floor(
          windSpeed
        )} Gusts: ${Math.floor(windGust)}`;
        humiditySection.textContent = `Humidity: ${Math.floor(
          humidity * 100
        )}%`;

        let celcius = (temperature - 32) * (5 / 9);
        let celcius1h = (dayOne[0] - 32) * (5 / 9);
        let celcius1l = (dayOne[1] - 32) * (5 / 9);
        let celcius2h = (dayTwo[0] - 32) * (5 / 9);
        let celcius2l = (dayTwo[1] - 32) * (5 / 9);
        let celcius3h = (dayThree[0] - 32) * (5 / 9);
        let celcius3l = (dayThree[1] - 32) * (5 / 9);
        setIcons(icon, document.querySelector('.icon'));
        temperatureType.textContent = 'F';
        weatherTemperature.addEventListener('click', () => {
          if (temperatureType.textContent === 'F') {
            temperatureType.textContent = 'C';
            temperatureDegree.textContent = Math.floor(celcius);
          } else {
            temperatureType.textContent = 'F';
            temperatureDegree.textContent = Math.floor(temperature);
          }
        });
        let x = 0;
        weather3.addEventListener('click', () => {
          if (x === 0) {
            temperatureType1.textContent = 'C';
            temperatureType2.textContent = 'C';
            temperatureType3.textContent = 'C';
            high1.textContent = `High: ${Math.floor(celcius1h)}`;
            high2.textContent = `High: ${Math.floor(celcius2h)}`;
            high3.textContent = `High: ${Math.floor(celcius3h)}`;
            low1.textContent = `High: ${Math.floor(celcius1l)}`;
            low2.textContent = `High: ${Math.floor(celcius2l)}`;
            low3.textContent = `High: ${Math.floor(celcius2l)}`;
            x++;
          } else {
            temperatureType1.textContent = 'F';
            temperatureType2.textContent = 'F';
            temperatureType3.textContent = 'F';
            high1.textContent = `High: ${Math.floor(dayOne[0])}`;
            high2.textContent = `High: ${Math.floor(dayTwo[0])}`;
            high3.textContent = `High: ${Math.floor(dayThree[0])}`;
            low1.textContent = `High: ${Math.floor(dayOne[1])}`;
            low2.textContent = `High: ${Math.floor(dayTwo[1])}`;
            low3.textContent = `High: ${Math.floor(dayThree[1])}`;
            x--;
          }
        });
      });
  };
  daysGraph();
  weatherSwitch();
});
