function initialization() {

	// get model data from script in index.html
console.log(response);
console.log(response1);
console.log(response2);

const mymap = L.map('mapid').setView([27.815604, -16.603890], 2); //38.724066, -99.262098 //
  
// default OSM map for now
var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

var baseMaps = {
	"Streets": OpenStreetMap_Mapnik
}; 



var markers = L.markerClusterGroup();


// Layer for Fatalities 
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
// return layer
return markers.addLayer(layer).addTo(mymap);
} 
}) //end of layer1

// severe injury
var layer1 = L.geoJSON(response1, {pointToLayer: function (feature, latlng) {
  var geojsonMarkerOptions = {
  radius: 7,
  fillColor: "#330066",
  color: "#000", //purple
  weight: 1,
  opacity: 1,
  fillOpacity: .5
};
var popUpContent = "<p><b>Employer: <b>" + feature.properties["employer"] + "</p>";
popUpContent += "<p><b>" + "City: " + feature.properties["city"]  + "</p>";
popUpContent += "<p><b>" + "Date of Incident: " + feature.properties["event_date"]  + "</p>";
popUpContent += "<p><b>" + "Industry: " + feature.properties["industry"]  + "</p>";
popUpContent += "<p><b>" + "Description: " + feature.properties["final_description"]  + "</p>";



layer1 = L.circleMarker(latlng,geojsonMarkerOptions);

layer1.bindPopup(popUpContent,{offset: new L.point(0,0), maxWidth: 560
});
    layer1.on({
mouseover: function(){
    this.openPopup();
},
mouseout: function(){
    this.closePopup();
},
click: function(){
    layer1.on(popUpContent);
}
});

// return layer.addTo(mymap);
// return layer
return markers.addLayer(layer1).addTo(mymap);
} 
}) //end of layer3









var layer2 = L.geoJSON(response2, {pointToLayer: function (feature, latlng) {
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

layer2 = L.circleMarker(latlng,geojsonMarkerOptions);

layer2.bindPopup(popUpContent,{offset: new L.point(0,0), maxWidth: 560
});
    layer2.on({
mouseover: function(){
    this.openPopup();
},
mouseout: function(){
    this.closePopup();
},
click: function(){
    layer2.on(popUpContent);
}
});

// return layer.addTo(mymap);
// return layer
return markers.addLayer(layer2).addTo(mymap);
} 
}) //end of layer1


var layer3 = L.geoJSON(response3, {pointToLayer: function (feature, latlng) {
  var geojsonMarkerOptions = {
  radius: 7,
  fillColor: "#330066",
  color: "#000", //purple
  weight: 1,
  opacity: 1,
  fillOpacity: .5
};
var popUpContent = "<p><b>Employer: <b>" + feature.properties["employer"] + "</p>";


layer3 = L.circleMarker(latlng,geojsonMarkerOptions);

layer3.bindPopup(popUpContent,{offset: new L.point(0,0), maxWidth: 560
});
    layer3.on({
mouseover: function(){
    this.openPopup();
},
mouseout: function(){
    this.closePopup();
},
click: function(){
    layer3.on(popUpContent);
}
});

// return layer.addTo(mymap);
// return layer
return markers.addLayer(layer3).addTo(mymap);
} 
}) //end of layer3









// console.log(layer)

// loading GeoJSON file - Here my html and usa_adm.geojson file resides in same folder
// $.getJSON("usa_adm.geojson",function(data){
// // L.geoJson function is used to parse geojson file and load on to map
// L.geoJson(data).addTo(newMap);
// });

















// var polygon = L.polygon(response1)

// var polygon = L.polygon(response1, {color: 'red'});

// polygon.addTo(mymap);



// Creating poly line options
// var multiPolyLineOptions = {color:'red'};

// // Creating multi poly-lines
// var multipolyline = L.multiPolyline(latlang , multiPolyLineOptions);

// Adding multi poly-line to map
// multipolyline.addTo(map);













var groupedOverlays = {
	"Fatalities FY 16-17": layer,
  "Severe Inuries": layer1,
	"Accident Inpsections": layer2,
  "Complaint Inpsections": layer3

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

//delayed scrolling between page sections
function smoothScroll(){
  // Add smooth scrolling to all links
  $(".js-scroll").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 700, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    }
  });
}; // end of smoothScroll

function scrollify(){
    $.scrollify({
        section : "#home,#maparea,#dataarea,#aboutarea",
        easing: "easeOutExpo",
        scrollSpeed: 700,
        offset : 0,
        scrollbars: true,
        standardScrollElements: "",
        setHeights: true,
        overflowScroll: true,
        updateHash: false,
        touchScroll:true,
        before:function() {},
        after:function() {},
        afterResize:function() {},
        afterRender:function() {}
    });
};




$(document).ready(initialization);
// $(document).ready(smoothScroll);
// $(document).ready(scrollify);




















// //ZB Installations throughout US
// //Alan Ross Machinery 
// function createMap(){
// var mymap = L.map('mapid').setView([29.505, -80.09], 4); //35.421263, -97.326722 //ohhh OKLAHOMA!

// // var Stamen_TonerLite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
// //  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
// //  subdomains: 'abcd',
// //  minZoom: 0,
// //  maxZoom: 7,
// //  ext: 'png'
// // }).addTo(mymap);

// // var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
// //  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
// //  subdomains: 'abcd',
// //  minZoom: 0,
// //  maxZoom: 7,
// //  ext: 'png'
// // }).addTo(mymap);


// var Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
//   attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
//     minZoom: 0,
//   maxZoom: 7,
// }).addTo(mymap);


// getData(mymap)
// };//end of create map function 
// function getData(mymap){
//   // load the data
//   $.ajax("data/magnaInstall.json",{
//     dataType:"json",
//     success: function(response){
//       //console.log(response)
//       createVideoPopUps(response,mymap);
//     } //end of success 
//   });
// };//end of getData

// function createVideoPopUps(response,mymap){
//   // console.log(response);
//   // var popUpContent = "<p><b>City: <b>" +response.features.properties["City"]+ "</p>";
//   //console.log(popUpContent);
//   // cluster for later
//   var markers = L.markerClusterGroup();
  
//   var geojsonMarkerOptions = {
//     radius: 15,
//     fillColor: "#fffa0a",
//     color: "#000cff",
//     weight: 1,
//     opacity: 1,
//     fillOpacity: .8
//   };
//   var layer = L.geoJSON(response, {pointToLayer: function (feature, latlng) {
//     var popUpContent = feature.properties["notes"];
//     console.log(feature);
//     popUpContent += feature.properties["mapUrl"];
//     // popUpContent += feature.properties["sText"];
//     layer = L.circleMarker(latlng,geojsonMarkerOptions);
//     layer.bindPopup(popUpContent,{offset: new L.point(0,0), maxWidth: 560, autoPan:true
//     });
//         layer.on({
//     mouseover: function(){
//         this.openPopup();
//     },
//     // mouseout: function(){
//     //     this.closePopup();
//     // },
//     click: function(){
//         layer.on(popUpContent);
//     }
//     });
//     // return L.circleMarker(latlng, geojsonMarkerOptions).addTo(mymap);
//     // return layer.addTo(mymap);
//     return markers.addLayer(layer).addTo(mymap);
//   }
//   })
// };//end createVideoPopUps
// $(document).ready(createMap);