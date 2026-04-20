import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './pages/Header'
import HomePage from './pages/HomePage'
import GalleryPage from './pages/GalleryPage'
import WorksPage from './pages/WorksPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import AppointmentPage from './pages/AppointmentPage'
import Footer from './pages/Footer'
import Menu from './adminpages/Menu'
import WhatsappButton from './components/Header/WhatsappButton'

// 🟢 Toastify importları
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function AppContent() {
  const location = useLocation();
  const showWhatsapp = location.pathname !== '/admin';

  return (
    <>
      {showWhatsapp && <WhatsappButton />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <HomePage />
              <WorksPage />
              <GalleryPage />
              <AppointmentPage />
              <AboutPage />
              <ContactPage />
              <Footer />
            </>
          }
        />
        <Route path="/admin" element={<Menu />} />
      </Routes>

      {/* 🟢 Toast container buraya eklendi */}
      <ToastContainer
  position="top-right"
  autoClose={2500}
  hideProgressBar
  closeOnClick
  pauseOnHover
  draggable
  toastStyle={{
    backgroundColor: "#1b4332", // koyu yeşil zemin
    color: "#fefefe",           // açık yazı rengi
    borderRadius: "12px",
    fontSize: "15px",
    padding: "10px 18px",
    fontWeight: "500",
    fontFamily: "'Poppins', sans-serif",
    boxShadow: "0 3px 12px rgba(0, 0, 0, 0.2)"
  }}
  progressStyle={{
    background: "#95d5b2" // açık yeşil progress bar
  }}
/>

    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
