import { Trophy, GraduationCap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Import images
import imgYogesh from '../assets/awardees/Dr. Yogesh Kumar Meena.jpeg';
import imgParminder from '../assets/awardees/Parminder Singh Kakria.jpeg';
import imgArpita from '../assets/awardees/Arpita Kapoor.png';
import imgAparna from '../assets/awardees/Aparna Mangla.jpeg';
import imgMilan from '../assets/awardees/Milan Singh.jpeg';
import imgPrashant from '../assets/awardees/Dr. Prashant Singh Rana.jpeg';
import imgAbhishek from '../assets/awardees/Abhishek Kishore Gupta.jpg';
import imgPraveen from '../assets/awardees/Praveen Gupta.jpeg';
import imgAnurag from '../assets/awardees/Anurag Upadhyay.png';
import imgLeafs from '../assets/leafs.png';

interface AlumnusProps {
    name: string;
    role: string;
    organization: string;
    batch: string;
    awardCategory: string;
    image: string;
    year: number;
}

const alumniData: AlumnusProps[] = [
    // 2025
    {
        year: 2025,
        awardCategory: "Excellence in Academia",
        name: "Dr. Yogesh Kumar Meena",
        role: "Assistant Professor (Grade-I), CSE",
        organization: "IIT Gandhinagar",
        batch: "Alumnus IPG (MTech), 2005-2010",
        image: imgYogesh
    },
    {
        year: 2025,
        awardCategory: "Excellence in Industry",
        name: "Parminder Singh Kakria",
        role: "Vice President Government Affairs India and ASEAN",
        organization: "Kyndryl",
        batch: "Alumnus IPG (MTech), 2000-2005",
        image: imgParminder
    },
    {
        year: 2025,
        awardCategory: "Excellence in Startup/Entrepreneurship",
        name: "Arpita Kapoor",
        role: "Co-founder",
        organization: "Mysa (Ex-CEO Mech Mocha)",
        batch: "Alumnus IPG, 2008-2013",
        image: imgArpita
    },
    {
        year: 2025,
        awardCategory: "Women Candidate of Prominence",
        name: "Aparna Mangla",
        role: "Investment Director",
        organization: "CDC Group",
        batch: "Alumnus IPG, 2002-2007",
        image: imgAparna
    },
    {
        year: 2025,
        awardCategory: "Young Candidate of Prominence",
        name: "Milan Singh",
        role: "Co-Founder & CTO",
        organization: "Rattle",
        batch: "Alumnus IPG (MTech), 2012-2017",
        image: imgMilan
    },
    // 2024
    {
        year: 2024,
        awardCategory: "Excellence in Academia",
        name: "Dr. Prashant Singh Rana",
        role: "Assistant Professor",
        organization: "Thapar Institute of Engineering and Technology",
        batch: "",
        image: imgPrashant
    },
    {
        year: 2024,
        awardCategory: "Excellence in Industry",
        name: "Abhishek Kishore Gupta",
        role: "Partner & National Sector Lead TMT IM&A GCC",
        organization: "KPMG in India",
        batch: "",
        image: imgAbhishek
    },
    {
        year: 2024,
        awardCategory: "Excellence in Startup/Entrepreneurship",
        name: "Praveen Gupta",
        role: "Co-Founder",
        organization: "OSTO and WiJungle",
        batch: "",
        image: imgPraveen
    },
    {
        year: 2024,
        awardCategory: "Excellence in Governance/Civil Service/Public Service",
        name: "Anurag Upadhyay",
        role: "Asst. Sec. Officer",
        organization: "PMO",
        batch: "",
        image: imgAnurag
    }
];

const AlumnusCard = ({ alum }: { alum: AlumnusProps }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className="flex flex-col items-center text-center group bg-transparent">
             {/* Image Wrapper with decorative ring */}
             <div className="relative mb-6 w-80 h-80 flex items-center justify-center">
                
                {/* Laurel Wreath Image - perfectly fitted around */}
                <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
                    <img 
                        src={imgLeafs} 
                        alt="Laurel Wreath"
                        style={{
                            filter: isDark 
                                ? 'brightness(1.1) sepia(1) saturate(2.5) hue-rotate(5deg) drop-shadow(0 0 15px rgba(245,158,11,0.6))' 
                                : 'drop-shadow(0 0 2px rgba(245,158,11,1)) drop-shadow(0 0 8px rgba(245,158,11,0.8)) drop-shadow(0 0 20px rgba(234,88,12,0.05))'
                        }}
                        className="w-full h-full object-contain scale-[1.3] transition-transform duration-500 group-hover:scale-[1.4]"
                    />
                </div>
                
                {/* Circular Portrait */}
                <div className={`w-52 h-52 rounded-full border-4 ${isDark ? 'border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.4)]' : 'border-amber-600 shadow-[0_0_30px_rgba(217,119,6,0.3)]'} relative bg-gradient-to-br from-amber-100 to-amber-300 overflow-hidden transform transition-transform duration-500 group-hover:scale-105 z-0`}>
                     <img 
                        src={alum.image} 
                        alt={alum.name} 
                        className="w-full h-full rounded-full object-cover border-4 border-white/20"
                    />
                </div>
                
                {/* Floating Trophy Badge at bottom */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
                    <div className={`rounded-full p-3 shadow-lg flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 ${isDark ? 'bg-zinc-900 border border-amber-500' : 'bg-white border border-amber-600'}`}>
                        <Trophy className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                    </div>
                </div>
             </div>

             {/* Text Content */}
             <div className="space-y-3 max-w-sm mx-auto relative px-4">
                <h4 className={`text-2xl font-bold font-serif leading-tight ${isDark ? 'text-amber-100' : 'text-slate-900'}`}>
                    {alum.name}
                </h4>
                
                {alum.batch && (
                    <p className={`text-sm font-medium tracking-wide uppercase ${isDark ? 'text-amber-500/80' : 'text-amber-800/80'}`}>
                         {alum.batch}
                    </p>
                )}
                
                 <div className={`h-px w-24 mx-auto my-3 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50`}></div>

                <p className={`text-base font-semibold leading-tight ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>
                    {alum.awardCategory}
                </p>
                 <p className={`text-sm italic leading-relaxed ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                    {alum.role}{alum.organization ? `, ${alum.organization}` : ''}
                </p>
             </div>
        </div>
    );
};

const DistinguishedAlumni = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    
    // Animation refs
    const headerRef = useScrollAnimation({ yStart: 30, opacityStart: 0 });
    const year2025Ref = useScrollAnimation({ yStart: 50, opacityStart: 0, delay: 0.2 });
    const year2024Ref = useScrollAnimation({ yStart: 50, opacityStart: 0, delay: 0.2 });

    const awardees2025 = alumniData.filter(a => a.year === 2025);
    const awardees2024 = alumniData.filter(a => a.year === 2024);

    return (
        <section id="distinguished-alumni" className="py-24 bg-transparent relative overflow-hidden">
             {/* Decorative Background Elements from the poster vibe */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
             
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                {/* Section Header */}
                <div className="flex flex-col items-center justify-center text-center mb-20" ref={headerRef}>
                    {/* Graduation Cap & Wreath Effect */}
                    <div className="relative mb-6">
                         <div className={`absolute inset-0 blur-xl ${isDark ? 'bg-[#C2B067]/20' : 'bg-amber-400/20'}`}></div>
                         <GraduationCap className={`w-24 h-24 relative z-10 ${isDark ? 'text-[#C2B067] drop-shadow-[0_0_10px_rgba(194,176,103,0.5)]' : 'text-slate-900'}`} strokeWidth={1} />
                    </div>

                    <div className="space-y-4 max-w-4xl mx-auto">
                        <h3 className={`text-lg font-medium tracking-[0.3em] uppercase ${isDark ? 'text-[#C2B067]' : 'text-amber-700'}`}>
                            Distinguished
                        </h3>
                        
                        <div className="flex items-center justify-center gap-6 w-full">
                            <div className={`h-px w-12 md:w-32 bg-gradient-to-r from-transparent ${isDark ? 'to-[#C2B067]/50' : 'to-amber-600'}`}></div>
                            <h2 className={`text-5xl md:text-7xl font-serif font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b ${isDark ? 'from-[#E6D48D] via-[#C2B067] to-[#8A793E]' : 'from-slate-900 via-slate-800 to-slate-700'}`}>
                                ALUMNI
                            </h2>
                            <div className={`h-px w-12 md:w-32 bg-gradient-to-l from-transparent ${isDark ? 'to-[#C2B067]/50' : 'to-amber-600'}`}></div>
                        </div>
                        
                        <h3 className={`text-xl font-light tracking-[0.3em] uppercase ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                            Awards
                        </h3>
                    </div>

                    <p className={`mt-8 text-lg max-w-2xl mx-auto italic ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                        "Honoring the legacy of excellence and the spirit of achievement"
                    </p>
                </div>

                {/* 2025 Section */}
                <div className="mb-24" ref={year2025Ref}>
                    <div className="flex items-end gap-4 mb-10 relative">
                        <div className={`absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b rounded-full ${isDark ? 'from-amber-500 to-transparent' : 'from-amber-600 to-amber-100/20'}`}></div>
                        <div>
                             <span className={`text-6xl font-bold opacity-10 absolute -top-8 -left-2 select-none ${isDark ? 'text-amber-500' : 'text-amber-900'}`}>2025</span>
                            <h3 className={`text-3xl font-bold relative z-10 pl-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                2025 Awardees
                            </h3>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-x-12 gap-y-20">
                         {awardees2025.map((alum, index) => (
                             <div key={index} className="flex justify-center w-full md:w-[calc(50%-3rem)] lg:w-[calc(25%-3rem)] min-w-[300px]">
                                 <AlumnusCard alum={alum} />
                             </div>
                         ))}
                    </div>
                </div>

                {/* 2024 Section */}
                <div ref={year2024Ref}>
                      <div className="flex items-end gap-4 mb-10 relative">
                        <div className={`absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b rounded-full ${isDark ? 'from-zinc-500 to-transparent' : 'from-slate-600 to-slate-200'}`}></div>
                        <div>
                             <span className={`text-6xl font-bold opacity-10 absolute -top-8 -left-2 select-none ${isDark ? 'text-zinc-500' : 'text-slate-800'}`}>2024</span>
                            <h3 className={`text-3xl font-bold relative z-10 pl-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                2024 Awardees
                            </h3>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-x-12 gap-y-20">
                        {awardees2024.map((alum, index) => (
                            <div key={index} className="flex justify-center w-full md:w-[calc(50%-3rem)] lg:w-[calc(33%-3rem)] min-w-[300px]">
                                <AlumnusCard alum={alum} />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default DistinguishedAlumni;
