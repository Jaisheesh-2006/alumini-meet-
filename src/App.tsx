import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Campus from "./components/Campus";
import Donate from "./components/Donate";
import Footer from "./components/Footer";
import Message from "./components/Message";
import Gallery from "./components/Gallery";
import DistinguishedAlumni from "./components/DistinguishedAlumni";
import AlumniMeetPage from "./pages/AlumniMeet";
import VolunteerPortal from "./components/VolunteerPortal";
import DirectoryPage from "./pages/Directory";
import MissingAlumniPage from "./pages/MissingAlumni";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

// Main site layout
const MainSite = () => {
  const { theme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }

    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  const containerClasses =
    theme === "light"
      ? "bg-slate-50 text-slate-900"
      : "bg-gradient-to-br from-black via-gray-950 to-gray-900 text-gray-100";

  return (
    <div
      className={`min-h-screen ${containerClasses} transition-colors duration-300`}
    >
      <Navbar />
      <main>
        <Hero />
        <Gallery />
        <DistinguishedAlumni />
        <Campus />
        <Message />
        <Donate />
      </main>
      <Footer />
    </div>
  );
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainSite />} />
    <Route path="/alumnimeet" element={<AlumniMeetPage />} />
    <Route path="/directory" element={<DirectoryPage />} />
    <Route path="/missing_alumni" element={<MissingAlumniPage />} />
    <Route path="/volunteer-portal-secret" element={<VolunteerPortal />} />
  </Routes>
);

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes />
        <ThemeToggle />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
