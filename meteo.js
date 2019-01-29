/*La vie est un mystère qu'il faut vivre, et non un problème à résoudre.
*****************************Ghandi************************************
***********************************************************************
***********************************************************************
****************************Appli Meteo********************************
*******************************2019************************************
***********************************************************************
*****Cindy B **************Stéphanie R. *****************Muriel S.*****/



/* Comme on effectue 2 requêtes différentes
// on utilisera 2 objets requêtes différents pour 
// éviter une confusion des données de réponse instant T et Prévisions*/

var xhr = new XMLHttpRequest();         // Requête de la météo instant T
var xhrForecast = new XMLHttpRequest(); // requête de Forecast



// Forme générale du lien :
// http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?
// date=1527811200&opacity=0.9&fill_bound=true&appid={api_key}

var base_url = "http://api.openweathermap.org/data/2.5/weather";
var forecast_url = "http://api.openweathermap.org/data/2.5/forecast";
var city = "Metz";
var units = "metric";
var appid = "a09cbd4e9badfe13c2f50fffcf69ad1c";



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

//Conversion Unix/Temps
function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp*1000);
    var hour = a.getUTCHours();
    var min = a.getUTCMinutes();
    var sec = a.getUTCSeconds();
    var time = hour+'h'+min+'min';
    return time;
}

//Conversion Vent degrés en direction
function windConverter(deg){
    if (deg>11.25 && deg<33.75){
        return "Nord Nord Est";
    }else if (deg>33.75 && deg<56.25){
        return "Est Nord Est";
    }else if (deg>56.25 && deg<78.75){
        return "Est";
    }else if (deg>78.75 && deg<101.25){
        return "Est Sud Est";
    }else if (deg>101.25 && deg<123.75){
        return "Est Sud Est";
    }else if (deg>123.75 && deg<146.25){
        return "Sud Est";
    }else if (deg>146.25 && deg<168.75){
        return "Sud Sud Est";
    }else if (deg>168.75 && deg<191.25){
        return "Sud";
    }else if (deg>191.25 && deg<213.75){
        return "Sud Sud Ouest";
    }else if (deg>213.75 && deg<236.25){
        return "Sud Ouest";
    }else if (deg>236.25 && deg<258.75){
        return "Ouest Sud Ouest";
    }else if (deg>258.75 && deg<281.25){
        return "Ouest";
    }else if (deg>281.25 && deg<303.75){
        return "Ouest Nord Ouest";
    }else if (deg>303.75 && deg<326.25){
        return "Nord Ouest";
    }else if (deg>326.25 && deg<348.75){
        return "Nord Nord Ouest";
    }else{
        return "Nord";
    }
}

function init_page() {
    //Préparation des actions à effectuer lors de l'événement "réponse" du site OpenWP
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            document.getElementById("url").innerHTML = get_url();

            //Température
            var response = JSON.parse(this.responseText);
            var temperature = (response.main.temp);
            document.getElementById("meteo").innerHTML = temperature;

            //Latitude
            var latitude = response.coord.lat;

            //Longitude
            var longitude = response.coord.lon;

            //Humidité
            var humidity = response.main.humidity;

            //Lever et coucher de soleil

            var sun_rise = timeConverter(Number(response.sys.sunrise));
            var sun_set = timeConverter(Number(response.sys.sunset));

            //pression
            var pressure = response.main.pressure;

            //temp_min
            var temp_min = response.main.temp_min;

            //temp_max
            var temp_max = response.main.temp_max;

            //wind speed
            var speed = (3,6*(response.wind.speed)).toFixed(0);

            //wind direction
            var direction = windConverter(response.wind.deg);

            //clouds
            var clouds = response.clouds.all;

            //Icone
            var icon = response.weather[0].icon;
            var src = "http://openweathermap.org/img/w/" + icon + ".png"

            document.getElementById("icon").src = src;

            document.getElementById("meteo").innerHTML = temperature+ "°C";
            document.getElementById("latitude").innerHTML = latitude;
            document.getElementById("longitude").innerHTML = longitude;
            document.getElementById("humidity").innerHTML = humidity+ "%";
            document.getElementById("sun_rise").innerHTML = sun_rise;
            document.getElementById("sun_set").innerHTML = sun_set;
            document.getElementById("pressure").innerHTML = pressure+ "hPa";
            document.getElementById("temp_min").innerHTML = temp_min+ "°C";
            document.getElementById("temp_max").innerHTML = temp_max+ "°C";
            document.getElementById("speed").innerHTML = speed+ "km/h";
            document.getElementById("direction").innerHTML = direction;
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
            var latitude = response.coord.lat;
            var longitude = response.coord.lon;
            var humidity = response.main.humidity

            //Ephéméride;
            var sun_rise = timeConverter(Number(response.sys.sunrise));
            var sun_set = timeConverter(Number(response.sys.sunset));


            var pressure = response.main.pressure;
            var temp_min = response.main.temp_min;
            var temp_max = response.main.temp_max;
            var speed = (3,6*(response.wind.speed)).toFixed(0);
            var direction = windConverter(response.wind.deg);

            var icon = response.weather[0].icon;
            var src = "http://openweathermap.org/img/w/" + icon + ".png";

            document.getElementById("meteo").innerHTML = temperature+ "°C";
            document.getElementById("latitude").innerHTML = latitude;
            document.getElementById("longitude").innerHTML = longitude;
            document.getElementById("humidity").innerHTML = humidity+ "%";
            document.getElementById("sun_rise").innerHTML = sun_rise;
            document.getElementById("sun_set").innerHTML = sun_set;
            document.getElementById("pressure").innerHTML = pressure+ "hPa";
            document.getElementById("temp_min").innerHTML = temp_min+ "°C";
            document.getElementById("temp_max").innerHTML = temp_max+ "°C";
            document.getElementById("speed").innerHTML = speed+ "km/h";
            document.getElementById("direction").innerHTML = direction;
            document.getElementById("meteo").innerHTML = "La température est de "+temperature.toFixed(1)+ "°C";
            document.getElementById("icon").src = src;
        }
    }
    xhr.open("GET", get_url(), true)
    xhr.send()
}

//Fonction qui va chercher la météo à 5 jours
function getPrevision() {
    city = document.getElementById("ville").value;

    xhrForecast.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            document.getElementById("urlForecast").innerHTML = getforecasturl();


            if(document.getElementById("url_visibility").checked){
                document.getElementById("url").style.display = "block";
            }
            else{
                document.getElementById("url").style.display = "none";
            }

            var response = JSON.parse(this.responseText);

            //Création de tableau en JS. Si on veut ajouter d'autres paramètres
            //le programme crée d'autres lignes et le css est appliqué directement

            //Boucle affichage température min 5 jours : stockage dans une ligne du tableau
            var table0 = document.getElementById("tableau");
            var row0 = table0.insertRow(0);

            for (i = 0 ; i < 40; i=i+8 ){
                var cell = row0.insertCell(0)
                cell.innerHTML = ((response.list[i].main.temp_min).toFixed(1));
            }

            //Boucle affichage température 5 jours
            var table1 = document.getElementById("tableau");
            var row1 = table1.insertRow(1);

            for (j = 3 ; j < 40; j=j+8 ){
                var cell = row1.insertCell(0)
                cell.innerHTML = ((response.list[j].main.temp_max).toFixed(1));
            }

            //Boucle affichage icone 5 jours
            var table2 = document.getElementById("tableau");
            var row2 = table2.insertRow(2);

            for (k = 0 ; k < 40; k=k+8){
                icon = response.list[k].weather[0].icon;
                src = "http://openweathermap.org/img/w/" + icon + ".png";
                var cell = row2.insertCell(0);
                cell.innerHTML = "<img src ='" + src +"'>";
            }
        }
    }

    xhrForecast.open("GET", getforecasturl(), true)
    xhrForecast.send();
}

//Fonction qui appelle les deux fonctions meteo au clic et vide le tableau à chaque requête
function meteoComplete() {
    document.getElementById("tableau").innerHTML= "";
    getMeteoinstant();
    getPrevision();
}
