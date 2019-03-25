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
  //basemap
  const baseMaps = {
    "Basemap": OpenStreetMap_Mapnik
  }; 


// Fatalities Layer
// var fatalitiesLayer = L.geoJson(fatalities, {
//   style: style,
//   onEachFeature: onEachFeature
// });

//&*********************************WARNING****************************** ///////
//Layer for severe injuries -- points data 
//need to go in DB & change this to a polygon layer. Point data overloads Leaflet
// var severeInjuryLayer = L.geoJSON(severe_injury, {pointToLayer: function (feature, latlng) {
//   var bubbles = popUpBubbles(feature,latlng,mymap);
//   // console.log(bubbles);
//   return bubbles;
// }
// });







var accidentLayer = choroplethMap(accident_data);
var complaintLayer = choroplethMap(complaint_data);
var fatCatLayer = choroplethMap(fat_cat_data);
var followUpLayer = choroplethMap(follow_up_data,mymap);
var monitoringLayer = choroplethMap(monitoring_data);
var varianceLayer = choroplethMap(variance_data);
var referralsLayer = choroplethMap(referrals_data);
var plannedLayer = choroplethMap(planned_data);




// Map layers for SIDEBARS

// //load the l
// const fatalMaps = {
//   "Reported Fatalities ": fatalities
// };

// // const severeMaps = {
// //   "Severe Injuries ": severeInjuryLayer
// // };

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


//calls function to add layer controls to menu 
// putControlsInMenu(baseMaps, fatalMaps, 'collapseTwo1',mymap);
// putControlsInMenu(baseMaps, severeMaps, 'collapseTwo21',mymap);
putControlsInMenu(baseMaps, inspectionsMaps, 'collapseThree31',mymap);












  // Add legend (don't forget to add the CSS from index.html)
  // var legend = L.control({ position: 'bottomleft' })
  // legend.onAdd = function (choroplethLayer,map) {
  //   var div = L.DomUtil.create('div', 'info legend')
  //   var limits = choroplethLayer.options.limits
  //   console.log(limits)
  //   console.log(limits.length)
  //   var colors = choroplethLayer.options.colors
  //   var labels = []

  //   // loop to add legending breaks
  //   for (var i = 0; i < limits.length-1; i++) {
  //         div.innerHTML += '<li><div class="labels">' + limits[i].toFixed(0)  + '</div></li>' 
  //   };
  //   // add last break outside of loop
  //   div.innerHTML += '<li><div class="labels">' + limits[i].toFixed(0)  + '</div></li>'     

  //   limits.forEach(function (limit, index) {
  //     labels.push('<li style="background-color: ' + colors[index] + '"></li>')
  //   })

  //   div.innerHTML += '<ul>' + labels.join('') + '</ul>'
  //   return div
  // }
  // baseHtml = '<p class="hidden-xs"><i class="fa fa-fw fa-mouse-pointer"></i>Select a layer<br/>to see its data</p>';
  // // return legend
  //  legend.addTo(mymap)




// // control that shows state info on hover
//   var info = L.control({position: 'topright'});

//   info.onAdd = function(map) {
//     this._div = L.DomUtil.create("div", "info");
//     this.update();
//     return this._div;
//   };

//   baseHtml = '<p class="hidden-xs"><i class="fa fa-fw fa-mouse-pointer"></i>Select a layer<br/>to see its data</p>';

//   info.update = function(props) {
//     var text = baseHtml;
//     if (props) {
//       text = '';
//       if (props.name) {
//         text += '<h4>' + props.fatalities + '</h4>';
//       }
//     }
//     this._div.innerHTML = text;
//   };
  
//   info.clear = function() {
//     this._div.innerHTML = baseHtml;
//   };

//   info.addTo(mymap);

//   // MAP highlight
//   function highlightFeature(e) {
//       var layer = e.target;
//       layer.setStyle({
//         weight: 5,
//         color: "#666",
//         dashArray: "",
//         fillOpacity: 0.7
//       });
//       if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
//         layer.bringToFront();
//       }
//       info.update(layer.feature.properties);
//     }
//     // end of highlightFeature



// function resetHighlight(e) {
//   var layer = e.target;

//         layer.setStyle({
//         "weight": 0,
//         "opacity": 0.5,
//         "color": '#3a3a3a'
//         });
//         if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
//             layer.bringToFront();
//         }
//         info.clear();
//         // info.update(layer.feature.properties);
//     };

//     function zoomToFeature(e) {
//       mymap.fitBounds(e.target.getBounds());
//     }
//     // end on zoomToFeature
//     function onEachFeature(feature, layer) {
//       layer.on({
//         mouseover: highlightFeature,
//         mouseout: resetHighlight,
//         click: zoomToFeature
//       });
//     }
//     // end of onEahcFeature








// function choroplethMap(feature,map){

//   var choroplethLayer = L.choropleth(feature, {
//     valueProperty: 'count',
//     scale: ['white', 'red'],
//     steps: 7,
//     mode: 'k', // q for quantile, e for equidistant, k for k-means
//     style: {
//       color: '#fff',
//       weight: 2,
//       fillOpacity: 0.8
//     },
//     onEachFeature: function (feature, layer) {
//       layer.bindPopup('State ' + feature.properties.stusps + '<br>' + feature.properties.count.toLocaleString() + ' incidents')
//     }
//   })

//   // var legendLayer = legendMap(choroplethLayer,map);   
//   // return choroplethLayer,legendLayer
//   return choroplethLayer
//   // .addTo(map)

// }; //end of choropleth











// function choroplethMap(feature,map){

//   var choroplethLayer = L.choropleth(feature, {
//     valueProperty: 'count',
//     scale: ['white', 'red'],
//     steps: 7,
//     mode: 'k', // q for quantile, e for equidistant, k for k-means
//     style: {
//       color: '#fff',
//       weight: 2,
//       fillOpacity: 0.8
//     },
//     onEachFeature: function (feature, layer) {
//       layer.bindPopup('State ' + feature.properties.stusps + '<br>' + feature.properties.count.toLocaleString() + ' incidents')
//     }
//   })

//   var legendLayer = legendMap(choroplethLayer,map);   
//   // return choroplethLayer,legendLayer
//   return [choroplethLayer,legendLayer]
//   // .addTo(map)

// }; //end of choropleth










// function choroplethMap(feature,map){

//   var choroplethLayer = L.choropleth(feature, {
//     valueProperty: 'count',
//     scale: ['white', 'red'],
//     steps: 7,
//     mode: 'k', // q for quantile, e for equidistant, k for k-means
//     style: {
//       color: '#fff',
//       weight: 2,
//       fillOpacity: 0.8
//     },
//     onEachFeature: function (feature, layer) {
//       layer.bindPopup('State ' + feature.properties.stusps + '<br>' + feature.properties.count.toLocaleString() + ' incidents')
//     }
//   })

//   // var legendLayer = legendMap(choroplethLayer,map);   
//   // return choroplethLayer,legendLayer
//   return choroplethLayer
//   // .addTo(map)

// }; //end of choropleth

// function choroplethMap(feature,map){

//   var choroplethLayer = L.choropleth(feature, {
//     valueProperty: 'count',
//     scale: ['white', 'red'],
//     steps: 7,
//     mode: 'k', // q for quantile, e for equidistant, k for k-means
//     style: {
//       color: '#fff',
//       weight: 2,
//       fillOpacity: 0.8
//     },
//     onEachFeature: function (feature, layer) {
//       layer.bindPopup('State ' + feature.properties.stusps + '<br>' + feature.properties.count.toLocaleString() + ' incidents')
//     }
//   })

//   var legendLayer = legendMap(choroplethLayer,map);   
//   // return choroplethLayer,legendLayer
//   return [choroplethLayer,legendLayer]
//   // .addTo(map)

// }; //end of choropleth














































  // fatalities

  // use this
  // feature.properties.xxxxx
  // example
  // feature.properties.density
  // my use
  // feature.properties.fatalities


  // function getColor(d) {
  //     return d > 70 ? '#800026' :
  //            d > 60  ? '#BD0026' :
  //            d > 50  ? '#E31A1C' :
  //            d > 40  ? '#FC4E2A' :
  //            d > 30   ? '#FD8D3C' :
  //            d > 20   ? '#FEB24C' :
  //            d > 10   ? '#FED976' :
  //                       '#FFEDA0';
  // }

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




//   // MAP highlight
//   function highlightFeature(e) {
//       var layer = e.target;
//       layer.setStyle({
//         weight: 5,
//         color: "#666",
//         dashArray: "",
//         fillOpacity: 0.7
//       });
//       if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
//         layer.bringToFront();
//       }
//       info.update(layer.feature.properties);
//     }
//     // end of highlightFeature



// function resetHighlight(e) {
//   var layer = e.target;

//         layer.setStyle({
//         "weight": 0,
//         "opacity": 0.5,
//         "color": '#3a3a3a'
//         });
//         if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
//             layer.bringToFront();
//         }
//         info.clear();
//         // info.update(layer.feature.properties);
//     };

//     function zoomToFeature(e) {
//       mymap.fitBounds(e.target.getBounds());
//     }
//     // end on zoomToFeature
//     function onEachFeature(feature, layer) {
//       layer.on({
//         mouseover: highlightFeature,
//         mouseout: resetHighlight,
//         click: zoomToFeature
//       });
//     }
//     // end of onEahcFeature





// console.log(severeInjuryLayer)








// // new way to do chropleth maps
//   var choroplethLayer = L.choropleth(accident_data, {
//     valueProperty: 'count',
//     scale: ['white', 'red'],
//     steps: 7,
//     mode: 'k', // q for quantile, e for equidistant, k for k-means
//     style: {
//       color: '#fff',
//       weight: 2,
//       fillOpacity: 0.8
//     },
//     onEachFeature: function (feature, layer) {
//       layer.bindPopup('State ' + feature.properties.stusps + '<br>' + feature.properties.count.toLocaleString() + ' incidents')
//     }
//   }).addTo(mymap)

//   // Add legend (don't forget to add the CSS from index.html)
//   var legend = L.control({ position: 'bottomleft' })
//   legend.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend')
//     var limits = choroplethLayer.options.limits
//     console.log(limits)
//     console.log(limits.length)
//     var colors = choroplethLayer.options.colors
//     var labels = []

//     // loop to add legending breaks
//     for (var i = 0; i < limits.length-1; i++) {
//           div.innerHTML += '<li><div class="labels">' + limits[i].toFixed(0)  + '</div></li>' 
//     };
//     // add last break outside of loop
//     div.innerHTML += '<li><div class="labels">' + limits[i].toFixed(0)  + '</div></li>'     

//     limits.forEach(function (limit, index) {
//       labels.push('<li style="background-color: ' + colors[index] + '"></li>')
//     })

//     div.innerHTML += '<ul>' + labels.join('') + '</ul>'
//     return div
//   }
//   legend.addTo(mymap)

}; // end of getData

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////// MENU IN SIDE BAR /////////
// Puts the control in the sidebar and out of Leaflet
function putControlsInMenu(baseMaps, map_data, menu,map){
  // var layer_data = map_data[0];
  // var legend_data = map_data[1];
  // console.log(layer_data);
  var layerControl = L.control.layers(null, map_data,{
    collapsed: false
  });
  layerControl.addTo(map);
  // map_data[1].addTo(map);
  layerControl._container.remove();
  document.getElementById(menu).appendChild(layerControl.onAdd(map));
  // var la
  // console.log(Object.values(map_data))
  // console.log(map_data[menu])
  // console.log(map_data.options)
  // for (var key in map_data){

  //   console.log(map_data[key])///
  //   var layerLegend = legendMap(map_data[key],map); 
  // layerLegend.addTo(map);
  // };
  // console.log(menu)
  
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




function choroplethMap(feature,map){



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

  info.addTo(map);

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




  var choroplethLayer = L.choropleth(feature, {
    valueProperty: 'count',
    scale: ['white', 'red'],
    steps: 7,
    mode: 'k', // q for quantile, e for equidistant, k for k-means
    style: {
      color: '#fff',
      weight: 2,
      fillOpacity: 0.8
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup('State ' + feature.properties.stusps + '<br>' + feature.properties.count.toLocaleString() + ' incidents')
    }
  })

  // var legendLayer = legendMap(choroplethLayer,map);   
  // return choroplethLayer,legendLayer
  return choroplethLayer
  // .addTo(map)

}; //end of choropleth

// function choroplethMap(feature,map){

//   var choroplethLayer = L.choropleth(feature, {
//     valueProperty: 'count',
//     scale: ['white', 'red'],
//     steps: 7,
//     mode: 'k', // q for quantile, e for equidistant, k for k-means
//     style: {
//       color: '#fff',
//       weight: 2,
//       fillOpacity: 0.8
//     },
//     onEachFeature: function (feature, layer) {
//       layer.bindPopup('State ' + feature.properties.stusps + '<br>' + feature.properties.count.toLocaleString() + ' incidents')
//     }
//   })

//   var legendLayer = legendMap(choroplethLayer,map);   
//   // return choroplethLayer,legendLayer
//   return [choroplethLayer,legendLayer]
//   // .addTo(map)

// }; //end of choropleth



// function legendMap(choroplethLayer,map){
//   // Add legend (don't forget to add the CSS from index.html)
//   var legend = L.control({ position: 'bottomleft' })
//   legend.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend')
//     var limits = choroplethLayer.options.limits
//     console.log(limits)
//     console.log(limits.length)
//     var colors = choroplethLayer.options.colors
//     var labels = []

//     // loop to add legending breaks
//     for (var i = 0; i < limits.length-1; i++) {
//           div.innerHTML += '<li><div class="labels">' + limits[i].toFixed(0)  + '</div></li>' 
//     };
//     // add last break outside of loop
//     div.innerHTML += '<li><div class="labels">' + limits[i].toFixed(0)  + '</div></li>'     

//     limits.forEach(function (limit, index) {
//       labels.push('<li style="background-color: ' + colors[index] + '"></li>')
//     })

//     div.innerHTML += '<ul>' + labels.join('') + '</ul>'
//     return div
//   }
//   return legend
//    // legend.addTo(map)

// };










































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