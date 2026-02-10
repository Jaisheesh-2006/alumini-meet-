import AlumniMeetNavbar from './components/Navbar';
import AlumniMeetHero from './components/Hero';
import AlumniMeetFooter from './components/Footer';
import ContactCard from './components/ContactCard';
import { useTheme } from '../../context/ThemeContext';
import AlumniMeetTimeline from './components/TimeLine';

const AlumniMeetPage = () => {
    const { theme } = useTheme();

    const containerClasses =
        theme === 'light'
            ? 'bg-slate-50 text-slate-900'
            : 'bg-gradient-to-br from-black via-gray-950 to-gray-900 text-gray-100';

    return (
        <div className={`min-h-screen ${containerClasses} transition-colors duration-300`}>
            <AlumniMeetNavbar />
            <main>
                <AlumniMeetHero />

                <AlumniMeetTimeline />

                <ContactCard />
            </main>
            <AlumniMeetFooter />
        </div>
    );
};

export default AlumniMeetPage;
