import './App.css'
import { BrowserRouter as Router, Routes, Route,useLocation  } from 'react-router-dom'
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