import { motion } from 'framer-motion';
import { Bell, Globe, Shield, Users } from 'lucide-react';

export function SettingsForm() {
    const settingsSections = [
        {
            title: 'General Settings',
            icon: Globe,
            description: 'Basic application configuration',
            fields: [
                { label: 'Site Name', value: 'DevChef Admin', type: 'text' },
                { label: 'Site URL', value: 'https://devchef.com', type: 'text' },
                { label: 'Default Language', value: 'English', type: 'select' },
                { label: 'Timezone', value: 'UTC', type: 'select' },
            ],
        },
        {
            title: 'User Management',
            icon: Users,
            description: 'User account and permission settings',
            fields: [
                { label: 'Allow Registration', value: 'Yes', type: 'toggle' },
                { label: 'Email Verification', value: 'Required', type: 'select' },
                { label: 'Session Timeout', value: '24 hours', type: 'select' },
                { label: 'Max Login Attempts', value: '5', type: 'number' },
            ],
        },
        {
            title: 'Security',
            icon: Shield,
            description: 'Security and authentication settings',
            fields: [
                { label: 'Two-Factor Auth', value: 'Enabled', type: 'toggle' },
                { label: 'Password Policy', value: 'Strong', type: 'select' },
                { label: 'API Rate Limiting', value: '1000/hour', type: 'text' },
                { label: 'SSL Required', value: 'Yes', type: 'toggle' },
            ],
        },
        {
            title: 'Notifications',
            icon: Bell,
            description: 'Email and system notification settings',
            fields: [
                { label: 'Email Notifications', value: 'Enabled', type: 'toggle' },
                { label: 'Admin Alerts', value: 'Critical Only', type: 'select' },
                { label: 'Weekly Reports', value: 'Yes', type: 'toggle' },
                { label: 'Maintenance Mode', value: 'Disabled', type: 'toggle' },
            ],
        },
    ];

    return (
        <div className="space-y-6">
            {settingsSections.map((section, index) => (
                <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="rounded-lg border border-gray-200 bg-white p-6"
                >
                    <div className="mb-4 flex items-center space-x-3">
                        <div className="rounded-lg bg-gray-100 p-2">
                            <section.icon className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                            <p className="text-sm text-gray-600">{section.description}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {section.fields.map((field) => (
                            <div key={field.label} className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    {field.label}
                                </label>
                                <div className="rounded-md border bg-gray-50 px-3 py-2 text-sm text-gray-900">
                                    {field.value}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 border-t border-gray-200 pt-4">
                        <button className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
                            Save Changes
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
