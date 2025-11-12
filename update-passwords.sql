-- Update staff passwords with proper bcrypt hash for "admin123"
SET search_path TO animal_sanctuary_capstone;

UPDATE staff 
SET password_hash = '$2a$10$tZlA5xsboy3DfMkWygkH/.JFRNwDjXFiXkIEzw4AC8lyP6oIRUdw6'
WHERE email IN (
    'admin@pawsandhearts.org',
    'staff@pawsandhearts.org',
    'sarah.mitchell@pawsandhearts.org',
    'emily.chen@pawsandhearts.org'
);

-- Verify the update
SELECT 
    email,
    role,
    LENGTH(password_hash) as hash_length,
    LEFT(password_hash, 7) as hash_prefix
FROM staff
WHERE email IN (
    'admin@pawsandhearts.org',
    'staff@pawsandhearts.org',
    'sarah.mitchell@pawsandhearts.org',
    'emily.chen@pawsandhearts.org'
)
ORDER BY email;
