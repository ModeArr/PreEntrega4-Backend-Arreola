window.addEventListener("DOMContentLoaded", injecting)
function injecting() {
    var link = document.createElement('link');
link.setAttribute("rel", "stylesheet");
link.setAttribute("type", "text/css");
link.onload = function(){ console.log('loaded'); }
link.setAttribute("href", '/css/styles.css');
document.getElementsByTagName("head")[0].appendChild(link);
}