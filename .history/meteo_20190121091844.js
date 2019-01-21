var xhr = new XMLHttpRequest();

// Forme générale du lien :
// http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?
// date=1527811200&opacity=0.9&fill_bound=true&appid={api_key}

var base_url = "http://api.openweathermap.org/data/2.5/weather";
var city = "Metz";
var units = "metric";
var appid = "f5e810531af1756846022c6f387acf25";

function get_url() {
    return base_url + "?"
        + "q=" + city + "&"
        + "units=" + units + "&"
        + "appid=" + appid;
        
}

function init_page() {
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        
            document.getElementById("url").innerHTML = get_url();
//Temperature
            var response = JSON.parse(this.responseText);
            var temperature = response.main.temp;
//precipitation
            var precitationvalue = response.precitation.value;
            var precitationmode = response.precitation.mode;
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
  
            document.getElementById("rainprecitationvalue").innerHTML = precitationvalue;
            document.getElementById("precitationmode").innerHTML = precitationmode;
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
function get_temperature() {
    city = document.getElementById("ville").value;

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //TODO
            document.getElementById("url").innerHTML = get_url();

            if(document.getElementById("url_visibility").checked){
                document.getElementById("url").style.display = "block";
            }
            else{
                document.getElementById("url").style.display = "none";
            }

            var response = JSON.parse(this.responseText);
            var temperature = response.main.temp;
          
            var precitationvalue = response.precitation.value;
            var rprecitationmode = response.precitation.mode;
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
           
            document.getElementById("precitationvalue").innerHTML = precitationvalue;
            document.getElementById("precitationmode").innerHTML = precitationmode;
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
