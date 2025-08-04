import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Problem Set - DevChef',
    description:
        'Master coding challenges and improve your programming skills with our comprehensive problem set.',
};

export default function ProblemsetLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-black" style={{ fontFamily: 'var(--font-syne)' }}>
            {children}
        </div>
    );
}
