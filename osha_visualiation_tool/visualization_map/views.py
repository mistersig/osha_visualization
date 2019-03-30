from django.shortcuts import render

# Create your views here.

from visualization_map.models import Accident17, FatCat17,Followup17,Complaint17,Monitoring17,Planned17,Referral17,Variance17,FatalitiesCountGraph,HospitalizedCountGraph,AmputationCountGraph,SevereInjuryZipMap,SevereInjuryMap,FatalitiesStates17,FatalitiesZipMap

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


def index(request):
	if request.method == 'GET':


		#inspection data 
		accident_2017 = Accident17.objects.all()
		accident_data = serializers.serialize('geojson', accident_2017, fields=('insp_type','score','state_name','code','geom','fid'))

		complaint_2017 = Complaint17.objects.all()
		complaint_data = serializers.serialize('geojson', complaint_2017, fields=('insp_type','score','state_name','code','geom','fid'))

		fat_cat_2017 = FatCat17.objects.all()
		fat_cat_data = serializers.serialize('geojson', fat_cat_2017, fields=('insp_type','score','state_name','code','geom','fid'))


		follow_up_2017 = Followup17.objects.all()
		follow_up_data = serializers.serialize('geojson', follow_up_2017, fields=('insp_type','score','state_name','code','geom','fid'))

		monitoring_2017 = Monitoring17.objects.all()
		monitoring_data = serializers.serialize('geojson', monitoring_2017, fields=('insp_type','score','state_name','code','geom','fid'))


		variance_2017 = Variance17.objects.all()
		variance_data = serializers.serialize('geojson', variance_2017, fields=('insp_type','score','state_name','code','geom','fid'))

		referrals_2017 = Referral17.objects.all()
		referral_data = serializers.serialize('geojson', referrals_2017, fields=('insp_type','score','state_name','code','geom','fid'))


		# planned_2017 = Planned17.objects.all()
		# planned_data = serializers.serialize('geojson', planned_2017, fields=('insp_type','score','state_name','code','geom','fid'))

		planned_2017 = Planned17.objects.all()
		planned_data = serializers.serialize('geojson', planned_2017, fields=('insp_type','score','state_name','code','geom','fid'))



		# CHART JS DATA

		fatalities_graph_2017 = FatalitiesCountGraph.objects.all()
		fatalities_graph = serializers.serialize('json', fatalities_graph_2017, fields=('event_month','count','fid'))


		hospitalized_graph_2017 = HospitalizedCountGraph.objects.all()
		hospitalized_graph = serializers.serialize('json', hospitalized_graph_2017, fields=('event_month','injury_count','fid'))

		amputation_graph_2017 = AmputationCountGraph.objects.all()
		amputation_graph = serializers.serialize('json', amputation_graph_2017, fields=('event_month','injury_count','fid'))				


  		#fatalities_data

		severe_injury_zip = SevereInjuryZipMap.objects.all()
		# severe_zip_data = serializers.serialize('geojson', severe_injury_zip, fields=('zipcode','injury_count','geom','fid'))

		severe_injury_map = SevereInjuryMap.objects.all()
		severe_state_data = serializers.serialize('geojson', severe_injury_map, fields=('code','state_name','score','geom','fid'))

		#severe_injuries
		fatalities_states = FatalitiesStates17.objects.all()
		fatalities_states_data = serializers.serialize('geojson', fatalities_states, fields=('code','state_name','score','geom','fid'))

		fatalities_zip = FatalitiesZipMap.objects.all()
		# fatalities_zip_data = serializers.serialize('geojson', fatalities_zip, fields=('zipcode','injury_count','geom','fid'))

		
		return render(request,'index.html',{'accident_data_17':accident_data,'complaint_data_17':complaint_data,'fat_cat_data_17':fat_cat_data,'follow_up_data_17':follow_up_data,'monitoring_data_17':monitoring_data,'variance_data_17':variance_data,'referrals_data_17':referral_data,'severe_state_data_17':severe_state_data,'fatalities_states_data_17':fatalities_states_data,'planned_data_17':planned_data,'fatalities_data_17':fatalities_graph,'hospitalized_data_17':hospitalized_graph,'amputation_data_17':amputation_graph})
		
		