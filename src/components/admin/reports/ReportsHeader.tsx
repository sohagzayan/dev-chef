import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export function ReportsHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3"
        >
            <div className="rounded-lg bg-green-100 p-2">
                <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
                <p className="text-gray-600">View and generate system reports and analytics</p>
            </div>
        </motion.div>
    );
}
