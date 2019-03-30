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







