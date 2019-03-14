from django.shortcuts import render

# Create your views here.

#replace with my models
# from visualization_map.models import AllLayers,Photos,PublicArt,Restaurants,Sports,Testing,WaterLeisure,Zoo
# from visualization_map.models import OshaSevereInjuryData,FatalitiesStatesCount,InjuryStateCount
from visualization_map.models import OshaSevereInjuryData,FatalitiesStatesCount
from django.core import serializers
# from django.core import serialize
from django.http import JsonResponse
from django.http import HttpResponse
from django.template.response import TemplateResponse
from django.core.serializers.json import DjangoJSONEncoder
import json

from django.views.generic import TemplateView


from django.http import HttpResponseRedirect
from django.shortcuts import render,redirect
#from .forms import NameForm,photoForms

#from . import forms

#Test
#OshaInspectionData

# def index(request):
# 	return render(request,'index.html')

def index(request):
	if request.method == 'GET':
		#injury_data
		injurys = OshaSevereInjuryData.objects.all()
		injury_data = serializers.serialize('geojson', injurys, fields=('injury_index','incident_id','event_date','employer','address1','address2','city','state','zipcode','latitude','longitude','naics_code','hospitalized','amputation','final_description','body_part','geom'))

		fatalities_count = FatalitiesStatesCount.objects.all()
		f_state_data = serializers.serialize('geojson', fatalities_count, fields=('year_s','count','state','geom','fid'))

		# injuries_count = InjuryStateCount.objects.all()
		# i_state_data = serializers.serialize('geojson', injuries_count, fields=('year_s','count','state','geom','fid' ))		


		# all_L = OshaInspectionData.objects.all()

		# all_data = serializers.serialize('geojson', all_L, fields=('geoid','place_name','icon_name','latitude','longitude','geom'))
		# #arts in park
		# art = PublicArt.objects.all()
		# art_data = serializers.serialize('geojson', art, fields=('geoid','park_name','park_number','place_name','artist_name','latitude','longitude','geom'))
		# #food in park
		# food = Restaurants.objects.all()
		# food_data = serializers.serialize('geojson', food, fields=('geoid','activity_type','place_name','latitude','longitude','geom'))
		# #all physical activites 
		# photos = Photos.objects.all()
		# photo_data = serializers.serialize('geojson', photos, fields=('ids','caption','image','latitude','longitude','geom'))
		# #all physical activites 
		# sports = Sports.objects.all()
		# sports_data = serializers.serialize('geojson', sports, fields=('geoid','place_name','latitude','longitude','geom'))
		# #water based activites Beach, Harbor, Yatch
		# water = WaterLeisure.objects.all()
		# water_data = serializers.serialize('geojson', water, fields=('geoid','activity_type','place_name','longitude','latitude','geom'))
		# #layer for Lincoln Park Zoo activites
		# zoo = Zoo.objects.all()
		# zoo_data = serializers.serialize('geojson', zoo,fields=('geoid','activity_type','place_name','longitude','latitude','geom'))
		# form = NameForm()
		
		# return render(request,'index.html',{'injurys':injury_data,'fatalities_states':f_state_data,'injuries_states':i_state_data})
		return render(request,'index.html',{'injurys':injury_data,'fatalities_states':f_state_data})
		




# def index(request):
# 	if request.method == 'GET':
# 		all_L = AllLayers.objects.all()

# 		all_data = serializers.serialize('geojson', all_L, fields=('geoid','place_name','icon_name','latitude','longitude','geom'))
		
# 		#arts in park
# 		art = PublicArt.objects.all()
# 		art_data = serializers.serialize('geojson', art, fields=('geoid','park_name','park_number','place_name','artist_name','latitude','longitude','geom'))


		#food in park
		# food = Restaurants.objects.all()
		# food_data = serializers.serialize('geojson', food, fields=('geoid','activity_type','place_name','latitude','longitude','geom'))
		# #all physical activites 
		# photos = Photos.objects.all()
		# photo_data = serializers.serialize('geojson', photos, fields=('ids','caption','image','latitude','longitude','geom'))
		# #all physical activites 
		# sports = Sports.objects.all()
		# sports_data = serializers.serialize('geojson', sports, fields=('geoid','place_name','latitude','longitude','geom'))
		# #water based activites Beach, Harbor, Yatch
		# water = WaterLeisure.objects.all()
		# water_data = serializers.serialize('geojson', water, fields=('geoid','activity_type','place_name','longitude','latitude','geom'))
		# #layer for Lincoln Park Zoo activites
		# zoo = Zoo.objects.all()
		# zoo_data = serializers.serialize('geojson', zoo,fields=('geoid','activity_type','place_name','longitude','latitude','geom'))
		# form = NameForm()
		# return render(request,'park/index.html',{'all_data_layer':all_data, 'art':art_data,'food':food_data,'pictures':photo_data,'sports':sports_data,'water':water_data,'zoo':zoo_data,'form':form})
		# return render(request,'park/index.html',{'all_data_layer':all_data,'art':art_data,'food':food_data,'pictures':photo_data,'sports':sports_data,'water':water_data,'zoo':zoo_data})
		# return render(request,'index.html')



	# elif request.method == 'POST':
	# 	# if request.POST.get('in_name'):
	# 	#database
	# 	post = Photos()
	# 	post.ids= request.POST.get('ids')
	# 	post.caption= request.POST.get('caption')
	# 	post.image= request.POST.get('fileupload')
	# 	post.latitude= request.POST.get('latitude')
	# 	post.longitude= request.POST.get('longitude')
		
	# 	post.save()
	# 	return HttpResponseRedirect("http://127.0.0.1:8000/")
		# else:
		# 	return HttpResponseRedirect("http://127.0.0.1:8000/")









#SAVE This
#http://www.learningaboutelectronics.com/Articles/How-to-insert-data-into-a-database-from-an-HTML-form-in-Django.php


