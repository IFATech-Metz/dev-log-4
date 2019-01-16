var xhr = new XMLHttpRequest();

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
    
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
    
                document.getElementById("urlForecast").innerHTML = getforecasturl();
    
    
               if(document.getElementById("url_visibility").checked){
                    document.getElementById("url").style.display = "block";
                }
                else{
                    document.getElementById("url").style.display = "none";
                }
    
                var response = JSON.parse(this.responseText);


                //Boucle affichage prévisions 5 jours : stockage dans un tableau
                var i = 0;
                var previsionTemperature = [];
                for (i = 0 ; i<=5; i++ ){
                    previsionTemperature [i] = response.list[i].main.temp;
                }
                //Affichage du tableau dans une string

                document.getElementById("previsionmeteo").innerHTML = previsionTemperature.toString();

            }
        }

        xhr.open("GET", getforecasturl(), true)
        xhr.send()
    }
    
    //Fonction qui appelle les deux fonctions meteo au clic
    function meteoComplete() {
        getMeteoinstant();
        getPrevision();
    }
    

    