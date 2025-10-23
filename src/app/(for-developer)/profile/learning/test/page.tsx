export default function TestPage() {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-green-600">Learning Test Page</h1>
            <p className="mt-4 text-gray-700">
                If you can see this page, the Learning subdirectory routing is working!
            </p>
            <div className="mt-6 rounded-lg bg-blue-50 p-4">
                <h2 className="font-semibold text-blue-800">Available Learning Pages:</h2>
                <ul className="mt-2 text-blue-700">
                    <li>• /profile/learning/courses</li>
                    <li>• /profile/learning/tutorials</li>
                    <li>• /profile/learning/certifications</li>
                    <li>• /profile/learning/skills</li>
                    <li>• /profile/learning/learning-paths</li>
                    <li>• /profile/learning/study-materials</li>
                </ul>
            </div>
        </div>
    );
}
