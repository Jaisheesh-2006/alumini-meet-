import { Timeline } from './ui/TimeLine';

function AlumniMeetTimeline() {
    const data = [
        {
            title: 'Day 1: 14th March, 2026',
            content: (
                <div>
                    <h3 className="text-2xl font-semibold mb-4">
                        Day 1: 14th March, 2026
                    </h3>
                    <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            <strong>Registration:</strong> 10 AM
                        </li>
                        <li>
                            <strong>Informal Activities:</strong> 10 AM to 1 PM
                            <ul className="list-disc list-inside ml-5 space-y-1 text-gray-600 dark:text-gray-400">
                                <li>Visit to MITS for old batches</li>
                                <li>Fun games</li>
                                <li>Informal interaction between alumnus</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Lunch:</strong> 1 PM to 2:30 PM
                        </li>
                        <li>
                            <strong>Plantation Drive:</strong> 2:30 PM to 3 PM
                        </li>
                        <li>
                            <strong>Formal Inauguration & Addresses:</strong> 3 PM to 4 PM
                            <ul className="list-disc list-inside ml-5 space-y-1 text-gray-600 dark:text-gray-400">
                                <li>Welcome by Dean/Director</li>
                                <li>Video presentation</li>
                                <li>Address by PGDMIT batch</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Celebrations & Launches:</strong> 3 PM to 4:30 PM
                            <ul className="list-disc list-inside ml-5 space-y-1 text-gray-600 dark:text-gray-400">
                                <li>Felicitation of Silver Jubilee and Tin Jubilee batches</li>
                                <li>Launch of online Alumni Directory</li>
                                <li>Introduction of all alumni</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Networking with Students (High Tea):</strong> 4:30 PM to 5:30 PM
                        </li>
                        <li>
                            <strong>Distinguished Alumni Awards & Talks:</strong> 5:30 PM to 6 PM
                        </li>
                        <li>
                            <strong>Open House Interaction:</strong> 6 PM to 7 PM
                        </li>
                        <li>
                            <strong>Gala Dinner:</strong> Evening
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            title: 'Day 2: 15th March, 2026',
            content: (
                <div>
                    <h3 className="text-2xl font-semibold mb-4">
                        Day 2: 15th March, 2026
                    </h3>
                    <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            <strong>Breakfast</strong>
                        </li>
                        <li>
                            <strong>Interaction with Director:</strong> 10 AM to 11 AM
                        </li>
                        <li>
                            <strong>Open House with Faculty:</strong> 11 AM to 12 PM
                        </li>
                        <li>
                            <strong>Closing Ceremony:</strong> 12 PM to 1 PM
                        </li>
                        <li>
                            <strong>Lunch:</strong> 1 PM to 2 PM
                        </li>
                        <li>
                            <strong>Visit to City:</strong> 3 PM onwards
                        </li>
                    </ul>
                </div>
            ),
        },
    ];

    return (
        <div id="timeline" className="w-full bg-white dark:bg-gray-900 transition-colors duration-300">
            <Timeline data={data} />
        </div>
    );
}

export default AlumniMeetTimeline;
