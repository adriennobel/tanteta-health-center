import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginLayout from "./layouts/login/Loginlayout";
import MainLayout from './layouts/main/MainLayout';
import LoginPage from "./pages/login/LoginPage";
import SignUpPage from "./pages/sign-up/SignUpPage";
import HomePage from './pages/home/HomePage';
import ScheduleAVisitPage from './pages/schedule-a-visit/ScheduleAVisitPage';
import EditAppointmentPage from "./pages/edit-appointment/EditAppointmentPage";
import ReportsPage from "./pages/reports/ReportsPage";
import NotFoundPage from "./pages/not-found/NotFoundPage";
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
        <Route
          path='/reports'
          element={
            <MainLayout pageName="reports-page"><ReportsPage /></MainLayout>
          }
        />
        <Route
          path='/login'
          element={
            <LoginLayout pageName="login-page"><LoginPage /></LoginLayout>
          }
        />
        <Route
          path='/register'
          element={
            <LoginLayout pageName="sign-up-page"><SignUpPage /></LoginLayout>
          }
        />
        <Route
          path='*'
          element={
            <MainLayout pageName="not-found-page"><NotFoundPage /></MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
