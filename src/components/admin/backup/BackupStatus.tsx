import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Clock, Download, Play, Upload } from 'lucide-react';

export function BackupStatus() {
    const backupInfo = [
        {
            type: 'Database',
            lastBackup: '2 hours ago',
            size: '2.4 GB',
            status: 'success',
            nextScheduled: '6 hours',
            retention: '30 days',
        },
        {
            type: 'File System',
            lastBackup: '1 day ago',
            size: '15.7 GB',
            status: 'success',
            nextScheduled: '1 day',
            retention: '7 days',
        },
        {
            type: 'Configuration',
            lastBackup: '3 days ago',
            size: '45 MB',
            status: 'warning',
            nextScheduled: '4 days',
            retention: '90 days',
        },
        {
            type: 'User Data',
            lastBackup: '6 hours ago',
            size: '8.2 GB',
            status: 'success',
            nextScheduled: '18 hours',
            retention: '60 days',
        },
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'success':
                return CheckCircle;
            case 'warning':
                return AlertTriangle;
            default:
                return Clock;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'success':
                return 'text-green-600 bg-green-100';
            case 'warning':
                return 'text-yellow-600 bg-yellow-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <div className="space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center space-x-2 rounded-lg bg-blue-600 p-4 text-white transition-colors hover:bg-blue-700"
                >
                    <Play className="h-5 w-5" />
                    <span>Start Manual Backup</span>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center space-x-2 rounded-lg bg-green-600 p-4 text-white transition-colors hover:bg-green-700"
                >
                    <Download className="h-5 w-5" />
                    <span>Download Latest</span>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center space-x-2 rounded-lg bg-purple-600 p-4 text-white transition-colors hover:bg-purple-700"
                >
                    <Upload className="h-5 w-5" />
                    <span>Restore from Backup</span>
                </motion.button>
            </div>

            {/* Backup Status */}
            <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Backup Status</h3>
                <div className="space-y-4">
                    {backupInfo.map((backup, index) => {
                        const StatusIcon = getStatusIcon(backup.status);
                        return (
                            <motion.div
                                key={backup.type}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
                            >
                                <div className="flex items-center space-x-3">
                                    <div
                                        className={`rounded-lg p-2 ${getStatusColor(backup.status)}`}
                                    >
                                        <StatusIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">{backup.type}</h4>
                                        <p className="text-sm text-gray-600">
                                            Last backup: {backup.lastBackup}
                                        </p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="text-sm text-gray-600">
                                        <span className="font-medium">{backup.size}</span>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Next: {backup.nextScheduled}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Retention: {backup.retention}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Backup Schedule */}
            <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Backup Schedule</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Database Backup:</span>
                            <span className="text-sm font-medium">Every 6 hours</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">File System:</span>
                            <span className="text-sm font-medium">Daily at 2:00 AM</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Configuration:</span>
                            <span className="text-sm font-medium">Weekly on Sunday</span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">User Data:</span>
                            <span className="text-sm font-medium">Every 12 hours</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Full System:</span>
                            <span className="text-sm font-medium">Monthly on 1st</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Log Rotation:</span>
                            <span className="text-sm font-medium">Daily at midnight</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
