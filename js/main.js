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

window.onload = function(){

getJSON('https://api.github.com/repos/etler/recipes/contents/',
function(err, data) {
  if (err !== null) {
    alert('Something went wrong: ' + err);
  } else {
    var img = data[0];
    console.clear()
    console.info('Your query count: ', img, data);
    console.log(img);
  }
});
}

