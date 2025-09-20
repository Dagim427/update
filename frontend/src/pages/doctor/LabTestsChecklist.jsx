import { useState } from "react";
const LabTestsChecklist = ({ onSelectionChange }) => {
  const [selectedTests, setSelectedTests] = useState([]);

  const labTests = [
    "Complete Blood Count (CBC)",
    "Blood Glucose Test",
    "Lipid Profile",
    "Liver Function Test (LFT)",
    "Kidney Function Test (KFT)",
    "Thyroid Panel",
    "Vitamin D Test",
    "Vitamin B12 Test",
    "Iron Studies",
    "Blood Culture",
    "Urinalysis",
    "Stool Test",
    "COVID-19 PCR",
    "Influenza Test",
    "HIV Test",
    "Syphilis Test",
    "Pregnancy Test",
    "Allergy Test",
    "Arterial Blood Gas (ABG)",
    "Electrolyte Panel",
    "CRP (C-Reactive Protein)",
    "ESR (Erythrocyte Sedimentation Rate)",
    "Tumor Markers ",
    "Genetic Testing",
    "Autoimmune Panel",
    "Hormone Tests ",
    "Serology Tests",
    "Blood Gas Analysis",
    "Coagulation Profile (PT, aPTT)",
    "Lactate Dehydrogenase (LDH)",
    "Amylase and Lipase",
    "Serum Protein Electrophoresis",
    "Electrolyte Panel",
    "Cardiac Enzymes",
    "Procalcitonin",
    "D-dimer",
    "Ferritin",
    "Cortisol Test",
    "Insulin Test",
    "HBA1C (Diabetes Monitoring)",
    "Thyroid Stimulating Hormone (TSH)",
    "Thyroxine (T4)",
    "Triiodothyronine (T3)",
  ];

  const handleCheckboxChange = (test) => {
    const updatedTests = selectedTests.includes(test)
      ? selectedTests.filter((t) => t !== test)
      : [...selectedTests, test];

    setSelectedTests(updatedTests);
    onSelectionChange(updatedTests); // Notify parent of updated selection
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm">
        <div className="card-body" style={{ maxHeight: "400px", overflowY: "auto" }}>
          <div className="row">
            {labTests.map((test, index) => (
              <div className="col-md-6 mb-2" key={index}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`test-${index}`}
                    checked={selectedTests.includes(test)}
                    onChange={() => handleCheckboxChange(test)}
                  />
                  <label className="form-check-label" htmlFor={`test-${index}`}>
                    {test}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabTestsChecklist;
