### Inspection Types Tables ###

-- Unprog_other        
-- Unprog_rel                       
-- prog_other          
-- prog_related        
         







-- accident  
-- fatality_catastrophe
-- follow_up       
-- complaint      
-- monitoring  
--planned
-- referral            
-- variance   
-- other               
-- 

-- python3 manage.py inspectdb > models_rev1.py

##########################################################################################################################################################
################################################################## osha_inspection_data ##################################################################
##########################################################################################################################################################




-- Select Grade, (Count(Grade)* 100 / (Select Count(*) From MyTable)) as Score
-- From MyTable
-- Group By Grade


################################################################## accident
-- inpsections that took place
CREATE TABLE accident_17 as 
select
distinct insp_type,
round((Count(insp_type)* 100.00 / 
 (Select Count(insp_type) 
  From osha_inspection_data where open_date between '2017-01-01' and '2017-12-31' 
  AND insp_type LIKE '%accident%' AND insp_scope not like '%No Inspection%' )),2) as Score,
us_states_spatial_data.name as state_name,
us_states_spatial_data.stusps as code,
us_states_spatial_data.geom
from osha_inspection_data
right JOIN us_states_spatial_data
ON osha_inspection_data.site_state = us_states_spatial_data.stusps
AND open_date between '2017-01-01' and '2017-12-31'
AND insp_type LIKE '%accident%'
AND insp_scope not like '%No Inspection%'
group by insp_type,state_name,us_states_spatial_data.stusps,us_states_spatial_data.geom
order by us_states_spatial_data.stusps;

UPDATE accident_17 SET insp_type = 'accident' WHERE insp_type IS NULL;
ALTER TABLE accident_17 ADD COLUMN fid SERIAL PRIMARY KEY;
select * from accident_17;






################################################################## accident
-- inpsections that took place
CREATE TABLE fat_cat_17 as 
select
distinct insp_type,
round((Count(insp_type)* 100.00 / 
 (Select Count(insp_type) 
  From osha_inspection_data where open_date between '2017-01-01' and '2017-12-31' 
  AND insp_type LIKE '%fatality_catastrophe%' AND insp_scope not like '%No Inspection%' )),2) as Score,
us_states_spatial_data.name as state_name,
us_states_spatial_data.stusps as code,
us_states_spatial_data.geom
from osha_inspection_data
right JOIN us_states_spatial_data
ON osha_inspection_data.site_state = us_states_spatial_data.stusps
AND open_date between '2017-01-01' and '2017-12-31'
AND insp_type LIKE '%fatality_catastrophe%'
AND insp_scope not like '%No Inspection%'
group by insp_type,state_name,us_states_spatial_data.stusps,us_states_spatial_data.geom
order by us_states_spatial_data.stusps;

UPDATE fat_cat_17 SET insp_type = 'fatality_catastrophe' WHERE insp_type IS NULL;
ALTER TABLE fat_cat_17 ADD COLUMN fid SERIAL PRIMARY KEY;
select * from fat_cat_17;





################################################################## accident
-- inpsections that took place

CREATE TABLE followup_17 as 
select
distinct insp_type,
round((Count(insp_type)* 100.00 / 
 (Select Count(insp_type) 
  From osha_inspection_data where open_date between '2017-01-01' and '2017-12-31' 
  AND insp_type LIKE '%follow_up%' AND insp_scope not like '%No Inspection%' )),2) as Score,
us_states_spatial_data.name as state_name,
us_states_spatial_data.stusps as code,
us_states_spatial_data.geom
from osha_inspection_data
right JOIN us_states_spatial_data
ON osha_inspection_data.site_state = us_states_spatial_data.stusps
AND open_date between '2017-01-01' and '2017-12-31'
AND insp_type LIKE '%follow_up%'
AND insp_scope not like '%No Inspection%'
group by insp_type,state_name,us_states_spatial_data.stusps,us_states_spatial_data.geom
order by us_states_spatial_data.stusps;

UPDATE followup_17 SET insp_type = 'follow_up' WHERE insp_type IS NULL;
ALTER TABLE followup_17 ADD COLUMN fid SERIAL PRIMARY KEY;
select * from followup_17;



-------

################################################################## complaint_17
-- inpsections that took place
CREATE TABLE complaint_17 as 
select
distinct insp_type,
round((Count(insp_type)* 100.00 / 
 (Select Count(insp_type) 
  From osha_inspection_data where open_date between '2017-01-01' and '2017-12-31' 
  AND insp_type LIKE '%complaint%' AND insp_scope not like '%No Inspection%' )),2) as Score,
us_states_spatial_data.name as state_name,
us_states_spatial_data.stusps as code,
us_states_spatial_data.geom
from osha_inspection_data
right JOIN us_states_spatial_data
ON osha_inspection_data.site_state = us_states_spatial_data.stusps
AND open_date between '2017-01-01' and '2017-12-31'
AND insp_type LIKE '%complaint%'
AND insp_scope not like '%No Inspection%'
group by insp_type,state_name,us_states_spatial_data.stusps,us_states_spatial_data.geom
order by us_states_spatial_data.stusps;

UPDATE complaint_17 SET insp_type = 'complaint' WHERE insp_type IS NULL;
ALTER TABLE complaint_17 ADD COLUMN fid SERIAL PRIMARY KEY;
select * from complaint_17;




-- monitoring


################################################################## monitoring
-- inpsections that took place
CREATE TABLE monitoring_17 as 
select
distinct insp_type,
round((Count(insp_type)* 100.00 / 
 (Select Count(insp_type) 
  From osha_inspection_data where open_date between '2017-01-01' and '2017-12-31' 
  AND insp_type LIKE '%monitoring%' AND insp_scope not like '%No Inspection%' )),2) as Score,
us_states_spatial_data.name as state_name,
us_states_spatial_data.stusps as code,
us_states_spatial_data.geom
from osha_inspection_data
right JOIN us_states_spatial_data
ON osha_inspection_data.site_state = us_states_spatial_data.stusps
AND open_date between '2017-01-01' and '2017-12-31'
AND insp_type LIKE '%monitoring%'
AND insp_scope not like '%No Inspection%'
group by insp_type,state_name,us_states_spatial_data.stusps,us_states_spatial_data.geom
order by us_states_spatial_data.stusps;

UPDATE monitoring_17 SET insp_type = 'monitoring' WHERE insp_type IS NULL;
ALTER TABLE monitoring_17 ADD COLUMN fid SERIAL PRIMARY KEY;
select * from monitoring_17;








################################################################## planned
-- inpsections that took place

CREATE TABLE planned_17 as 
select
distinct insp_type,
round((Count(insp_type)* 100.00 / 
 (Select Count(insp_type) 
  From osha_inspection_data where open_date between '2017-01-01' and '2017-12-31' 
  AND insp_type LIKE '%planned%' AND insp_scope not like '%No Inspection%' )),2) as Score,
us_states_spatial_data.name as state_name,
us_states_spatial_data.stusps as code,
us_states_spatial_data.geom
from osha_inspection_data
right JOIN us_states_spatial_data
ON osha_inspection_data.site_state = us_states_spatial_data.stusps
AND open_date between '2017-01-01' and '2017-12-31'
AND insp_type LIKE '%planned%'
AND insp_scope not like '%No Inspection%'
group by insp_type,state_name,us_states_spatial_data.stusps,us_states_spatial_data.geom
order by us_states_spatial_data.stusps;

UPDATE planned_17 SET insp_type = 'planned' WHERE insp_type IS NULL;
ALTER TABLE planned_17 ADD COLUMN fid SERIAL PRIMARY KEY;
select * from planned_17;








################################################################## referral
-- inpsections that took place

CREATE TABLE referral_17 as 
select
distinct insp_type,
round((Count(insp_type)* 100.00 / 
 (Select Count(insp_type) 
  From osha_inspection_data where open_date between '2017-01-01' and '2017-12-31' 
  AND insp_type LIKE '%referral%' AND insp_scope not like '%No Inspection%' )),2) as Score,
us_states_spatial_data.name as state_name,
us_states_spatial_data.stusps as code,
us_states_spatial_data.geom
from osha_inspection_data
right JOIN us_states_spatial_data
ON osha_inspection_data.site_state = us_states_spatial_data.stusps
AND open_date between '2017-01-01' and '2017-12-31'
AND insp_type LIKE '%referral%'
AND insp_scope not like '%No Inspection%'
group by insp_type,state_name,us_states_spatial_data.stusps,us_states_spatial_data.geom
order by us_states_spatial_data.stusps;

UPDATE referral_17 SET insp_type = 'referral' WHERE insp_type IS NULL;
ALTER TABLE referral_17 ADD COLUMN fid SERIAL PRIMARY KEY;
select * from referral_17;


################################################################## variance
-- inpsections that took place
CREATE TABLE variance_17 as 
select
distinct insp_type,
round((Count(insp_type)* 100.00 / 
 (Select Count(insp_type) 
  From osha_inspection_data where open_date between '2017-01-01' and '2017-12-31' 
  AND insp_type LIKE '%variance%' AND insp_scope not like '%No Inspection%' )),2) as Score,
us_states_spatial_data.name as state_name,
us_states_spatial_data.stusps as code,
us_states_spatial_data.geom
from osha_inspection_data
right JOIN us_states_spatial_data
ON osha_inspection_data.site_state = us_states_spatial_data.stusps
AND open_date between '2017-01-01' and '2017-12-31'
AND insp_type LIKE '%variance%'
AND insp_scope not like '%No Inspection%'
group by insp_type,state_name,us_states_spatial_data.stusps,us_states_spatial_data.geom
order by us_states_spatial_data.stusps;

UPDATE variance_17 SET insp_type = 'variance' WHERE insp_type IS NULL;
ALTER TABLE variance_17 ADD COLUMN fid SERIAL PRIMARY KEY;
select * from variance_17;



-- other               
################################################################## other
-- inpsections that took place
CREATE TABLE other_17 as 
select
distinct insp_type,
round((Count(insp_type)* 100.00 / 
 (Select Count(insp_type) 
  From osha_inspection_data where open_date between '2017-01-01' and '2017-12-31' 
  AND insp_type LIKE '%other%' AND insp_scope not like '%No Inspection%' )),2) as Score,
us_states_spatial_data.name as state_name,
us_states_spatial_data.stusps as code,
us_states_spatial_data.geom
from osha_inspection_data
right JOIN us_states_spatial_data
ON osha_inspection_data.site_state = us_states_spatial_data.stusps
AND open_date between '2017-01-01' and '2017-12-31'
-- AND insp_type LIKE '%other%'
AND insp_type = 'other'
AND insp_scope not like '%No Inspection%'
group by insp_type,state_name,us_states_spatial_data.stusps,us_states_spatial_data.geom
order by us_states_spatial_data.stusps;

UPDATE other_17 SET insp_type = 'other' WHERE insp_type IS NULL;
ALTER TABLE other_17 ADD COLUMN fid SERIAL PRIMARY KEY;
select * from other_17;



##########################################################################################################################################################
################################################################## Fatalities ##################################################################
##########################################################################################################################################################

-- fatalities MAP

CREATE TABLE fatalities_states_17 as 
SELECT  
distinct us_states_spatial_data.stusps as code,
 us_states_spatial_data.name as state_name,
round((Count(fatalities_data_table.state)* 100.00 / 
 (Select Count(fatalities_data_table.state) From fatalities_data_table where fatalities_data_table.incident_date between '2016-09-30' and '2017-12-31' )),2) as score,
us_states_spatial_data.geom
from fatalities_data_table
right JOIN us_states_spatial_data
ON fatalities_data_table.state = us_states_spatial_data.stusps
AND fatalities_data_table.incident_date between '2016-09-30' and '2017-12-31'
group by 
code,state_name,us_states_spatial_data.geom
order by score;


ALTER TABLE fatalities_states_17 ADD COLUMN fid SERIAL PRIMARY KEY;

select * from fatalities_states_17;









CREATE TABLE fatalities_zip_map as 
select 
distinct fatalities_data_table.zipcode, 
round((Count(fatalities_data_table.zipcode)* 100.00 / 
 (Select Count(fatalities_data_table.zipcode) From fatalities_data_table )),2) as injury_count,
zipcodes_spatial_data.geom
from fatalities_data_table,zipcodes_spatial_data
WHERE zipcodes_spatial_data.geoid10 = cast(fatalities_data_table.zipcode as varchar)
AND EXTRACT(YEAR FROM fatalities_data_table.incident_date) = 2017
group by zipcode,zipcodes_spatial_data.geom
order by injury_count DESC;
ALTER TABLE fatalities_zip_map ADD COLUMN fid SERIAL PRIMARY KEY;
select * from fatalities_zip_map;

##########################################################################################################################################################
################################################################## Severe Injury ##################################################################
##########################################################################################################################################################


CREATE TABLE severe_injury_map as 
SELECT  
distinct us_states_spatial_data.stusps as code,
 us_states_spatial_data.name as state_name,
round((Count(osha_severe_injury_data.state)* 100.00 / 
 (Select Count(osha_severe_injury_data.state) From osha_severe_injury_data )),2) as score,
us_states_spatial_data.geom
FROM
  us_states_spatial_data  JOIN osha_severe_injury_data
ON st_contains(us_states_spatial_data.geom, osha_severe_injury_data.geom)
group by 
code,state_name,us_states_spatial_data.geom;

ALTER TABLE severe_injury_map ADD COLUMN fid SERIAL PRIMARY KEY;
select * from severe_injury_map;





select
event_date,
employer,
address1,
city, 
state, 
zipcode,
latitude,
longitude,
naics_codes_data.titles as Industry,
hospitalized,
amputation,
final_description,
body_part,
geom
from osha_severe_injury_data,naics_codes_data
join 

WHERE osha_severe_injury_data.naics_code = naics_codes_data.codes
AND event_date between '2017-01-01' and '2017-12-31'
order by event_date DESC;









CREATE TABLE severe_injury_zip_map as 

select 
distinct osha_severe_injury_data.zipcode, 
round((Count(osha_severe_injury_data.zipcode)* 100.00 / 
 (Select Count(osha_severe_injury_data.zipcode) From osha_severe_injury_data )),2) as injury_count,
zipcodes_spatial_data.geom
from osha_severe_injury_data,zipcodes_spatial_data
WHERE zipcodes_spatial_data.geoid10 = cast(osha_severe_injury_data.zipcode as varchar)
AND EXTRACT(YEAR FROM osha_severe_injury_data.event_date) = 2017
group by zipcode,zipcodes_spatial_data.geom
order by injury_count DESC;

ALTER TABLE severe_injury_zip_map ADD COLUMN fid SERIAL PRIMARY KEY;
select * from severe_injury_zip_map;





##########################################################################################################################################################
################################################################## CHART JS ##################################################################
##########################################################################################################################################################


-- Fatalities GRAPH

round((Count(fatalities_data_table.incident_date)* 100.00 / 
 (Select Count(osha_severe_injury_data.hospitalized) From osha_severe_injury_data )),2) as injury_count



CREATE TABLE fatalities_count_graph as 
select 
distinct to_char(fatalities_data_table.incident_date, 'Month') as event_month,
round((Count(fatalities_data_table.incident_date)* 100.00 / 
 (Select Count(fatalities_data_table.incident_date) From fatalities_data_table )),2) as injury_count
from 
fatalities_data_table
WHERE fatalities_data_table.incident_date between '2016-05-01' and '2017-12-31'
group by
event_month

ALTER TABLE fatalities_count_graph ADD COLUMN fid SERIAL PRIMARY KEY;
select * from fatalities_count_graph;








select
distinct body_part,
count(body_part) as injury_count
from osha_severe_injury_data
WHERE event_date between '2017-01-01' and '2017-12-31'
group by body_part
order by injury_count DESC;


-- Nonclassifiable	411
-- LEGS	1609
-- FEET	463
-- HANDS	3739
-- Body	1229
-- BACK	289
-- TORSO	1187
-- ARMS	532
-- Head & Neck	985






round((Count(osha_severe_injury_data.hospitalized)* 100.00 / 
 (Select Count(osha_severe_injury_data.hospitalized) From osha_severe_injury_data )),2) as injury_count

CREATE TABLE hospitalized_percent_graph as 
select
distinct  to_char(osha_severe_injury_data.event_date, 'Month') as event_month,
round((Count(osha_severe_injury_data.hospitalized)* 100.00 / 
 (Select Count(osha_severe_injury_data.hospitalized) From osha_severe_injury_data WHERE event_date between '2017-01-01' and '2017-12-31' and hospitalized = 1 )),2) as injury_count
from osha_severe_injury_data
WHERE event_date between '2017-01-01' and '2017-12-31'
and hospitalized = 1
group by  event_month
order by event_month ;
ALTER TABLE hospitalized_percent_graph ADD COLUMN fid SERIAL PRIMARY KEY;
select * from hospitalized_percent_graph;


count(amputation) as injury_count

CREATE TABLE amputation_count_graph as 
select
distinct  to_char(osha_severe_injury_data.event_date, 'Month') as event_month,
round((Count(osha_severe_injury_data.amputation)* 100.00 / 
 (Select Count(osha_severe_injury_data.amputation) From osha_severe_injury_data WHERE event_date between '2017-01-01' and '2017-12-31' and amputation = 1 )),2) as injury_count
from osha_severe_injury_data
WHERE event_date between '2017-01-01' and '2017-12-31'
and amputation = 1 
group by  event_month
order by event_month ;
ALTER TABLE amputation_count_graph ADD COLUMN fid SERIAL PRIMARY KEY;
select * from amputation_count_graph;













