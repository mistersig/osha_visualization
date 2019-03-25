// global variable never change use const


// initial function that starts the map and displays it 
function initialization() {
  const mymap = L.map('mapid').setView([38.700860, -94.783775], 4); //38.724066, -99.262098 //
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


var fatalitiesLayer = L.geoJson(fatalities, {
  
  onEachFeature: onEachFeature
});


// var accidentLayer = L.geoJSON(accident_data);
// console.log(accidentLayer);
// var complaintLayer = L.geoJSON(complaint_data, {pointToLayer: function (feature, latlng) {}});
// var fatCatLayer = L.geoJSON(fat_cat_data, {pointToLayer: function (feature, latlng) {}});
// var followUpLayer = L.geoJSON(follow_up_data, {pointToLayer: function (feature, latlng) {}});
// var monitoringLayer = L.geoJSON(monitoring_data, {pointToLayer: function (feature, latlng) {}});
// var varianceLayer = L.geoJSON(variance_data, {pointToLayer: function (feature, latlng) {}});
// var referralsLayer = L.geoJSON(referrals_data, {pointToLayer: function (feature, latlng) {}});
// var plannedLayer = L.geoJSON(planned_data, {pointToLayer: function (feature, latlng) {}});




// var accidentLayer = choroplethMap(accident_data,{
//   onEachFeature: onEachFeature

// });
var accidentLayer = choroplethMap(accident_data,mymap);
var complaintLayer = choroplethMap(complaint_data,mymap);
var fatCatLayer = choroplethMap(fat_cat_data,mymap);
var followUpLayer = choroplethMap(follow_up_data,mymap);
var monitoringLayer = choroplethMap(monitoring_data,mymap);
var varianceLayer = choroplethMap(variance_data,mymap);
var referralsLayer = choroplethMap(referrals_data,mymap);
var plannedLayer = choroplethMap(planned_data,mymap);




// Map layers for SIDEBARS

// //load the l
const fatalMaps = {
  "Reported Fatalities ": fatalitiesLayer
};

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


////TESTING!!!!!!!
// const inspectionsMaps = {
//   "Accidents Inspected": accidentLayer
// };

//calls function to add layer controls to menu 
// putControlsInMenu(baseMaps, fatalMaps,'collapseTwo1',mymap);
// putControlsInMenu(baseMaps, severeMaps, 'collapseTwo21',mymap);
putControlsInMenu(baseMaps, inspectionsMaps, 'collapseThree31',mymap);
















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


// control that shows state info on hover
  var info = L.control({position: 'topright'});

  info.onAdd = function(map) {
    this._div = L.DomUtil.create("div", "info");
    this.update();
    return this._div;
  };

  baseHtml = '<p class="hidden-xs"><i class="fa fa-fw fa-mouse-pointer"></i>Select a layer<br/>to see its data</p>';

  info.update = function(props) {
    console.log(props)
    var text = baseHtml;
    if (props) {
      text = '';
      if (props.stusps) {
        text += '<h4>' + props.count + '</h4>';
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
        color: "#5b5b5b",
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


function choroplethMap(feature,map){

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
    onEachFeature:onEachFeature
  })

  // var legendLayer = legendMap(choroplethLayer,map);   
  return choroplethLayer
  // return [choroplethLayer,legendLayer]
  // .addTo(map)

}; //end of choropleth



function legendMap(choroplethLayer,map){
  // Add legend (don't forget to add the CSS from index.html)
  var legend = L.control({ position: 'bottomleft' })
  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = choroplethLayer.options.limits
    console.log(limits)
    console.log(limits.length)
    var colors = choroplethLayer.options.colors
    var labels = []

    // loop to add legending breaks
    for (var i = 0; i < limits.length-1; i++) {
          div.innerHTML += '<li><div class="labels">' + limits[i].toFixed(0)  + '</div></li>' 
    };
    // add last break outside of loop
    div.innerHTML += '<li><div class="labels">' + limits[i].toFixed(0)  + '</div></li>'     

    limits.forEach(function (limit, index) {
      labels.push('<li style="background-color: ' + colors[index] + '"></li>')
    })

    div.innerHTML += '<ul>' + labels.join('') + '</ul>'
    return div
  }
  return legend
   // legend.addTo(map)

};



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
//     onEachFeature:onEachFeature
//   })


//   // return [choroplethLayer,legendLayer]
//   // .addTo(map)






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
   
//    // legend.addTo(map)

// };





//// //new way to do chropleth maps
  // var choroplethLayer = L.choropleth(accident_data, {
  //   valueProperty: 'count',
  //   scale: ['white', 'red'],
  //   steps: 7,
  //   mode: 'k', // q for quantile, e for equidistant, k for k-means
  //   style: {
  //     color: '#fff',
  //     weight: 2,
  //     fillOpacity: 0.8
  //   },
  //   onEachFeature: onEachFeature
  // })
  // // .addTo(mymap)

  // // Add legend (don't forget to add the CSS from index.html)
  // var legend = L.control({ position: 'bottomleft' })
  // legend.onAdd = function (map) {
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
  // // legend.addTo(mymap)


}; // end of getData

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////// MENU IN SIDE BAR /////////
////Puts the control in the sidebar and out of Leaflet

// https://stackoverflow.com/questions/42908826/leaflet-removing-updating-a-legend
function putControlsInMenu(baseMaps, map_data,menu,map){
  console.log('Grouped layers');
  console.log(map_data);

  var layerControl = L.control.layers(null, map_data,{
    collapsed: false
  });
  console.log(layerControl);
  layerControl.addTo(map);

  // console.log(layerControl);
  layerControl._container.remove();
  // console.log(layerControl);
  document.getElementById(menu).appendChild(layerControl.onAdd(map));
  
  // document.getElementById("myBtn").addEventListener("click", function(){
  //   document.getElementById("demo").innerHTML = "Hello World";
  // });
  // console.log(layerControl);
  // // adding legend to 
  // var key = Object.values(map_data);
  // console.log('Getting the keys');
  // console.log(key);


// for (var key in map_data){
//   console.log('Getting the keys in FOR Loop');
//     console.log(map_data[key])///
//     var layerLegend = legendMap(map_data[key],map); 
//   layerLegend.addTo(map);
//   };

  var legend = L.control({ position: 'bottomleft' })
  legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = layerControl.options.limits
    console.log(limits)
    // console.log(limits)
    // console.log(limits.length)
    var colors = layerControl.options.colors
    var labels = []

    // loop to add legending breaks
    for (var i = 0; i < limits.length-1; i++) {
          div.innerHTML += '<li><div class="labels">' + limits[i].toFixed(0)  + '</div></li>' 
    };
    // add last break outside of loop
    div.innerHTML += '<li><div class="labels">' + limits[i].toFixed(0)  + '</div></li>'     

    limits.forEach(function (limit, index) {
      labels.push('<li style="background-color: ' + colors[index] + '"></li>')
    })

    div.innerHTML += '<ul>' + labels.join('') + '</ul>'
    return div
  }
  // return legend
   legend.addTo(map)



  // 
  // return layerControl;
  // console.log(layerControl)

};






// function legendMap(choroplethLayer,map){
//   // Add legend (don't forget to add the CSS from index.html)


// };
// ///////// MENU IN SIDE BAR /////////
// // Puts the control in the sidebar and out of Leaflet
// function putControlsInMenu(baseMaps, map_data, menu,map){
//   for (var i in map_data){
//     return i 
//   }
//   // console.log(map_data.values())
//   var layer_data = map_data[i];
//   var legend_data = map_data[1];
//   // console.log(typeof map_data);
//   // console.log(Object.getOwnPropertyNames(map_data));
//   var layerControl = L.control.layers(null, map_data[i],{
//     collapsed: false
//   });
//   layerControl.addTo(map);
//   // map_data[1].addTo(map);
//   layerControl._container.remove();
//   document.getElementById(menu).appendChild(layerControl.onAdd(map));
//   // var la
//   // console.log(Object.values(map_data))
//   // console.log(map_data[menu])
//   // console.log(map_data.options)
//   for (var key in map_data){

//     console.log(map_data[key])///
//     var layerLegend = legendMap(map_data[key],map); 
//   layerLegend.addTo(map);
//   };
//   console.log(menu)
  
// };




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

function legendMap(choroplethLayer,map){
  // Add legend (don't forget to add the CSS from index.html)
  var legend = L.control({ position: 'bottomleft' })
  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = choroplethLayer.options.limits
    // console.log(limits)
    // console.log(limits.length)
    var colors = choroplethLayer.options.colors
    var labels = []

    // loop to add legending breaks
    for (var i = 0; i < limits.length-1; i++) {
          div.innerHTML += '<li><div class="labels">' + limits[i].toFixed(0)  + '</div></li>' 
    };
    // add last break outside of loop
    div.innerHTML += '<li><div class="labels">' + limits[i].toFixed(0)  + '</div></li>'     

    limits.forEach(function (limit, index) {
      labels.push('<li style="background-color: ' + colors[index] + '"></li>')
    })

    div.innerHTML += '<ul>' + labels.join('') + '</ul>'
    return div
  }
  return legend
   // legend.addTo(map)

};