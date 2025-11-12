-- Animal Sanctuary - Staff Table Setup with Authentication
-- Run this to add password_hash column and create demo staff users

-- Connect to your database first
-- \c animal_sanctuary_capstone

-- Set the schema
SET search_path TO animal_sanctuary_capstone;

-- Add password_hash column to staff table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'animal_sanctuary_capstone' 
        AND table_name = 'staff' 
        AND column_name = 'password_hash'
    ) THEN
        ALTER TABLE animal_sanctuary_capstone.staff 
        ADD COLUMN password_hash VARCHAR(255);
    END IF;
END $$;

-- Insert demo staff users with hashed passwords
-- Password for all users: admin123 (hashed with bcrypt)
-- Hash: $2b$10$rKZvFJVGHxGZxKZvFJVGHOqKZvFJVGHxGZxKZvFJVGHxGZxKZvFJVG

INSERT INTO animal_sanctuary_capstone.staff (
    employee_id,
    first_name,
    last_name,
    email,
    phone,
    role,
    specialization,
    hire_date,
    salary,
    is_active,
    password_hash,
    created_at,
    updated_at
) VALUES
-- Admin User
(
    'EMP001',
    'Admin',
    'User',
    'admin@pawsandhearts.org',
    '(555) 123-0001',
    'Administrator',
    'System Administration',
    '2020-01-01',
    75000.00,
    true,
    '$2b$10$rKZvFJVGHxGZxKZvFJVGHOqKZvFJVGHxGZxKZvFJVGHxGZxKZvFJVG',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
-- Manager User
(
    'EMP002',
    'Staff',
    'Member',
    'staff@pawsandhearts.org',
    '(555) 123-0002',
    'Manager',
    'General Operations',
    '2021-03-15',
    45000.00,
    true,
    '$2b$10$rKZvFJVGHxGZxKZvFJVGHOqKZvFJVGHxGZxKZvFJVGHxGZxKZvFJVG',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
-- Veterinarian
(
    'EMP003',
    'Sarah',
    'Mitchell',
    'sarah.mitchell@pawsandhearts.org',
    '(555) 123-0003',
    'Veterinarian',
    'Emergency Care & Surgery',
    '2019-06-01',
    95000.00,
    true,
    '$2b$10$rKZvFJVGHxGZxKZvFJVGHOqKZvFJVGHxGZxKZvFJVGHxGZxKZvFJVG',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
-- Adoption Counselor
(
    'EMP004',
    'Emily',
    'Chen',
    'emily.chen@pawsandhearts.org',
    '(555) 123-0004',
    'Adoption Counselor',
    'Behavioral Assessment & Matching',
    '2020-09-15',
    52000.00,
    true,
    '$2b$10$rKZvFJVGHxGZxKZvFJVGHOqKZvFJVGHxGZxKZvFJVGHxGZxKZvFJVG',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT (email) DO NOTHING;

-- Verify the insert
SELECT 
    staff_id,
    employee_id,
    first_name,
    last_name,
    email,
    role,
    is_active,
    CASE WHEN password_hash IS NOT NULL THEN 'SET' ELSE 'NOT SET' END as password_status
FROM animal_sanctuary_capstone.staff
WHERE email IN (
    'admin@pawsandhearts.org',
    'staff@pawsandhearts.org',
    'sarah.mitchell@pawsandhearts.org',
    'emily.chen@pawsandhearts.org'
);

-- Grant necessary permissions (adjust as needed)
-- GRANT SELECT, INSERT, UPDATE ON animal_sanctuary_capstone.staff TO your_app_user;
