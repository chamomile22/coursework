import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import ReceptionDetails from "./pages/ReceptionDetails/ReceptionDetails.jsx";
import Receptions from "./pages/Receptions/Receptions.jsx";
import Services from "./pages/Services/Services.jsx";
import ServiceDetails from "./pages/ServiceDetails/ServiceDetails.jsx";
import Doctors from "./pages/Doctors/Doctors.jsx";
import DoctorDetails from "./pages/DoctorDetails/DoctorDetails.jsx";
import Patients from "./pages/Patients/Patients.jsx";
import PatientDetails from "./pages/PatientDetails/PatientDetails.jsx";
import Departments from "./pages/Departments/Departments.jsx";
import Medicaments from "./pages/Medicaments/Medicaments.jsx";
import MedicamentOrder from "./pages/MedicamentOrder/MedicamentOrder.jsx";
import EquipmentOrder from "./pages/EquipmentOrder/EquipmentOrder.jsx";

export const paths = {
  login: '/login',
  register: '/register',
  receptions: '/',
  receptionDetails: '/reception-details',
  services: '/services',
  serviceDetails: '/service-details',
  doctors: '/doctors',
  doctorDetails: '/doctor-details',
  patients: '/patients',
  patientDetails: '/patient-details',
  departments: '/departments',
  medicaments: '/medicaments',
  medicamentOrder: '/medicamentOrder',
  equipment: '/equipment',
  equipmentOrder: '/equipmentOrder',
  events: '/events',
  error: '/*',
};

export const GuestRoutes = [
  {
    path: paths.login,
    Component: Login,
  },
  {
    path: paths.register,
    Component: Register,
  },
  {
    path: paths.error,
    Component: NotFound,
  },
]

export const AdminRoutes = [
  {
    path: paths.receptions,
    Component: Receptions,
  },
  {
    path: paths.receptionDetails,
    Component: ReceptionDetails,
  },
  {
    path: paths.services,
    Component: Services,
  },
  {
    path: paths.serviceDetails,
    Component: ServiceDetails,
  },
  {
    path: paths.doctors,
    Component: Doctors,
  },
  {
    path: paths.doctorDetails,
    Component: DoctorDetails,
  },
  {
    path: paths.patients,
    Component: Patients,
  },
  {
    path: paths.patientDetails,
    Component: PatientDetails,
  },
  {
    path: paths.departments,
    Component: Departments,
  },
  {
    path: paths.medicaments,
    Component: Medicaments,
  },
  {
    path: paths.medicamentOrder,
    Component: MedicamentOrder,
  },
  {
    path: paths.equipment,
    Component: Medicaments,
  },
  {
    path: paths.equipmentOrder,
    Component: EquipmentOrder,
  },
  {
    path: paths.error,
    Component: NotFound,
  },
];

export const DoctorRoutes = [
  {
    path: paths.receptions,
    Component: Receptions,
  },
  {
    path: paths.receptionDetails,
    Component: ReceptionDetails,
  },
  {
    path: paths.services,
    Component: Services,
  },
  {
    path: paths.patients,
    Component: Patients,
  },
  {
    path: paths.departments,
    Component: Departments,
  },
  {
    path: paths.error,
    Component: NotFound,
  },
];

export const PatientRoutes = [
  {
    path: paths.receptions,
    Component: Receptions,
  },
  {
    path: paths.services,
    Component: Services,
  },
  {
    path: paths.doctors,
    Component: Doctors,
  },
  {
    path: paths.departments,
    Component: Departments,
  },
  {
    path: paths.error,
    Component: NotFound,
  },
];
