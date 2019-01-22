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

                //Création de tableau en JS. Si on veut ajouter d'autres paramètres
                //le programme crée d'autres lignes et le css est appliqué directement

                //Boucle affichage température min 5 jours : stockage dans une ligne du tableau
                var table0 = document.getElementById("tableau");
                var row0 = table0.insertRow(0);

                for (i = 0 ; i<40; i+8 ){
                    var cell = row0.insertCell(0)
                    cell.innerHTML = response.list[i].main.temp_min
                }
               
                //Boucle affichage température max 5 jours 
                var table1 = document.getElementById("tableau");
                var row1 = table1.insertRow(1);
             
                for (j = 0 ; j<40; j+8 ){
                    var cell = row1.insertCell(0)
                    cell.innerHTML = response.list[j].main.temp_max
                }
               
                //Boucle affichage icone 5 jours 
                var table2 = document.getElementById("tableau");
                var row2 = table2.insertRow(2);

                for (k = 0 ; k<40; k+8 ){
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
    
    //Fonction qui appelle les deux fonctions meteo au clic
    function meteoComplete() {
        getMeteoinstant();
        getPrevision();
    }
