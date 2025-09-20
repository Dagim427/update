import { React } from "react";
import "../styles/added.css";

function AppointmentForm() {
  return (
    <>
      <main>
        <div className="form-container">
          <h2>Appointment Form</h2>
          <form className="container mt-4">
            <fieldset className="border p-3 mb-4">
              <legend className="w-auto px-2">Patient Details:</legend>
              <div className="mb-3">
                <label className="form-label">Patient Name:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter patient name"
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Date of Birth:</label>
                <input type="date" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Age:</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter age"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Sex:</label>
                <select className="form-select">
                  <option value="">Select...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Your Email"
                />
              </div>
            </fieldset>

            <fieldset className="border p-3 mb-4">
              <legend className="w-auto px-2">
                Apointment Details:
              </legend>
              <div className="mb-3">
                <label className="form-label">Docotr Name:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Doctor name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Preferred Date</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Preferred Date"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Preferred Time Slot:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Preferred Time Slot"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Reason for Visit / Symptoms:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Reason for Visit / Symptoms"
                />
              </div>
            </fieldset>

            

            <fieldset className="border p-3 mb-4">
              <legend className="w-auto px-2">
                Additional Notes:
              </legend>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Enter any additional notes..."
                ></textarea>
              </div>
            </fieldset>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default AppointmentForm;
