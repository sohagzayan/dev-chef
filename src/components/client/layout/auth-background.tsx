'use client';

interface AuthBackgroundProps {
    variant?: 'default' | 'developer' | 'company';
}

export function AuthBackground({ variant = 'default' }: AuthBackgroundProps) {
    return (
        <div className="absolute inset-0 overflow-hidden bg-gray-50">
            {/* Base subtle elements */}
            <div className="absolute top-20 left-20 h-64 w-64 rounded-full bg-[rgb(148,242,127)] opacity-5 mix-blend-multiply blur-3xl filter"></div>
            <div className="absolute right-20 bottom-20 h-80 w-80 rounded-full bg-[rgb(148,242,127)] opacity-5 mix-blend-multiply blur-3xl filter"></div>

            {/* Developer-specific decorations */}
            {variant === 'developer' && (
                <>
                    <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-[rgb(148,242,127)] opacity-3 mix-blend-multiply blur-3xl filter"></div>
                    <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-[rgb(148,242,127)] opacity-3 mix-blend-multiply blur-3xl filter"></div>
                    <div className="absolute top-20 right-20 font-mono text-sm text-[rgb(148,242,127)]/10">
                        <div>{'{ "welcome": "back" }'}</div>
                    </div>
                    <div className="absolute bottom-20 left-20 font-mono text-sm text-[rgb(148,242,127)]/10">
                        <div>{'console.log("Hello, Developer!");'}</div>
                    </div>
                </>
            )}

            {/* Company-specific decorations */}
            {variant === 'company' && (
                <>
                    <div className="absolute top-1/3 right-1/3 h-48 w-48 rounded-full bg-[rgb(148,242,127)] opacity-3 mix-blend-multiply blur-3xl filter"></div>
                    <div className="absolute bottom-1/3 left-1/3 h-56 w-56 rounded-full bg-[rgb(148,242,127)] opacity-3 mix-blend-multiply blur-3xl filter"></div>
                </>
            )}
        </div>
    );
}
