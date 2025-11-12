-- Animal Sanctuary - Mock Data Generator
-- This script generates realistic test data for animals, adopters, and applications

SET search_path TO animal_sanctuary_capstone;

-- ============================================================================
-- ANIMALS - Generate 30 animals with realistic data
-- ============================================================================

INSERT INTO animals (
    name, species, breed, age, weight_kg, gender, color,
    arrival_date, adoption_status, adoption_fee, habitat_id,
    dietary_requirements, behavioral_notes, special_needs,
    microchip_number, is_active
) VALUES
-- Dogs
('Max', 'Dog', 'Golden Retriever Mix', 3, 28.5, 'Male', 'Golden',
 CURRENT_DATE - INTERVAL '45 days', 'Available', 250.00, 1,
 'Standard dog food, no grain allergies', 'Friendly, energetic, loves fetch and swimming', 'None',
 'MC982374982374', true),

('Luna', 'Dog', 'Labrador Mix', 2, 25.0, 'Female', 'Black',
 CURRENT_DATE - INTERVAL '30 days', 'Available', 250.00, 1,
 'High-quality dog food', 'Gentle, good with children, house-trained', 'None',
 'MC982374982375', true),

('Charlie', 'Dog', 'Beagle Mix', 1, 12.5, 'Male', 'Tri-color',
 CURRENT_DATE - INTERVAL '15 days', 'Pending', 200.00, 1,
 'Puppy food, small portions', 'Playful puppy, needs training', 'None',
 'MC982374982376', true),

('Rocky', 'Dog', 'German Shepherd Mix', 5, 35.0, 'Male', 'Black and Tan',
 CURRENT_DATE - INTERVAL '60 days', 'Available', 200.00, 1,
 'Senior dog food', 'Calm, protective, good guard dog', 'Arthritis - needs joint supplements',
 'MC982374982377', true),

('Bella', 'Dog', 'Pit Bull Mix', 4, 22.0, 'Female', 'Brindle',
 CURRENT_DATE - INTERVAL '90 days', 'Adopted', 250.00, 1,
 'Standard dog food', 'Sweet, loves cuddles, good with other dogs', 'None',
 'MC982374982378', true),

-- Cats
('Whiskers', 'Cat', 'Domestic Shorthair', 2, 4.5, 'Male', 'Orange Tabby',
 CURRENT_DATE - INTERVAL '20 days', 'Available', 100.00, 2,
 'Indoor cat food', 'Independent, litter trained, loves sunbathing', 'None',
 'MC982374982379', true),

('Shadow', 'Cat', 'Domestic Longhair', 3, 5.2, 'Female', 'Black',
 CURRENT_DATE - INTERVAL '40 days', 'Available', 100.00, 2,
 'Indoor cat food', 'Shy at first, very affectionate once comfortable', 'None',
 'MC982374982380', true),

('Mittens', 'Cat', 'Siamese Mix', 1, 3.8, 'Female', 'Cream and Brown',
 CURRENT_DATE - INTERVAL '10 days', 'Available', 125.00, 2,
 'Kitten food', 'Playful, curious, loves toys', 'None',
 'MC982374982381', true),

('Tiger', 'Cat', 'Maine Coon Mix', 4, 6.5, 'Male', 'Gray Tabby',
 CURRENT_DATE - INTERVAL '55 days', 'Pending', 150.00, 2,
 'Large breed cat food', 'Gentle giant, good with kids', 'None',
 'MC982374982382', true),

('Snowball', 'Cat', 'Persian Mix', 6, 4.0, 'Female', 'White',
 CURRENT_DATE - INTERVAL '120 days', 'Medical Hold', 150.00, 2,
 'Special diet for kidney health', 'Sweet, needs quiet home', 'Chronic kidney disease - requires medication',
 'MC982374982383', true),

-- More Dogs
('Duke', 'Dog', 'Boxer Mix', 3, 30.0, 'Male', 'Fawn',
 CURRENT_DATE - INTERVAL '25 days', 'Available', 250.00, 1,
 'High-protein dog food', 'Energetic, needs active family', 'None',
 'MC982374982384', true),

('Daisy', 'Dog', 'Cocker Spaniel Mix', 2, 15.0, 'Female', 'Blonde',
 CURRENT_DATE - INTERVAL '35 days', 'Available', 225.00, 1,
 'Standard dog food', 'Sweet, loves everyone, great family dog', 'None',
 'MC982374982385', true),

('Buddy', 'Dog', 'Terrier Mix', 7, 10.0, 'Male', 'White and Brown',
 CURRENT_DATE - INTERVAL '80 days', 'Available', 150.00, 1,
 'Senior dog food', 'Calm senior, perfect lap dog', 'Deaf in one ear',
 'MC982374982386', true),

('Sadie', 'Dog', 'Husky Mix', 2, 24.0, 'Female', 'Gray and White',
 CURRENT_DATE - INTERVAL '18 days', 'Available', 275.00, 1,
 'High-energy dog food', 'Very active, needs lots of exercise', 'None',
 'MC982374982387', true),

('Cooper', 'Dog', 'Poodle Mix', 4, 18.0, 'Male', 'Apricot',
 CURRENT_DATE - INTERVAL '50 days', 'Pending', 300.00, 1,
 'Hypoallergenic dog food', 'Smart, hypoallergenic, great for allergies', 'None',
 'MC982374982388', true),

-- More Cats
('Ginger', 'Cat', 'Domestic Shorthair', 1, 3.5, 'Female', 'Orange',
 CURRENT_DATE - INTERVAL '12 days', 'Available', 100.00, 2,
 'Kitten food', 'Playful kitten, loves to climb', 'None',
 'MC982374982389', true),

('Smokey', 'Cat', 'Russian Blue Mix', 3, 4.8, 'Male', 'Gray',
 CURRENT_DATE - INTERVAL '28 days', 'Available', 125.00, 2,
 'Indoor cat food', 'Quiet, elegant, prefers calm environment', 'None',
 'MC982374982390', true),

('Patches', 'Cat', 'Calico', 5, 4.2, 'Female', 'Calico',
 CURRENT_DATE - INTERVAL '65 days', 'Available', 100.00, 2,
 'Indoor cat food', 'Independent, good mouser', 'None',
 'MC982374982391', true),

('Felix', 'Cat', 'Tuxedo', 2, 4.6, 'Male', 'Black and White',
 CURRENT_DATE - INTERVAL '22 days', 'Available', 100.00, 2,
 'Indoor cat food', 'Friendly, loves attention', 'None',
 'MC982374982392', true),

('Princess', 'Cat', 'Ragdoll Mix', 3, 5.5, 'Female', 'Seal Point',
 CURRENT_DATE - INTERVAL '42 days', 'Adopted', 175.00, 2,
 'Premium cat food', 'Very affectionate, loves to be held', 'None',
 'MC982374982393', true),

-- Rabbits
('Thumper', 'Rabbit', 'Holland Lop', 1, 1.8, 'Male', 'Brown and White',
 CURRENT_DATE - INTERVAL '15 days', 'Available', 50.00, 3,
 'Timothy hay, pellets, vegetables', 'Friendly, litter trained', 'None',
 NULL, true),

('Cotton', 'Rabbit', 'Lionhead', 2, 1.5, 'Female', 'White',
 CURRENT_DATE - INTERVAL '30 days', 'Available', 50.00, 3,
 'Timothy hay, pellets, vegetables', 'Gentle, good with handling', 'None',
 NULL, true),

-- Birds
('Tweety', 'Bird', 'Parakeet', 1, 0.03, 'Unknown', 'Blue and White',
 CURRENT_DATE - INTERVAL '20 days', 'Available', 25.00, 4,
 'Bird seed mix', 'Chirpy, social, needs companion', 'None',
 NULL, true),

('Polly', 'Bird', 'Cockatiel', 3, 0.09, 'Female', 'Gray and Yellow',
 CURRENT_DATE - INTERVAL '45 days', 'Available', 75.00, 4,
 'Cockatiel pellets, seeds', 'Friendly, can whistle tunes', 'None',
 NULL, true),

-- More Dogs
('Zeus', 'Dog', 'Great Dane Mix', 2, 55.0, 'Male', 'Black',
 CURRENT_DATE - INTERVAL '38 days', 'Available', 300.00, 1,
 'Large breed dog food', 'Gentle giant, needs space', 'None',
 'MC982374982394', true),

('Rosie', 'Dog', 'Chihuahua Mix', 4, 3.5, 'Female', 'Tan',
 CURRENT_DATE - INTERVAL '52 days', 'Available', 150.00, 1,
 'Small breed dog food', 'Tiny but mighty, loves to cuddle', 'None',
 'MC982374982395', true),

('Bear', 'Dog', 'Rottweiler Mix', 3, 42.0, 'Male', 'Black and Tan',
 CURRENT_DATE - INTERVAL '70 days', 'Available', 250.00, 1,
 'Large breed dog food', 'Loyal, protective, needs experienced owner', 'None',
 'MC982374982396', true),

('Lily', 'Dog', 'Shih Tzu Mix', 5, 6.5, 'Female', 'White and Brown',
 CURRENT_DATE - INTERVAL '48 days', 'Pending', 200.00, 1,
 'Small breed dog food', 'Sweet lap dog, hypoallergenic', 'None',
 'MC982374982397', true),

('Oscar', 'Dog', 'Dachshund Mix', 6, 8.0, 'Male', 'Brown',
 CURRENT_DATE - INTERVAL '85 days', 'Available', 175.00, 1,
 'Small breed dog food', 'Playful senior, loves walks', 'Back issues - no jumping',
 'MC982374982398', true),

('Chloe', 'Cat', 'Bengal Mix', 2, 4.3, 'Female', 'Spotted Brown',
 CURRENT_DATE - INTERVAL '26 days', 'Available', 150.00, 2,
 'High-protein cat food', 'Active, playful, needs stimulation', 'None',
 'MC982374982399', true);

-- ============================================================================
-- ADOPTERS - Generate 20 adopters with realistic data
-- ============================================================================

INSERT INTO adopters (
    first_name, last_name, email, phone, address, city, state, zip_code,
    housing_type, yard_fenced, other_pets, experience_level,
    emergency_contact, employment_status, annual_income
) VALUES
('Sarah', 'Johnson', 'sarah.johnson@email.com', '(555) 234-5678',
 '123 Oak Street', 'Springfield', 'CA', '95432',
 'House', true, 'One cat, 5 years old', 'Intermediate',
 'John Johnson: (555) 234-5679', 'Full-time', 75000),

('Michael', 'Chen', 'michael.chen@email.com', '(555) 345-6789',
 '456 Maple Avenue', 'Riverside', 'CA', '92501',
 'Apartment', false, 'None', 'Beginner',
 'Lisa Chen: (555) 345-6790', 'Full-time', 65000),

('Emily', 'Rodriguez', 'emily.rodriguez@email.com', '(555) 456-7890',
 '789 Pine Road', 'Sacramento', 'CA', '95814',
 'House', true, 'Two dogs, both rescues', 'Expert',
 'Dr. Brown (Vet): (555) 333-4444', 'Carlos Rodriguez: (555) 456-7891',
 'Self-employed', 85000),

('David', 'Thompson', 'david.thompson@email.com', '(555) 567-8901',
 '321 Elm Street', 'San Jose', 'CA', '95110',
 'Townhouse', false, 'None', 'Intermediate',
 'Mary Wilson: (555) 444-5555', 'Susan Thompson: (555) 567-8902',
 'Full-time', 95000),

('Jessica', 'Martinez', 'jessica.martinez@email.com', '(555) 678-9012',
 '654 Birch Lane', 'Fresno', 'CA', '93650',
 'House', true, 'One dog, 3 years old', 'Intermediate',
 'Dr. Garcia (Vet): (555) 555-6666', 'Robert Martinez: (555) 678-9013',
 'Part-time', 45000),

('James', 'Anderson', 'james.anderson@email.com', '(555) 789-0123',
 '987 Cedar Drive', 'Oakland', 'CA', '94601',
 'Apartment', false, 'None', 'Beginner',
 'Tom Harris: (555) 666-7777', 'Linda Anderson: (555) 789-0124',
 'Full-time', 72000),

('Amanda', 'Taylor', 'amanda.taylor@email.com', '(555) 890-1234',
 '147 Willow Court', 'San Diego', 'CA', '92101',
 'House', true, 'Two cats', 'Expert',
 'Dr. Lee (Vet): (555) 777-8888', 'Mark Taylor: (555) 890-1235',
 'Full-time', 88000),

('Christopher', 'White', 'chris.white@email.com', '(555) 901-2345',
 '258 Spruce Street', 'Long Beach', 'CA', '90802',
 'Condo', false, 'None', 'Intermediate',
 'Sarah Miller: (555) 888-9999', 'Jennifer White: (555) 901-2346',
 'Full-time', 78000),

('Nicole', 'Harris', 'nicole.harris@email.com', '(555) 012-3456',
 '369 Ash Boulevard', 'Bakersfield', 'CA', '93301',
 'House', true, 'One dog, one cat', 'Expert',
 'Dr. Johnson (Vet): (555) 999-0000', 'Kevin Harris: (555) 012-3457',
 'Self-employed', 92000),

('Daniel', 'Clark', 'daniel.clark@email.com', '(555) 123-4567',
 '741 Redwood Avenue', 'Anaheim', 'CA', '92801',
 'Apartment', false, 'None', 'Beginner',
 'Mike Brown: (555) 000-1111', 'Rachel Clark: (555) 123-4568',
 'Full-time', 68000),

('Lauren', 'Lewis', 'lauren.lewis@email.com', '(555) 234-6789',
 '852 Sycamore Lane', 'Santa Rosa', 'CA', '95401',
 'House', true, 'Three cats', 'Expert',
 'Dr. Davis (Vet): (555) 111-2223', 'Brian Lewis: (555) 234-6790',
 'Full-time', 82000),

('Ryan', 'Walker', 'ryan.walker@email.com', '(555) 345-7890',
 '963 Poplar Drive', 'Modesto', 'CA', '95350',
 'Townhouse', false, 'One cat', 'Intermediate',
 'Amy Wilson: (555) 222-3334', 'Kelly Walker: (555) 345-7891',
 'Full-time', 71000),

('Stephanie', 'Hall', 'stephanie.hall@email.com', '(555) 456-8901',
 '159 Magnolia Street', 'Stockton', 'CA', '95202',
 'House', true, 'Two dogs', 'Intermediate',
 'Dr. Martinez (Vet): (555) 333-4445', 'Greg Hall: (555) 456-8902',
 'Part-time', 52000),

('Kevin', 'Allen', 'kevin.allen@email.com', '(555) 567-9012',
 '357 Hickory Road', 'Fremont', 'CA', '94536',
 'Apartment', false, 'None', 'Beginner',
 'Lisa Thompson: (555) 444-5556', 'Michelle Allen: (555) 567-9013',
 'Full-time', 76000),

('Melissa', 'Young', 'melissa.young@email.com', '(555) 678-0123',
 '486 Walnut Court', 'Irvine', 'CA', '92602',
 'House', true, 'One dog', 'Intermediate',
 'Dr. Anderson (Vet): (555) 555-6667', 'Jason Young: (555) 678-0124',
 'Full-time', 94000),

('Brandon', 'King', 'brandon.king@email.com', '(555) 789-1234',
 '597 Chestnut Avenue', 'Glendale', 'CA', '91201',
 'Condo', false, 'None', 'Beginner',
 'Chris Davis: (555) 666-7778', 'Ashley King: (555) 789-1235',
 'Full-time', 69000),

('Rachel', 'Wright', 'rachel.wright@email.com', '(555) 890-2345',
 '608 Beech Lane', 'Huntington Beach', 'CA', '92646',
 'House', true, 'Two cats, one dog', 'Expert',
 'Dr. Taylor (Vet): (555) 777-8889', 'Eric Wright: (555) 890-2346',
 'Self-employed', 87000),

('Justin', 'Lopez', 'justin.lopez@email.com', '(555) 901-3456',
 '719 Fir Street', 'Santa Clarita', 'CA', '91350',
 'Apartment', false, 'None', 'Intermediate',
 'Maria Garcia: (555) 888-9990', 'Diana Lopez: (555) 901-3457',
 'Full-time', 73000),

('Brittany', 'Hill', 'brittany.hill@email.com', '(555) 012-4567',
 '820 Cypress Drive', 'Oceanside', 'CA', '92054',
 'House', true, 'One cat', 'Intermediate',
 'Dr. White (Vet): (555) 999-0001', 'Tyler Hill: (555) 012-4568',
 'Full-time', 79000),

('Andrew', 'Scott', 'andrew.scott@email.com', '(555) 123-5678',
 '931 Sequoia Boulevard', 'Corona', 'CA', '92879',
 'Townhouse', false, 'None', 'Beginner',
 'Jennifer Lee: (555) 000-1112', 'Megan Scott: (555) 123-5679',
 'Full-time', 67000);

-- ============================================================================
-- ADOPTION APPLICATIONS - Generate applications with various statuses
-- ============================================================================

-- Get animal and adopter IDs for creating applications
DO $$
DECLARE
    v_animal_ids INTEGER[];
    v_adopter_ids INTEGER[];
    v_animal_id INTEGER;
    v_adopter_id INTEGER;
    v_status TEXT;
    v_date DATE;
BEGIN
    -- Get arrays of IDs
    SELECT ARRAY_AGG(animal_id) INTO v_animal_ids FROM animals WHERE is_active = true LIMIT 15;
    SELECT ARRAY_AGG(adopter_id) INTO v_adopter_ids FROM adopters LIMIT 15;
    
    -- Create applications with various statuses
    -- Submitted applications (recent)
    FOR i IN 1..3 LOOP
        v_animal_id := v_animal_ids[i];
        v_adopter_id := v_adopter_ids[i];
        v_date := CURRENT_DATE - (i || ' days')::INTERVAL;
        
        INSERT INTO adoption_applications (animal_id, adopter_id, application_date, status)
        VALUES (v_animal_id, v_adopter_id, v_date, 'Submitted');
    END LOOP;
    
    -- Under Review applications
    FOR i IN 4..6 LOOP
        v_animal_id := v_animal_ids[i];
        v_adopter_id := v_adopter_ids[i];
        v_date := CURRENT_DATE - (i + 5 || ' days')::INTERVAL;
        
        INSERT INTO adoption_applications (animal_id, adopter_id, application_date, status)
        VALUES (v_animal_id, v_adopter_id, v_date, 'Under Review');
    END LOOP;
    
    -- Interview Scheduled applications
    FOR i IN 7..9 LOOP
        v_animal_id := v_animal_ids[i];
        v_adopter_id := v_adopter_ids[i];
        v_date := CURRENT_DATE - (i + 10 || ' days')::INTERVAL;
        
        INSERT INTO adoption_applications (animal_id, adopter_id, application_date, status)
        VALUES (v_animal_id, v_adopter_id, v_date, 'Interview Scheduled');
    END LOOP;
    
    -- Approved applications
    FOR i IN 10..12 LOOP
        v_animal_id := v_animal_ids[i];
        v_adopter_id := v_adopter_ids[i];
        v_date := CURRENT_DATE - (i + 15 || ' days')::INTERVAL;
        
        INSERT INTO adoption_applications (animal_id, adopter_id, application_date, status)
        VALUES (v_animal_id, v_adopter_id, v_date, 'Approved');
    END LOOP;
    
    -- Rejected applications
    FOR i IN 13..14 LOOP
        v_animal_id := v_animal_ids[i];
        v_adopter_id := v_adopter_ids[i];
        v_date := CURRENT_DATE - (i + 20 || ' days')::INTERVAL;
        
        INSERT INTO adoption_applications (animal_id, adopter_id, application_date, status)
        VALUES (v_animal_id, v_adopter_id, v_date, 'Rejected');
    END LOOP;
    
    -- Completed application
    v_animal_id := v_animal_ids[15];
    v_adopter_id := v_adopter_ids[15];
    v_date := CURRENT_DATE - INTERVAL '30 days';
    
    INSERT INTO adoption_applications (animal_id, adopter_id, application_date, status)
    VALUES (v_animal_id, v_adopter_id, v_date, 'Completed');
    
END $$;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Show summary of generated data
SELECT 'Animals' as table_name, COUNT(*) as count FROM animals
UNION ALL
SELECT 'Adopters', COUNT(*) FROM adopters
UNION ALL
SELECT 'Applications', COUNT(*) FROM adoption_applications;

-- Show application status breakdown
SELECT 
    status,
    COUNT(*) as count
FROM adoption_applications
GROUP BY status
ORDER BY 
    CASE status
        WHEN 'Submitted' THEN 1
        WHEN 'Under Review' THEN 2
        WHEN 'Interview Scheduled' THEN 3
        WHEN 'Approved' THEN 4
        WHEN 'Rejected' THEN 5
        WHEN 'Completed' THEN 6
    END;

-- Show animals by adoption status
SELECT 
    adoption_status,
    COUNT(*) as count
FROM animals
GROUP BY adoption_status
ORDER BY count DESC;

COMMIT;
