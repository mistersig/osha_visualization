### Inspection Types Tables ###

-- Unprog_other        
-- Unprog_rel          
          
-- complaint           
    
-- monitoring          
-- other               
-- planned             
-- prog_other          
-- prog_related        
-- referral            
-- variance            


-- accident  
-- fatality_catastrophe
-- follow_up       

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





################################################################## accident
-- inpsections that took place








################################################################## accident
-- inpsections that took place








################################################################## accident
-- inpsections that took place









################################################################## accident
-- inpsections that took place










