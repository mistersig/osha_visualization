//////////////BIG PICTURE////////////////
// declare map in global scope
var americaTransformedMap;


//instantiate map 
function createMap(){
	 americaTransformedMap = L.map('map',{
		center: [38.95,-110],
		zoom: 4,
		minZoom:4,
		maxZoom: 15,
		zoomControl:false
	});
	
	
	//call getdata function
	getData(americaTransformedMap);
	americaTransformedMap.addControl( L.control.zoom({position: 'bottomright'}) )
};




/////////////TOUCH FRIENDLY/////////////////////////////
var eventMap = {};

(function(){
var eventReplacement = {
    "mousedown": ["touchstart mousedown", "mousedown"],
    "mouseup": ["touchend mouseup", "mouseup"],
    "click": ["touchstart click", "click"],
    "mousemove": ["touchmove mousemove", "mousemove"]
};


for (i in eventReplacement) {
    if (typeof window["on" + eventReplacement[i][0]] == "object") {
        eventMap[i] = eventReplacement[i][0];
    } 
    else {
        eventMap[i] = eventReplacement[i][1];
    };
 };
})();




/////////MENU NAVIGATION/////////////////

//back button "more maps"
 $('button.more-maps').click(function() {
	   location.reload();
   });        




///////////////////////MAPS/////////////////////////
//function to retrieve map data and place it on the map
function getData(map)
{

	//baselayer
	var grey = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 15,
	minZoom: 2
}).addTo(americaTransformedMap);
	
	
	//get bounds
/* 	map.on('dragend', function onDragEnd(){
    alert (
        'east:' + map.getBounds().getEast() +'\n'+
		'west:' + map.getBounds().getWest() +'\n'+
		'north:' + map.getBounds().getNorth() +'\n'+
		'south:' + map.getBounds().getSouth());
        
    }); */
	
 

	//define service layers and default map extent for maps in exhibition
	//TO DO: simplify in future interactives
	var youngWMS = L.tileLayer('https://geo.leventhalmap.org/maps/tile/5218/{z}/{x}/{y}.png');
	var youngBounds = [[35.6126508187567, -93.2464599609375],[32.773419354975175, -85.74279785156251]];
	
	var arrowsmithWMS = L.tileLayer('https://geo.leventhalmap.org/maps/tile/6340/{z}/{x}/{y}.png');
	var arrowsmithBounds = [[50.007, -122.65136718],[29.113775, -62.6220703]];
	
	var coltonWMS = L.tileLayer('https://geo.leventhalmap.org/maps/tile/664/{z}/{x}/{y}.png');
	var coltonBounds = [[42.069, -121.904],[39.470, -114.400]];
	
	var blossWMS = L.tileLayer('https://geo.leventhalmap.org/maps/tile/9319/{z}/{x}/{y}.png');
	var blossBounds = [[40.73444, -99.645],[33.0625, -90.5285]];
	
	var fletcherWMS = L.tileLayer('https://geo.leventhalmap.org/maps/tile/7510/{z}/{x}/{y}.png');
	var fletcherBounds = [[47.7108388, -117.8358237],[45.0197243, -110.2951393]];
	
	var kingWMS = L.tileLayer('https://geo.leventhalmap.org/maps/tile/4339/{z}/{x}/{y}.png');
	var kingBounds = [[49.27497287599639, -113.70849609375001],[46.98399993718925, -106.204833984375]];
	
	var dallWMS = L.tileLayer('https://geo.leventhalmap.org/maps/tile/6443/{z}/{x}/{y}.png');
	var dallBounds = [[39.38261022998208, -82.3418426513672],[39.0501187056825, -81.40388488769533]];
	
	var melishWMS = L.tileLayer('https://geo.leventhalmap.org/maps/tile/6788/{z}/{x}/{y}.png');
	var melishBounds = [[39.234380544276, -88.22570800781251],[37.89219554724437, -84.47387695312501]];
	
	var fadenWMS = L.tileLayer('https://geo.leventhalmap.org/maps/tile/2019/{z}/{x}/{y}.png');
	var fadenBounds = [[53, -136],[34, -76]];
	
	var fremontWMS = L.tileLayer('https://geo.leventhalmap.org/maps/tile/3023/{z}/{x}/{y}.png');
	var fremontBounds = [[50.5, -145.3],[29.8, -85.29]];
	
	var disturnellWMS = L.tileLayer('https://geo.leventhalmap.org/maps/tile/2039/{z}/{x}/{y}.png');
	var disturnellBounds = [[42.747, -136.71],[19.51, -76.684]];

	var masonWMS = L.tileLayer('https://geo.leventhalmap.org/maps/tile/2048/{z}/{x}/{y}.png');
	var masonBounds = [[40.145, -107.094],[28.863, -77.0800]];
	
	var usgloWMS = L.tileLayer('https://geo.leventhalmap.org/maps/tile/1740/{z}/{x}/{y}.png');
	var usgloBounds = [[42.5611728553181, -129.70458],[37.30027528, -114.697265]];
	
	var steigerWMS = L.tileLayer('https://geo.leventhalmap.org/maps/tile/2760/{z}/{x}/{y}.png');
	var steigerBounds = [[48.69, -135.4833],[27.3327, -75.454101]];
	
	var smithWMS = L.tileLayer('https://geo.leventhalmap.org/maps/tile/2364/{z}/{x}/{y}.png');
	var smithBounds = [[39.657116842382756, -83.07586669921876],[39.5744686100518, -82.8413772583008]];
	
	var scottWMS = L.tileLayer('https://geo.leventhalmap.org/maps/tile/1287/{z}/{x}/{y}.png');
	var scottBounds = [[40.8535355277001888, -76.198425296876],[40.77235187838098, -75.9639358520508]];
	//define layer group   
	var histmaps = L.layerGroup([arrowsmithWMS, kingWMS, youngWMS, coltonWMS, blossWMS, fletcherWMS, dallWMS, melishWMS, fadenWMS, fremontWMS, disturnellWMS, masonWMS, usgloWMS, steigerWMS, smithWMS, scottWMS]);						
	//define basemaps for layer control 
	var baseMaps = {
		"Basemap": grey
	  };
	//define overview maps for layer control 
	  var overviewMaps = {
		"A young nation": arrowsmithWMS,
		"Northwest claims": kingWMS,
		"Beyond the Mississippi": youngWMS,
		"A nation expanded": coltonWMS,
		"Free or slave states": blossWMS,
		"Forced removal": fletcherWMS
	  };
	 //define land maps for layer control 
	 var landMaps = {
		"Early townships": dallWMS,
		"Carving out counties": melishWMS,
		"Western mountains": fadenWMS,
		"Oregon Territory": fremontWMS,
		"Southwest": disturnellWMS
	 };
	 //define economy maps for layer control 
	  var economyMaps = {
		"The Cotton Kingdom": masonWMS,
		"Mineral resources": usgloWMS,
		"Rural Midwest": smithWMS,
		"Pennsylvania mining": scottWMS
	  };
	 //define transportation maps for layer control 
	  var transportationMaps = {
		"Transcontinental railroad": steigerWMS
	  };		
	 //define population maps for layer control 
	 var populationMaps = {
	  };

	var allcaptions = {};
	//reference to HTML elements -- development -- 
	//TO DO: link to external json for cleaner handling 
	//overview
	allcaptions.caption1802arrowsmith = ["A young nation", $("#caption-1802"), arrowsmithBounds];
	allcaptions.caption1807arrowsmith = ["Northwest claims", $("#caption-1807"), kingBounds];
	allcaptions.caption1831young = ["Beyond the Mississippi", $("#caption-1831"), youngBounds];
	allcaptions.caption1854colton = ["A nation expanded", $("#caption-1854"), coltonBounds];
	allcaptions.caption1858bloss = ["Free or slave states", $("#caption-1856"), blossBounds];
	allcaptions.caption1877fletcher = ["Forced removal", $("#caption-1877"), fletcherBounds];
	//land
	allcaptions.caption18unknown = ["Early townships", $("#caption-1800"), dallBounds];
	allcaptions.caption1817melish = ["Carving out counties", $("#caption-1817"), melishBounds];
	allcaptions.caption1820faden = ["Western mountains", $("#caption-1820"), fadenBounds];
	allcaptions.caption1845fremont = ["Oregon Territory", $("#caption-1845"), fremontBounds];
	allcaptions.caption1846disturnell = ["Southwest", $("#caption-1846"), disturnellBounds];
	//economy
	allcaptions.caption1861olmsted = ["The Cotton Kingdom", $("#caption-1861"), masonBounds];	
	allcaptions.caption1864usglo = ["Mineral resources", $("#caption-1864"), usgloBounds];
	allcaptions.caption1858smith = ["Rural Midwest", $("#caption-1858"), smithBounds];
	allcaptions.caption1864scott = ["Pennsylvania mining", $("#caption-1864-scott"), scottBounds];
	//transportation
	allcaptions.caption1854steiger = ["Transcontinental railroad", $("#caption-1854-steiger"), steigerBounds];

	var keys = Object.keys(allcaptions);
	//add layers to map  
	// L.control.layers(baseMaps, overviewMaps, landMaps).addTo(map);

//////////////LAYER CONTROL FUNCTIONALITY///////////////////
//function to take layer controls out of default leaflet button and put into menu
function putControlsInMenu(baseMaps, maptheme, menu){
	var layerControl = L.control.layers(null, maptheme,{
		collapsed: false
	});
	layerControl.addTo(map);
	layerControl._container.remove();
	document.getElementById(menu).appendChild(layerControl.onAdd(map));
}
//hides superfluous default leaflet button 
$('.leaflet-top.leaflet-right').hide();
//calls function to add layer controls to menu 
putControlsInMenu(baseMaps, overviewMaps, 'collapseOne');
putControlsInMenu(baseMaps, landMaps, 'collapseTwo');
putControlsInMenu(baseMaps, economyMaps, 'collapseThree');
putControlsInMenu(baseMaps, transportationMaps, 'collapseFour');
putControlsInMenu(baseMaps, populationMaps, 'collapseFive');
  // JSON data
 $.ajax("data/territorialacquisitions.json",{
	dataType: "json",
	 success: function(response){
		 var territorialacquisitions = response.features;
		 // Set up styles for subway lines
		function uniqueSymbols(feature) {
			var colorToUse;
			var area = feature.properties.USACQUP020;
			var name = feature.properties.NAME;
			var original = "Territory of the Original<br>Thirteen States<br>(Ceded by Great Britain)<br>1783" 
			
			 var invisibleIcon = new L.Icon({
				iconSize: [27, 27],
				iconAnchor: [13, 27],
				popupAnchor:  [1, -24],
				iconUrl: 'data/img/marker.png'
			});
				//territory of original 13 states 1783
				if (area === 1270) {
					colorToUse = "#BC80BD",
					marker = new L.marker([39, -82.8], {icon: invisibleIcon, opacity:0}).addTo(map);
					marker.bindTooltip("1783", {permanent: true, direction: "center", className: "my-labels"}).openTooltip();
				}
				//East Florida (Spanish cession) 1819
				else if (area === 2060) {
					colorToUse = "#FDB462",
					marker = new L.marker([27.5, -81.35], {icon: invisibleIcon, opacity:0}).addTo(map);
					marker.bindTooltip("1819", {permanent: true, direction: "center", className: "my-labels"}).openTooltip();
				}
				//Louisiana Purchase 1803
				else if (area === 1274) {
					colorToUse = "#FB8072",
					marker = new L.marker([41.5, -99.35], {icon: invisibleIcon, opacity:0}).addTo(map);
					marker.bindTooltip("1803", {permanent: true, direction: "center", className: "my-labels"}).openTooltip();
				}
				//British cession 1818
				else if (area === 1269) {
					colorToUse = "#FFFFBE",
					marker = new L.marker([48, -97.75], {icon: invisibleIcon, opacity:0}).addTo(map);
					marker.bindTooltip("1818", {permanent: true, direction: "center", className: "my-labels"}).openTooltip();
				}
				//Oregon territory 1846
				else if (area === 1273) {
					colorToUse = "#FCCDE5",
					marker = new L.marker([46, -117.75], {icon: invisibleIcon, opacity:0}).addTo(map);
					marker.bindTooltip("1848", {permanent: true, direction: "center", className: "my-labels"}).openTooltip();
				}
				//Texas annexation 1845
				else if (area === 1714) {
					colorToUse = "#8DD3C7",
					marker = new L.marker([31.25, -99.5], {icon: invisibleIcon, opacity:0}).addTo(map);
					marker.bindTooltip("1848", {permanent: true, direction: "center", className: "my-labels"}).openTooltip();
				}
				//Mexican cession 1848
				else if (area === 1697) {
					colorToUse = "#B3DE69",
					marker = new L.marker([38, -113.5], {icon: invisibleIcon, opacity:0}).addTo(map);
					marker.bindTooltip("1848", {permanent: true, direction: "center", className: "my-labels"}).openTooltip();
				}
				//Gadsen purchase 1853
				else if (area === 2018) {
					colorToUse = "#BC80BD",
					marker = new L.marker([32.25, -111.5], {icon: invisibleIcon, opacity:0}).addTo(map);
					marker.bindTooltip("1853", {permanent: true, direction: "center", className: "my-labels"}).openTooltip();
				}
				//Hawaii annexation 1898
				else if (area === 2791) {
					colorToUse = "#FB8072",
					marker = new L.marker([19.5, -155.5], {icon: invisibleIcon, opacity:0}).addTo(map);
					marker.bindTooltip("1898", {permanent: true, direction: "center", className: "my-labels"}).openTooltip();
				}
				//Alaska annexation 1867
				else if (area === 2) {
					colorToUse = "#8DD3C7",
					marker = new L.marker([65.5, -151], {icon: invisibleIcon, opacity:0}).addTo(map);
					marker.bindTooltip("1867", {permanent: true, direction: "center", className: "my-labels"}).openTooltip();
				}
				//Puerto Rico ceded by Spain 1898
				else if (area === 2792) {
					colorToUse = "#FB8072",
					marker = new L.marker([18.25, -66.5], {icon: invisibleIcon, opacity:0}).addTo(map);
					marker.bindTooltip("1898", {permanent: true, direction: "center", className: "my-labels"}).openTooltip();
				}
				//Spanish cession 1819
				else if (area === 2041) colorToUse = "#D9D9D9";
				//Louisiana Purchase 1803, Texas annexation 1845
				else if (area === 1756) colorToUse = "#B3DE69";
				//Louisiana Purchase 1803 (ceded to Great Britain 1818)
				else if (area === 1268) colorToUse = "#80B1D3";
				else if (area === 1853) colorToUse = "#FAF739";
				//West Florida (Spanish cession) 1819
				else if (area === 2059) colorToUse = "#FFED6F";
				else if (area === 1699) colorToUse = "#FAF739";
				//Louisiana Purchase 1803, Mexican cession 1848
				else if (area === 1698) colorToUse = "#FDB462";
				else if (area === 1738) colorToUse = "#FAF739";
				else if (area === 1729) colorToUse = "#BC80BD";
				else if (area === 1273) colorToUse = "#FAF739";
				//hawaii
				else if (area === 2788) colorToUse = "#FB8072";
				else if (area === 2783) colorToUse = "#FB8072";
				else if (area === 2781) colorToUse = "#FB8072";
				else if (area === 2784) colorToUse = "#FB8072";
				else if (area === 2787) colorToUse = "#FB8072";
				else if (area === 2789) colorToUse = "#FB8072";
				else if (area === 2790) colorToUse = "#FB8072";
				//puerto rico ceded by Spain 1898
				else if (area === 2830) colorToUse = "#FB8072";
				else if (area === 2807) colorToUse = "#FB8072";	
				else if (area === 2827) colorToUse = "#FB8072";			
				//Virgin Islands 1917
				else if (area === 2798) colorToUse = "#FAF739";
				else if (area === 2799) colorToUse = "#FAF739";
				else if (area === 2835) colorToUse = "#FAF739";
				return {
					"color": colorToUse,
					"opacity": .65,
					"weight": .5
				};
		}
		function blankStyle(feature){
			return{
				"color": "rgba(0,0,0,0);"
			}
		}
		//function for popup
		function buildPopupContent(territorialacquisitions,feature){
			name = feature.feature.properties.NAME;
			notes = feature.feature.properties.NOTES;
			content = "<strong>" + name + "</strong><br>" +  notes;
			feature.bindPopup(content);
		}
		//add geojson layer to map w/ unique symbology
		var ta = L.geoJSON(territorialacquisitions, {
			style: uniqueSymbols,
			onEachFeature: buildPopupContent,
		}).addTo(americaTransformedMap);
		//define acquisition maps for layer control 
		var acqLayer = {
			"US Land Acquisitions": ta
		};		
		//put that control into the table of contents
		putControlsInMenu(baseMaps, acqLayer, 'acquisition-layer-control');

		////////////////MAP & OPACITY SLIDER SETTINGS/////////////////////
		//only one map will be selected at a time 
		map.on('overlayremove', function(x) {
			if (map.hasLayer(arrowsmithWMS) || map.hasLayer(kingWMS)  || map.hasLayer(youngWMS) || 
			+ map.hasLayer(coltonWMS) || map.hasLayer(blossWMS) || map.hasLayer(fletcherWMS) ||
			+ map.hasLayer(dallWMS) || map.hasLayer(melishWMS) || map.hasLayer(fadenWMS) ||
			+ map.hasLayer(fremontWMS) || map.hasLayer(disturnellWMS) || map.hasLayer(masonWMS) ||
			+ map.hasLayer(usgloWMS) || map.hasLayer(steigerWMS) || map.hasLayer(ta)) {
				// do nothing
			} else {
				//remove opacity slider if there is no map present
				removeOpacitySlider();
			}
		});
		//opacity slider will be reset for each new map added     
		map.on('overlayadd', function(x) {
			//determines current map name, layer name and id
			  var activeMap = x.name;
			  var activeLayer = x.layer;
			  var activeID = activeLayer._leaflet_id;
			 
/* 			  //function to remove all maps except one selected
			  function clearMaps(){
					histmaps.eachLayer(function(layer){
						if (layer._leaflet_id != activeID){
							map.removeLayer(layer);
						}
					});
				} */
				
				//resets map & opacity slider for each layer selected 
				if (x.name != "US Land Acquisitions") {
					getBounds(activeMap);
					removeOpacitySlider();
					setTimeout(function() {
						map.removeLayer(ta);
						$('.my-labels').hide();
						addOpacitySlider(activeLayer);
						grey.addTo(americaTransformedMap);
						addCaption(activeMap);
					}, 10);
				}
			});
		/////////////////CREATE & DEFINE OPACITY SLIDER////////////////
		//creates opacity slider   
		var opacitySlider = L.control({position: 'bottomleft'});
		opacitySlider.onAdd = function (map) {
			// creates a div with a class "opacity-slider"
			this._div = L.DomUtil.create('div', 'opacity-slider'); 
			this.update();
			return this._div;
		 };
		 //html for opacity slider look & functionality 
		 opacitySlider.update = function (props) {
			this._div.innerHTML = '<input type="range" class = "ui-slider-handle" id="opacity-changer" min="0" max="10" value="10"></input>';
		 };

		//defines function to add opacity slider to the map and control map dragging
		//TO DO: disable for touch as well as mouseover 
		function addOpacitySlider(currentLayer) {
			opacitySlider.addTo(map);

			//disable dragging when cursor is over the element
			opacitySlider.getContainer().addEventListener('pointerover', function () {
				map.dragging.disable();
			});
			
			// Re-enable dragging when user's cursor leaves the element
			opacitySlider.getContainer().addEventListener('pointerout', function () {
				map.dragging.enable();
			});
				
			 // create event listener for opacity range slider
			 $("#opacity-changer").on("input", function(e) {
				 var sliderValue = $(this).val();
				 currentLayer.setOpacity(sliderValue / 10);
				 $('#current-opacity').text((sliderValue * 10) + "%");
			 });
			 
			 $("#opacity-changer").on(eventMap.mouseup, function(event) {
			 var sliderValue = $(this).val();
			 currentLayer.setOpacity(sliderValue / 10);
			 $('#current-opacity').text((sliderValue * 10) + "%");
			 });
				
			var container = $('#transparency-control');
			container.prepend($("#opacity-slider"));
			container.prepend($("#opacity-changer"));
		}
		//defines function to remove opacity slider from the map 
		function removeOpacitySlider() {
			$("#opacity-slider").remove();
			$("#opacity-changer").remove();
		}	
		//function to add content to content panel 
		function addCaption(activeMap){
			var keys = Object.keys(allcaptions);
			keys.forEach(function(key) { //loop through keys array
				if (activeMap === allcaptions[key][0]) {
					$('.caption-content-element').hide();
					$('.caption-panel').show();
					$('.caption-panel').scrollTop();
					$('.main-panel').hide();
					var caption = (allcaptions[key][1]).show();
					var container = $('.caption-panel');
					container.append(caption);		
				}
			});	
		}
		//function to get bounds 
		function getBounds(activeMap){
		var keys = Object.keys(allcaptions);
		keys.forEach(function(key) { //loop through keys array
			if (activeMap === allcaptions[key][0]) {
				var newbounds = allcaptions[key][2];
				map.fitBounds(newbounds);			
			}
		});		
	}
	}
}); 
   
};



$(document).ready(createMap);
