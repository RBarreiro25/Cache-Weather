const apiKeyWeather = "fe50a66eca5b0e0baf6162a383ce4f57";


const cityInput = document.getElementById('input_search');
const searchBtn = document.getElementById('search');

const cityElement = document.querySelector('#cidade');
const tempElement = document.querySelector('#temperatura span');
const weatherIconElement = document.querySelector('#clima-icon');
const descElement = document.querySelector('#descricao');
const feelsLikeElement = document.querySelector('#sensacao_termica');
const umidityElement = document.querySelector('#umidade span');
const windElement = document.querySelector('#vento span');
const divAlertValidation = document.querySelector('.alert_validation');
const alertValidation = document.querySelector('#alert_validation p');
const divInfosInner = document.getElementsByClassName("infos_inner");
const tempMinElement = document.querySelector('#temp_min');
const tempMaxElement = document.querySelector('#temp_max');
const sunRiseElement = document.querySelector('#nascer_sol');
const sunSetElement = document.querySelector('#por_sol');
const mainElement = document.querySelector('#main');
const contentSection = document.querySelector('#content');
const title = document.querySelector('#title');
const detailsElement = document.querySelectorAll('[data-details]');
const convertElement = document.querySelector('[data-convert]');
let tempCelsius = 0;
let feelsLikeElementCelsius = 0;
let tempMinCelsius = 0;
let tempMaxCelsius = 0;
let isFahrenheit = false;
const infosInnerElement = document.querySelector('.infos_inner');
const divInfosWrapper = document.querySelector('#infos_wrapper');
let searchValidation = false;


// Funções 
const getWeatherData = async (city) => {
  if (city === "salvador" || city === "Salvador" || city ==="SALVADOR") {
    city = "salvador,br";
  }

  const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKeyWeather}&lang=en`;

  const res = await fetch(apiWeatherUrl);

  if(res.ok) {
    const data = await res.json();
    searchValidation = true;
    return data;
  } else {
    searchValidation = false;
  }
  }

  


const showWeatherData = async (city) => {
  const data = await getWeatherData(city);

  if(searchValidation) {
    if (divInfosWrapper.className == "infos_wrapper" ) {
      divInfosWrapper.classList.toggle('active_iwrapper');
    }
  
    cityElement.innerText = data.name;
    tempCelsius = data.main.temp;
    tempElement.innerText = `${data.main.temp.toFixed(1)}°C`;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    // setting first char of description to uppercase
    description = data.weather[0].description;
    descFirstCharUp = description.charAt(0).toUpperCase() + description.slice(1);
    descElement.innerText = descFirstCharUp;
    feelsLikeElementCelsius = data.main.feels_like;
    feelsLikeElement.innerText = `Feels like: ${data.main.feels_like.toFixed(1)}°C`
    umidityElement.innerText = `Humidity: ${data.main.humidity}%`;
    windElement.innerText = `Wind speed: ${(data.wind.speed * 3.6).toFixed(1)}km/h`;
    tempMinCelsius = data.main.temp_min;
    tempMinElement.innerText = `${data.main.temp_min.toFixed(1)}°C`;
    tempMaxCelsius = data.main.temp_max;
    tempMaxElement.innerText = `${data.main.temp_max.toFixed(1)}°C`;
    sunRiseElement.innerText = `${unixToTime(data.sys.sunrise)}`
    sunSetElement.innerText = `${unixToTime(data.sys.sunset)}`
  } else {
    divAlertValidation.classList.add("active");
    alertValidation.innerText = "City not found. Please, try again.";
  }
  
    
}

function retira_acentos(city) { 
	com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
	sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
	novacity="";
	for(i=0; i<city.length; i++) {
		troca=false;
		for (a=0; a<com_acento.length; a++) {
			if (city.substr(i,1)==com_acento.substr(a,1)) {
				novacity+=sem_acento.substr(a,1);
				troca=true;
				break;
			}
		}
		if (troca==false) {
			novacity+=city.substr(i,1);
		}
	}

    cityNoSpecials = novacity;
	return novacity;
}

function unixToTime(string) {
  var date = new Date(string * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

return formattedTime;
}

function font0emToggle() {
 let font0emToggled =  title.classList.toggle('font_0em');

 return font0emToggled
}

function toTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Eventos
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  cityInput.blur();
  alertValidation.innerText = "";
  divAlertValidation.classList.remove("active");
  
  if (cityInput.value !== "" && cityInput.value.length > 2) {
    const city = cityInput.value;
    showWeatherData(city);
    cityInput.value = '';
    retira_acentos(city);
    toTop();

  if (title.className == "title") {
    title.classList.toggle('hidden');
    setTimeout(font0emToggle, 400);
    contentSection.classList.toggle('move_up');
    mainElement.classList.toggle("main_footer_down")
  }

  } else {
    divAlertValidation.classList.add("active");
    alertValidation.innerText = "Empty or too short search. Please, try again.";
  }
  
})



cityInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchBtn.click();
  }
});

detailsElement.forEach(function(e) {

  e.addEventListener("click", function() {
    infosInnerElement.classList.toggle('flip_transition');
  })
})

convertElement.addEventListener("click", function() {
  if(!isFahrenheit) {
    tempElement.innerText = `${((tempCelsius * 1.8) + 32).toFixed(1)}°F`;
    feelsLikeElement.innerText = `Feels like: ${((feelsLikeElementCelsius * 1.8) + 32).toFixed(1)}°F`
    tempMinElement.innerText = `${((tempMinCelsius * 1.8) + 32).toFixed(1)}°F`;
    tempMaxElement.innerText = `${((tempMaxCelsius * 1.8) + 32).toFixed(1)}°F`;
    isFahrenheit = true;
  } else {
    tempElement.innerText = `${tempCelsius.toFixed(1)}°C`;
    feelsLikeElement.innerText = `Feels like: ${feelsLikeElementCelsius.toFixed(1)}°C`
    tempMinElement.innerText = `${tempMinCelsius.toFixed(1)}°C`;
    tempMaxElement.innerText = `${tempMaxCelsius.toFixed(1)}°C`;
    isFahrenheit = false;
  }
})

