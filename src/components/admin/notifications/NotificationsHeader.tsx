import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export function NotificationsHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3"
        >
            <div className="rounded-lg bg-purple-100 p-2">
                <Mail className="h-6 w-6 text-purple-600" />
            </div>
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                <p className="text-gray-600">Manage system notifications and alerts</p>
            </div>
        </motion.div>
    );
}
