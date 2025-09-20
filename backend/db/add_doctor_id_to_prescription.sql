-- Add doctor_id column to lab_result_and_prescripiton table
ALTER TABLE lab_result_and_prescripiton ADD COLUMN doctor_id INT NULL;

-- Add foreign key constraint to employee table
ALTER TABLE lab_result_and_prescripiton 
ADD CONSTRAINT fk_prescription_doctor 
FOREIGN KEY (doctor_id) REFERENCES employee(E_ID);

-- Add index for better performance
ALTER TABLE lab_result_and_prescripiton ADD INDEX idx_doctor_id (doctor_id);
