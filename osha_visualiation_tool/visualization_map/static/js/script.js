function initialization() {

	// get model data from script in index.html
console.log(response);
// console.log(response1);
// console.log(response2);

const mymap = L.map('mapid').setView([40.456880, -99.177321], 4); //38.724066, -99.262098 //
  
// default OSM map for now
var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

var baseMaps = {
	"Streets": OpenStreetMap_Mapnik
}; 



// Layer for Injury
var layer = L.geoJSON(response, {pointToLayer: function (feature, latlng) {
  var geojsonMarkerOptions = {
  radius: 7,
  fillColor: "#330066",
  color: "#000", //purple
  weight: 1,
  opacity: 1,
  fillOpacity: .5
};
var popUpContent = feature.properties["employer"];
// console.log(feature);
// popUpContent += feature.properties["artist_name"];

layer = L.circleMarker(latlng,geojsonMarkerOptions);
layer.bindPopup(popUpContent,{offset: new L.point(0,0), maxWidth: 560
});
    layer.on({
mouseover: function(){
    this.openPopup();
},
mouseout: function(){
    this.closePopup();
},
click: function(){
    layer.on(popUpContent);
}
});

// return layer.addTo(mymap);
return layer
} 
}) //end of layer1

// console.log(layer)

// loading GeoJSON file - Here my html and usa_adm.geojson file resides in same folder
$.getJSON("usa_adm.geojson",function(data){
// L.geoJson function is used to parse geojson file and load on to map
L.geoJson(data).addTo(newMap);
});

















// var polygon = L.polygon(response1)

var polygon = L.polygon(response1, {color: 'red'});

polygon.addTo(mymap);



// Creating poly line options
// var multiPolyLineOptions = {color:'red'};

// // Creating multi poly-lines
// var multipolyline = L.multiPolyline(latlang , multiPolyLineOptions);

// Adding multi poly-line to map
// multipolyline.addTo(map);













var groupedOverlays = {
	"Injuries States": layer,
	"Fatalities": polygon

};


console.log(groupedOverlays);

// var rachael = L.featureGroup([layer,layer2,layer3,layer4,layer5]);

// console.log(rachael);



L.control.layers(baseMaps,groupedOverlays).addTo(mymap);


//rent map 
// USE THIS for pop-ups
function createPopup(properties,attribute,layer,radius){
	//add city to popup content string
	var popupContent = "<p><b>City: <b>" + properties["City"] + "</p>";
	var month = attribute.split("_")[0];
	//var year = attribute.split("_")[1];
	popupContent += "<p><b>" +"Month: " + month +"</p>" ;
	popupContent += "<p><b>" + "Median Rent: " +"$"+ properties[attribute] + "</p>";
	//replace the layer popup 
	layer.bindPopup(popupContent, {
		offset: new L.Point(0,-radius)
	});
}










// geoJ = GeoJSON object returned/parsed from ajax call
// polCollection = L.polygon( geoJ )
// polCollection.eachLayer( function(pol) {
//     bounds = pol.getBounds()
// })





} //end of initialization


$(document).ready(initialization);