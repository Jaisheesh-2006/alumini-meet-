import CollegeBg from "../../../assets/College8.png";

const AlumniMeetHero = () => {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center bg-white"
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${CollegeBg})` }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32">
                <div className="max-w-3xl text-white">

                    {/* Heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
                        <span className="block">Welcome to the</span>
                        <span className="block text-blue-400">
                            ABV-IIITM Alumni Meet 2026
                        </span>
                    </h1>

                    {/* Event Dates */}
                    <div className="mt-8">

                        <p className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                            14 - 15th March 2026
                        </p>
                    </div>

                    {/* Short tagline */}
                    <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
                        Reconnect, relive memories, and celebrate the legacy of
                        ABV-IIITM Gwalior with fellow alumni, faculty, and students.
                    </p>

                    {/* CTA */}
                    <div className="mt-10">
                        <a
                            href="https://forms.gle/kV4GqQhJKNKFP7QP6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-10 py-4 rounded-md text-lg font-semibold
                                       bg-blue-600 hover:bg-blue-700 transition shadow-lg"
                        >
                            Express Interest
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AlumniMeetHero;