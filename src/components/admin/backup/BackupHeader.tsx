import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export function BackupHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3"
        >
            <div className="rounded-lg bg-yellow-100 p-2">
                <Zap className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Backup & Recovery</h1>
                <p className="text-gray-600">Manage system backups and recovery procedures</p>
            </div>
        </motion.div>
    );
}
