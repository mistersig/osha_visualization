from django.shortcuts import render

# Create your views here.

#replace with my models
# from visualization_map.models import AllLayers,Photos,PublicArt,Restaurants,Sports,Testing,WaterLeisure,Zoo
# from visualization_map.models import OshaSevereInjuryData,FatalitiesStatesCount,InjuryStateCount
# from visualization_map.models import OshaSevereInjuryData,FatalitiesStatesCount
# from visualization_map.models import FatalitiesStatesCountYear, FatalitiesStatesAllYears, SevereInjuryData, InspectionStateAll
# from visualization_map.models import NoInspections17,AllInspections17,FatalitiesFy1617,SevereInjury2017
# from visualization_map.models import FatalitiesFy1617,SevereInjury2017,Accident17,Complaint17,FatCat17,Followup17,Variance17,Referrals17,Planned17,Monitoring17

from visualization_map.models import Accident17, FatCat17,Followup17

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
		# fatal_16_17years = FatalitiesFy1617.objects.all()
		# fatal_fiscal_data = serializers.serialize('geojson', fatal_16_17years, fields=('name','stusps','fatalities','geom','fid'))

		# severe_injuries_2017 = SevereInjury2017.objects.all()
		# severe_data = serializers.serialize('geojson', severe_injuries_2017, fields=('event_date','employer','address1','city','state','zipcode','latitude','longitude','industry','hospitalized','amputation','final_description','body_part','geom','fid'))		

		
		accident_2017 = Accident17.objects.all()
		accident_data = serializers.serialize('geojson', accident_2017, fields=('insp_type','score','state_name','code','geom','fid'))

		# complaint_2017 = Complaint17.objects.all()
		# complaint_data = serializers.serialize('geojson', complaint_2017, fields=('insp_type','score','state_name','code','geom','fid'))

		fat_cat_2017 = FatCat17.objects.all()
		fat_cat_data = serializers.serialize('geojson', fat_cat_2017, fields=('insp_type','score','state_name','code','geom','fid'))


		follow_up_2017 = Followup17.objects.all()
		follow_up_data = serializers.serialize('geojson', follow_up_2017, fields=('insp_type','score','state_name','code','geom','fid'))

		# monitoring_2017 = Monitoring17.objects.all()
		# monitoring_data = serializers.serialize('geojson', monitoring_2017, fields=('insp_type','score','state_name','code','geom','fid'))


		# variance_2017 = Variance17.objects.all()
		# variance_data = serializers.serialize('geojson', variance_2017, fields=('insp_type','score','state_name','code','geom','fid'))

		# referrals_2017 = Referrals17.objects.all()
		# referral_data = serializers.serialize('geojson', referrals_2017, fields=('insp_type','score','state_name','code','geom','fid'))


		# planned_2017 = Planned17.objects.all()
		# planned_data = serializers.serialize('geojson', planned_2017, fields=('insp_type','score','state_name','code','geom','fid'))


  



		# return render(request,'index.html',{'fatalities_fy_16_17':fatal_fiscal_data,'severe_injuries':severe_data,'accident_data_17':accident_data,'complaint_data_17':complaint_data,'fat_cat_data_17':fat_cat_data,'follow_up_data_17':follow_up_data,'monitoring_data_17':monitoring_data,'variance_data_17':variance_data,'referrals_data_17':referral_data,'planned_data_17':planned_data})
		return render(request,'index.html',{'accident_data_17':accident_data,'fat_cat_data_17':fat_cat_data,'follow_up_data_17':follow_up_data})





	
		# form = NameForm()
		
		# return render(request,'index.html',{'injurys':injury_data,'fatalities_states':f_state_data,'injuries_states':i_state_data})
		
		




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


