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

const divWeatherInfos = document.getElementById('weather_infos');


// Funções 
const getWeatherData = async (city) => {
  if (city === "salvador" || city === "Salvador") {
    city = "salvador,br";
  }
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKeyWeather}&lang=pt_br`;

    const res = await fetch(apiWeatherUrl);
    const data = await res.json();

    return data;
}


const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = `${data.main.temp.toFixed(1).replace(".", ",")}°C`;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    // setting first char of description to uppercase
    description = data.weather[0].description;
    descFirstCharUp = description.charAt(0).toUpperCase() + description.slice(1);
    descElement.innerText = descFirstCharUp;

    feelsLikeElement.innerText = `Sensação térmica: ${Math.round(data.main.feels_like)}°C`
    umidityElement.innerText = `Umidade: ${data.main.humidity}%`;
    windElement.innerText = `Velocidade dos ventos: ${data.wind.speed.toFixed(1).replace(".", ",")}km/h`;

    if (divWeatherInfos.classList == 'hidden') {
      divWeatherInfos.classList.toggle('active');
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
	return console.log(novacity);
}


// Eventos
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const city = cityInput.value;
  
  showWeatherData(city);
  cityInput.value = '';
  retira_acentos(city);
})

cityInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchBtn.click();
  }
});