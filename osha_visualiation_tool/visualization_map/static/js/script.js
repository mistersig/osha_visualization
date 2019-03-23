// global variable never change use const


// initial function that starts the map and displays it 
function initialization() {
  const mymap = L.map('mapid').setView([27.815604, -16.603890], 2); //38.724066, -99.262098 //
  // get model data from script in index
  // the Django way
  getData(mymap);

}; //end of initialization



$(document).ready(initialization);


////// THE START OF BUILDING THE FUNCTIONALITY OF THE MAP 


// get data and build map
function getData(mymap){
  // baselayer
  var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mymap);

  const baseMaps = {
    "Basemap": OpenStreetMap_Mapnik
  }; 

  console.log(fatalities);

  // Layer for Fatalities -- polygons data
  // var fatalitiesLayer = L.geoJSON(fatalities, {pointToLayer: function (feature, latlng) {}});

  var fatalitiesLayer = L.geoJson(fatalities, {
    style: style,
    onEachFeature: onEachFeature
  });

  // fatalities

  // use this
  // feature.properties.xxxxx
  // example
  // feature.properties.density
  // my use
  // feature.properties.fatalities


  function getColor(d) {
      return d > 70 ? '#800026' :
             d > 60  ? '#BD0026' :
             d > 50  ? '#E31A1C' :
             d > 40  ? '#FC4E2A' :
             d > 30   ? '#FD8D3C' :
             d > 20   ? '#FEB24C' :
             d > 10   ? '#FED976' :
                        '#FFEDA0';
  }

  function style(feature) {
      return {
          fillColor: getColor(feature.properties.fatalities),
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7
      };
  }

// L.geoJson(statesData, {style: style}).addTo(map);


// function style(feature) {
//     return {
//         fillColor: getColor(feature.properties.fatalities),
//         weight: 2,
//         opacity: 1,
//         color: 'white',
//         dashArray: '3',
//         fillOpacity: 0.7
//     };
// }


// control that shows state info on hover
  var info = L.control({position: 'topright'});

  info.onAdd = function(map) {
    this._div = L.DomUtil.create("div", "info");
    this.update();
    return this._div;
  };

  baseHtml = '<p class="hidden-xs"><i class="fa fa-fw fa-mouse-pointer"></i>Select a layer<br/>to see its data</p>';

  info.update = function(props) {
    var text = baseHtml;
    if (props) {
      text = '';
      if (props.name) {
        text += '<h4>' + props.fatalities + '</h4>';
      }
    }
    this._div.innerHTML = text;
  };
  
  info.clear = function() {
    this._div.innerHTML = baseHtml;
  };

  info.addTo(mymap);

  // MAP highlight
  function highlightFeature(e) {
      var layer = e.target;
      layer.setStyle({
        weight: 5,
        color: "#666",
        dashArray: "",
        fillOpacity: 0.7
      });
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
      info.update(layer.feature.properties);
    }
    // end of highlightFeature



function resetHighlight(e) {
  var layer = e.target;

        layer.setStyle({
        "weight": 0,
        "opacity": 0.5,
        "color": '#3a3a3a'
        });
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
        info.clear();
        // info.update(layer.feature.properties);
    };

    function zoomToFeature(e) {
      mymap.fitBounds(e.target.getBounds());
    }
    // end on zoomToFeature
    function onEachFeature(feature, layer) {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
      });
    }
    // end of onEahcFeature



//Layer for severe injuries -- points data 
var severeInjuryLayer = L.geoJSON(severe_injury, {pointToLayer: function (feature, latlng) {
  var bubbles = popUpBubbles(feature,latlng,mymap);
  // console.log(bubbles);
  return bubbles;
}
});

// console.log(severeInjuryLayer)


//Layer for Inspection Data -- polygon data
var accidentLayer = L.geoJSON(accident_data, {pointToLayer: function (feature, latlng) {}});
var complaintLayer = L.geoJSON(complaint_data, {pointToLayer: function (feature, latlng) {}});
var fatCatLayer = L.geoJSON(fat_cat_data, {pointToLayer: function (feature, latlng) {}});
var followUpLayer = L.geoJSON(follow_up_data, {pointToLayer: function (feature, latlng) {}});
var monitoringLayer = L.geoJSON(monitoring_data, {pointToLayer: function (feature, latlng) {}});
var varianceLayer = L.geoJSON(variance_data, {pointToLayer: function (feature, latlng) {}});
var referralsLayer = L.geoJSON(referrals_data, {pointToLayer: function (feature, latlng) {}});
var plannedLayer = L.geoJSON(planned_data, {pointToLayer: function (feature, latlng) {}});


// Map layers for SIDEBARS
const fatalMaps = {
  "Reported Fatalities ": fatalitiesLayer
};

const severeMaps = {
  "Severe Injuries ": severeInjuryLayer
};

const inspectionsMaps = {
  "Accidents Inspected": accidentLayer,
  "Complaints Inspected": complaintLayer,
  "Fatalities & Catastrophes Inspected": fatCatLayer,
  "Follow Up Inpections ": followUpLayer,
  "Monitoring Inspections ": monitoringLayer,
  "Variances Inspected ": varianceLayer,
  "Referrals Inspected ": referralsLayer,
  "Planned Inspections ": plannedLayer
};


// Hi
// $('.leaflet-top.leaflet-right').hide();

//calls function to add layer controls to menu 
putControlsInMenu(baseMaps, fatalMaps, 'collapseTwo1',mymap);
putControlsInMenu(baseMaps, severeMaps, 'collapseTwo21',mymap);
putControlsInMenu(baseMaps, inspectionsMaps, 'collapseThree31',mymap);


}; // end of getData


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////// MENU IN SIDE BAR /////////
// Puts the control in the sidebar and out of Leaflet
function putControlsInMenu(baseMaps, maptheme, menu,map){
  var layerControl = L.control.layers(null, maptheme,{
    collapsed: false
  });
  layerControl.addTo(map);
  layerControl._container.remove();
  document.getElementById(menu).appendChild(layerControl.onAdd(map));
};




function popUpBubbles(feature,latlng,map){
    var geojsonMarkerOptions = {
      radius: 10,
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

    manipluateLayer = L.circleMarker(latlng,geojsonMarkerOptions);
    var markers = L.markerClusterGroup();

    // manipluateLayer
    manipluateLayer.bindPopup(popUpContent,{offset: new L.point(0,0), maxWidth: 560});
    manipluateLayer.on({
      mouseover: function(){
        this.openPopup();
      },
      mouseout: function(){
        this.closePopup();
      },
      click: function(){
        manipluateLayer.on(popUpContent);
      }
    });
    // return manipluateLayer;
    // return markers.addLayer(manipluateLayer).addTo(map);
    // needs help
    // return map.addLayer(manipluateLayer);
    return markers.addLayer(manipluateLayer);

    // map.addLayer(manipluateLayer)
    

};





choropleth = L.choropleth(cData.toGeoJSON(), {
  filter: function(feature) {
    if (feature.properties.state == 39) {
      return true
    }
    // end of filter function 
  },
  

  valueProperty: "POP_SQMI", // which property in the features to use
  scale: ["white", "#006d2c"], // chroma.js scale - include as many as you like
  steps: 7, // number of breaks or steps in range
  mode: "q", // q for quantile, e for equidistant, k for k-means
  style: {
    color: "#fff", // border color
    weight: 1,
    fillOpacity: 0.9
  },
  onEachFeature: function(feature, layer) {
    layer.bindTooltip(feature.properties.NAME + '<' + 'br' + '>' + +feature.properties.POPULATION)
  }
}).addTo(map);






  choropleth = L.choropleth(cData.toGeoJSON(), {
    filter: function(feature) {
      if (feature.properties.state == 39) {
        return true
      }
      // end of filter function 
    },
    

    valueProperty: "POP_SQMI", // which property in the features to use
    scale: ["white", "#006d2c"], // chroma.js scale - include as many as you like
    steps: 7, // number of breaks or steps in range
    mode: "q", // q for quantile, e for equidistant, k for k-means
    style: {
      color: "#fff", // border color
      weight: 1,
      fillOpacity: 0.9
    },
    onEachFeature: function(feature, layer) {
      layer.bindTooltip(feature.properties.NAME + '<' + 'br' + '>' + +feature.properties.POPULATION)
    }
  }).addTo(map);























// putControlsInMenu(baseMaps, landMaps, 'collapseTwo');
// putControlsInMenu(baseMaps, economyMaps, 'collapseThree');
// putControlsInMenu(baseMaps, transportationMaps, 'collapseFour');
// putControlsInMenu(baseMaps, populationMaps, 'collapseFive');


// // All maps into keys
// var allMaps = {};

// allcaptions.caption1802arrowsmith = ["A young nation", $("#caption-1802"), arrowsmithBounds];












// // var popUpContent = feature.properties["employer"];
// // console.log(feature);
// // popUpContent += feature.properties["artist_name"];

// // layer = L.circleMarker(latlng,geojsonMarkerOptions);

// // layer.bindPopup(popUpContent,{offset: new L.point(0,0), maxWidth: 560
// // });
// //     layer.on({
// // mouseover: function(){
// //     this.openPopup();
// // },
// // mouseout: function(){
// //     this.closePopup();
// // },
// // click: function(){
// //     layer.on(popUpContent);
// // }
// // });

// // // return layer.addTo(mymap);
// // // return layer
// // return markers.addLayer(layer).addTo(mymap);
// // } 
// // }) //end of layer



// // severe injury
// var layer1 = L.geoJSON(response1, {pointToLayer: function (feature, latlng) {
//   var geojsonMarkerOptions = {
//   radius: 7,
//   fillColor: "#330066",
//   color: "#000", //purple
//   weight: 1,
//   opacity: 1,
//   fillOpacity: .5
// };
// var popUpContent = "<p><b>Employer: <b>" + feature.properties["employer"] + "</p>";
// popUpContent += "<p><b>" + "City: " + feature.properties["city"]  + "</p>";
// popUpContent += "<p><b>" + "Date of Incident: " + feature.properties["event_date"]  + "</p>";
// popUpContent += "<p><b>" + "Industry: " + feature.properties["industry"]  + "</p>";
// popUpContent += "<p><b>" + "Description: " + feature.properties["final_description"]  + "</p>";



// layer1 = L.circleMarker(latlng,geojsonMarkerOptions);
// var markers = L.markerClusterGroup();

// layer1.bindPopup(popUpContent,{offset: new L.point(0,0), maxWidth: 560
// });
//     layer1.on({
// mouseover: function(){
//     this.openPopup();
// },
// mouseout: function(){
//     this.closePopup();
// },
// click: function(){
//     layer1.on(popUpContent);
// }
// });

// // return layer.addTo(mymap);
// // return layer
// return markers.addLayer(layer1).addTo(mymap);
// } 
// }) //end of layer3












// // var layer3 = L.geoJSON(response3, {pointToLayer: function (feature, latlng) {
// //   var geojsonMarkerOptions = {
// //   radius: 7,
// //   fillColor: "#330066",
// //   color: "#000", //purple
// //   weight: 1,
// //   opacity: 1,
// //   fillOpacity: .5
// // };
// // var popUpContent = "<p><b>Employer: <b>" + feature.properties["employer"] + "</p>";


// // layer3 = L.circleMarker(latlng,geojsonMarkerOptions);

// // layer3.bindPopup(popUpContent,{offset: new L.point(0,0), maxWidth: 560
// // });
// //     layer3.on({
// // mouseover: function(){
// //     this.openPopup();
// // },
// // mouseout: function(){
// //     this.closePopup();
// // },
// // click: function(){
// //     layer3.on(popUpContent);
// // }
// // });

// // // return layer.addTo(mymap);
// // // return layer
// // return markers.addLayer(layer3).addTo(mymap);
// // } 
// // }) //end of layer3









// // console.log(layer)

// // loading GeoJSON file - Here my html and usa_adm.geojson file resides in same folder
// // $.getJSON("usa_adm.geojson",function(data){
// // // L.geoJson function is used to parse geojson file and load on to map
// // L.geoJson(data).addTo(newMap);
// // });

















// // var polygon = L.polygon(response1)

// // var polygon = L.polygon(response1, {color: 'red'});

// // polygon.addTo(mymap);



// // Creating poly line options
// // var multiPolyLineOptions = {color:'red'};

// // // Creating multi poly-lines
// // var multipolyline = L.multiPolyline(latlang , multiPolyLineOptions);

// // Adding multi poly-line to map
// // multipolyline.addTo(map);








// function putControlsInMenu(baseMaps, maptheme, menu){
//   var layerControl = L.control.layers(baseMaps, maptheme,{
//     collapsed: false
//   });
//   layerControl.addTo(map);
//   layerControl._container.remove();
//   document.getElementById(menu).appendChild(layerControl.onAdd(map));
// }




// //hides superfluous default leaflet button 
// $('.leaflet-top.leaflet-right').hide();
// //calls function to add layer controls to menu 
// putControlsInMenu(baseMaps, overviewMaps, 'collapseOne');
// putControlsInMenu(baseMaps, landMaps, 'collapseTwo');
// putControlsInMenu(baseMaps, economyMaps, 'collapseThree');
// putControlsInMenu(baseMaps, transportationMaps, 'collapseFour');
// putControlsInMenu(baseMaps, populationMaps, 'collapseFive');




// var groupedOverlays = {
// 	"Fatalities FY 16-17": layer,
//   "Severe Inuries": layer1,
// 	"Accident Inpsections": layer2,
//   "Complaint Inpsections": layer3

// };


// console.log(groupedOverlays);

// // var rachael = L.featureGroup([layer,layer2,layer3,layer4,layer5]);

// // console.log(rachael);



// L.control.layers(baseMaps,groupedOverlays).addTo(mymap);


// //rent map 
// // USE THIS for pop-ups
// function createPopup(properties,attribute,layer,radius){
// 	//add city to popup content string
// 	var popupContent = "<p><b>City: <b>" + properties["City"] + "</p>";
// 	var month = attribute.split("_")[0];
// 	//var year = attribute.split("_")[1];
// 	popupContent += "<p><b>" +"Month: " + month +"</p>" ;
// 	popupContent += "<p><b>" + "Median Rent: " +"$"+ properties[attribute] + "</p>";
// 	//replace the layer popup 
// 	layer.bindPopup(popupContent, {
// 		offset: new L.Point(0,-radius)
// 	});
// }










// // geoJ = GeoJSON object returned/parsed from ajax call
// // polCollection = L.polygon( geoJ )
// // polCollection.eachLayer( function(pol) {
// //     bounds = pol.getBounds()
// // })




// //delayed scrolling between page sections
// function smoothScroll(){
//   // Add smooth scrolling to all links
//   $(".js-scroll").on('click', function(event) {

//     // Make sure this.hash has a value before overriding default behavior
//     if (this.hash !== "") {
//       // Prevent default anchor click behavior
//       event.preventDefault();

//       // Store hash
//       var hash = this.hash;

//       // Using jQuery's animate() method to add smooth page scroll
//       // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
//       $('html, body').animate({
//         scrollTop: $(hash).offset().top
//       }, 700, function(){
   
//         // Add hash (#) to URL when done scrolling (default click behavior)
//         window.location.hash = hash;
//       });
//     }
//   });
// }; // end of smoothScroll

// function scrollify(){
//     $.scrollify({
//         section : "#home,#maparea,#dataarea,#aboutarea",
//         easing: "easeOutExpo",
//         scrollSpeed: 700,
//         offset : 0,
//         scrollbars: true,
//         standardScrollElements: "",
//         setHeights: true,
//         overflowScroll: true,
//         updateHash: false,
//         touchScroll:true,
//         before:function() {},
//         after:function() {},
//         afterResize:function() {},
//         afterRender:function() {}
//     });
// };





// // $(document).ready(smoothScroll);
// // $(document).ready(scrollify);













// // function initialization() {

// //   // get model data from script in index.html
// // console.log(response);
// // console.log(response1);
// // console.log(response2);

// // const mymap = L.map('mapid').setView([27.815604, -16.603890], 2); //38.724066, -99.262098 //
  
// // // default OSM map for now
// // var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// //   maxZoom: 19,
// //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// // }).addTo(mymap);

// // var baseMaps = {
// //   "Streets": OpenStreetMap_Mapnik
// // }; 



// // var markers = L.markerClusterGroup();


// // // Layer for Fatalities 
// // var layer = L.geoJSON(response, {pointToLayer: function (feature, latlng) {
// //   var geojsonMarkerOptions = {
// //   radius: 7,
// //   fillColor: "#330066",
// //   color: "#000", //purple
// //   weight: 1,
// //   opacity: 1,
// //   fillOpacity: .5
// // };
// // var popUpContent = feature.properties["employer"];
// // // console.log(feature);
// // // popUpContent += feature.properties["artist_name"];

// // layer = L.circleMarker(latlng,geojsonMarkerOptions);

// // layer.bindPopup(popUpContent,{offset: new L.point(0,0), maxWidth: 560
// // });
// //     layer.on({
// // mouseover: function(){
// //     this.openPopup();
// // },
// // mouseout: function(){
// //     this.closePopup();
// // },
// // click: function(){
// //     layer.on(popUpContent);
// // }
// // });

// // // return layer.addTo(mymap);
// // // return layer
// // return markers.addLayer(layer).addTo(mymap);
// // } 
// // }) //end of layer1

// // // severe injury
// // var layer1 = L.geoJSON(response1, {pointToLayer: function (feature, latlng) {
// //   var geojsonMarkerOptions = {
// //   radius: 7,
// //   fillColor: "#330066",
// //   color: "#000", //purple
// //   weight: 1,
// //   opacity: 1,
// //   fillOpacity: .5
// // };
// // var popUpContent = "<p><b>Employer: <b>" + feature.properties["employer"] + "</p>";
// // popUpContent += "<p><b>" + "City: " + feature.properties["city"]  + "</p>";
// // popUpContent += "<p><b>" + "Date of Incident: " + feature.properties["event_date"]  + "</p>";
// // popUpContent += "<p><b>" + "Industry: " + feature.properties["industry"]  + "</p>";
// // popUpContent += "<p><b>" + "Description: " + feature.properties["final_description"]  + "</p>";



// // layer1 = L.circleMarker(latlng,geojsonMarkerOptions);

// // layer1.bindPopup(popUpContent,{offset: new L.point(0,0), maxWidth: 560
// // });
// //     layer1.on({
// // mouseover: function(){
// //     this.openPopup();
// // },
// // mouseout: function(){
// //     this.closePopup();
// // },
// // click: function(){
// //     layer1.on(popUpContent);
// // }
// // });

// // // return layer.addTo(mymap);
// // // return layer
// // return markers.addLayer(layer1).addTo(mymap);
// // } 
// // }) //end of layer3









// // var layer2 = L.geoJSON(response2, {pointToLayer: function (feature, latlng) {
// //   var geojsonMarkerOptions = {
// //   radius: 7,
// //   fillColor: "#330066",
// //   color: "#000", //purple
// //   weight: 1,
// //   opacity: 1,
// //   fillOpacity: .5
// // };
// // var popUpContent = feature.properties["employer"];
// // // console.log(feature);
// // // popUpContent += feature.properties["artist_name"];

// // layer2 = L.circleMarker(latlng,geojsonMarkerOptions);

// // layer2.bindPopup(popUpContent,{offset: new L.point(0,0), maxWidth: 560
// // });
// //     layer2.on({
// // mouseover: function(){
// //     this.openPopup();
// // },
// // mouseout: function(){
// //     this.closePopup();
// // },
// // click: function(){
// //     layer2.on(popUpContent);
// // }
// // });

// // // return layer.addTo(mymap);
// // // return layer
// // return markers.addLayer(layer2).addTo(mymap);
// // } 
// // }) //end of layer1


// // var layer3 = L.geoJSON(response3, {pointToLayer: function (feature, latlng) {
// //   var geojsonMarkerOptions = {
// //   radius: 7,
// //   fillColor: "#330066",
// //   color: "#000", //purple
// //   weight: 1,
// //   opacity: 1,
// //   fillOpacity: .5
// // };
// // var popUpContent = "<p><b>Employer: <b>" + feature.properties["employer"] + "</p>";


// // layer3 = L.circleMarker(latlng,geojsonMarkerOptions);

// // layer3.bindPopup(popUpContent,{offset: new L.point(0,0), maxWidth: 560
// // });
// //     layer3.on({
// // mouseover: function(){
// //     this.openPopup();
// // },
// // mouseout: function(){
// //     this.closePopup();
// // },
// // click: function(){
// //     layer3.on(popUpContent);
// // }
// // });

// // // return layer.addTo(mymap);
// // // return layer
// // return markers.addLayer(layer3).addTo(mymap);
// // } 
// // }) //end of layer3









// // // console.log(layer)

// // // loading GeoJSON file - Here my html and usa_adm.geojson file resides in same folder
// // // $.getJSON("usa_adm.geojson",function(data){
// // // // L.geoJson function is used to parse geojson file and load on to map
// // // L.geoJson(data).addTo(newMap);
// // // });

















// // // var polygon = L.polygon(response1)

// // // var polygon = L.polygon(response1, {color: 'red'});

// // // polygon.addTo(mymap);



// // // Creating poly line options
// // // var multiPolyLineOptions = {color:'red'};

// // // // Creating multi poly-lines
// // // var multipolyline = L.multiPolyline(latlang , multiPolyLineOptions);

// // // Adding multi poly-line to map
// // // multipolyline.addTo(map);








// // function putControlsInMenu(baseMaps, maptheme, menu){
// //   var layerControl = L.control.layers(baseMaps, maptheme,{
// //     collapsed: false
// //   });
// //   layerControl.addTo(map);
// //   layerControl._container.remove();
// //   document.getElementById(menu).appendChild(layerControl.onAdd(map));
// // }




// // //hides superfluous default leaflet button 
// // $('.leaflet-top.leaflet-right').hide();
// // //calls function to add layer controls to menu 
// // putControlsInMenu(baseMaps, overviewMaps, 'collapseOne');
// // putControlsInMenu(baseMaps, landMaps, 'collapseTwo');
// // putControlsInMenu(baseMaps, economyMaps, 'collapseThree');
// // putControlsInMenu(baseMaps, transportationMaps, 'collapseFour');
// // putControlsInMenu(baseMaps, populationMaps, 'collapseFive');




// // var groupedOverlays = {
// //   "Fatalities FY 16-17": layer,
// //   "Severe Inuries": layer1,
// //   "Accident Inpsections": layer2,
// //   "Complaint Inpsections": layer3

// // };


// // console.log(groupedOverlays);

// // // var rachael = L.featureGroup([layer,layer2,layer3,layer4,layer5]);

// // // console.log(rachael);



// // L.control.layers(baseMaps,groupedOverlays).addTo(mymap);


// // //rent map 
// // // USE THIS for pop-ups
// // function createPopup(properties,attribute,layer,radius){
// //   //add city to popup content string
// //   var popupContent = "<p><b>City: <b>" + properties["City"] + "</p>";
// //   var month = attribute.split("_")[0];
// //   //var year = attribute.split("_")[1];
// //   popupContent += "<p><b>" +"Month: " + month +"</p>" ;
// //   popupContent += "<p><b>" + "Median Rent: " +"$"+ properties[attribute] + "</p>";
// //   //replace the layer popup 
// //   layer.bindPopup(popupContent, {
// //     offset: new L.Point(0,-radius)
// //   });
// // }










// // // geoJ = GeoJSON object returned/parsed from ajax call
// // // polCollection = L.polygon( geoJ )
// // // polCollection.eachLayer( function(pol) {
// // //     bounds = pol.getBounds()
// // // })


// // }; //end of initialization

// // //delayed scrolling between page sections
// // function smoothScroll(){
// //   // Add smooth scrolling to all links
// //   $(".js-scroll").on('click', function(event) {

// //     // Make sure this.hash has a value before overriding default behavior
// //     if (this.hash !== "") {
// //       // Prevent default anchor click behavior
// //       event.preventDefault();

// //       // Store hash
// //       var hash = this.hash;

// //       // Using jQuery's animate() method to add smooth page scroll
// //       // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
// //       $('html, body').animate({
// //         scrollTop: $(hash).offset().top
// //       }, 700, function(){
   
// //         // Add hash (#) to URL when done scrolling (default click behavior)
// //         window.location.hash = hash;
// //       });
// //     }
// //   });
// // }; // end of smoothScroll

// // function scrollify(){
// //     $.scrollify({
// //         section : "#home,#maparea,#dataarea,#aboutarea",
// //         easing: "easeOutExpo",
// //         scrollSpeed: 700,
// //         offset : 0,
// //         scrollbars: true,
// //         standardScrollElements: "",
// //         setHeights: true,
// //         overflowScroll: true,
// //         updateHash: false,
// //         touchScroll:true,
// //         before:function() {},
// //         after:function() {},
// //         afterResize:function() {},
// //         afterRender:function() {}
// //     });
// // };




// // $(document).ready(initialization);
// // // $(document).ready(smoothScroll);
// // // $(document).ready(scrollify);

















// // //ZB Installations throughout US
// // //Alan Ross Machinery 
// // function createMap(){
// // var mymap = L.map('mapid').setView([29.505, -80.09], 4); //35.421263, -97.326722 //ohhh OKLAHOMA!

// // // var Stamen_TonerLite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
// // //  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
// // //  subdomains: 'abcd',
// // //  minZoom: 0,
// // //  maxZoom: 7,
// // //  ext: 'png'
// // // }).addTo(mymap);

// // // var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
// // //  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
// // //  subdomains: 'abcd',
// // //  minZoom: 0,
// // //  maxZoom: 7,
// // //  ext: 'png'
// // // }).addTo(mymap);


// // var Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
// //   attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
// //     minZoom: 0,
// //   maxZoom: 7,
// // }).addTo(mymap);


// // getData(mymap)
// // };//end of create map function 
// // function getData(mymap){
// //   // load the data
// //   $.ajax("data/magnaInstall.json",{
// //     dataType:"json",
// //     success: function(response){
// //       //console.log(response)
// //       createVideoPopUps(response,mymap);
// //     } //end of success 
// //   });
// // };//end of getData

// // function createVideoPopUps(response,mymap){
// //   // console.log(response);
// //   // var popUpContent = "<p><b>City: <b>" +response.features.properties["City"]+ "</p>";
// //   //console.log(popUpContent);
// //   // cluster for later
// //   var markers = L.markerClusterGroup();
  
// //   var geojsonMarkerOptions = {
// //     radius: 15,
// //     fillColor: "#fffa0a",
// //     color: "#000cff",
// //     weight: 1,
// //     opacity: 1,
// //     fillOpacity: .8
// //   };
// //   var layer = L.geoJSON(response, {pointToLayer: function (feature, latlng) {
// //     var popUpContent = feature.properties["notes"];
// //     console.log(feature);
// //     popUpContent += feature.properties["mapUrl"];
// //     // popUpContent += feature.properties["sText"];
// //     layer = L.circleMarker(latlng,geojsonMarkerOptions);
// //     layer.bindPopup(popUpContent,{offset: new L.point(0,0), maxWidth: 560, autoPan:true
// //     });
// //         layer.on({
// //     mouseover: function(){
// //         this.openPopup();
// //     },
// //     // mouseout: function(){
// //     //     this.closePopup();
// //     // },
// //     click: function(){
// //         layer.on(popUpContent);
// //     }
// //     });
// //     // return L.circleMarker(latlng, geojsonMarkerOptions).addTo(mymap);
// //     // return layer.addTo(mymap);
// //     return markers.addLayer(layer).addTo(mymap);
// //   }
// //   })
// // };//end createVideoPopUps
// // $(document).ready(createMap);