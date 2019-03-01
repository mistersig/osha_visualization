function initialization() {
var mymap = L.map('mapid').setView([40.456880, -99.177321], 4); //38.724066, -99.262098 //
  
// default OSM map for now
var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);



// console.log(response);





} //end of initialization


$(document).ready(initialization);