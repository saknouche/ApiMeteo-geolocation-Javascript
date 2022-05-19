
    //L'url
    let villeChoisie;
    // recevoirTemperature(villeChoisie); //pour afficher une ville lors du premier chargement

    //vérifier si la géolocalisation est disponible pour le navigateur
    if('geolocation' in navigator){
        navigator.geolocation.watchPosition((position) => {
            const url = 'https://api.openweathermap.org/data/2.5/weather?lon=' + position.coords.longitude + 
            '&lat=' + position.coords.latitude +  '&appid=343eefe15b88526c4adccb53bd932794&units=metric';
            // console.log(url);
            let requete = new XMLHttpRequest();

            requete.responseType = 'json';
            requete.open('GET', url, true);
            requete.send();

            requete.onload = function(){
                if(this.readyState === XMLHttpRequest.DONE){
                    if(this.status === 200){
                        
                        let reponse = requete.response;
                        let temperature = reponse.main.temp;
                        let ville = reponse.name;
                        document.querySelector('#temperature_label').textContent = temperature;
                        document.querySelector('#ville').textContent = ville;
                    }else{
                        alert("Un problème est survenu, veuillez vous reconnecter ultérieurement.");
                    }
                }
             }
        }, error, options);
        
    }else{
        villeChoisie = 'Paris';
        recevoirTemperature(villeChoisie);
    }
    var options = {
        enableHighAccuracy : true,
    }
    let changerDeVille = document.querySelector('#changer');
    changerDeVille.addEventListener('click', function() {
        villeChoisie = prompt("Quelle ville souhaitez-vous voir?");
        recevoirTemperature(villeChoisie);
    });

    function error(){
        villeChoisie = 'Paris';
        recevoirTemperature(villeChoisie); 
    }
    //Fonction recevoirTemperature()
    function recevoirTemperature(ville){
        const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=343eefe15b88526c4adccb53bd932794&units=metric';

        let requete = new XMLHttpRequest();

        requete.responseType = 'json';
        requete.open('GET', url, true);
        requete.send();

        requete.onload = function(){
            if(this.readyState === XMLHttpRequest.DONE){
                if(this.status === 200){
                    
                    let reponse = requete.response;
                    let temperature = reponse.main.temp;
                    let ville = reponse.name;
                    document.querySelector('#temperature_label').textContent = temperature;
                    document.querySelector('#ville').textContent = ville;
                }else{
                    alert("Un problème est survenu, veuillez vous reconnecter ultérieurement.");
                }
            }
        }
    }
    




