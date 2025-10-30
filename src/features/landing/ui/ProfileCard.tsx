import type { Profile } from '../model/types';

interface ProfileCardProps {
    profile: Profile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
    return (
        <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-lg transition-shadow hover:shadow-xl">
            {/* Avatar */}
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-blue-100 to-purple-100">
                <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-gray-600">
                    {profile.name.charAt(0)}
                </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
                <h4 className="mb-1 text-base font-semibold text-gray-900">{profile.name}</h4>
                <p className="mb-1 text-sm text-gray-500">{profile.title}</p>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                    <span>{profile.location}</span>
                </div>
            </div>
        </div>
    );
}
