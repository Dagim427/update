import React, { useRef, useEffect, useState } from "react";
import axios from "../../config/axiosConfig";

function PreTestForm() {
  const [patientList, setPatientList] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const selectedPatient = patientList.find((p) => p.patient_id == selectedId);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("/triage-room/patient-registered");
        setPatientList(res.data.registered);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      }
    };
    fetchPatients();
  }, []);

  const temperatureDom = useRef();
  const weightDom = useRef();
  const bloodPressureDom = useRef();
  const pulseRateDom = useRef();
  const respiratoryRateDom = useRef();
  const bloodGlucoseLevelDom = useRef();
  const symptomsDom = useRef();
  const DurationOfSymptomsDom = useRef();
  const painScaleDom = useRef();
  const levelOfConsciousnessDom = useRef();
  const priorityLevelDom = useRef();
  const allergiesDom = useRef();
  const InitialObservationsDom = useRef();
  const referredToDom = useRef();
  // console.log("PreTest payload:", PreTest);

  async function handleSubmit(e) {
    e.preventDefault();
    const PreTest = {
      patientId: selectedId.trim(),
      temperature: temperatureDom.current.value,
      weight: weightDom.current.value,
      blood_pressure: bloodPressureDom.current.value,
      pulse_rate: pulseRateDom.current.value,
      respiratory_rate: respiratoryRateDom.current.value,
      blood_glucose_level: bloodGlucoseLevelDom.current.value,
      symptoms: symptomsDom.current.value,
      durationOfSymptoms: DurationOfSymptomsDom.current.value,
      painScale: painScaleDom.current.value,
      levelOfConsciousness: levelOfConsciousnessDom.current.value,
      PriorityLevel: priorityLevelDom.current.value,
      referredTo: referredToDom.current.value,
      allergies: allergiesDom.current.value,
      Initial_observations: InitialObservationsDom.current.value,
    };

    try {
      // console.log("PreTest payload:", PreTest);

      await axios.post("/triage-room/pre-test", PreTest);
      setSuccessMessage(true);
      setErrorMessage("");
      setTimeout(() => setSuccessMessage(false), 3000);
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      console.log(error);
      setTimeout(() => setErrorMessage(""), 5000);
    }
  }

  return (
    <main>
      <div className="form-container">
        <h2 className="text-color fw-bold mb-4">Central Triage Room</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <fieldset className="border rounded-3 p-4 mb-4 shadow-sm bg-light">
            <legend className="w-auto px-3 text-primary fs-5 fw-semibold">
              Patient Information:
            </legend>

            <div className="mb-4">
              <label htmlFor="patientSelect" className="form-label fw-bold">
                Select Patient by ID:
              </label>
              <select
                id="patientSelect"
                className="form-select"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
              >
                <option value="">-- Select Patient --</option>
                {Array.isArray(patientList) &&
                  patientList.map((p) => (
                    <option key={p.patient_id} value={p.patient_id}>
                      {p.patient_id} - {p.first_name} {p.last_name}
                    </option>
                  ))}
              </select>
            </div>

            {selectedPatient && (
              <div className="mb-3">
                <div className="row mb-2">
                  <label className="col-sm-3 fw-bold">Patient ID:</label>
                  <div className="col-sm-9">{selectedPatient.patient_id}</div>
                </div>
                <div className="row mb-2">
                  <label className="col-sm-3 fw-bold">Patient MRN:</label>
                  <div className="col-sm-9">{selectedPatient.mrn}</div>
                </div>

                <div className="row mb-2">
                  <label className="col-sm-3 fw-bold">Patient Name:</label>
                  <div className="col-sm-9">
                    {selectedPatient.first_name} {selectedPatient.last_name}
                  </div>
                </div>

                <div className="row mb-2">
                  <label className="col-sm-3 fw-bold">Patient DoB:</label>
                  <div className="col-sm-9">{selectedPatient.dob}</div>
                </div>

                <div className="row mb-2">
                  <label className="col-sm-3 fw-bold">Sex:</label>
                  <div className="col-sm-9">{selectedPatient.sex}</div>
                </div>

                <div className="row mb-2">
                  <label className="col-sm-3 fw-bold">Current Status:</label>
                  <div className="col-sm-9">
                    {selectedPatient.current_status}
                  </div>
                </div>
              </div>
            )}
          </fieldset>

          <fieldset className="border rounded-3 p-4 mb-4 shadow-sm bg-light">
            <legend className="w-auto px-3 text-primary fs-5 fw-semibold">
              Vital Signs
            </legend>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">Temperature (°C)</label>
                <input
                  type="number"
                  step="any"
                  className="form-control"
                  placeholder="Enter Temperature"
                  ref={temperatureDom}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">Weight (kg)</label>
                <input
                  type="number"
                  step="any"
                  className="form-control"
                  placeholder="Enter Weight"
                  ref={weightDom}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">
                  Blood Pressure (mmHg)
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. 120/80"
                  ref={bloodPressureDom}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">Pulse Rate (bpm)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. 72"
                  ref={pulseRateDom}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">
                  Respiratory Rate (breaths/min)
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. 18"
                  ref={respiratoryRateDom}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">
                  Blood Glucose Level (mg/dL)
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. 90"
                  ref={bloodGlucoseLevelDom}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="border rounded-3 p-4 mb-4 shadow-sm bg-light">
            <legend className="w-auto px-3 text-primary fs-5 fw-semibold mb-3">
              Chief Complaint
            </legend>

            <div className="row g-3">
              {/* <div className="col-md-6">
                <label className="form-label fw-bold">Symptoms</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Symptoms"
                  ref={symptomsDom}
                />
              </div> */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Symptoms</label>
                <div
                  className="form-control"
                  style={{
                    height: "250px",
                    overflowY: "scroll",
                    border: "1px solid #ccc",
                    padding: "10px",
                  }}
                >
                  {[
                    "Fever",
                    "Headache",
                    "Cough",
                    "Sore throat",
                    "Runny nose",
                    "Chest pain",
                    "Shortness of breath",
                    "Fatigue / Weakness",
                    "Dizziness",
                    "Nausea",
                    "Vomiting",
                    "Abdominal pain",
                    "Diarrhea",
                    "Constipation",
                    "Loss of appetite",
                    "Back pain",
                    "Joint pain",
                    "Muscle pain",
                    "Swelling",
                    "Skin rash / itching",
                    "Chills / Sweating",
                    "Weight loss",
                    "Palpitations",
                    "Difficulty urinating",
                    "Frequent urination",
                    "Vision problems",
                    "Ear pain",
                    "Hearing loss",
                    "Tooth pain",
                    "Sleep problems",
                    "Anxiety / Depression",
                    "Memory loss",
                    "Seizures",
                    "Numbness / Tingling",
                  ].map((symptom, index) => (
                    <div key={index} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`symptom-${index}`}
                        value={symptom}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (e.target.checked) {
                            symptomsDom.current.value = [
                              ...(symptomsDom.current.value
                                ? symptomsDom.current.value.split(", ")
                                : []),
                              value,
                            ].join(", ");
                          } else {
                            symptomsDom.current.value = symptomsDom.current.value
                              .split(", ")
                              .filter((s) => s !== value)
                              .join(", ");
                          }
                        }}
                      />
                      <label
                        htmlFor={`symptom-${index}`}
                        className="form-check-label"
                      >
                        {symptom}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Hidden input to collect the selected symptoms */}
                <input type="hidden" ref={symptomsDom} />
              </div>


              <div className="col-md-6">
                <label className="form-label fw-bold">
                  Duration of Symptoms
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Duration (e.g. 3 days)"
                  ref={DurationOfSymptomsDom}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="border rounded-3 p-4 mb-4 shadow-sm bg-light">
            <legend className="w-auto px-3 text-primary fs-5 fw-semibold mb-3">
              Triage Assessment
            </legend>
            <div className="mb-3">
              <label className="form-label fw-bold">Pain Scale</label>
              <input
                type="number"
                min="1"
                max="10"
                className="form-control"
                placeholder="Enter Pain Scale (1-10)"
                ref={painScaleDom}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">
                Level of Consciousness:
              </label>
              <select className="form-select" ref={levelOfConsciousnessDom}>
                <option value="">Select...</option>
                <option value="Alert">Alert</option>
                <option value="Verbal">Verbal</option>
                <option value="Pain">Pain</option>
                <option value="Unresponsive">Unresponsive</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Priority Level:</label>
              <select className="form-select" ref={priorityLevelDom}>
                <option value="">Select...</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Pain">Pain</option>
                <option value="Normal">Normal</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </fieldset>

          <fieldset className="border rounded-3 p-4 mb-4 shadow-sm bg-light">
            <legend className="w-auto px-3 text-primary fs-5 fw-semibold mb-3">
              Other Notes
            </legend>

            {/* <div className="mb-3">
              <label className="form-label fw-bold">Allergies</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Allergies"
                ref={allergiesDom}
              />
            </div> */}

            <div className="mb-3">
              <label className="form-label fw-bold">Allergies</label>
              <div
                className="form-control"
                style={{
                  height: "200px",
                  overflowY: "scroll",
                  border: "1px solid #ccc",
                  padding: "10px",
                }}
              >
                {[
                  "Penicillin",
                  "Sulfa drugs",
                  "Aspirin",
                  "Ibuprofen",
                  "Latex",
                  "Peanuts",
                  "Tree nuts",
                  "Shellfish",
                  "Fish",
                  "Milk",
                  "Eggs",
                  "Wheat",
                  "Soy",
                  "Dust mites",
                  "Pollen",
                  "Animal dander",
                  "Insect stings",
                  "Mold",
                  "Gluten",
                  "Food preservatives",
                  "Fragrances / perfumes",
                  "Nickel (metal allergy)",
                  "Other (specify in notes)",
                ].map((allergy, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`allergy-${index}`}
                      value={allergy}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (e.target.checked) {
                          allergiesDom.current.value = [
                            ...(allergiesDom.current.value
                              ? allergiesDom.current.value.split(", ")
                              : []),
                            value,
                          ].join(", ");
                        } else {
                          allergiesDom.current.value = allergiesDom.current.value
                            .split(", ")
                            .filter((a) => a !== value)
                            .join(", ");
                        }
                      }}
                    />
                    <label htmlFor={`allergy-${index}`} className="form-check-label">
                      {allergy}
                    </label>
                  </div>
                ))}
              </div>

              {/* Hidden input to collect selected allergies */}
              <input type="hidden" ref={allergiesDom} />
            </div>


            <div className="mb-3">
              <label className="form-label fw-bold">
                Initial Observations/Comments
              </label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Initial Observations/Comments"
                ref={InitialObservationsDom}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Referred To </label>
              <select className="form-select" ref={referredToDom}>
                <option value="">--Referred To--</option>
                <option value="ENT Specialist">ENT Specialist</option>
                <option value="Ophthalmologist">Ophthalmologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
                <option value="Orthopedic doctor">Orthopedic doctor</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Dermatologist">Dermatologist</option>
              </select>
            </div>
          </fieldset>
          <hr />
          {/* Success Message */}
          {successMessage && (
            <div className="message success">Submitted Successfully!</div>
          )}
          {/* Error Message */}
          {errorMessage && <div className="message error">{errorMessage}</div>}
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </form>
      </div>
    </main>
  );
}

export default PreTestForm;
