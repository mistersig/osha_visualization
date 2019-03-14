# Create your models here.
# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.contrib.gis.db import models
from django.contrib.gis.db import models
from django.contrib.gis.geos import GEOSGeometry  
from decimal import Decimal

class NaicsCodesData(models.Model):
    codes = models.IntegerField(primary_key=True)
    titles = models.CharField(max_length=300, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'naics_codes_data'


class FatalitiesDataTable(models.Model):
    fid = models.SmallIntegerField(primary_key=True)
    incident_date = models.DateField(blank=True, null=True)
    company = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=50, blank=True, null=True)
    state = models.CharField(max_length=2, blank=True, null=True)
    zipcode = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'fatalities_data_table'


##state count levels
class FatalitiesStatesCount(models.Model):
    year_s = models.FloatField(blank=True, null=True)
    count = models.BigIntegerField(blank=True, null=True)
    state = models.CharField(max_length=2, blank=True, null=True)
    geom = models.MultiPolygonField(blank=True, null=True)
    fid = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'fatalities_states_count'

#Injurry by state and years
# class InjuryStateCount(models.Model):
#     year_s = models.FloatField(blank=True, null=True)
#     count = models.BigIntegerField(blank=True, null=True)
#     state = models.CharField(max_length=32, blank=True, null=True)
#     geom = models.MultiPolygonField(blank=True, null=True)
#     fid = models.AutoField(primary_key=True)

#     class Meta:
#         managed = False
#         db_table = 'injury_state_count'


class OshaInspectionData(models.Model):
    activity_nr = models.IntegerField(primary_key=True)
    reporting_id = models.IntegerField(blank=True, null=True)
    state_flag = models.CharField(max_length=6, blank=True, null=True)
    estab_name = models.CharField(max_length=128, blank=True, null=True)
    site_address = models.CharField(max_length=200, blank=True, null=True)
    site_city = models.CharField(max_length=64, blank=True, null=True)
    site_state = models.CharField(max_length=2, blank=True, null=True)
    site_zip = models.IntegerField(blank=True, null=True)
    owner_type = models.CharField(max_length=32, blank=True, null=True)
    owner_code = models.IntegerField(blank=True, null=True)
    adv_notice = models.CharField(max_length=2, blank=True, null=True)
    safety_hlth = models.CharField(max_length=2, blank=True, null=True)
    sic_code = models.IntegerField(blank=True, null=True)
    naics_code = models.IntegerField(blank=True, null=True)
    insp_type = models.CharField(max_length=20, blank=True, null=True)
    insp_scope = models.CharField(max_length=20, blank=True, null=True)
    why_no_insp = models.CharField(max_length=32, blank=True, null=True)
    union_status = models.CharField(max_length=6, blank=True, null=True)
    safety_manuf = models.CharField(max_length=10, blank=True, null=True)
    safety_const = models.CharField(max_length=10, blank=True, null=True)
    safety_marit = models.CharField(max_length=10, blank=True, null=True)
    health_manuf = models.CharField(max_length=10, blank=True, null=True)
    health_const = models.CharField(max_length=10, blank=True, null=True)
    health_marit = models.CharField(max_length=10, blank=True, null=True)
    migrant = models.CharField(max_length=10, blank=True, null=True)
    mail_street = models.CharField(max_length=200, blank=True, null=True)
    mail_city = models.CharField(max_length=64, blank=True, null=True)
    mail_state = models.CharField(max_length=2, blank=True, null=True)
    mail_zip = models.IntegerField(blank=True, null=True)
    host_est_key = models.CharField(max_length=20, blank=True, null=True)
    nr_in_estab = models.IntegerField(blank=True, null=True)
    open_date = models.DateField(blank=True, null=True)
    case_mod_date = models.DateField(blank=True, null=True)
    close_conf_date = models.DateField(blank=True, null=True)
    close_case_date = models.DateField(blank=True, null=True)
    ld_dt = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'osha_inspection_data'


class OshaSevereInjuryData(models.Model):
    injury_index = models.IntegerField(primary_key=True)
    incident_id = models.BigIntegerField(blank=True, null=True)
    event_date = models.DateField(blank=True, null=True)
    employer = models.CharField(max_length=128, blank=True, null=True)
    address1 = models.CharField(max_length=128, blank=True, null=True)
    address2 = models.CharField(max_length=128, blank=True, null=True)
    city = models.CharField(max_length=64, blank=True, null=True)
    state = models.CharField(max_length=32, blank=True, null=True)
    zipcode = models.IntegerField(blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    naics_code = models.IntegerField(blank=True, null=True)
    hospitalized = models.SmallIntegerField(blank=True, null=True)
    amputation = models.SmallIntegerField(blank=True, null=True)
    final_description = models.CharField(max_length=3000, blank=True, null=True)
    body_part = models.CharField(max_length=64, blank=True, null=True)
    # geom = GEOSGeometry('POINT(' + longitude + latitude+')')
    # geom = GEOSGeometry('POINT(' + longitude + latitude+')')

    # fromstr('POINT(' + my_long_lat + ')')
    # geom = GEOSGeometry("POINT({0} {1})".format(longitude, latitude))
    geom = models.PointField("POINT({0} {1})".format(longitude, latitude))

    def __unicode__(self):
    	return self.injury_index

    class Meta:
        managed = False
        db_table = 'osha_severe_injury_data'


class SicCodesData(models.Model):
    code = models.SmallIntegerField(primary_key=True)
    description = models.CharField(max_length=128, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sic_codes_data'


class UsStatesSpatialData(models.Model):
    gid = models.AutoField(primary_key=True)
    statefp = models.CharField(max_length=2, blank=True, null=True)
    statens = models.CharField(max_length=8, blank=True, null=True)
    affgeoid = models.CharField(max_length=11, blank=True, null=True)
    geoid = models.CharField(max_length=2, blank=True, null=True)
    stusps = models.CharField(max_length=2, blank=True, null=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    lsad = models.CharField(max_length=2, blank=True, null=True)
    aland = models.FloatField(blank=True, null=True)
    awater = models.FloatField(blank=True, null=True)
    geom = models.MultiPolygonField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'us_states_spatial_data'


class ZipcodesSpatialData(models.Model):
    gid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=254, blank=True, null=True)
    descriptio = models.CharField(max_length=254, blank=True, null=True)
    timestamp = models.CharField(max_length=24, blank=True, null=True)
    begin = models.CharField(max_length=24, blank=True, null=True)
    end = models.CharField(max_length=24, blank=True, null=True)
    altitudemo = models.CharField(max_length=254, blank=True, null=True)
    tessellate = models.BigIntegerField(blank=True, null=True)
    extrude = models.BigIntegerField(blank=True, null=True)
    visibility = models.BigIntegerField(blank=True, null=True)
    draworder = models.BigIntegerField(blank=True, null=True)
    icon = models.CharField(max_length=254, blank=True, null=True)
    zcta5ce10 = models.CharField(max_length=254, blank=True, null=True)
    affgeoid10 = models.CharField(max_length=254, blank=True, null=True)
    geoid10 = models.CharField(max_length=254, blank=True, null=True)
    aland10 = models.CharField(max_length=254, blank=True, null=True)
    awater10 = models.CharField(max_length=254, blank=True, null=True)
    geom = models.MultiPolygonField(dim=4, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'zipcodes_spatial_data'

