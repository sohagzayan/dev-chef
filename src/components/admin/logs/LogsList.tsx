import { motion } from 'framer-motion';
import {
    AlertTriangle,
    CheckCircle,
    Download,
    Filter,
    Info,
    RefreshCw,
    XCircle,
} from 'lucide-react';

export function LogsList() {
    const logs = [
        {
            id: 1,
            level: 'info',
            message: 'Application started successfully',
            timestamp: '2024-01-15 10:30:15',
            source: 'app.js',
            details: 'Server initialized on port 3000',
        },
        {
            id: 2,
            level: 'warning',
            message: 'High memory usage detected',
            timestamp: '2024-01-15 10:25:42',
            source: 'memory-monitor.js',
            details: 'Memory usage: 85% (1.7GB/2GB)',
        },
        {
            id: 3,
            level: 'error',
            message: 'Database connection failed',
            timestamp: '2024-01-15 10:20:18',
            source: 'database.js',
            details: 'Connection timeout after 30 seconds',
        },
        {
            id: 4,
            level: 'success',
            message: 'User authentication successful',
            timestamp: '2024-01-15 10:15:33',
            source: 'auth.js',
            details: 'User ID: 12345, IP: 192.168.1.100',
        },
        {
            id: 5,
            level: 'info',
            message: 'API request processed',
            timestamp: '2024-01-15 10:10:27',
            source: 'api.js',
            details: 'GET /api/users - 200 OK',
        },
        {
            id: 6,
            level: 'error',
            message: 'File upload failed',
            timestamp: '2024-01-15 10:05:12',
            source: 'upload.js',
            details: 'File size exceeds limit: 15MB > 10MB',
        },
    ];

    const getLevelIcon = (level: string) => {
        switch (level) {
            case 'success':
                return CheckCircle;
            case 'warning':
                return AlertTriangle;
            case 'error':
                return XCircle;
            case 'info':
            default:
                return Info;
        }
    };

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'success':
                return 'text-green-600 bg-green-100 border-green-200';
            case 'warning':
                return 'text-yellow-600 bg-yellow-100 border-yellow-200';
            case 'error':
                return 'text-red-600 bg-red-100 border-red-200';
            case 'info':
            default:
                return 'text-blue-600 bg-blue-100 border-blue-200';
        }
    };

    const getLevelBadgeColor = (level: string) => {
        switch (level) {
            case 'success':
                return 'bg-green-100 text-green-800';
            case 'warning':
                return 'bg-yellow-100 text-yellow-800';
            case 'error':
                return 'bg-red-100 text-red-800';
            case 'info':
            default:
                return 'bg-blue-100 text-blue-800';
        }
    };

    return (
        <div className="space-y-6">
            {/* Filters and Actions */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Filter className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">Filter by:</span>
                        </div>
                        <select className="rounded-md border border-gray-300 px-3 py-1 text-sm">
                            <option value="">All Levels</option>
                            <option value="info">Info</option>
                            <option value="success">Success</option>
                            <option value="warning">Warning</option>
                            <option value="error">Error</option>
                        </select>
                        <select className="rounded-md border border-gray-300 px-3 py-1 text-sm">
                            <option value="">All Sources</option>
                            <option value="app.js">app.js</option>
                            <option value="database.js">database.js</option>
                            <option value="auth.js">auth.js</option>
                        </select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 transition-colors hover:text-gray-800">
                            <RefreshCw className="h-4 w-4" />
                            <span>Refresh</span>
                        </button>
                        <button className="flex items-center space-x-2 rounded-md bg-blue-600 px-3 py-2 text-white transition-colors hover:bg-blue-700">
                            <Download className="h-4 w-4" />
                            <span>Export</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Logs List */}
            <div className="space-y-3">
                {logs.map((log, index) => {
                    const IconComponent = getLevelIcon(log.level);
                    return (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className={`rounded-lg border bg-white p-4 ${getLevelColor(log.level)}`}
                        >
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                    <IconComponent className="h-5 w-5" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="mb-1 flex items-center space-x-2">
                                                <h3 className="text-sm font-medium text-gray-900">
                                                    {log.message}
                                                </h3>
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getLevelBadgeColor(
                                                        log.level,
                                                    )}`}
                                                >
                                                    {log.level.toUpperCase()}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600">{log.details}</p>
                                        </div>

                                        <div className="ml-4 flex items-center space-x-4 text-xs text-gray-500">
                                            <span>{log.timestamp}</span>
                                            <span className="rounded bg-gray-100 px-2 py-1 font-mono">
                                                {log.source}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
