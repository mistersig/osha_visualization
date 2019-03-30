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





class Accident17(models.Model):
    insp_type = models.CharField(max_length=20, blank=True, null=True)
    # score = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    score = models.BigIntegerField(blank=True, null=True)
    state_name = models.CharField(max_length=100, blank=True, null=True)
    code = models.CharField(max_length=2, blank=True, null=True)
    geom = models.MultiPolygonField(blank=True, null=True)
    fid = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'accident_17'


class FatCat17(models.Model):
    insp_type = models.CharField(max_length=20, blank=True, null=True)
    score = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    state_name = models.CharField(max_length=100, blank=True, null=True)
    code = models.CharField(max_length=2, blank=True, null=True)
    geom = models.MultiPolygonField(blank=True, null=True)
    fid = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'fat_cat_17'





class Followup17(models.Model):
    insp_type = models.CharField(max_length=20, blank=True, null=True)
    score = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    state_name = models.CharField(max_length=100, blank=True, null=True)
    code = models.CharField(max_length=2, blank=True, null=True)
    geom = models.MultiPolygonField(blank=True, null=True)
    fid = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'followup_17'

class Complaint17(models.Model):
    insp_type = models.CharField(max_length=20, blank=True, null=True)
    score = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    state_name = models.CharField(max_length=100, blank=True, null=True)
    code = models.CharField(max_length=2, blank=True, null=True)
    geom = models.MultiPolygonField(blank=True, null=True)
    fid = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'complaint_17'

class Monitoring17(models.Model):
    insp_type = models.CharField(max_length=20, blank=True, null=True)
    score = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    state_name = models.CharField(max_length=100, blank=True, null=True)
    code = models.CharField(max_length=2, blank=True, null=True)
    geom = models.MultiPolygonField(blank=True, null=True)
    fid = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'monitoring_17'

class Planned17(models.Model):
    insp_type = models.CharField(max_length=20, blank=True, null=True)
    score = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    state_name = models.CharField(max_length=100, blank=True, null=True)
    code = models.CharField(max_length=2, blank=True, null=True)
    geom = models.MultiPolygonField(blank=True, null=True)
    fid = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'planned_17'

class Referral17(models.Model):
    insp_type = models.CharField(max_length=20, blank=True, null=True)
    score = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    state_name = models.CharField(max_length=100, blank=True, null=True)
    code = models.CharField(max_length=2, blank=True, null=True)
    geom = models.MultiPolygonField(blank=True, null=True)
    fid = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'referral_17'



class Variance17(models.Model):
    insp_type = models.CharField(max_length=20, blank=True, null=True)
    score = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    state_name = models.CharField(max_length=100, blank=True, null=True)
    code = models.CharField(max_length=2, blank=True, null=True)
    geom = models.MultiPolygonField(blank=True, null=True)
    fid = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'variance_17'



class FatalitiesCountGraph(models.Model):
    event_month = models.TextField(blank=True, null=True)
    count = models.BigIntegerField(blank=True, null=True)
    fid = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'fatalities_count_graph'



class HospitalizedCountGraph(models.Model):
    event_month = models.TextField(blank=True, null=True)
    injury_count = models.BigIntegerField(blank=True, null=True)
    fid = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'hospitalized_count_graph'


class AmputationCountGraph(models.Model):
    event_month = models.TextField(blank=True, null=True)
    injury_count = models.BigIntegerField(blank=True, null=True)
    fid = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'amputation_count_graph'

class SevereInjuryMap(models.Model):
    code = models.CharField(max_length=2, blank=True, null=True)
    state_name = models.CharField(max_length=100, blank=True, null=True)
    score = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    geom = models.MultiPolygonField(blank=True, null=True)
    fid = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'severe_injury_map'


class FatalitiesStates17(models.Model):
    code = models.CharField(max_length=2, blank=True, null=True)
    state_name = models.CharField(max_length=100, blank=True, null=True)
    score = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    geom = models.MultiPolygonField(blank=True, null=True)
    fid = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'fatalities_states_17'

















class FatalitiesZipMap(models.Model):
    zipcode = models.IntegerField(blank=True, null=True)
    injury_count = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    geom = models.MultiPolygonField(dim=4, blank=True, null=True)
    fid = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'fatalities_zip_map'

class SevereInjuryZipMap(models.Model):
    zipcode = models.IntegerField(blank=True, null=True)
    injury_count = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    geom = models.MultiPolygonField(blank=True, null=True)
    fid = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'severe_injury_zip_map'










                








# class SevereInjury2017(models.Model):
#     event_date = models.DateField(blank=True, null=True)
#     employer = models.CharField(max_length=128, blank=True, null=True)
#     address1 = models.CharField(max_length=128, blank=True, null=True)
#     city = models.CharField(max_length=64, blank=True, null=True)
#     state = models.CharField(max_length=32, blank=True, null=True)
#     zipcode = models.IntegerField(blank=True, null=True)
#     latitude = models.FloatField(blank=True, null=True)
#     longitude = models.FloatField(blank=True, null=True)
#     industry = models.CharField(max_length=300, blank=True, null=True)
#     hospitalized = models.SmallIntegerField(blank=True, null=True)
#     amputation = models.SmallIntegerField(blank=True, null=True)
#     final_description = models.CharField(max_length=3000, blank=True, null=True)
#     body_part = models.CharField(max_length=64, blank=True, null=True)
#     geom = models.PointField(blank=True, null=True)
#     fid = models.AutoField(primary_key=True)

#     class Meta:
#         managed = False
#         db_table = 'severe_injury_2017'


# class FatalitiesFy1617(models.Model):
#     name = models.CharField(max_length=100, blank=True, null=True)
#     stusps = models.CharField(max_length=2, blank=True, null=True)
#     fatalities = models.BigIntegerField(blank=True, null=True)
#     geom = models.MultiPolygonField(blank=True, null=True)
#     fid = models.AutoField(primary_key=True)

#     class Meta:
#         managed = False
#         db_table = 'fatalities_fy_16_17'



# class Planned17(models.Model):
#     insp_type = models.CharField(max_length=20, blank=True, null=True)
#     count = models.BigIntegerField(blank=True, null=True)
#     stusps = models.CharField(max_length=2, blank=True, null=True)
#     geom = models.MultiPolygonField(blank=True, null=True)
#     fid = models.AutoField(primary_key=True)

#     class Meta:
#         managed = False
#         db_table = 'planned_17'


# class Referrals17(models.Model):
#     insp_type = models.CharField(max_length=20, blank=True, null=True)
#     count = models.BigIntegerField(blank=True, null=True)
#     stusps = models.CharField(max_length=2, blank=True, null=True)
#     geom = models.MultiPolygonField(blank=True, null=True)
#     fid = models.AutoField(primary_key=True)

#     class Meta:
#         managed = False
#         db_table = 'referrals_17'

# class Variance17(models.Model):
#     insp_type = models.CharField(max_length=20, blank=True, null=True)
#     count = models.BigIntegerField(blank=True, null=True)
#     stusps = models.CharField(max_length=2, blank=True, null=True)
#     geom = models.MultiPolygonField(blank=True, null=True)
#     fid = models.AutoField(primary_key=True)

#     class Meta:
#         managed = False
#         db_table = 'variance_17'

# class NoInspections17(models.Model):
#     estab_name = models.CharField(max_length=128, blank=True, null=True)
#     site_city = models.CharField(max_length=64, blank=True, null=True)
#     site_state = models.CharField(max_length=2, blank=True, null=True)
#     site_zip = models.IntegerField(blank=True, null=True)
#     owner_type = models.CharField(max_length=32, blank=True, null=True)
#     adv_notice = models.CharField(max_length=2, blank=True, null=True)
#     description = models.CharField(max_length=128, blank=True, null=True)
#     titles = models.CharField(max_length=300, blank=True, null=True)
#     insp_type = models.CharField(max_length=20, blank=True, null=True)
#     insp_scope = models.CharField(max_length=20, blank=True, null=True)
#     union_status = models.CharField(max_length=6, blank=True, null=True)
#     open_date = models.DateField(blank=True, null=True)
#     geom = models.MultiPolygonField(blank=True, null=True)
#     fid = models.AutoField(primary_key=True)

#     class Meta:
#         managed = False
#         db_table = 'no_inspections_17'


# class Monitoring17(models.Model):
#     insp_type = models.CharField(max_length=20, blank=True, null=True)
#     count = models.BigIntegerField(blank=True, null=True)
#     stusps = models.CharField(max_length=2, blank=True, null=True)
#     geom = models.MultiPolygonField(blank=True, null=True)
#     fid = models.AutoField(primary_key=True)

#     class Meta:
#         managed = False
#         db_table = 'monitoring_17'


# class Followup17(models.Model):
#     insp_type = models.CharField(max_length=20, blank=True, null=True)
#     count = models.BigIntegerField(blank=True, null=True)
#     stusps = models.CharField(max_length=2, blank=True, null=True)
#     geom = models.MultiPolygonField(blank=True, null=True)
#     fid = models.AutoField(primary_key=True)

#     class Meta:
#         managed = False
#         db_table = 'followup_17'

# class FatCat17(models.Model):
#     insp_type = models.CharField(max_length=20, blank=True, null=True)
#     count = models.BigIntegerField(blank=True, null=True)
#     stusps = models.CharField(max_length=2, blank=True, null=True)
#     geom = models.MultiPolygonField(blank=True, null=True)
#     fid = models.AutoField(primary_key=True)

#     class Meta:
#         managed = False
#         db_table = 'fat_cat_17'

# class Complaint17(models.Model):
#     insp_type = models.CharField(max_length=20, blank=True, null=True)
#     count = models.BigIntegerField(blank=True, null=True)
#     stusps = models.CharField(max_length=2, blank=True, null=True)
#     geom = models.MultiPolygonField(blank=True, null=True)
#     fid = models.AutoField(primary_key=True)

#     class Meta:
#         managed = False
#         db_table = 'complaint_17'                                                

# class Accident17(models.Model):
#     insp_type = models.CharField(max_length=20, blank=True, null=True)
#     count = models.BigIntegerField(blank=True, null=True)
#     stusps = models.CharField(max_length=2, blank=True, null=True)
#     geom = models.MultiPolygonField(blank=True, null=True)
#     fid = models.AutoField(primary_key=True)

#     class Meta:
#         managed = False
#         db_table = 'accident_17'


# class AllInspections17(models.Model):
#     estab_name = models.CharField(max_length=128, blank=True, null=True)
#     site_city = models.CharField(max_length=64, blank=True, null=True)
#     site_state = models.CharField(max_length=2, blank=True, null=True)
#     site_zip = models.IntegerField(blank=True, null=True)
#     owner_type = models.CharField(max_length=32, blank=True, null=True)
#     adv_notice = models.CharField(max_length=2, blank=True, null=True)
#     description = models.CharField(max_length=128, blank=True, null=True)
#     titles = models.CharField(max_length=300, blank=True, null=True)
#     insp_type = models.CharField(max_length=20, blank=True, null=True)
#     insp_scope = models.CharField(max_length=20, blank=True, null=True)
#     union_status = models.CharField(max_length=6, blank=True, null=True)
#     open_date = models.DateField(blank=True, null=True)
#     geom = models.MultiPolygonField(blank=True, null=True)
#     fid = models.AutoField(primary_key=True)

#     class Meta:
#         managed = False
#         db_table = 'all_inspections_17'


































# class AllInspections17(models.Model):
#     estab_name = models.CharField(max_length=128, blank=True, null=True)
#     site_city = models.CharField(max_length=64, blank=True, null=True)
#     site_state = models.CharField(max_length=2, blank=True, null=True)
#     site_zip = models.IntegerField(blank=True, null=True)
#     owner_type = models.CharField(max_length=32, blank=True, null=True)
#     adv_notice = models.CharField(max_length=2, blank=True, null=True)
#     description = models.CharField(max_length=128, blank=True, null=True)
#     titles = models.CharField(max_length=300, blank=True, null=True)
#     insp_type = models.CharField(max_length=20, blank=True, null=True)
#     insp_scope = models.CharField(max_length=20, blank=True, null=True)
#     union_status = models.CharField(max_length=6, blank=True, null=True)
#     open_date = models.DateField(blank=True, null=True)
#     geom = models.MultiPolygonField(blank=True, null=True)
#     fid = models.AutoField(primary_key=True)

#     class Meta:
#         managed = False
#         db_table = 'all_inspections_17'

# class NoInspections17(models.Model):
#     estab_name = models.CharField(max_length=128, blank=True, null=True)
#     site_city = models.CharField(max_length=64, blank=True, null=True)
#     site_state = models.CharField(max_length=2, blank=True, null=True)
#     site_zip = models.IntegerField(blank=True, null=True)
#     owner_type = models.CharField(max_length=32, blank=True, null=True)
#     adv_notice = models.CharField(max_length=2, blank=True, null=True)
#     description = models.CharField(max_length=128, blank=True, null=True)
#     titles = models.CharField(max_length=300, blank=True, null=True)
#     insp_type = models.CharField(max_length=20, blank=True, null=True)
#     insp_scope = models.CharField(max_length=20, blank=True, null=True)
#     union_status = models.CharField(max_length=6, blank=True, null=True)
#     open_date = models.DateField(blank=True, null=True)
#     geom = models.MultiPolygonField(blank=True, null=True)
#     fid = models.AutoField(primary_key=True)

#     class Meta:
#         managed = False
#         db_table = 'no_inspections_17'


# class FatalitiesStatesCountYear(models.Model):
#     year_s = models.FloatField(blank=True, null=True)
#     count = models.BigIntegerField(blank=True, null=True)
#     state = models.CharField(max_length=2, blank=True, null=True)
#     geom = models.MultiPolygonField(blank=True, null=True)
#     fid = models.AutoField(primary_key=True)

#     class Meta:
#         managed = False
#         db_table = 'fatalities_states_count_year'

# class FatalitiesStatesAllYears(models.Model):
#     count = models.BigIntegerField(blank=True, null=True)
#     state = models.CharField(max_length=2, blank=True, null=True)
#     geom = models.MultiPolygonField(blank=True, null=True)
#     fid = models.AutoField(primary_key=True)

#     class Meta:
#         managed = False
#         db_table = 'fatalities_states_all_years'

# class SevereInjuryData(models.Model):
#     event_date = models.DateField(blank=True, null=True)
#     employer = models.CharField(max_length=128, blank=True, null=True)
#     address1 = models.CharField(max_length=128, blank=True, null=True)
#     city = models.CharField(max_length=64, blank=True, null=True)
#     state = models.CharField(max_length=32, blank=True, null=True)
#     zipcode = models.IntegerField(blank=True, null=True)
#     latitude = models.FloatField(blank=True, null=True)
#     longitude = models.FloatField(blank=True, null=True)
#     industry = models.CharField(max_length=300, blank=True, null=True)
#     hospitalized = models.SmallIntegerField(blank=True, null=True)
#     amputation = models.SmallIntegerField(blank=True, null=True)
#     final_description = models.CharField(max_length=3000, blank=True, null=True)
#     body_part = models.CharField(max_length=64, blank=True, null=True)
#     geom = models.PointField(blank=True, null=True)
#     fid = models.AutoField(primary_key=True)

#     class Meta:
#         managed = False
#         db_table = 'severe_injury_data'

# class InspectionStateAll(models.Model):
#     site_state = models.CharField(max_length=2, blank=True, null=True)
#     site_zip = models.IntegerField(blank=True, null=True)
#     owner_type = models.CharField(max_length=32, blank=True, null=True)
#     adv_notice = models.CharField(max_length=2, blank=True, null=True)
#     safety_hlth = models.CharField(max_length=2, blank=True, null=True)
#     description = models.CharField(max_length=128, blank=True, null=True)
#     titles = models.CharField(max_length=300, blank=True, null=True)
#     insp_scope = models.CharField(max_length=20, blank=True, null=True)
#     why_no_insp = models.CharField(max_length=32, blank=True, null=True)
#     union_status = models.CharField(max_length=6, blank=True, null=True)
#     open_date = models.DateField(blank=True, null=True)
#     close_case_date = models.DateField(blank=True, null=True)
#     geom = models.MultiPolygonField(blank=True, null=True)
#     fid = models.AutoField(primary_key=True)

#     class Meta:
#         managed = False
#         db_table = 'inspection_state_all'











# class NaicsCodesData(models.Model):
#     codes = models.IntegerField(primary_key=True)
#     titles = models.CharField(max_length=300, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'naics_codes_data'


# class FatalitiesDataTable(models.Model):
#     fid = models.SmallIntegerField(primary_key=True)
#     incident_date = models.DateField(blank=True, null=True)
#     company = models.CharField(max_length=100, blank=True, null=True)
#     city = models.CharField(max_length=50, blank=True, null=True)
#     state = models.CharField(max_length=2, blank=True, null=True)
#     zipcode = models.IntegerField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'fatalities_data_table'


##state count levels
# class FatalitiesStatesCount(models.Model):
#     year_s = models.FloatField(blank=True, null=True)
#     count = models.BigIntegerField(blank=True, null=True)
#     state = models.CharField(max_length=2, blank=True, null=True)
#     geom = models.MultiPolygonField(blank=True, null=True)
#     fid = models.AutoField(primary_key=True)

#     class Meta:
#         managed = False
#         db_table = 'fatalities_states_count'





# class OshaInspectionData(models.Model):
#     activity_nr = models.IntegerField(primary_key=True)
#     reporting_id = models.IntegerField(blank=True, null=True)
#     state_flag = models.CharField(max_length=6, blank=True, null=True)
#     estab_name = models.CharField(max_length=128, blank=True, null=True)
#     site_address = models.CharField(max_length=200, blank=True, null=True)
#     site_city = models.CharField(max_length=64, blank=True, null=True)
#     site_state = models.CharField(max_length=2, blank=True, null=True)
#     site_zip = models.IntegerField(blank=True, null=True)
#     owner_type = models.CharField(max_length=32, blank=True, null=True)
#     owner_code = models.IntegerField(blank=True, null=True)
#     adv_notice = models.CharField(max_length=2, blank=True, null=True)
#     safety_hlth = models.CharField(max_length=2, blank=True, null=True)
#     sic_code = models.IntegerField(blank=True, null=True)
#     naics_code = models.IntegerField(blank=True, null=True)
#     insp_type = models.CharField(max_length=20, blank=True, null=True)
#     insp_scope = models.CharField(max_length=20, blank=True, null=True)
#     why_no_insp = models.CharField(max_length=32, blank=True, null=True)
#     union_status = models.CharField(max_length=6, blank=True, null=True)
#     safety_manuf = models.CharField(max_length=10, blank=True, null=True)
#     safety_const = models.CharField(max_length=10, blank=True, null=True)
#     safety_marit = models.CharField(max_length=10, blank=True, null=True)
#     health_manuf = models.CharField(max_length=10, blank=True, null=True)
#     health_const = models.CharField(max_length=10, blank=True, null=True)
#     health_marit = models.CharField(max_length=10, blank=True, null=True)
#     migrant = models.CharField(max_length=10, blank=True, null=True)
#     mail_street = models.CharField(max_length=200, blank=True, null=True)
#     mail_city = models.CharField(max_length=64, blank=True, null=True)
#     mail_state = models.CharField(max_length=2, blank=True, null=True)
#     mail_zip = models.IntegerField(blank=True, null=True)
#     host_est_key = models.CharField(max_length=20, blank=True, null=True)
#     nr_in_estab = models.IntegerField(blank=True, null=True)
#     open_date = models.DateField(blank=True, null=True)
#     case_mod_date = models.DateField(blank=True, null=True)
#     close_conf_date = models.DateField(blank=True, null=True)
#     close_case_date = models.DateField(blank=True, null=True)
#     ld_dt = models.DateTimeField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'osha_inspection_data'


# class OshaSevereInjuryData(models.Model):
#     injury_index = models.IntegerField(primary_key=True)
#     incident_id = models.BigIntegerField(blank=True, null=True)
#     event_date = models.DateField(blank=True, null=True)
#     employer = models.CharField(max_length=128, blank=True, null=True)
#     address1 = models.CharField(max_length=128, blank=True, null=True)
#     address2 = models.CharField(max_length=128, blank=True, null=True)
#     city = models.CharField(max_length=64, blank=True, null=True)
#     state = models.CharField(max_length=32, blank=True, null=True)
#     zipcode = models.IntegerField(blank=True, null=True)
#     latitude = models.FloatField(blank=True, null=True)
#     longitude = models.FloatField(blank=True, null=True)
#     naics_code = models.IntegerField(blank=True, null=True)
#     hospitalized = models.SmallIntegerField(blank=True, null=True)
#     amputation = models.SmallIntegerField(blank=True, null=True)
#     final_description = models.CharField(max_length=3000, blank=True, null=True)
#     body_part = models.CharField(max_length=64, blank=True, null=True)
#     # geom = GEOSGeometry('POINT(' + longitude + latitude+')')
#     # geom = GEOSGeometry('POINT(' + longitude + latitude+')')

#     # fromstr('POINT(' + my_long_lat + ')')
#     # geom = GEOSGeometry("POINT({0} {1})".format(longitude, latitude))
#     geom = models.PointField("POINT({0} {1})".format(longitude, latitude))

#     def __unicode__(self):
#     	return self.injury_index

#     class Meta:
#         managed = False
#         db_table = 'osha_severe_injury_data'


# class SicCodesData(models.Model):
#     code = models.SmallIntegerField(primary_key=True)
#     description = models.CharField(max_length=128, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'sic_codes_data'


# class UsStatesSpatialData(models.Model):
#     gid = models.AutoField(primary_key=True)
#     statefp = models.CharField(max_length=2, blank=True, null=True)
#     statens = models.CharField(max_length=8, blank=True, null=True)
#     affgeoid = models.CharField(max_length=11, blank=True, null=True)
#     geoid = models.CharField(max_length=2, blank=True, null=True)
#     stusps = models.CharField(max_length=2, blank=True, null=True)
#     name = models.CharField(max_length=100, blank=True, null=True)
#     lsad = models.CharField(max_length=2, blank=True, null=True)
#     aland = models.FloatField(blank=True, null=True)
#     awater = models.FloatField(blank=True, null=True)
#     geom = models.MultiPolygonField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'us_states_spatial_data'


# class ZipcodesSpatialData(models.Model):
#     gid = models.AutoField(primary_key=True)
#     name = models.CharField(max_length=254, blank=True, null=True)
#     descriptio = models.CharField(max_length=254, blank=True, null=True)
#     timestamp = models.CharField(max_length=24, blank=True, null=True)
#     begin = models.CharField(max_length=24, blank=True, null=True)
#     end = models.CharField(max_length=24, blank=True, null=True)
#     altitudemo = models.CharField(max_length=254, blank=True, null=True)
#     tessellate = models.BigIntegerField(blank=True, null=True)
#     extrude = models.BigIntegerField(blank=True, null=True)
#     visibility = models.BigIntegerField(blank=True, null=True)
#     draworder = models.BigIntegerField(blank=True, null=True)
#     icon = models.CharField(max_length=254, blank=True, null=True)
#     zcta5ce10 = models.CharField(max_length=254, blank=True, null=True)
#     affgeoid10 = models.CharField(max_length=254, blank=True, null=True)
#     geoid10 = models.CharField(max_length=254, blank=True, null=True)
#     aland10 = models.CharField(max_length=254, blank=True, null=True)
#     awater10 = models.CharField(max_length=254, blank=True, null=True)
#     geom = models.MultiPolygonField(dim=4, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'zipcodes_spatial_data'

