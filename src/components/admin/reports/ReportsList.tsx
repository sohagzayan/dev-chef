import { motion } from 'framer-motion';
import { BarChart3, Calendar, Download, FileText, TrendingUp, Users } from 'lucide-react';

export function ReportsList() {
    const reports = [
        {
            title: 'User Activity Report',
            description: 'Comprehensive overview of user engagement and activity patterns',
            icon: Users,
            type: 'PDF',
            size: '2.4 MB',
            lastGenerated: '2 hours ago',
            category: 'User Analytics',
        },
        {
            title: 'Performance Metrics',
            description: 'System performance and response time analysis',
            icon: TrendingUp,
            type: 'Excel',
            size: '1.8 MB',
            lastGenerated: '1 day ago',
            category: 'System',
        },
        {
            title: 'Monthly Summary',
            description: 'Monthly overview of key metrics and achievements',
            icon: Calendar,
            type: 'PDF',
            size: '3.1 MB',
            lastGenerated: '1 week ago',
            category: 'Business',
        },
        {
            title: 'Traffic Analysis',
            description: 'Detailed breakdown of website traffic and user behavior',
            icon: BarChart3,
            type: 'CSV',
            size: '4.2 MB',
            lastGenerated: '3 days ago',
            category: 'Analytics',
        },
        {
            title: 'Error Log Report',
            description: 'System errors and exception handling summary',
            icon: FileText,
            type: 'TXT',
            size: '0.8 MB',
            lastGenerated: '6 hours ago',
            category: 'System',
        },
        {
            title: 'Revenue Report',
            description: 'Financial performance and revenue analysis',
            icon: TrendingUp,
            type: 'Excel',
            size: '2.7 MB',
            lastGenerated: '1 day ago',
            category: 'Business',
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reports.map((report, index) => (
                <motion.div
                    key={report.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
                >
                    <div className="mb-4 flex items-start justify-between">
                        <div className="rounded-lg bg-blue-100 p-2">
                            <report.icon className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500">
                            {report.category}
                        </span>
                    </div>

                    <h3 className="mb-2 text-lg font-semibold text-gray-900">{report.title}</h3>
                    <p className="mb-4 text-sm text-gray-600">{report.description}</p>

                    <div className="mb-4 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Type:</span>
                            <span className="font-medium">{report.type}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Size:</span>
                            <span className="font-medium">{report.size}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Last Generated:</span>
                            <span className="font-medium">{report.lastGenerated}</span>
                        </div>
                    </div>

                    <div className="flex space-x-2">
                        <button className="flex flex-1 items-center justify-center space-x-2 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
                            <Download className="h-4 w-4" />
                            <span>Download</span>
                        </button>
                        <button className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50">
                            Generate New
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
