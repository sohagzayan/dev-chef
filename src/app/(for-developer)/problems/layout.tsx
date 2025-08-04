import { ReduxProvider } from '@/components/providers/ReduxProvider';
import { AuthProvider } from '@/context/AuthContext';

export default function ProblemLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ReduxProvider>
            <AuthProvider>{children}</AuthProvider>
        </ReduxProvider>
    );
}
