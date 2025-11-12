-- Quick Mock Data Generator - Simplified version
SET search_path TO animal_sanctuary_capstone;

-- Insert 15 adopters with realistic data
INSERT INTO adopters (
    first_name, last_name, email, phone, address, city, state, zip_code,
    housing_type, housing_owned, has_yard, yard_fenced, has_other_pets, 
    other_pets_details, previous_pet_experience, is_active
) VALUES
('Sarah', 'Johnson', 'sarah.johnson@email.com', '(555) 234-5678', '123 Oak St', 'Springfield', 'CA', '95432', 'House', true, true, true, true, 'One cat, 5 years old', 'Had dogs growing up', true),
('Michael', 'Chen', 'michael.chen@email.com', '(555) 345-6789', '456 Maple Ave', 'Riverside', 'CA', '92501', 'Apartment', false, false, false, false, NULL, 'First time pet owner', true),
('Emily', 'Rodriguez', 'emily.rodriguez@email.com', '(555) 456-7890', '789 Pine Rd', 'Sacramento', 'CA', '95814', 'House', true, true, true, true, 'Two dogs', 'Volunteer at shelter', true),
('David', 'Thompson', 'david.thompson@email.com', '(555) 567-8901', '321 Elm St', 'San Jose', 'CA', '95110', 'Townhouse', true, false, false, false, NULL, 'Had cats before', true),
('Jessica', 'Martinez', 'jessica.martinez@email.com', '(555) 678-9012', '654 Birch Ln', 'Fresno', 'CA', '93650', 'House', true, true, true, true, 'One dog', 'Experienced dog owner', true),
('James', 'Anderson', 'james.anderson@email.com', '(555) 789-0123', '987 Cedar Dr', 'Oakland', 'CA', '94601', 'Apartment', false, false, false, false, NULL, 'First pet', true),
('Amanda', 'Taylor', 'amanda.taylor@email.com', '(555) 890-1234', '147 Willow Ct', 'San Diego', 'CA', '92101', 'House', true, true, true, true, 'Two cats', 'Cat lover', true),
('Chris', 'White', 'chris.white@email.com', '(555) 901-2345', '258 Spruce St', 'Long Beach', 'CA', '90802', 'Condo', true, false, false, false, NULL, 'Had pets as child', true),
('Nicole', 'Harris', 'nicole.harris@email.com', '(555) 012-3456', '369 Ash Blvd', 'Bakersfield', 'CA', '93301', 'House', true, true, true, true, 'Dog and cat', 'Experienced', true),
('Daniel', 'Clark', 'daniel.clark@email.com', '(555) 123-4567', '741 Redwood Ave', 'Anaheim', 'CA', '92801', 'Apartment', false, false, false, false, NULL, 'New to pets', true),
('Lauren', 'Lewis', 'lauren.lewis@email.com', '(555) 234-6789', '852 Sycamore Ln', 'Santa Rosa', 'CA', '95401', 'House', true, true, true, true, 'Three cats', 'Cat expert', true),
('Ryan', 'Walker', 'ryan.walker@email.com', '(555) 345-7890', '963 Poplar Dr', 'Modesto', 'CA', '95350', 'Townhouse', true, false, false, true, 'One cat', 'Had cats', true),
('Stephanie', 'Hall', 'stephanie.hall@email.com', '(555) 456-8901', '159 Magnolia St', 'Stockton', 'CA', '95202', 'House', true, true, true, true, 'Two dogs', 'Dog trainer', true),
('Kevin', 'Allen', 'kevin.allen@email.com', '(555) 567-9012', '357 Hickory Rd', 'Fremont', 'CA', '94536', 'Apartment', false, false, false, false, NULL, 'First time', true),
('Melissa', 'Young', 'melissa.young@email.com', '(555) 678-0123', '486 Walnut Ct', 'Irvine', 'CA', '92602', 'House', true, true, true, true, 'One dog', 'Experienced', true)
ON CONFLICT (email) DO NOTHING;

-- Create applications linking adopters to animals
-- Get the first 15 animal IDs and first 15 adopter IDs
WITH animal_ids AS (
    SELECT animal_id, ROW_NUMBER() OVER (ORDER BY animal_id) as rn
    FROM animals WHERE is_active = true LIMIT 15
),
adopter_ids AS (
    SELECT adopter_id, ROW_NUMBER() OVER (ORDER BY adopter_id) as rn
    FROM adopters LIMIT 15
)
INSERT INTO adoption_applications (animal_id, adopter_id, application_date, status)
SELECT 
    a.animal_id,
    d.adopter_id,
    CURRENT_DATE - (a.rn || ' days')::INTERVAL,
    CASE 
        WHEN a.rn <= 2 THEN 'Submitted'
        WHEN a.rn <= 4 THEN 'Under Review'
        WHEN a.rn <= 6 THEN 'Interview Scheduled'
        WHEN a.rn <= 9 THEN 'Approved'
        WHEN a.rn <= 11 THEN 'Rejected'
        ELSE 'Completed'
    END
FROM animal_ids a
JOIN adopter_ids d ON a.rn = d.rn
ON CONFLICT DO NOTHING;

-- Show results
SELECT 'Adopters Created' as info, COUNT(*) as count FROM adopters
UNION ALL
SELECT 'Applications Created', COUNT(*) FROM adoption_applications;

SELECT status, COUNT(*) as count 
FROM adoption_applications 
GROUP BY status 
ORDER BY count DESC;
