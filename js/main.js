var dUrl="https://api.github.com/repos/idomingos/IsabelGimenez/contents/dossier/";
var bUrl = window.location;
var dossier = new Array();
var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      console.log(status);
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};
var pintarMenu = function(nom, data){
  let menu = document.getElementById(nom);
  if (menu != undefined){
    data.forEach(function(e){
      let element = document.createElement("a");
      element.classList.add('dropdown-item');
      let name = e.name;
      element.innerHTML = name.toUpperCase().charAt(0)+name.substring(1,name.length);
      menu.appendChild(element);      
    });
  }
};

window.onload = function(){
  /* Get Dossier */
  getJSON(dUrl, function(err, data) {
      if (err !== null) {
        alert('Something went wrong: ' + err);
      } 
      else {
        data.forEach(function(album,i){
                      var Album = new Object();
                      Album.name = album.name;
                      Album.images = new Array();   
                      aURL = dUrl+album.name;
                      getJSON(aURL, function(err, data){
                                      if(err !== null){
                                        alert('Something went wrong1: ' + err);
                                      }
                                      else{
                                        data.forEach(function(imatge,f){
                                          let image = new Image();
                                          image.src = bUrl+ imatge.path; 
                                          Album.images.push(image);
                                        });
                                      }
                      });
                      dossier.push(Album);
        });
        pintarMenu("Dossier", dossier);
      }
    }
  );
}

