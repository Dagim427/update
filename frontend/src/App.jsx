import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./pages/styles/dashboard.css";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import Home from "./pages/root/home/Home";
import AboutUs from "./pages/root/about-us/AboutUs";
import Services from "./pages/root/services/Services";
import ContactUs from "./pages/root/contact-us/ContactUs";
import Login from "./pages/root/sign-in/Login";
import ChangePasswordForm from "./pages/root/sign-in/ChangePasswordForm";
import VerifyOTP from "./pages/root/sign-in/VerifyOTP";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddEmployee from "./pages/admin/AddEmployee";
import ViewEmployees from "./pages/admin/ViewEmployees";
import ViewFeedBack from "./pages/admin/ViewFeedBack";
import EditEmployee from "./pages/admin/EditEmployee";
import TriageRoomDashboard from "./pages/triage-room/TriageRoomDashboard";
import PreTest from "./pages/triage-room/PreTest";
import ViewPreTest from "./pages/triage-room/ViewPreTest";
import ClerkDashboard from "./pages/clerk/ClerkDashboard";
import PatientRegisteration from "./pages/clerk/PatientRegisteration";
import ViewPatientRegisteration from "./pages/clerk/ViewPatientRegisteration";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorEvalution from "./pages/doctor/DoctorEvalution";
import LabTestAndPrescription from "./pages/doctor/LabResultAndPrescription";
import ViewDoctorEvaluation from "./pages/doctor/ViewDoctorEvaluation";
import ViewLabAndPrescription from "./pages/doctor/ViewLabAndPrescription";
import LabTechnicianDashboard from "./pages/lab-technician/LabTechnicianDashboard";
import SendLabResult from "./pages/lab-technician/SendLabResult";
import ViewLabRequest from "./pages/lab-technician/ViewLabRequest";
import PatientDashboard from "./pages/patient/PatientDashboard";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import LoginPatient from "./pages/root/sign-in/LoginPatient";
import ChangePasswordPatient from "./pages/root/sign-in/ChangePasswordPatient";
import PrescriptionRead from "./pages/patient/PrescriptionRead";
import MedicalRecord from "./pages/patient/MedicalRecord";
import ViewEmployeeById from "./pages/admin/ViewEmployeeById";
import ViewPatientById from "./pages/clerk/ViewPatientById";
import EditPatient from "./pages/clerk/EditPatient";
import ViewPreTestById from "./pages/triage-room/ViewPreTestById";
import EditPreTest from "./pages/triage-room/EditPreTest";
import ViewDoctorEvaluationById from "./pages/doctor/ViewDoctorEvaluationById";
import EditDoctorEvaluationById from "./pages/doctor/EditDoctorEvaluationById ";
import ViewLabRequestById from "./pages/lab-technician/ViewLabRequestById";
import EditSendLabResultById from "./pages/lab-technician/EditSendLabResultById";
import ViewLabResultAndPrescriptionById from "./pages/doctor/ViewLabResultAndPrescriptionById";
import EditLabResultAndPrescriptionById from "./pages/doctor/EditLabResultAndPrescriptionById";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import AdminProfile from "./pages/admin/AdminProfile";
import ClerkProfile from "./pages/clerk/ClerkProfile";
import TriageRoomProfile from "./pages/triage-room/TriageRoomProfile";
import LabTechnicianProfile from "./pages/lab-technician/LabTechnicianProfile";

import PharmacistDashboard from "./pages/pharmacist/PharmacistDashboard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/change-password/" element={<ChangePasswordForm />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/patient-login" element={<LoginPatient />} />
        <Route
          path="/patient-change-password/"
          element={<ChangePasswordPatient />}
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-employee"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddEmployee />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/employees" element={<ViewEmployees />} />
        <Route
          path="/admin/View-feedback"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ViewFeedBack />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/edit-employee/:id" element={<EditEmployee />} />
        <Route path="/admin/view-employee/:id" element={<ViewEmployeeById />} />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clerk"
          element={
            <ProtectedRoute allowedRoles={["clerk"]}>
              <ClerkDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clerk/patient-registeration"
          element={
            <ProtectedRoute allowedRoles={["clerk"]}>
              <PatientRegisteration />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clerk/view-patient-registeration"
          element={
            <ProtectedRoute allowedRoles={["clerk"]}>
              <ViewPatientRegisteration />
            </ProtectedRoute>
          }
        />
        <Route path="/clerk/view-patient/:id" element={<ViewPatientById />} />
        <Route path="/clerk/edit-patient/:id" element={<EditPatient />} />
        <Route
          path="/clerk/profile"
          element={
            <ProtectedRoute allowedRoles={["clerk"]}>
              <ClerkProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/triage-room"
          element={
            <ProtectedRoute allowedRoles={["triage room"]}>
              <TriageRoomDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/triage-room/pre-test"
          element={
            <ProtectedRoute allowedRoles={["triage room"]}>
              <PreTest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/triage-room/view-pre-test"
          element={
            <ProtectedRoute allowedRoles={["triage room"]}>
              <ViewPreTest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/triage-room/view-patient/:id/view"
          element={<ViewPreTestById />}
        />
        <Route
          path="/triage-room/edit-pre-test/:id"
          element={<EditPreTest />}
        />
        <Route
          path="/triage-room/profile"
          element={
            <ProtectedRoute allowedRoles={["triage room"]}>
              <TriageRoomProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/doctor-evaluation"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorEvalution />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/view-doctor-evaluation"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <ViewDoctorEvaluation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/view-de-patient/:id/view"
          element={<ViewDoctorEvaluationById />}
        />
        <Route
          path="/doctor/edit-de-patient/:id"
          element={<EditDoctorEvaluationById />}
        />

        <Route
          path="/doctor/lab-result-and-prescription"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <LabTestAndPrescription />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/view-lab-result-and-prescription"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <ViewLabAndPrescription />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/view-lab-result-and-prescription/:id/view"
          element={<ViewLabResultAndPrescriptionById />}
        />
        <Route
          path="/doctor/edit-lab-result-and-prescription/:id/edit"
          element={<EditLabResultAndPrescriptionById />}
        />
        <Route
          path="/doctor/profile"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lab-technician"
          element={
            <ProtectedRoute allowedRoles={["lab technician"]}>
              <LabTechnicianDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lab-technician/send-lab-request"
          element={
            <ProtectedRoute allowedRoles={["lab technician"]}>
              <SendLabResult />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lab-technician/view-lab-request"
          element={
            <ProtectedRoute allowedRoles={["lab technician"]}>
              <ViewLabRequest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lab-technician/lab-request/:id/view"
          element={<ViewLabRequestById />}
        />
        <Route
          path="/lab-technician/lab-request/:id/edit"
          element={<EditSendLabResultById />}
        />
        <Route
          path="/lab-technician/profile"
          element={
            <ProtectedRoute allowedRoles={["lab technician"]}>
              <LabTechnicianProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/prescription-read"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PrescriptionRead />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/medical-record"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <MedicalRecord />
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<Unauthorized />} />

         <Route
          path="/pharmacist"
          element={
            // <ProtectedRoute allowedRoles={["patient"]}>
              <PharmacistDashboard />
            // </ProtectedRoute>
          }
        />

        <Route
          path="/pharmacist/prescription-read"
          element={
            // <ProtectedRoute allowedRoles={["patient"]}>
              <PrescriptionRead />
            // </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
