import { ReduxExample } from '@/components/examples/ReduxExample';
import { NotificationToast } from '@/components/ui/NotificationToast';

export default function ReduxExamplePage() {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">
                        Redux with RTK Query Example
                    </h1>
                    <p className="mx-auto max-w-2xl text-gray-600">
                        This page demonstrates how to use Redux Toolkit and RTK Query for state
                        management and API calls. Try the different features below to see the Redux
                        setup in action.
                    </p>
                </div>

                <ReduxExample />

                {/* Notification Toast - This will show notifications from Redux state */}
                <NotificationToast />
            </div>
        </div>
    );
}
