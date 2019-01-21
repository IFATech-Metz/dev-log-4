
// Comme on effectue 2 requêtes différentes
// on utilisera 2 objets requêtes différents pour 
// éviter une confusion des données de réponse "instant T" et "Prévisions"
var xhr = new XMLHttpRequest(); // Requête de la météo instant T
var xhrForecast = new XMLHttpRequest(); // requête de Forecast



// Forme générale du lien :
// http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?
// date=1527811200&opacity=0.9&fill_bound=true&appid={api_key}

var base_url = "http://api.openweathermap.org/data/2.5/weather";
var forecast_url = "http://api.openweathermap.org/data/2.5/forecast";
var city = "Metz";
var units = "metric";
var appid = "20f42eda5e8eb5541a9e68271d63b657";


//Va chercher l'url meteo Instant clic
function get_url() {
    return base_url + "?"
        + "q=" + city + "&"
        + "units=" + units + "&"
        + "appid=" + appid;
        
}

//Va chercher l'url meteo prévisions +5J
function getforecasturl() {
    return forecast_url + "?"
        + "q=" + city + "&"
        + "units=" + units + "&"
        + "appid=" + appid;
        
}


function init_page() {
    //Préparation des actions à effectuer lors de l'événement "réponse" du site OpenWP
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        
            document.getElementById("url").innerHTML = get_url();
            
            //Température
            var response = JSON.parse(this.responseText);
            var temperature = response.main.temp;

//Humidité  
           var humidity = response.main.humidity;
//pression
            var pressure = response.main.pressure;  
//temp_min
            var temp_min = response.main.temp_min;  
//temp_max
            var temp_max = response.main.temp_max;  
//wind speed
            var speed = response.wind.speed; 
//wind direction
            var direction = response.wind.deg;  
//clouds
            var clouds = response.clouds.all; 
//Icone
            var icon = response.weather[0].icon;
            var src = "http://openweathermap.org/img/w/" + icon + ".png";

            
            document.getElementById("meteo").innerHTML = temperature;
            document.getElementById("humidity").innerHTML = humidity;
            document.getElementById("pressure").innerHTML = pressure;
            document.getElementById("temp_min").innerHTML = temp_min;
            document.getElementById("temp_max").innerHTML = temp_max;
            document.getElementById("speed").innerHTML = speed;
            document.getElementById("direction").innerHTML = direction;
            document.getElementById("clouds").innerHTML = clouds;
            document.getElementById("icon").src = src;
        }
    }
    //Envoie la requete au serveur
    xhr.open("GET", get_url(), true)
    xhr.send()
}

//Fonction qui va chercher la meteo à l'instant clic
function getMeteoinstant() {
    city = document.getElementById("ville").value;

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            document.getElementById("url").innerHTML = get_url();


           if(document.getElementById("url_visibility").checked){
                document.getElementById("url").style.display = "block";
            }
            else{
                document.getElementById("url").style.display = "none";
            }

            var response = JSON.parse(this.responseText);
            var temperature = response.main.temp;
            var humidity = response.main.humidity
            var pressure = response.main.pressure
            var temp_min = response.main.temp_min
            var temp_max = response.main.temp_max
            var speed = response.wind.speed
            var direction = response.wind.deg
            var clouds = response.clouds.all
                        
            var icon = response.weather[0].icon;
            var src = "http://openweathermap.org/img/w/" + icon + ".png";

            document.getElementById("meteo").innerHTML = temperature;
            document.getElementById("humidity").innerHTML = humidity;
            document.getElementById("pressure").innerHTML = pressure;
            document.getElementById("temp_min").innerHTML = temp_min;
            document.getElementById("temp_max").innerHTML = temp_max;
            document.getElementById("speed").innerHTML = speed;
            document.getElementById("direction").innerHTML = direction;
            document.getElementById("clouds").innerHTML = clouds;
            
            document.getElementById("icon").src = src;
        }
    }
    xhr.open("GET", get_url(), true)
    xhr.send()
}
