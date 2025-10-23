import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';

export function SettingsHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3"
        >
            <div className="rounded-lg bg-blue-100 p-2">
                <Settings className="h-6 w-6 text-blue-600" />
            </div>
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600">Manage your application settings and preferences</p>
            </div>
        </motion.div>
    );
}
