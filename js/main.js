var dUrl="https://api.github.com/repos/idomingos/IsabelGimenez/contents/dossier/";
var bUrl = window.location;
//var bUrl = "http://isa.eucatra.com/";
var dossier = new Array();
var msnry;
var first=0;

var browseDetection = function () {

 //Check if browser is IE
 if (navigator.userAgent.search("MSIE") >= 0) {
        return '/jpg/';
 }
 //Check if browser is Chrome
 else if (navigator.userAgent.search("Chrome") >= 0) {
        return '/webp/';
 }
 //Check if browser is Firefox 
 else if (navigator.userAgent.search("Firefox") >= 0) {
        return '/jpg/';
 }
 //Check if browser is Safari
 else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
        return '/jpg/';
 }
 //Check if browser is Opera
 else if (navigator.userAgent.search("Opera") >= 0) {
        return '/webp/';
 }
 }

var removeChilds = function(element){
  while(element.hasChildNodes()){
    element.removeChild(element.firstChild);
  }
};

var hiddenElement = function(){
  let element = document.getElementById("portada");
  element.style.display = "none";
}

var portada = function(){
  let element = document.getElementById("portada");
  element.style.display = "flex";
  let grid = document.querySelector('.grid');
  removeChilds(grid);

}


var addEvent = function(element, event, selector, func) {    
    element.addEventListener(event, function(e){
        var that = this;
        var helper = function (el) {
            if (el !== that) {
                if (el.classList.contains(selector)) {
                    return el;
                }
                return helper(el.parentNode);
            }
            return false;
        }
        var el = helper(e.target);
        if (el !== false) {
            func.call(this, e);
        }
    });
};
var getPos = function(name){
  let pos=0;
  dossier.forEach(function(element,i){
    if(element.name == name)  pos= i;
  });
  return pos;
};

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
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
      element.classList.add('nav-link');
      element.classList.add('bg-dark');
      let name = e.name;
      element.innerHTML = name.toUpperCase().charAt(0)+name.substring(1,name.length);
      element.setAttribute("id", name);
      element.setAttribute("href",'#dossier');
      element.addEventListener("click", hiddenElement);
      element.onclick = pintarImatges;
      menu.appendChild(element);      
    });
  }
};

var pintarImatges = function(e){
   e.preventDefault();
  let grid = document.querySelector('.grid');
//effect-3
  grid.className= '';
  grid.classList.add('grid');
  grid.classList.add("effect-"+Math.floor((Math.random() * 10) + 1));


  removeChilds(grid);
  dossier[getPos(e.target.id)].images.forEach(function(image, i){
    let element = document.createElement("li");
    element.classList.add("grid-item");
    if (i==0){
      element.setAttribute("id", "gran");
    }
    element.appendChild(image);
    grid.insertBefore(element, grid.firstChild);
  });

  var anim = new AnimOnScroll( document.getElementById( 'grid' ), {
        minDuration : 0.4,
        maxDuration : 0.7,
        viewportFactor : 0.2
      } );
  if (!first){
    addEvent(grid, 'click', 'grid-item', function(e){ 
      e.preventDefault();
        target = e.target;
        if(e.target.tagName=="IMG"){
          target=e.target.parentElement;
        }
        if(target.tagName=="LI"){
          target.classList.toggle('grid-item--gran');
          if(target!=gran){
            gran.classList.remove('grid-item--gran');
          }
          // trigger layout
          gran=target;
          anim.layout();
        }
    });
    first++;
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
                      aURL = dUrl+album.name+browseDetection();
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

