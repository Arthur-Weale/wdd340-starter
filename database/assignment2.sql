SELECT * FROM public.account;

--Q1
INSERT INTO account 
	(
		account_firstname,
		account_lastname,
		account_email,
		account_password
	)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

--Q2
UPDATE public.account
SET account_type = 'Admin'
WHERE account_id = 1;

--Q3
DELETE FROM public.account
WHERE account_id = 1;


--Q4
UPDATE public.inventory
SET inv_description = REPLACE(inv_description,'small interiors', 'huge interior' )
WHERE inv_id = 10;

--Q5
SELECT inv_make, inv_model, classification_name 
FROM public.inventory
INNER JOIN public.classification ON inventory.classification_id = classification.classification_id
WHERE classification.classification_id = 2;

--Q6
UPDATE public.inventory
SET 
	inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
	inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');


