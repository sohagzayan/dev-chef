'use client';

import { useCallback, useState } from 'react';
import { useAdmin } from '../providers/AdminProvider';
import { MenuItem } from './MenuItem';

interface SidebarMenuProps {
    collapsed: boolean;
}

export function SidebarMenu({ collapsed }: SidebarMenuProps) {
    const { hasPermission, user } = useAdmin();
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    // Handle menu open/close with accordion behavior
    const handleMenuToggle = useCallback((menuId: string) => {
        setOpenMenuId((prevId) => (prevId === menuId ? null : menuId));
    }, []);

    // Recruiter Menu (Current - Working Perfectly)
    const recruiterMenuItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: 'LayoutDashboard',
            href: '/admin/dashboard',
            permission: 'dashboard',
        },
        {
            id: 'jobs',
            label: 'Jobs',
            icon: 'Briefcase',
            permission: 'job_management',
            children: [
                { label: 'All Jobs', href: '/admin/jobs', permission: 'job_management' },
                { label: 'Active Jobs', href: '/admin/jobs/active', permission: 'job_management' },
                { label: 'Closed Jobs', href: '/admin/jobs/closed', permission: 'job_management' },
                { label: 'Draft Jobs', href: '/admin/jobs/drafts', permission: 'job_management' },
                {
                    label: 'Create New Job',
                    href: '/admin/jobs/create',
                    permission: 'job_management',
                },
                {
                    label: 'Job Templates',
                    href: '/admin/jobs/templates',
                    permission: 'job_management',
                },
                {
                    label: 'Job Boosting',
                    href: '/admin/jobs/boosting',
                    permission: 'job_management',
                },
            ],
        },
        {
            id: 'candidates',
            label: 'Candidates',
            icon: 'UserCheck',
            permission: 'candidate_management',
            children: [
                {
                    label: 'All Candidates',
                    href: '/admin/candidates',
                    permission: 'candidate_management',
                },
                {
                    label: 'Shortlisted',
                    href: '/admin/candidates/shortlisted',
                    permission: 'candidate_management',
                },
                {
                    label: 'Interview Scheduled',
                    href: '/admin/candidates/interview-scheduled',
                    permission: 'candidate_management',
                },
                {
                    label: 'Offered',
                    href: '/admin/candidates/offered',
                    permission: 'candidate_management',
                },
                {
                    label: 'Hired',
                    href: '/admin/candidates/hired',
                    permission: 'candidate_management',
                },
                {
                    label: 'Archived',
                    href: '/admin/candidates/archived',
                    permission: 'candidate_management',
                },
                {
                    label: 'Talent Pool',
                    href: '/admin/candidates/talent-pool',
                    permission: 'candidate_management',
                },
                {
                    label: 'Resume Parser',
                    href: '/admin/candidates/resume-parser',
                    permission: 'candidate_management',
                },
                {
                    label: 'Candidate Comparison',
                    href: '/admin/candidates/comparison',
                    permission: 'candidate_management',
                },
            ],
        },
        {
            id: 'interviews',
            label: 'Interviews',
            icon: 'Calendar',
            permission: 'interview_management',
            children: [
                {
                    label: 'Interview Calendar',
                    href: '/admin/interviews/calendar',
                    permission: 'interview_management',
                },
                {
                    label: 'Schedule Interview',
                    href: '/admin/interviews/schedule',
                    permission: 'interview_management',
                },
                {
                    label: 'Interview Kits',
                    href: '/admin/interviews/kits',
                    permission: 'interview_management',
                },
                {
                    label: 'Interview Feedback',
                    href: '/admin/interviews/feedback',
                    permission: 'interview_management',
                },
                {
                    label: 'AI Summaries',
                    href: '/admin/interviews/ai-summaries',
                    permission: 'interview_management',
                },
            ],
        },
        {
            id: 'communication',
            label: 'Communication',
            icon: 'MessageSquare',
            permission: 'communication',
            children: [
                { label: 'Inbox', href: '/admin/communication/inbox', permission: 'communication' },
                {
                    label: 'Bulk Messaging',
                    href: '/admin/communication/bulk',
                    permission: 'communication',
                },
                {
                    label: 'Offer Letters',
                    href: '/admin/communication/offers',
                    permission: 'communication',
                },
                {
                    label: 'Rejection Emails',
                    href: '/admin/communication/rejections',
                    permission: 'communication',
                },
            ],
        },
        {
            id: 'sourcing',
            label: 'Talent Sourcing',
            icon: 'Search',
            permission: 'talent_sourcing',
            children: [
                {
                    label: 'AI Recommendations',
                    href: '/admin/sourcing/ai-recommendations',
                    permission: 'talent_sourcing',
                },
                {
                    label: 'Resume Database',
                    href: '/admin/sourcing/resume-database',
                    permission: 'talent_sourcing',
                },
                {
                    label: 'Import Candidates',
                    href: '/admin/sourcing/import',
                    permission: 'talent_sourcing',
                },
                {
                    label: 'Candidate Leads',
                    href: '/admin/sourcing/leads',
                    permission: 'talent_sourcing',
                },
                {
                    label: 'Social Sourcing',
                    href: '/admin/sourcing/social',
                    permission: 'talent_sourcing',
                },
            ],
        },
        {
            id: 'analytics',
            label: 'Analytics',
            icon: 'BarChart3',
            href: '/admin/analytics',
            permission: 'analytics',
        },
        {
            id: 'reports',
            label: 'Reports',
            icon: 'FileText',
            href: '/admin/reports',
            permission: 'reports',
        },
        {
            id: 'team',
            label: 'Team Management',
            icon: 'Users2',
            permission: 'team_management',
            children: [
                {
                    label: 'Recruiter Accounts',
                    href: '/admin/team/recruiters',
                    permission: 'team_management',
                },
                {
                    label: 'Role & Permissions',
                    href: '/admin/team/roles',
                    permission: 'team_management',
                },
                {
                    label: 'Performance Tracking',
                    href: '/admin/team/performance',
                    permission: 'team_management',
                },
            ],
        },
        {
            id: 'users',
            label: 'Users',
            icon: 'Users',
            href: '/admin/users',
            permission: 'users',
        },
        {
            id: 'settings',
            label: 'Settings',
            icon: 'Settings',
            href: '/admin/settings',
            permission: 'settings',
        },
        {
            id: 'company',
            label: 'Company Profile',
            icon: 'Building',
            href: '/admin/company',
            permission: 'settings',
        },
        {
            id: 'billing',
            label: 'Billing',
            icon: 'PieChart',
            href: '/admin/billing',
            permission: 'billing',
        },
        {
            id: 'notifications',
            label: 'Notifications',
            icon: 'Mail',
            href: '/admin/notifications',
            permission: 'dashboard',
        },
        {
            id: 'logs',
            label: 'System Logs',
            icon: 'File',
            href: '/admin/logs',
            permission: 'dashboard',
        },
    ];

    // Candidate Menu (New Implementation)
    const candidateMenuItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: 'LayoutDashboard',
            href: '/admin/dashboard',
            permission: 'dashboard',
        },
        {
            id: 'profile',
            label: 'My Profile',
            icon: 'User',
            href: '/admin/profile',
            permission: 'profile',
        },
        {
            id: 'problems',
            label: 'Problems',
            icon: 'Code',
            href: '/admin/problems',
            permission: 'problems',
        },
        {
            id: 'submissions',
            label: 'My Submissions',
            icon: 'FileText',
            href: '/admin/submissions',
            permission: 'submissions',
        },
        {
            id: 'progress',
            label: 'Progress',
            icon: 'BarChart3',
            href: '/admin/progress',
            permission: 'progress',
        },
    ];

    // Admin Menu (Advanced - New Implementation)
    const adminMenuItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: 'LayoutDashboard',
            href: '/admin/dashboard',
            permission: 'dashboard',
        },
        {
            id: 'platform-kpis',
            label: 'Platform KPIs',
            icon: 'BarChart3',
            permission: 'analytics',
            children: [
                {
                    label: 'Active Jobs',
                    href: '/admin/platform/active-jobs',
                    permission: 'analytics',
                },
                {
                    label: 'Candidates',
                    href: '/admin/platform/candidates',
                    permission: 'analytics',
                },
                { label: 'Hires', href: '/admin/platform/hires', permission: 'analytics' },
                { label: 'Revenue', href: '/admin/platform/revenue', permission: 'analytics' },
                {
                    label: 'Deliverability',
                    href: '/admin/platform/deliverability',
                    permission: 'analytics',
                },
            ],
        },
        {
            id: 'system-health',
            label: 'System Health',
            icon: 'Activity',
            permission: 'analytics',
            children: [
                { label: 'Queue Depth', href: '/admin/system/queue', permission: 'analytics' },
                { label: 'Error Rates', href: '/admin/system/errors', permission: 'analytics' },
                { label: 'API Latency', href: '/admin/system/latency', permission: 'analytics' },
            ],
        },
        {
            id: 'trust-safety',
            label: 'Trust & Safety',
            icon: 'Shield',
            permission: 'analytics',
            children: [
                { label: 'Spam Alerts', href: '/admin/trust/spam', permission: 'analytics' },
                { label: 'Fraud Flags', href: '/admin/trust/fraud', permission: 'analytics' },
                { label: 'Abusive Content', href: '/admin/trust/abuse', permission: 'analytics' },
            ],
        },
        {
            id: 'tenants',
            label: 'Tenants & Companies',
            icon: 'Building',
            permission: 'users',
            children: [
                { label: 'All Companies', href: '/admin/tenants/companies', permission: 'users' },
                {
                    label: 'Onboarding & KYC',
                    href: '/admin/tenants/onboarding',
                    permission: 'users',
                },
                { label: 'Billing Profiles', href: '/admin/tenants/billing', permission: 'users' },
                {
                    label: 'Suspension/Deletion',
                    href: '/admin/tenants/management',
                    permission: 'users',
                },
                {
                    label: 'Impersonate Company',
                    href: '/admin/tenants/impersonate',
                    permission: 'users',
                },
            ],
        },
        {
            id: 'recruiters',
            label: 'Recruiters',
            icon: 'Users2',
            permission: 'users',
            children: [
                { label: 'All Recruiters', href: '/admin/recruiters/all', permission: 'users' },
                {
                    label: 'Verification & Compliance',
                    href: '/admin/recruiters/verification',
                    permission: 'users',
                },
                {
                    label: 'Performance Tracking',
                    href: '/admin/recruiters/performance',
                    permission: 'users',
                },
                {
                    label: 'Blacklist/Sanctions',
                    href: '/admin/recruiters/blacklist',
                    permission: 'users',
                },
                {
                    label: 'Merge/Deduplicate',
                    href: '/admin/recruiters/merge',
                    permission: 'users',
                },
                {
                    label: 'Impersonate Recruiter',
                    href: '/admin/recruiters/impersonate',
                    permission: 'users',
                },
            ],
        },
        {
            id: 'candidates-global',
            label: 'Candidates (Global)',
            icon: 'UserCheck',
            permission: 'candidate_management',
            children: [
                {
                    label: 'All Candidates',
                    href: '/admin/candidates/global',
                    permission: 'candidate_management',
                },
                {
                    label: 'Verifications',
                    href: '/admin/candidates/verifications',
                    permission: 'candidate_management',
                },
                {
                    label: 'Candidate Pools',
                    href: '/admin/candidates/pools',
                    permission: 'candidate_management',
                },
                {
                    label: 'Blacklist/Do-Not-Contact',
                    href: '/admin/candidates/blacklist',
                    permission: 'candidate_management',
                },
                {
                    label: 'Merge/Deduplicate',
                    href: '/admin/candidates/merge',
                    permission: 'candidate_management',
                },
                {
                    label: 'GDPR Compliance',
                    href: '/admin/candidates/gdpr',
                    permission: 'candidate_management',
                },
            ],
        },
        {
            id: 'jobs-global',
            label: 'Jobs (Global)',
            icon: 'Briefcase',
            permission: 'job_management',
            children: [
                {
                    label: 'Pending Approvals',
                    href: '/admin/jobs/approvals',
                    permission: 'job_management',
                },
                {
                    label: 'Job Moderation',
                    href: '/admin/jobs/moderation',
                    permission: 'job_management',
                },
                { label: 'Bulk Actions', href: '/admin/jobs/bulk', permission: 'job_management' },
                {
                    label: 'Distribution Rules',
                    href: '/admin/jobs/distribution',
                    permission: 'job_management',
                },
                {
                    label: 'Flagged Jobs Review',
                    href: '/admin/jobs/flagged',
                    permission: 'job_management',
                },
            ],
        },
        {
            id: 'workflows',
            label: 'Workflows & Automations',
            icon: 'Zap',
            permission: 'settings',
            children: [
                {
                    label: 'Global Pipelines',
                    href: '/admin/workflows/pipelines',
                    permission: 'settings',
                },
                {
                    label: 'Automation Rules',
                    href: '/admin/workflows/automation',
                    permission: 'settings',
                },
                {
                    label: 'Webhooks & Events',
                    href: '/admin/workflows/webhooks',
                    permission: 'settings',
                },
                {
                    label: 'Scheduled Jobs',
                    href: '/admin/workflows/scheduled',
                    permission: 'settings',
                },
                {
                    label: 'Feature Flags',
                    href: '/admin/workflows/features',
                    permission: 'settings',
                },
            ],
        },
        {
            id: 'assessments',
            label: 'Assessments & Screening',
            icon: 'ClipboardCheck',
            permission: 'settings',
            children: [
                {
                    label: 'Question Banks',
                    href: '/admin/assessments/questions',
                    permission: 'settings',
                },
                {
                    label: 'Test Libraries',
                    href: '/admin/assessments/tests',
                    permission: 'settings',
                },
                {
                    label: 'Anti-cheat Policies',
                    href: '/admin/assessments/anticheat',
                    permission: 'settings',
                },
                {
                    label: 'Scoring Models',
                    href: '/admin/assessments/scoring',
                    permission: 'settings',
                },
                {
                    label: 'Vendor Integrations',
                    href: '/admin/assessments/vendors',
                    permission: 'settings',
                },
            ],
        },
        {
            id: 'interviews-global',
            label: 'Interviews (Global)',
            icon: 'Calendar',
            permission: 'interview_management',
            children: [
                {
                    label: 'Global Calendar',
                    href: '/admin/interviews/calendar',
                    permission: 'interview_management',
                },
                {
                    label: 'Panelist Directory',
                    href: '/admin/interviews/panelists',
                    permission: 'interview_management',
                },
                {
                    label: 'Recording Providers',
                    href: '/admin/interviews/recording',
                    permission: 'interview_management',
                },
                {
                    label: 'Interview Kits',
                    href: '/admin/interviews/kits',
                    permission: 'interview_management',
                },
                {
                    label: 'No-show Policies',
                    href: '/admin/interviews/policies',
                    permission: 'interview_management',
                },
            ],
        },
        {
            id: 'communication-center',
            label: 'Communication Center',
            icon: 'MessageSquare',
            permission: 'communication',
            children: [
                {
                    label: 'Templates',
                    href: '/admin/communication/templates',
                    permission: 'communication',
                },
                {
                    label: 'Sender Identities',
                    href: '/admin/communication/identities',
                    permission: 'communication',
                },
                {
                    label: 'Deliverability',
                    href: '/admin/communication/deliverability',
                    permission: 'communication',
                },
                {
                    label: 'Bulk Campaigns',
                    href: '/admin/communication/campaigns',
                    permission: 'communication',
                },
                {
                    label: 'Consent Management',
                    href: '/admin/communication/consent',
                    permission: 'communication',
                },
            ],
        },
        {
            id: 'talent-sourcing-global',
            label: 'Talent Sourcing',
            icon: 'Search',
            permission: 'talent_sourcing',
            children: [
                {
                    label: 'Channels',
                    href: '/admin/sourcing/channels',
                    permission: 'talent_sourcing',
                },
                {
                    label: 'Compliance Rules',
                    href: '/admin/sourcing/compliance',
                    permission: 'talent_sourcing',
                },
                {
                    label: 'Source Analytics',
                    href: '/admin/sourcing/analytics',
                    permission: 'talent_sourcing',
                },
                {
                    label: 'Referral Program',
                    href: '/admin/sourcing/referrals',
                    permission: 'talent_sourcing',
                },
            ],
        },
        {
            id: 'crm-branding',
            label: 'CRM & Branding',
            icon: 'Palette',
            permission: 'settings',
            children: [
                { label: 'Career Site Themes', href: '/admin/crm/themes', permission: 'settings' },
                { label: 'CMS Management', href: '/admin/crm/cms', permission: 'settings' },
                { label: 'Reviews Moderation', href: '/admin/crm/reviews', permission: 'settings' },
                { label: 'UTM & Tracking', href: '/admin/crm/tracking', permission: 'settings' },
            ],
        },
        {
            id: 'analytics-advanced',
            label: 'Analytics',
            icon: 'BarChart3',
            permission: 'analytics',
            children: [
                { label: 'Funnels', href: '/admin/analytics/funnels', permission: 'analytics' },
                {
                    label: 'Time-to-Hire',
                    href: '/admin/analytics/time-to-hire',
                    permission: 'analytics',
                },
                { label: 'DEI Metrics', href: '/admin/analytics/dei', permission: 'analytics' },
                {
                    label: 'Leaderboards',
                    href: '/admin/analytics/leaderboards',
                    permission: 'analytics',
                },
                {
                    label: 'Custom Dashboards',
                    href: '/admin/analytics/custom',
                    permission: 'analytics',
                },
            ],
        },
        {
            id: 'reports-advanced',
            label: 'Reports & Exports',
            icon: 'FileText',
            permission: 'reports',
            children: [
                {
                    label: 'Prebuilt Reports',
                    href: '/admin/reports/prebuilt',
                    permission: 'reports',
                },
                {
                    label: 'Custom Report Builder',
                    href: '/admin/reports/builder',
                    permission: 'reports',
                },
                {
                    label: 'Scheduled Exports',
                    href: '/admin/reports/scheduled',
                    permission: 'reports',
                },
                {
                    label: 'Data Warehouse Sync',
                    href: '/admin/reports/warehouse',
                    permission: 'reports',
                },
            ],
        },
        {
            id: 'billing-plans',
            label: 'Billing & Plans',
            icon: 'CreditCard',
            permission: 'billing',
            children: [
                { label: 'Products & Plans', href: '/admin/billing/plans', permission: 'billing' },
                { label: 'Usage Metering', href: '/admin/billing/usage', permission: 'billing' },
                {
                    label: 'Coupons & Promotions',
                    href: '/admin/billing/coupons',
                    permission: 'billing',
                },
                {
                    label: 'Invoices & Payments',
                    href: '/admin/billing/invoices',
                    permission: 'billing',
                },
                {
                    label: 'Payment Gateways',
                    href: '/admin/billing/gateways',
                    permission: 'billing',
                },
            ],
        },
        {
            id: 'trust-compliance',
            label: 'Trust & Compliance',
            icon: 'Shield',
            permission: 'settings',
            children: [
                { label: 'Policy Engine', href: '/admin/trust/policies', permission: 'settings' },
                { label: 'Audit Log', href: '/admin/trust/audit', permission: 'settings' },
                { label: 'Data Retention', href: '/admin/trust/retention', permission: 'settings' },
                { label: 'Consent Logs', href: '/admin/trust/consent', permission: 'settings' },
                {
                    label: 'Incident Response',
                    href: '/admin/trust/incidents',
                    permission: 'settings',
                },
            ],
        },
        {
            id: 'security-access',
            label: 'Security & Access',
            icon: 'Lock',
            permission: 'settings',
            children: [
                { label: 'Global RBAC', href: '/admin/security/rbac', permission: 'settings' },
                { label: 'SSO/SAML/OIDC', href: '/admin/security/sso', permission: 'settings' },
                { label: 'API Keys & OAuth', href: '/admin/security/api', permission: 'settings' },
                {
                    label: 'IP Allow/Deny Lists',
                    href: '/admin/security/ip',
                    permission: 'settings',
                },
                {
                    label: 'Session Management',
                    href: '/admin/security/sessions',
                    permission: 'settings',
                },
            ],
        },
        {
            id: 'integrations',
            label: 'Integrations',
            icon: 'Link',
            permission: 'settings',
            children: [
                {
                    label: 'HRIS/ATS/Payroll',
                    href: '/admin/integrations/hris',
                    permission: 'settings',
                },
                {
                    label: 'Calendars',
                    href: '/admin/integrations/calendars',
                    permission: 'settings',
                },
                { label: 'Storage', href: '/admin/integrations/storage', permission: 'settings' },
                {
                    label: 'Messaging',
                    href: '/admin/integrations/messaging',
                    permission: 'settings',
                },
                {
                    label: 'Webhooks & iPaaS',
                    href: '/admin/integrations/webhooks',
                    permission: 'settings',
                },
            ],
        },
        {
            id: 'data-management',
            label: 'Data Management',
            icon: 'Database',
            permission: 'settings',
            children: [
                { label: 'Search Index', href: '/admin/data/search', permission: 'settings' },
                {
                    label: 'Resume Parser Settings',
                    href: '/admin/data/parser',
                    permission: 'settings',
                },
                { label: 'Bulk Imports', href: '/admin/data/imports', permission: 'settings' },
                {
                    label: 'Deduplication Rules',
                    href: '/admin/data/deduplication',
                    permission: 'settings',
                },
                { label: 'Backups & Restore', href: '/admin/data/backups', permission: 'settings' },
            ],
        },
        {
            id: 'support-operations',
            label: 'Support & Operations',
            icon: 'Headphones',
            permission: 'settings',
            children: [
                {
                    label: 'Tickets & Conversations',
                    href: '/admin/support/tickets',
                    permission: 'settings',
                },
                { label: 'Status Page', href: '/admin/support/status', permission: 'settings' },
                {
                    label: 'In-app Announcements',
                    href: '/admin/support/announcements',
                    permission: 'settings',
                },
                {
                    label: 'Knowledge Base',
                    href: '/admin/support/knowledge',
                    permission: 'settings',
                },
            ],
        },
        {
            id: 'system-settings',
            label: 'System Settings',
            icon: 'Settings',
            permission: 'settings',
            children: [
                {
                    label: 'Localization',
                    href: '/admin/system/localization',
                    permission: 'settings',
                },
                {
                    label: 'Regions & Data Residency',
                    href: '/admin/system/regions',
                    permission: 'settings',
                },
                { label: 'Legal Documents', href: '/admin/system/legal', permission: 'settings' },
                { label: 'Branding', href: '/admin/system/branding', permission: 'settings' },
                {
                    label: 'Environment Toggles',
                    href: '/admin/system/environment',
                    permission: 'settings',
                },
            ],
        },
        {
            id: 'users-management',
            label: 'Users Management',
            icon: 'Users',
            permission: 'users',
            children: [
                { label: 'All Users', href: '/admin/users/all', permission: 'users' },
                { label: 'User Details', href: '/admin/users/details', permission: 'users' },
                { label: 'Access & Security', href: '/admin/users/access', permission: 'users' },
                { label: 'Sessions & Devices', href: '/admin/users/sessions', permission: 'users' },
                { label: 'Blocks & Sanctions', href: '/admin/users/blocks', permission: 'users' },
                { label: 'Password & MFA Reset', href: '/admin/users/reset', permission: 'users' },
                {
                    label: 'Email/Phone Verification',
                    href: '/admin/users/verification',
                    permission: 'users',
                },
                { label: 'Merge/Deduplicate', href: '/admin/users/merge', permission: 'users' },
                { label: 'Privacy Management', href: '/admin/users/privacy', permission: 'users' },
                { label: 'Audit Log', href: '/admin/users/audit', permission: 'users' },
            ],
        },
        {
            id: 'notifications-admin',
            label: 'Notifications',
            icon: 'Mail',
            href: '/admin/notifications',
            permission: 'notifications',
        },
        {
            id: 'logs-admin',
            label: 'System Logs',
            icon: 'File',
            href: '/admin/logs',
            permission: 'logs',
        },
        {
            id: 'backup-admin',
            label: 'Backup & Recovery',
            icon: 'HardDrive',
            href: '/admin/backup',
            permission: 'backup',
        },
    ];

    // AUTOMATIC MENU SELECTION BASED ON DATABASE ROLE
    // No manual role switching - menu updates automatically based on User.role field
    const getMenuItems = () => {
        if (user?.role === 'ADMIN') {
            console.log('🔄 ADMIN menu loaded automatically for role:', user?.role);
            return adminMenuItems;
        }
        if (user?.role === 'CANDIDATE') {
            console.log('🔄 CANDIDATE menu loaded automatically for role:', user?.role);
            return candidateMenuItems;
        }
        // Default to recruiter menu
        console.log('🔄 RECRUITER menu loaded automatically for role:', user?.role);
        return recruiterMenuItems;
    };

    const menuItems = getMenuItems();

    return (
        <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4">
            {menuItems.map((item) =>
                hasPermission(item.permission) ? (
                    <MenuItem
                        key={item.id}
                        item={item}
                        collapsed={collapsed}
                        isExpanded={openMenuId === item.id}
                        onToggle={() => handleMenuToggle(item.id)}
                    />
                ) : null,
            )}
        </nav>
    );
}
