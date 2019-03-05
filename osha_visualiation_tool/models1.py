# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.contrib.gis.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=80)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


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


class NaicsCodesData(models.Model):
    codes = models.IntegerField(primary_key=True)
    titles = models.CharField(max_length=300, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'naics_codes_data'


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
