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
//Latitude et longitude
            var latitude = response.coord.lat;
            var longitude = response.coord.lon;
//Humidité  
           var humidity = response.main.humidity;
//levé et couché de soleil
            // Create a new JavaScript Date object based on the timestamp
            // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var dateL = new Date(response.sys.sunrise*1000);
        // Hours part from the timestamp
        var hoursL = dateL.getHours();
        // Minutes part from the timestamp
        var minutesL = "0" + dateL.getMinutes();
        // Seconds part from the timestamp
        var secondsL = "0" + dateL.getSeconds();

        // Will display time in 10:30:23 format
        var formattedTimeL = hoursL + ':' + minutesL.substr(-2) + ':' + secondsL.substr(-2);
            var sun_rise = formattedTimeL;
            var sun_set = response.sys.sunset;
// condition météo
            var weather_value = response.weather[0].main
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
            document.getElementById("latitude").innerHTML = latitude;
            document.getElementById("longitude").innerHTML = longitude;
            document.getElementById("humidity").innerHTML = humidity;
            document.getElementById("sun_rise").innerHTML = sun_rise;
            document.getElementById("sun_set").innerHTML = sun_set;
            document.getElementById("weather_value").innerHTML = weather_value;
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
            var latitude = response.coord.lat;
            var longitude = response.coord.lon;
            var humidity = response.main.humidity;
            var dateL = new Date(response.sys.sunrise*1000);
            // Hours part from the timestamp
            var hoursL = dateL.getHours();
            // Minutes part from the timestamp
            var minutesL = "0" + dateL.getMinutes();
            // Seconds part from the timestamp
            var secondsL = "0" + dateL.getSeconds();

            // Will display time in 10:30:23 format
            var formattedTimeL = hoursL + ':' + minutesL.substr(-2) + ':' + secondsL.substr(-2);
            var sun_rise = formattedTimeL;

           var dateC = new Date(response.sys.sunset*1000);
            // Hours part from the timestamp
            var hoursC = dateC.getHours();
            // Minutes part from the timestamp
            var minutesC = "0" + dateC.getMinutes();
            // Seconds part from the timestamp
            var secondsC = "0" + dateC.getSeconds();

            // Will display time in 10:30:23 format
            var formattedTimeC = hoursC + ':' + minutesC.substr(-2) + ':' + secondsC.substr(-2);
            var sun_set = formattedTimeC;
            var weather_value = response.weather[0].main;
            var pressure = response.main.pressure;
            var temp_min = response.main.temp_min;
            var temp_max = response.main.temp_max;
            var speed = response.wind.speed;
            var direction = response.wind.deg;
            var clouds = response.clouds.all;
              
            var icon = response.weather[0].icon;
            var src = "http://openweathermap.org/img/w/" + icon + ".png";

            document.getElementById("meteo").innerHTML = temperature;
            document.getElementById("latitude").innerHTML = latitude;
            document.getElementById("longitude").innerHTML = longitude;
            document.getElementById("humidity").innerHTML = humidity;
            document.getElementById("sun_rise").innerHTML = sun_rise;
            document.getElementById("sun_set").innerHTML = sun_set;
            document.getElementById("weather_value").innerHTML = weather_value;
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