-- Add last_login column to employee table
ALTER TABLE employee ADD COLUMN last_login TIMESTAMP NULL DEFAULT NULL;

-- Update existing records to have a default last_login
UPDATE employee SET last_login = CURRENT_TIMESTAMP WHERE last_login IS NULL;
