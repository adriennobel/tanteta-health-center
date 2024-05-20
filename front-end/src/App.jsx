import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from './layouts/main/MainLayout';
import HomePage from './pages/home/HomePage';
import ScheduleAVisitPage from './pages/schedule-a-visit/ScheduleAVisitPage';
import EditAppointmentPage from "./pages/edit-appointment/EditAppointmentPage";
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <MainLayout pageName="home-page"><HomePage /></MainLayout>
          }
        />
        <Route
          path='/schedule-a-visit'
          element={
            <MainLayout pageName="schedule-a-visit-page">
              <ScheduleAVisitPage />
            </MainLayout>
          }
        />
        <Route
          path='/edit-appointment/:appointmentId'
          element={
            <MainLayout pageName="edit-appointment-page">
              <EditAppointmentPage />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
