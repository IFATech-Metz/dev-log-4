
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
            var temperature = response.main.temp
            document.getElementById("meteo").innerHTML = temperature;
            
            //Icone
            var icon = response.weather[0].icon;
            var src = "http://openweathermap.org/img/w/" + icon + ".png";
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

            var icon = response.weather[0].icon;
            var src = "http://openweathermap.org/img/w/" + icon + ".png";

            document.getElementById("meteo").innerHTML = "La temp&eacute;rature est de " +temperature+ "&deg;C &agrave; "+city;
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


                //Boucle affichage température min 5 jours : stockage dans un tableau
                var table = document.getElementById("myTable");
                var row = table.insertRow(0);
                var i = 0;
                var previsionTemperature = [];
                for (i = 0 ; i<5; i++ ){
                    previsionTemperature [i] = response.list[i].main.temp_min;
                    //var i = row.insertCell(i);
                   // cell1.innerHTML = "???";


                }
                //previsionTemperature = document.getElementById("table").insertRow(i);


                //Affichage du tableau dans une string
                document.getElementById("previsionmeteo").innerHTML = previsionTemperature.toString();
               
                //Boucle affichage température max 5 jours : stockage dans un tableau
                //var table = document.getElementById("myTable");
                //var row = table.insertRow(1);
                var j = 0;
                var previsionTemperature2 = [];
                for (j = 0 ; j<5; j++ ){
                    previsionTemperature2 [j] = response.list[j].main.temp_max;
                }
                //Affichage du tableau dans une string
                document.getElementById("previsionmeteo2").innerHTML = previsionTemperature2.toString();

                //Boucle affichage température max 5 jours : stockage dans un tableau
                //var table = document.getElementById("myTable");
                //var row = table.insertRow(2);
                var k = 0;
                var previsionTemperature3 = [];
                for (k = 0 ; k<5; k++ ){
                    previsionTemperature3 [k] = response.weather[k].icon;
                }
                 //Affichage du tableau dans une string
                 document.getElementById("iconeprevision").innerHTML = previsionTemperature3.toString();
                 document.getElementById("icon").src = src;
            }
        }

        xhrForecast.open("GET", getforecasturl(), true)
        xhrForecast.send();
    }
    
    //Fonction qui appelle les deux fonctions meteo au clic
    function meteoComplete() {
        getMeteoinstant();
        getPrevision();
    }
