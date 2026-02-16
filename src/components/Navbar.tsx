import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/image.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const closeMenu = () => setIsOpen(false);

  const goToSection = (targetId: string) => {
    closeMenu();

    if (location.pathname === "/") {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    navigate(`/#${targetId}`);
  };

  const goToRoute = (path: string) => {
    closeMenu();
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  const navLinks = [
    { label: "Gallery", onClick: () => goToSection("gallery") },
    { label: "Awards", onClick: () => goToSection("distinguished-alumni") },
    { label: "Campus Visit", onClick: () => goToSection("campus") },
    { label: "Network", onClick: () => goToRoute("/directory") },
    { label: "Missing Alumni", onClick: () => goToRoute("/missing_alumni") },
    { label: "Donate", onClick: () => goToSection("donate") },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/80 text-slate-900 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-black/40 dark:text-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <img src={logo} alt="IIITM Logo" className="h-16 w-auto" />
          </div>

          <div className="hidden items-center space-x-6 md:flex">
            {navLinks.map(({ label, onClick }) => (
              <button
                key={label}
                type="button"
                onClick={onClick}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-700 dark:text-gray-200 dark:hover:text-white"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => goToRoute("/alumnimeet")}
              className="relative inline-flex group items-center justify-center overflow-hidden rounded-full p-0.5 font-bold transition-transform hover:scale-110 duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              {/* Spinning Gradient Border */}
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0EA5E9_0%,#6366F1_50%,#0EA5E9_100%)]" />

              {/* Inner Button Content */}
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-2 text-sm font-bold text-white backdrop-blur-3xl transition-all group-hover:bg-slate-900 shadow-[0_0_20px_rgba(99,102,241,0.5)] group-hover:shadow-[0_0_35px_rgba(14,165,233,0.8)]">
                <span className="bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent group-hover:text-white transition-colors">
                  MEET'26
                </span>
              </span>
            </button>
            <a
              href="https://forms.gle/jpsTnk42FB8514jE8"
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              Join Alumni Cell
            </a>
          </div>

          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 dark:text-white"
              aria-label="Toggle navigation menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/90 backdrop-blur-md dark:border-white/10 dark:bg-black/40">
          <div className="space-y-2 px-4 pb-6 pt-4">
            {navLinks.map(({ label, onClick }) => (
              <button
                key={label}
                type="button"
                onClick={onClick}
                className="block w-full rounded-lg px-3 py-2 text-left text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700 dark:text-gray-100 dark:hover:text-white dark:hover:bg-white/10"
              >
                {label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => goToRoute("/alumnimeet")}
              className="relative block w-full rounded-lg p-[2px] overflow-hidden group mt-4"
            >
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0EA5E9_0%,#6366F1_50%,#0EA5E9_100%)]" />
              <span className="relative block w-full rounded-md bg-slate-950 px-3 py-3 text-center font-bold text-white transition-colors group-hover:bg-slate-900">
                <span className="bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                  MEET'26
                </span>
              </span>
            </button>
            <a
              href="https://forms.gle/jpsTnk42FB8514jE8"
              target="_blank"
              rel="noreferrer"
              className="block rounded-md bg-blue-600 px-3 py-3 text-center font-semibold text-white hover:bg-blue-700"
            >
              Join Alumni Cell
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
