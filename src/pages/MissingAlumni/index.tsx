import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MissingAlumni from "../../components/MissingAlumni";

const MissingAlumniPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-gray-100">
      <Navbar />
      <div className="fixed top-24 left-4 z-40">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
        >
          ← Back to Main
        </button>
      </div>
      <main className="pt-12">
        <MissingAlumni />
      </main>
      <Footer />
    </div>
  );
};

export default MissingAlumniPage;
