import { motion } from 'framer-motion';
import { File } from 'lucide-react';

export function LogsHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3"
        >
            <div className="rounded-lg bg-orange-100 p-2">
                <File className="h-6 w-6 text-orange-600" />
            </div>
            <div>
                <h1 className="text-2xl font-bold text-gray-900">System Logs</h1>
                <p className="text-gray-600">Monitor system logs and error tracking</p>
            </div>
        </motion.div>
    );
}
