// import Image from "../assets/Poster.png";
import { useSequenceAnimation } from '../hooks/useScrollAnimation';
import { Link } from 'react-router-dom';
import AlumniMeetBanner from '../assets/premium.png';
import DirectoryBanner from '../assets/dir.png';

const Hero = () => {
    const heroRef = useSequenceAnimation({
        sequence: [
            {
                selector: '[data-hero="badge"]',
                from: { opacity: 0, y: 30, scale: 0.8 },
                to: { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.2)' }
            },
            {
                selector: '[data-hero="heading"]',
                from: { opacity: 0, y: 50 },
                to: { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
            },
            {
                selector: '[data-hero="subtitle"]',
                from: { opacity: 0, y: 30 },
                to: { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
            },
            {
                selector: '[data-hero="cta"]',
                from: { opacity: 0, y: 40, scale: 0.9 },
                to: { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.1)' }
            },
            {
                selector: '[data-hero="stats"] > div',
                from: { opacity: 0, y: 50 },
                to: { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
            }
        ],
        stagger: 0.1
    });

    return (
        <>
        <div className="pt-24 md:pt-28 relative overflow-hidden min-h-screen flex items-center justify-center">
            {/* Background */}
            <div className="absolute inset-0 bg-transparent">
                {/* Animated background blobs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gray-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-gray-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-10"></div>
            </div>

            {/* Content */}
            <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center relative z-10" ref={heroRef}>
                <div className="text-center">
                    {/* Badge */}
                    <div className="inline-block mb-6 px-6 py-3 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all" data-hero="badge">
                        <span className="text-white text-sm font-semibold tracking-wider">WELCOME TO ALUMNI COMMUNITY</span>
                    </div>
                    
                    {/* Main heading */}
                    <h1 className="text-5xl tracking-tight font-extrabold text-slate-900 sm:text-6xl md:text-7xl mb-8 leading-tight dark:text-white" data-hero="heading">
                        <span className="block mb-2">ABV-IIITM</span>
                        <span className="block text-slate-700 dark:text-gray-200">
                            Alumni Network
                        </span>
                    </h1>
                    
                    {/* Subtitle */}
                    <p className="mt-8 max-w-md mx-auto text-base text-slate-700 sm:text-lg md:mt-10 md:text-xl md:max-w-3xl leading-relaxed dark:text-purple-100" data-hero="subtitle">
                        Connect with your alma mater, network with fellow alumni, and stay involved with the IIITM community across the globe
                    </p>
                    
                    {/* CTA Button */}
                    <div className="mt-12 max-w-md mx-auto flex flex-col items-center gap-4" data-hero="cta">
                        <div className="rounded-xl shadow-2xl hover:shadow-3xl transition-all w-full">
                            <a
                                href="https://forms.gle/jpsTnk42FB8514jE8"
                                target="_blank"
                                className="w-full flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 md:py-5 md:text-lg md:px-10 transition-all duration-200 transform hover:scale-105"
                                >
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 10l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                Join Alumni Network
                            </a>
                        </div>

                        {/* <div className="w-full">
                            <Link
                            to="/alumnimeet"
                            className="w-full flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl force-white text-white bg-black md:py-5 md:text-lg md:px-10 transition-transform duration-200 shadow-xl transform hover:scale-105 dark:bg-gray-700"
                            >
                            Explore Alumni Meet
                            </Link>
                            </div> */}

                        
                    </div>

                    {/* Stats */}
                    <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 max-w-2xl mx-auto" data-hero="stats">
                        <div className="text-center">
                            <p className="text-3xl md:text-4xl font-bold text-emerald-700 dark:text-emerald-300">5000+</p>
                            <p className="text-slate-600 text-sm mt-2 dark:text-purple-200">Active Alumni</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl md:text-4xl font-bold text-indigo-700 dark:text-violet-300">50+</p>
                            <p className="text-slate-600 text-sm mt-2 dark:text-purple-200">Cities</p>
                        </div>
                        <div className="text-center md:col-span-1 col-span-2">
                            <p className="text-3xl md:text-4xl font-bold text-emerald-700 dark:text-emerald-300">100+</p>
                            <p className="text-slate-600 text-sm mt-2 dark:text-purple-200">Companies</p>
                        </div>
                    </div>
                </div>
            </div>

            

            <style>{`
                @keyframes blob {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                        }
                        33% {
                            transform: translate(30px, -50px) scale(1.1);
                            }
                            66% {
                                transform: translate(-20px, 20px) scale(0.9);
                                }
                                }
                                .animate-blob {
                                    animation: blob 7s infinite;
                                    }
                                    .animation-delay-2000 {
                                        animation-delay: 2s;
                                        }
                                        .animation-delay-4000 {
                                            animation-delay: 4s;
                                            }
                                            `}</style>
        </div>

        
        <section className="w-full px-4 sm:px-6 lg:px-12 pb-16">
            <div className="max-w-screen mx-auto overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-stretch">
                    <div className="p-8 sm:p-12 lg:col-span-2 flex flex-col justify-center gap-5">
                        <div>
                            <p className="uppercase tracking-[0.35em] text-xs sm:text-sm text-slate-500 dark:text-slate-300/80">Alumni Meet 2026</p>
                            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white">
                                Return to campus. Reconnect with your people.
                            </h2>
                        </div>
                        <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-200/90">
                            Relive your IIITM memories with curated panels, campus walks, and reunion mixers designed to bring every batch together this March.
                        </p>
                        <div className="pt-1">
                            <Link
                                to="/alumnimeet"
                                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white bg-blue-600/90 hover:bg-blue-500 transition-colors duration-200 shadow-md focus-visible:outline force-white  focus-visible:outline-blue-500"
                            >
                                Explore Alumni Meet
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    <div
                        className="relative block lg:col-span-3 min-h-[42vh] sm:min-h-[52vh] lg:min-h-[60vh] group focus:outline-none rounded-3xl overflow-hidden"
                    >
                        <img
                            src={AlumniMeetBanner}
                            alt="Alumni Meet 2026 Banner"
                            className="w-full h-full object-cover transition-transform duration-[700ms] ease-[cubic-bezier(.22,1,.36,1)]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/55 via-slate-900/30 to-slate-900/55 transition-opacity duration-500" />
                        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 text-white">
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div className="w-full px-4 sm:px-6 lg:px-12 mb-16">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-black/70 to-transparent dark:via-slate-600/70"></div>
        </div>

         <section className="w-full px-4 sm:px-6 lg:px-12 pb-16">
            <div className="max-w-screen mx-auto overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-stretch">
                    

                    <div
                        className="relative block lg:col-span-3 min-h-[42vh] sm:min-h-[52vh] lg:min-h-[60vh] group focus:outline-none rounded-3xl overflow-hidden"
                    >
                        <img
                            src={DirectoryBanner}
                            alt="Alumni Directory collage"
                            className="w-full h-full object-cover transition-transform duration-[700ms] ease-[cubic-bezier(.22,1,.36,1)]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/55 via-slate-900/30 to-slate-900/55 transition-opacity duration-500" />
                        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 text-white">
                        </div>
                    </div>

                    {/* Directory Introductory */}
                    <div className="p-8 sm:p-12 lg:col-span-2 flex flex-col justify-center gap-5">
                        <div>
                            <p className="uppercase tracking-[0.35em] text-xs sm:text-sm text-slate-500 dark:text-slate-300/80">Alumni Directory</p>
                            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white">
                                Find classmates, mentors, and future collaborators.
                            </h2>
                        </div>
                        <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-200/90">
                            Browse the curated IIITM alumni directory with advanced search filters by batch, company, or expertise. Reconnect instantly and grow your professional circle across continents.
                        </p>
                        <div className="pt-1">
                            <Link
                                to="/directory"
                                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white bg-emerald-600/90 hover:bg-emerald-500 transition-colors duration-200 shadow-md focus-visible:outline focus-visible:outline-emerald-500 force-white"
                            >
                                View Directory
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        </>
    );
};

export default Hero;
