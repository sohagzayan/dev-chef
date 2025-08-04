'use client';

import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    AwardIcon,
    BarChart3,
    BookOpenIcon,
    BriefcaseIcon,
    Building2,
    Calendar,
    CheckCircle,
    Download,
    Edit3,
    Eye,
    FileText,
    Globe,
    Mail,
    MessageSquare,
    Plus,
    Settings,
    TargetIcon,
    TrendingUp,
    Upload,
    UserPlus,
    Users,
    Video,
    X,
    Zap,
} from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.3,
        },
    },
};

const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.3,
        },
    },
};

// Rich Text Editor Component
const RichTextEditor = ({
    value,
    onChange,
    placeholder,
}: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}) => {
    return (
        <div className="rounded-md border border-gray-600 bg-gray-700">
            <div className="flex gap-2 border-b border-gray-600 p-2">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 border-gray-600 p-0 text-gray-300 hover:bg-gray-600"
                    onClick={() => onChange(value + '<strong>Bold Text</strong>')}
                >
                    B
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 border-gray-600 p-0 text-gray-300 hover:bg-gray-600"
                    onClick={() => onChange(value + '<em>Italic Text</em>')}
                >
                    I
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 border-gray-600 p-0 text-gray-300 hover:bg-gray-600"
                    onClick={() => onChange(value + '<ul><li>List Item</li></ul>')}
                >
                    •
                </Button>
            </div>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="min-h-[200px] w-full resize-none border-0 bg-gray-700 p-3 text-white focus:ring-0"
            />
        </div>
    );
};

// Job Posting Modal Component
const JobPostingModal = ({
    isOpen,
    onClose,
    onSubmit,
}: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (jobData: any) => void;
}) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requirements: '',
        location: '',
        workType: 'remote',
        employmentType: 'full-time',
        salaryMin: '',
        salaryMax: '',
        currency: 'USD',
        expiresAt: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
        setFormData({
            title: '',
            description: '',
            requirements: '',
            location: '',
            workType: 'remote',
            employmentType: 'full-time',
            salaryMin: '',
            salaryMax: '',
            currency: 'USD',
            expiresAt: '',
        });
    };

    if (!isOpen) return null;

    return (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-gray-800 p-6"
            >
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Post New Job</h2>
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="border-gray-600 text-gray-300"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-300">
                                Job Title
                            </label>
                            <Input
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                                placeholder="e.g., Senior Full Stack Developer"
                                className="border-gray-600 bg-gray-700 text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-300">
                                Location
                            </label>
                            <Input
                                value={formData.location}
                                onChange={(e) =>
                                    setFormData({ ...formData, location: e.target.value })
                                }
                                placeholder="e.g., San Francisco, CA"
                                className="border-gray-600 bg-gray-700 text-white"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-300">
                            Job Description
                        </label>
                        <RichTextEditor
                            value={formData.description}
                            onChange={(value) => setFormData({ ...formData, description: value })}
                            placeholder="Describe the role, responsibilities, and what makes this position exciting..."
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-300">
                            Requirements
                        </label>
                        <RichTextEditor
                            value={formData.requirements}
                            onChange={(value) => setFormData({ ...formData, requirements: value })}
                            placeholder="List the required skills, experience, and qualifications..."
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-300">
                                Work Type
                            </label>
                            <select
                                value={formData.workType}
                                onChange={(e) =>
                                    setFormData({ ...formData, workType: e.target.value })
                                }
                                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="remote">Remote</option>
                                <option value="onsite">On-site</option>
                                <option value="hybrid">Hybrid</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-300">
                                Employment Type
                            </label>
                            <select
                                value={formData.employmentType}
                                onChange={(e) =>
                                    setFormData({ ...formData, employmentType: e.target.value })
                                }
                                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="contract">Contract</option>
                                <option value="internship">Internship</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-300">
                                Currency
                            </label>
                            <select
                                value={formData.currency}
                                onChange={(e) =>
                                    setFormData({ ...formData, currency: e.target.value })
                                }
                                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                                <option value="CAD">CAD</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-300">
                                Minimum Salary
                            </label>
                            <Input
                                type="number"
                                value={formData.salaryMin}
                                onChange={(e) =>
                                    setFormData({ ...formData, salaryMin: e.target.value })
                                }
                                placeholder="80000"
                                className="border-gray-600 bg-gray-700 text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-300">
                                Maximum Salary
                            </label>
                            <Input
                                type="number"
                                value={formData.salaryMax}
                                onChange={(e) =>
                                    setFormData({ ...formData, salaryMax: e.target.value })
                                }
                                placeholder="120000"
                                className="border-gray-600 bg-gray-700 text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-300">
                                Expires At
                            </label>
                            <Input
                                type="date"
                                value={formData.expiresAt}
                                onChange={(e) =>
                                    setFormData({ ...formData, expiresAt: e.target.value })
                                }
                                className="border-gray-600 bg-gray-700 text-white"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="border-gray-600 text-gray-300"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                            Post Job
                        </Button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

// Job Details Modal Component
const JobDetailsModal = ({
    isOpen,
    onClose,
    job,
}: {
    isOpen: boolean;
    onClose: () => void;
    job: any;
}) => {
    if (!isOpen || !job) return null;

    return (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-gray-800 p-6"
            >
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">{job.title}</h2>
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="border-gray-600 text-gray-300"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="rounded-lg bg-gray-700 p-4">
                            <h3 className="mb-2 font-semibold text-white">Applications</h3>
                            <p className="text-3xl font-bold text-blue-400">
                                {job.applicationsCount}
                            </p>
                        </div>
                        <div className="rounded-lg bg-gray-700 p-4">
                            <h3 className="mb-2 font-semibold text-white">Salary Range</h3>
                            <p className="text-lg text-green-400">
                                ${job.salaryMin.toLocaleString()} - $
                                {job.salaryMax.toLocaleString()}
                            </p>
                        </div>
                        <div className="rounded-lg bg-gray-700 p-4">
                            <h3 className="mb-2 font-semibold text-white">Status</h3>
                            <Badge className={job.isActive ? 'bg-green-500' : 'bg-red-500'}>
                                {job.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                        </div>
                    </div>
                    <div className="rounded-lg bg-gray-700 p-4">
                        <h3 className="mb-4 font-semibold text-white">Recent Applications</h3>
                        <div className="space-y-3">
                            {job.applications?.map((app: any, index: number) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-lg bg-gray-600 p-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                                                {app.candidateName.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium text-white">
                                                {app.candidateName}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                {app.candidateEmail}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge
                                            variant="outline"
                                            className="border-gray-600 text-gray-300"
                                        >
                                            {app.status}
                                        </Badge>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-gray-600 text-gray-300"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// Optimized components
const SkillCard = ({ skill, onRemove }: { skill: any; onRemove: (id: string) => void }) => {
    const getSkillLevelColor = useCallback((level: string) => {
        switch (level) {
            case 'expert':
                return 'bg-red-500';
            case 'advanced':
                return 'bg-orange-500';
            case 'intermediate':
                return 'bg-yellow-500';
            case 'beginner':
                return 'bg-green-500';
            default:
                return 'bg-gray-500';
        }
    }, []);

    const getSkillCategoryColor = useCallback((category: string) => {
        switch (category) {
            case 'frontend':
                return 'bg-blue-100 text-blue-800';
            case 'backend':
                return 'bg-green-100 text-green-800';
            case 'database':
                return 'bg-purple-100 text-purple-800';
            case 'devops':
                return 'bg-orange-100 text-orange-800';
            case 'mobile':
                return 'bg-pink-100 text-pink-800';
            case 'other':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }, []);

    return (
        <motion.div
            variants={itemVariants}
            layout
            className="flex items-center justify-between rounded-lg border border-gray-600 bg-gray-700 p-4 shadow-sm"
        >
            <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                    <h3 className="font-medium text-white">{skill.name}</h3>
                    <Badge className={`${getSkillLevelColor(skill.level)} text-white`}>
                        {skill.level}
                    </Badge>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getSkillCategoryColor(skill.category)}>
                        {skill.category}
                    </Badge>
                    <span className="text-sm text-gray-400">{skill.yearsOfExperience} years</span>
                </div>
            </div>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onRemove(skill.id)}
                className="rounded-lg p-2 text-red-400 transition-colors hover:bg-red-900/20 hover:text-red-300"
            >
                <X className="h-4 w-4" />
            </motion.button>
        </motion.div>
    );
};

const StatCard = ({
    icon: Icon,
    title,
    value,
    color,
}: {
    icon: any;
    title: string;
    value: string | number;
    color: string;
}) => (
    <motion.div variants={cardVariants}>
        <Card className="border-0 bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <CardContent className="p-6">
                <div className="flex items-center gap-4">
                    <motion.div
                        className={`flex h-12 w-12 items-center justify-center rounded-lg ${color}`}
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <Icon className="h-6 w-6" />
                    </motion.div>
                    <div>
                        <p className="text-sm font-medium text-gray-400">{title}</p>
                        <p className="text-2xl font-bold text-white">{value}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    </motion.div>
);

const ActivityItem = ({
    icon: Icon,
    title,
    time,
    color,
}: {
    icon: any;
    title: string;
    time: string;
    color: string;
}) => (
    <motion.div
        variants={itemVariants}
        className="flex items-center gap-4 rounded-lg bg-gray-700 p-4 transition-colors duration-200 hover:bg-gray-600"
    >
        <motion.div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${color}`}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            <Icon className="h-5 w-5" />
        </motion.div>
        <div className="flex-1">
            <p className="font-medium text-white">{title}</p>
            <p className="text-sm text-gray-400">{time}</p>
        </div>
    </motion.div>
);

interface UserProfile {
    name: string;
    email: string;
    avatar: string;
    location: string;
    bio: string;
    joinDate: string;
    rank: string;
    reputation: number;
    phone?: string;
    website?: string;
    social: {
        github?: string;
        linkedin?: string;
        website?: string;
    };
    resume?: {
        id: string;
        title: string;
        url: string;
        lastUpdated: string;
    };
}

interface CompanyProfile {
    name: string;
    email: string;
    avatar: string;
    location: string;
    bio: string;
    joinDate: string;
    companyName: string;
    companySize: string;
    industry: string;
    website: string;
    phone?: string;
    jobTitle: string;
    department: string;
    isVerified: boolean;
    subscriptionPlan: string;
    social: {
        linkedin?: string;
        website?: string;
    };
}

interface Skill {
    id: string;
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    yearsOfExperience: number;
    category: 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'other';
}

interface Experience {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
    technologies: string[];
    achievements: string[];
}

interface ProblemStats {
    total: number;
    solved: number;
    easy: { solved: number; total: number };
    medium: { solved: number; total: number };
    hard: { solved: number; total: number };
    streak: number;
    rank: string;
    languages: Array<{
        name: string;
        problemsSolved: number;
        color: string;
    }>;
    skills: Array<{
        name: string;
        level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
        problemsSolved: number;
    }>;
}

interface JobApplication {
    id: string;
    company: string;
    position: string;
    status: 'applied' | 'interviewing' | 'offered' | 'rejected' | 'withdrawn';
    date: string;
    logo: string;
    salary?: string;
    location?: string;
    type?: 'full-time' | 'part-time' | 'contract' | 'internship';
    resumeUsed?: string;
}

interface JobPost {
    id: string;
    title: string;
    description: string;
    requirements: string;
    location: string;
    workType: 'remote' | 'onsite' | 'hybrid';
    employmentType: 'full-time' | 'part-time' | 'contract';
    salaryMin: number;
    salaryMax: number;
    currency: string;
    isActive: boolean;
    expiresAt: string;
    applicationsCount: number;
    createdAt: string;
}

interface CandidateApplication {
    id: string;
    candidateName: string;
    candidateEmail: string;
    candidateAvatar: string;
    position: string;
    status: 'pending' | 'reviewed' | 'shortlisted' | 'interviewed' | 'offered' | 'rejected';
    appliedAt: string;
    coverLetter: string;
    resumeUrl: string;
    experience: string;
    skills: string[];
}

interface Meeting {
    id: string;
    title: string;
    type: 'interview' | 'discussion' | 'presentation';
    date: string;
    time: string;
    duration: number;
    participants: string[];
    status: 'scheduled' | 'completed' | 'cancelled';
    notes?: string;
}

interface Message {
    id: string;
    from: string;
    to: string;
    subject: string;
    content: string;
    isRead: boolean;
    sentAt: string;
    type: 'inbox' | 'sent';
}

interface Contest {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    prize: string;
    participants: number;
    status: 'upcoming' | 'active' | 'completed';
    type: 'coding' | 'design' | 'hackathon';
}

interface Employee {
    id: string;
    name: string;
    email: string;
    position: string;
    department: string;
    joinDate: string;
    avatar: string;
    status: 'active' | 'inactive';
}

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    publishedAt: string;
    readTime: number;
    views: number;
    likes: number;
    tags: string[];
    status: 'draft' | 'published' | 'archived';
}

interface Certificate {
    id: string;
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
    credentialId: string;
    image: string;
    url?: string;
    verified: boolean;
}

interface Course {
    id: string;
    title: string;
    platform: string;
    progress: number;
    completed: boolean;
    certificate?: string;
    image: string;
    startDate: string;
    endDate?: string;
    grade?: string;
}

interface Resume {
    id: string;
    title: string;
    content: string;
    lastUpdated: string;
    isPublic: boolean;
    template: string;
}

export default function ProfilePage() {
    const { user, isAuthenticated, userType } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState('overview');
    const [selectedTab, setSelectedTab] = useState('overview');
    const [newSkill, setNewSkill] = useState('');
    const [skillLevel, setSkillLevel] = useState<
        'beginner' | 'intermediate' | 'advanced' | 'expert'
    >('intermediate');
    const [skillCategory, setSkillCategory] = useState<
        'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'other'
    >('frontend');
    const [yearsOfExperience, setYearsOfExperience] = useState(1);

    // Modal states
    const [isJobPostingModalOpen, setIsJobPostingModalOpen] = useState(false);
    const [isJobDetailsModalOpen, setIsJobDetailsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
    const [isAddMeetingModalOpen, setIsAddMeetingModalOpen] = useState(false);
    const [isAddContestModalOpen, setIsAddContestModalOpen] = useState(false);

    // Determine if user is a company/recruiter
    const isCompany = userType === 'company' || user?.role === 'RECRUITER';

    // Chart data for analytics
    const chartData = useMemo(
        () => ({
            applicationsOverTime: [
                { month: 'Jan', applications: 12, interviews: 8, hires: 3 },
                { month: 'Feb', applications: 18, interviews: 12, hires: 5 },
                { month: 'Mar', applications: 15, interviews: 10, hires: 4 },
                { month: 'Apr', applications: 22, interviews: 15, hires: 6 },
                { month: 'May', applications: 19, interviews: 13, hires: 5 },
                { month: 'Jun', applications: 25, interviews: 18, hires: 7 },
            ],
            jobPerformance: [
                { job: 'Frontend Dev', views: 245, applications: 18, conversion: 7.3 },
                { job: 'Backend Dev', views: 189, applications: 12, conversion: 6.3 },
                { job: 'Full Stack', views: 312, applications: 24, conversion: 7.7 },
                { job: 'DevOps', views: 156, applications: 8, conversion: 5.1 },
                { job: 'Data Scientist', views: 278, applications: 15, conversion: 5.4 },
            ],
            skillDemand: [
                { skill: 'React', demand: 85, color: '#61dafb' },
                { skill: 'TypeScript', demand: 78, color: '#3178c6' },
                { skill: 'Node.js', demand: 72, color: '#339933' },
                { skill: 'Python', demand: 68, color: '#3776ab' },
                { skill: 'AWS', demand: 65, color: '#ff9900' },
            ],
        }),
        [],
    );

    // Handlers for modals
    const handleJobPostingSubmit = useCallback((jobData: any) => {
        console.log('New job posted:', jobData);
        // Here you would typically make an API call to save the job
        // For now, we'll just log it
    }, []);

    const handleJobClick = useCallback((job: any) => {
        setSelectedJob(job);
        setIsJobDetailsModalOpen(true);
    }, []);

    const handleAddEmployee = useCallback(() => {
        setIsAddEmployeeModalOpen(true);
    }, []);

    const handleAddMeeting = useCallback(() => {
        setIsAddMeetingModalOpen(true);
    }, []);

    const handleAddContest = useCallback(() => {
        setIsAddContestModalOpen(true);
    }, []);

    // Memoized data
    const profile = useMemo(
        (): UserProfile => ({
            name: user?.name || 'ZhonHPquvK',
            email: user?.email || 'zhon@example.com',
            avatar: '/placeholder.svg',
            location: 'San Francisco, CA',
            bio: 'Full-stack developer passionate about solving complex problems and building scalable applications.',
            joinDate: '2023-01-15',
            rank: '~5,000,000',
            reputation: 0,
            phone: '+1 (555) 123-4567',
            website: 'https://zhon.dev',
            social: {
                github: 'https://github.com/zhon',
                linkedin: 'https://linkedin.com/in/zhon',
                website: 'https://zhon.dev',
            },
            resume: {
                id: '1',
                title: 'Zhon - Software Engineer',
                url: '/resume.pdf',
                lastUpdated: '2024-01-20',
            },
        }),
        [user?.name, user?.email],
    );

    const companyProfile = useMemo(
        (): CompanyProfile => ({
            name: user?.name || 'John Recruiter',
            email: user?.email || 'john@techcorp.com',
            avatar: '/placeholder.svg',
            location: 'San Francisco, CA',
            bio: 'Senior HR Manager at TechCorp Inc. Passionate about connecting top talent with innovative companies.',
            joinDate: '2023-01-15',
            companyName: 'TechCorp Inc.',
            companySize: '51-200',
            industry: 'Technology',
            website: 'https://techcorp.com',
            phone: '+1 (555) 123-4567',
            jobTitle: 'Senior HR Manager',
            department: 'Human Resources',
            isVerified: true,
            subscriptionPlan: 'premium',
            social: {
                linkedin: 'https://linkedin.com/company/techcorp',
                website: 'https://techcorp.com',
            },
        }),
        [user?.name, user?.email],
    );

    const [skills, setSkills] = useState<Skill[]>([
        { id: '1', name: 'React', level: 'expert', yearsOfExperience: 4, category: 'frontend' },
        {
            id: '2',
            name: 'TypeScript',
            level: 'advanced',
            yearsOfExperience: 3,
            category: 'frontend',
        },
        { id: '3', name: 'Node.js', level: 'advanced', yearsOfExperience: 3, category: 'backend' },
        {
            id: '4',
            name: 'PostgreSQL',
            level: 'intermediate',
            yearsOfExperience: 2,
            category: 'database',
        },
        {
            id: '5',
            name: 'Docker',
            level: 'intermediate',
            yearsOfExperience: 2,
            category: 'devops',
        },
        { id: '6', name: 'AWS', level: 'intermediate', yearsOfExperience: 2, category: 'devops' },
    ]);

    const experiences = useMemo(
        (): Experience[] => [
            {
                id: '1',
                company: 'TechCorp Inc.',
                position: 'Senior Full Stack Developer',
                startDate: '2022-01-01',
                current: true,
                description:
                    'Leading development of scalable web applications using React, Node.js, and AWS.',
                technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL'],
                achievements: [
                    'Improved application performance by 40%',
                    'Led team of 5 developers',
                    'Implemented CI/CD pipeline',
                ],
            },
            {
                id: '2',
                company: 'StartupXYZ',
                position: 'Frontend Developer',
                startDate: '2020-03-01',
                endDate: '2021-12-31',
                current: false,
                description: 'Developed responsive web applications and improved user experience.',
                technologies: ['React', 'JavaScript', 'CSS3', 'HTML5'],
                achievements: [
                    'Reduced page load time by 60%',
                    'Implemented responsive design',
                    'Improved accessibility',
                ],
            },
        ],
        [],
    );

    const problemStats = useMemo(
        (): ProblemStats => ({
            total: 3640,
            solved: 1,
            easy: { solved: 1, total: 888 },
            medium: { solved: 0, total: 1893 },
            hard: { solved: 0, total: 859 },
            streak: 2,
            rank: '~5,000,000',
            languages: [{ name: 'JavaScript', problemsSolved: 1, color: '#f7df1e' }],
            skills: [
                { name: 'Hash Table', level: 'intermediate', problemsSolved: 1 },
                { name: 'Array', level: 'beginner', problemsSolved: 1 },
            ],
        }),
        [],
    );

    const jobApplications = useMemo(
        (): JobApplication[] => [
            {
                id: '1',
                company: 'Google',
                position: 'Senior Software Engineer',
                status: 'interviewing',
                date: '2024-01-15',
                logo: '/google-logo.png',
                salary: '$150,000 - $200,000',
                location: 'Mountain View, CA',
                type: 'full-time',
                resumeUsed: 'Zhon - Software Engineer',
            },
            {
                id: '2',
                company: 'Microsoft',
                position: 'Full Stack Developer',
                status: 'applied',
                date: '2024-01-10',
                logo: '/microsoft-logo.png',
                salary: '$120,000 - $160,000',
                location: 'Seattle, WA',
                type: 'full-time',
                resumeUsed: 'Zhon - Software Engineer',
            },
        ],
        [],
    );

    const blogPosts = useMemo(
        (): BlogPost[] => [
            {
                id: '1',
                title: 'Building Scalable React Applications',
                excerpt:
                    'Learn how to structure React applications for scale and maintainability...',
                publishedAt: '2024-01-20',
                readTime: 8,
                views: 1247,
                likes: 89,
                tags: ['React', 'Architecture', 'Scalability'],
                status: 'published',
            },
            {
                id: '2',
                title: 'Advanced TypeScript Patterns',
                excerpt: 'Discover powerful TypeScript patterns that will level up your code...',
                publishedAt: '2024-01-15',
                readTime: 12,
                views: 892,
                likes: 67,
                tags: ['TypeScript', 'Patterns', 'Advanced'],
                status: 'published',
            },
        ],
        [],
    );

    const certificates = useMemo(
        (): Certificate[] => [
            {
                id: '1',
                name: 'AWS Solutions Architect',
                issuer: 'Amazon Web Services',
                issueDate: '2023-12-01',
                credentialId: 'AWS-123456',
                image: '/aws-cert.png',
                url: 'https://aws.amazon.com/verification',
                verified: true,
            },
            {
                id: '2',
                name: 'Google Cloud Professional',
                issuer: 'Google Cloud',
                issueDate: '2023-11-15',
                credentialId: 'GCP-789012',
                image: '/gcp-cert.png',
                url: 'https://cloud.google.com/certification',
                verified: true,
            },
        ],
        [],
    );

    const courses = useMemo(
        (): Course[] => [
            {
                id: '1',
                title: 'Advanced React Patterns',
                platform: 'Frontend Masters',
                progress: 100,
                completed: true,
                certificate: 'https://certificate.com/react',
                image: '/react-course.png',
                startDate: '2023-09-01',
                endDate: '2023-12-15',
                grade: 'A+',
            },
            {
                id: '2',
                title: 'System Design Interview',
                platform: 'Educative',
                progress: 75,
                completed: false,
                image: '/system-design.png',
                startDate: '2024-01-01',
            },
        ],
        [],
    );

    const resumes = useMemo(
        (): Resume[] => [
            {
                id: '1',
                title: 'Zhon - Software Engineer',
                content: 'Professional resume for software engineering positions...',
                lastUpdated: '2024-01-20',
                isPublic: true,
                template: 'modern',
            },
            {
                id: '2',
                title: 'Zhon - Full Stack Developer',
                content: 'Resume focused on full-stack development skills...',
                lastUpdated: '2024-01-15',
                isPublic: false,
                template: 'minimal',
            },
        ],
        [],
    );

    // Company-specific data
    const jobPosts = useMemo(
        (): JobPost[] => [
            {
                id: '1',
                title: 'Senior Full Stack Developer',
                description:
                    'We are looking for an experienced Full Stack Developer to join our team...',
                requirements: 'React, Node.js, TypeScript, 5+ years experience',
                location: 'San Francisco, CA',
                workType: 'hybrid',
                employmentType: 'full-time',
                salaryMin: 120000,
                salaryMax: 180000,
                currency: 'USD',
                isActive: true,
                expiresAt: '2024-03-15',
                applicationsCount: 24,
                createdAt: '2024-01-15',
            },
            {
                id: '2',
                title: 'Frontend Developer',
                description: 'Join our frontend team to build amazing user experiences...',
                requirements: 'React, TypeScript, CSS, 3+ years experience',
                location: 'Remote',
                workType: 'remote',
                employmentType: 'full-time',
                salaryMin: 80000,
                salaryMax: 120000,
                currency: 'USD',
                isActive: true,
                expiresAt: '2024-03-20',
                applicationsCount: 18,
                createdAt: '2024-01-20',
            },
        ],
        [],
    );

    const candidateApplications = useMemo(
        (): CandidateApplication[] => [
            {
                id: '1',
                candidateName: 'Sarah Johnson',
                candidateEmail: 'sarah@example.com',
                candidateAvatar: '/placeholder.svg',
                position: 'Senior Full Stack Developer',
                status: 'shortlisted',
                appliedAt: '2024-01-25',
                coverLetter: 'I am excited to apply for this position...',
                resumeUrl: '/resume-sarah.pdf',
                experience: '6 years',
                skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
            },
            {
                id: '2',
                candidateName: 'Mike Chen',
                candidateEmail: 'mike@example.com',
                candidateAvatar: '/placeholder.svg',
                position: 'Frontend Developer',
                status: 'pending',
                appliedAt: '2024-01-26',
                coverLetter: 'I have been working with React for 4 years...',
                resumeUrl: '/resume-mike.pdf',
                experience: '4 years',
                skills: ['React', 'TypeScript', 'CSS', 'Next.js'],
            },
        ],
        [],
    );

    const meetings = useMemo(
        (): Meeting[] => [
            {
                id: '1',
                title: 'Interview with Sarah Johnson',
                type: 'interview',
                date: '2024-02-01',
                time: '10:00 AM',
                duration: 60,
                participants: ['Sarah Johnson', 'John Recruiter', 'Tech Lead'],
                status: 'scheduled',
                notes: 'Technical interview for Senior Full Stack position',
            },
            {
                id: '2',
                title: 'Team Discussion',
                type: 'discussion',
                date: '2024-02-03',
                time: '2:00 PM',
                duration: 30,
                participants: ['HR Team', 'Engineering Team'],
                status: 'scheduled',
            },
        ],
        [],
    );

    const messages = useMemo(
        (): Message[] => [
            {
                id: '1',
                from: 'sarah@example.com',
                to: 'john@techcorp.com',
                subject: 'Application Status Inquiry',
                content: 'Hi, I wanted to follow up on my application...',
                isRead: false,
                sentAt: '2024-01-27',
                type: 'inbox',
            },
            {
                id: '2',
                from: 'john@techcorp.com',
                to: 'mike@example.com',
                subject: 'Interview Invitation',
                content: 'We would like to invite you for an interview...',
                isRead: true,
                sentAt: '2024-01-26',
                type: 'sent',
            },
        ],
        [],
    );

    const contests = useMemo(
        (): Contest[] => [
            {
                id: '1',
                title: 'TechCorp Coding Challenge 2024',
                description: 'Join our annual coding challenge to showcase your skills',
                startDate: '2024-02-15',
                endDate: '2024-02-20',
                prize: '$10,000',
                participants: 156,
                status: 'upcoming',
                type: 'coding',
            },
            {
                id: '2',
                title: 'UI/UX Design Contest',
                description: 'Design the next generation of our product interface',
                startDate: '2024-01-15',
                endDate: '2024-01-30',
                prize: '$5,000',
                participants: 89,
                status: 'completed',
                type: 'design',
            },
        ],
        [],
    );

    const employees = useMemo(
        (): Employee[] => [
            {
                id: '1',
                name: 'Alice Smith',
                email: 'alice@techcorp.com',
                position: 'Senior Developer',
                department: 'Engineering',
                joinDate: '2023-01-15',
                avatar: '/placeholder.svg',
                status: 'active',
            },
            {
                id: '2',
                name: 'Bob Wilson',
                email: 'bob@techcorp.com',
                position: 'Product Manager',
                department: 'Product',
                joinDate: '2023-03-20',
                avatar: '/placeholder.svg',
                status: 'active',
            },
        ],
        [],
    );

    // Tab configuration with categories
    const tabCategories = useMemo(() => {
        if (isCompany) {
            // Company/Recruiter tabs
            return [
                {
                    id: 'overview',
                    title: 'Overview',
                    icon: CheckCircle,
                    tabs: [{ id: 'overview', title: 'Overview', icon: CheckCircle }],
                },
                {
                    id: 'job-management',
                    title: 'Job Management',
                    icon: BriefcaseIcon,
                    description: 'Post & manage job openings',
                    tabs: [
                        { id: 'job-posts', title: 'Job Posts', icon: BriefcaseIcon },
                        { id: 'applications', title: 'Applications', icon: Users },
                        { id: 'candidates', title: 'Candidates', icon: UserPlus },
                    ],
                },
                {
                    id: 'company-tools',
                    title: 'Company Tools',
                    icon: Settings,
                    description: 'Company management & tools',
                    tabs: [
                        { id: 'employees', title: 'Employees', icon: Users },
                        { id: 'meetings', title: 'Meetings', icon: Calendar },
                        { id: 'contests', title: 'Contests', icon: AwardIcon },
                    ],
                },
                {
                    id: 'communication',
                    title: 'Communication',
                    icon: MessageSquare,
                    description: 'Messages & notifications',
                    tabs: [
                        { id: 'inbox', title: 'Inbox', icon: Mail },
                        { id: 'messages', title: 'Messages', icon: MessageSquare },
                    ],
                },
                {
                    id: 'analytics',
                    title: 'Analytics',
                    icon: BarChart3,
                    description: 'Reports & insights',
                    tabs: [
                        { id: 'reports', title: 'Reports', icon: BarChart3 },
                        { id: 'insights', title: 'Insights', icon: TrendingUp },
                    ],
                },
            ];
        } else {
            // Candidate/Developer tabs
            return [
                {
                    id: 'overview',
                    title: 'Overview',
                    icon: CheckCircle,
                    tabs: [{ id: 'overview', title: 'Overview', icon: CheckCircle }],
                },
                {
                    id: 'professional-skills',
                    title: 'Professional Skills',
                    icon: TargetIcon,
                    description: 'Problem solving & skills development',
                    tabs: [
                        { id: 'skills', title: 'Skills', icon: TargetIcon },
                        { id: 'problems', title: 'Problems', icon: TargetIcon },
                        { id: 'experience', title: 'Experience', icon: BriefcaseIcon },
                    ],
                },
                {
                    id: 'job-portal',
                    title: 'Job Portal',
                    icon: BriefcaseIcon,
                    description: 'Job applications & management',
                    tabs: [
                        { id: 'jobs', title: 'Job Applications', icon: BriefcaseIcon },
                        { id: 'resume', title: 'Resume', icon: FileText },
                    ],
                },
                {
                    id: 'interview-prep',
                    title: 'Interview Prep',
                    icon: BookOpenIcon,
                    description: 'Learning, courses & preparation',
                    tabs: [
                        { id: 'courses', title: 'Courses', icon: BookOpenIcon },
                        { id: 'certificates', title: 'Certificates', icon: AwardIcon },
                        { id: 'quizzes', title: 'Quizzes', icon: TargetIcon },
                        { id: 'demo-interviews', title: 'Demo Interviews', icon: Users },
                    ],
                },
                {
                    id: 'content',
                    title: 'Content',
                    icon: FileText,
                    description: 'Blogs & articles',
                    tabs: [
                        { id: 'blog', title: 'Blog', icon: FileText },
                        { id: 'articles', title: 'Articles', icon: FileText },
                    ],
                },
            ];
        }
    }, [isCompany]);

    // Optimized callbacks
    const handleCategoryChange = useCallback(
        (categoryId: string) => {
            setSelectedCategory(categoryId);
            const category = tabCategories.find((cat) => cat.id === categoryId);
            if (category && category.tabs.length > 0) {
                setSelectedTab(category.tabs[0].id);
            }
        },
        [tabCategories],
    );

    const handleTabChange = useCallback((tabId: string) => {
        setSelectedTab(tabId);
    }, []);

    const addSkill = useCallback(() => {
        if (newSkill.trim()) {
            const skill: Skill = {
                id: Date.now().toString(),
                name: newSkill.trim(),
                level: skillLevel,
                yearsOfExperience,
                category: skillCategory,
            };
            setSkills((prev) => [...prev, skill]);
            setNewSkill('');
        }
    }, [newSkill, skillLevel, skillCategory, yearsOfExperience]);

    const removeSkill = useCallback((skillId: string) => {
        setSkills((prev) => prev.filter((skill) => skill.id !== skillId));
    }, []);

    if (!isAuthenticated || !user) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex min-h-screen items-center justify-center bg-gray-900"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="w-full max-w-md border-0 bg-gray-800 shadow-xl">
                        <CardContent className="p-8 text-center">
                            <motion.div
                                className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <Users className="h-10 w-10 text-white" />
                            </motion.div>
                            <h1 className="mb-4 text-2xl font-bold text-white">
                                Sign in to view your profile
                            </h1>
                            <p className="text-gray-400">
                                Access your comprehensive developer profile and track your progress.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gray-900"
        >
            <div className="container mx-auto px-4 py-8 sm:px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 gap-6 lg:gap-8 xl:grid-cols-4"
                >
                    {/* Left Sidebar */}
                    <motion.div variants={itemVariants} className="space-y-6 xl:col-span-1">
                        {/* User Profile Card */}
                        <motion.div variants={cardVariants}>
                            <Card className="border-0 bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                <CardContent className="p-6">
                                    <div className="text-center">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                            <Avatar className="mx-auto mb-4 h-20 w-20 border-4 border-gray-700">
                                                <AvatarImage
                                                    src={
                                                        isCompany
                                                            ? companyProfile.avatar
                                                            : profile.avatar
                                                    }
                                                    alt={
                                                        isCompany
                                                            ? companyProfile.name
                                                            : profile.name
                                                    }
                                                />
                                                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-xl font-bold text-white">
                                                    {(isCompany
                                                        ? companyProfile.name
                                                        : profile.name
                                                    ).charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                        </motion.div>
                                        <h2 className="text-lg font-bold text-white">
                                            {isCompany ? companyProfile.name : profile.name}
                                        </h2>
                                        {isCompany ? (
                                            <>
                                                <p className="text-sm font-medium text-blue-400">
                                                    {companyProfile.companyName}
                                                </p>
                                                <p className="text-sm text-gray-400">
                                                    {companyProfile.jobTitle} •{' '}
                                                    {companyProfile.department}
                                                </p>
                                                {companyProfile.isVerified && (
                                                    <Badge className="mt-2 bg-green-600 text-white">
                                                        <CheckCircle className="mr-1 h-3 w-3" />
                                                        Verified
                                                    </Badge>
                                                )}
                                            </>
                                        ) : (
                                            <p className="text-sm text-gray-400">
                                                Rank {profile.rank}
                                            </p>
                                        )}
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Button className="mt-4 w-full bg-green-600 text-white hover:bg-green-700">
                                                <Edit3 className="mr-2 h-4 w-4" />
                                                Edit Profile
                                            </Button>
                                        </motion.div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Community Stats */}
                        <motion.div variants={cardVariants}>
                            <Card className="border-0 bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                <CardHeader>
                                    <CardTitle className="text-white">
                                        {isCompany ? 'Company Stats' : 'Community Stats'}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {isCompany
                                        ? // Company stats
                                          [
                                              {
                                                  label: 'Job Posts',
                                                  value: jobPosts.length.toString(),
                                              },
                                              {
                                                  label: 'Applications',
                                                  value: candidateApplications.length.toString(),
                                              },
                                              {
                                                  label: 'Employees',
                                                  value: employees.length.toString(),
                                              },
                                              {
                                                  label: 'Meetings',
                                                  value: meetings.length.toString(),
                                              },
                                          ].map((stat, index) => (
                                              <motion.div
                                                  key={stat.label}
                                                  initial={{ opacity: 0, x: -20 }}
                                                  animate={{ opacity: 1, x: 0 }}
                                                  transition={{ delay: index * 0.1 }}
                                                  className="flex justify-between"
                                              >
                                                  <span className="text-gray-400">
                                                      {stat.label}
                                                  </span>
                                                  <span className="text-white">{stat.value}</span>
                                              </motion.div>
                                          ))
                                        : // Candidate stats
                                          [
                                              { label: 'Views', value: '0' },
                                              { label: 'Solution', value: '0' },
                                              { label: 'Discuss', value: '0' },
                                              { label: 'Reputation', value: '0' },
                                          ].map((stat, index) => (
                                              <motion.div
                                                  key={stat.label}
                                                  initial={{ opacity: 0, x: -20 }}
                                                  animate={{ opacity: 1, x: 0 }}
                                                  transition={{ delay: index * 0.1 }}
                                                  className="flex justify-between"
                                              >
                                                  <span className="text-gray-400">
                                                      {stat.label}
                                                  </span>
                                                  <span className="text-white">{stat.value}</span>
                                              </motion.div>
                                          ))}
                                    <div className="text-xs text-gray-500">Last week 0</div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Languages/Skills - Different for companies vs candidates */}
                        {isCompany ? (
                            // Company-specific sidebar sections
                            <>
                                {/* Company Info */}
                                <motion.div variants={cardVariants}>
                                    <Card className="border-0 bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                        <CardHeader>
                                            <CardTitle className="text-white">
                                                Company Info
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <Building2 className="h-4 w-4 text-blue-400" />
                                                <span className="text-sm text-white">
                                                    {companyProfile.companyName}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users className="h-4 w-4 text-green-400" />
                                                <span className="text-sm text-white">
                                                    {companyProfile.companySize} employees
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <BriefcaseIcon className="h-4 w-4 text-purple-400" />
                                                <span className="text-sm text-white">
                                                    {companyProfile.industry}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Globe className="h-4 w-4 text-orange-400" />
                                                <span className="text-sm text-white">
                                                    {companyProfile.website}
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>

                                {/* Recent Activity */}
                                <motion.div variants={cardVariants}>
                                    <Card className="border-0 bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                        <CardHeader>
                                            <CardTitle className="text-white">
                                                Recent Activity
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <div className="text-sm text-gray-300">
                                                <div className="mb-1 flex items-center gap-2">
                                                    <BriefcaseIcon className="h-3 w-3 text-blue-400" />
                                                    <span>New job posted</span>
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    2 hours ago
                                                </div>
                                            </div>
                                            <div className="text-sm text-gray-300">
                                                <div className="mb-1 flex items-center gap-2">
                                                    <Users className="h-3 w-3 text-green-400" />
                                                    <span>5 new applications</span>
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    1 day ago
                                                </div>
                                            </div>
                                            <div className="text-sm text-gray-300">
                                                <div className="mb-1 flex items-center gap-2">
                                                    <Calendar className="h-3 w-3 text-purple-400" />
                                                    <span>Meeting scheduled</span>
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    2 days ago
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </>
                        ) : (
                            // Candidate-specific sidebar sections
                            <>
                                {/* Languages */}
                                <motion.div variants={cardVariants}>
                                    <Card className="border-0 bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                        <CardHeader>
                                            <CardTitle className="text-white">Languages</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                {problemStats.languages.map((lang, index) => (
                                                    <motion.div
                                                        key={lang.name}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        className="flex items-center justify-between"
                                                    >
                                                        <Badge
                                                            variant="outline"
                                                            className="border-yellow-400 text-yellow-400"
                                                        >
                                                            {lang.name}
                                                        </Badge>
                                                        <span className="text-sm text-white">
                                                            {lang.problemsSolved} problem solved
                                                        </span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>

                                {/* Skills */}
                                <motion.div variants={cardVariants}>
                                    <Card className="border-0 bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                        <CardHeader>
                                            <CardTitle className="text-white">Skills</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            {[
                                                {
                                                    level: 'Advanced',
                                                    color: 'text-red-400',
                                                    skills: problemStats.skills.filter(
                                                        (s) => s.level === 'advanced',
                                                    ),
                                                },
                                                {
                                                    level: 'Intermediate',
                                                    color: 'text-yellow-400',
                                                    skills: problemStats.skills.filter(
                                                        (s) => s.level === 'intermediate',
                                                    ),
                                                },
                                                {
                                                    level: 'Fundamental',
                                                    color: 'text-green-400',
                                                    skills: problemStats.skills.filter(
                                                        (s) => s.level === 'beginner',
                                                    ),
                                                },
                                            ].map((category, categoryIndex) => (
                                                <motion.div
                                                    key={category.level}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: categoryIndex * 0.1 }}
                                                >
                                                    <h4
                                                        className={`text-sm font-medium ${category.color} mb-2`}
                                                    >
                                                        {category.level}
                                                    </h4>
                                                    {category.skills.length === 0 ? (
                                                        <div className="text-sm text-gray-400">
                                                            Not enough data
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-1">
                                                            {category.skills.map(
                                                                (skill, skillIndex) => (
                                                                    <motion.div
                                                                        key={skill.name}
                                                                        initial={{
                                                                            opacity: 0,
                                                                            x: -10,
                                                                        }}
                                                                        animate={{
                                                                            opacity: 1,
                                                                            x: 0,
                                                                        }}
                                                                        transition={{
                                                                            delay:
                                                                                categoryIndex *
                                                                                    0.1 +
                                                                                skillIndex * 0.05,
                                                                        }}
                                                                        className="flex items-center justify-between"
                                                                    >
                                                                        <span className="text-sm text-white">
                                                                            {skill.name}
                                                                        </span>
                                                                        <span className="text-sm text-gray-400">
                                                                            x{skill.problemsSolved}
                                                                        </span>
                                                                    </motion.div>
                                                                ),
                                                            )}
                                                        </div>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </>
                        )}
                    </motion.div>

                    {/* Main Content Area */}
                    <motion.div variants={itemVariants} className="space-y-6 xl:col-span-3">
                        {/* Category Navigation */}
                        <motion.div variants={tabVariants} className="space-y-4">
                            {/* Main Categories */}
                            <div className="flex flex-wrap gap-2 overflow-x-auto border-b border-gray-700">
                                {tabCategories.map((category) => (
                                    <motion.button
                                        key={category.id}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleCategoryChange(category.id)}
                                        className={`flex items-center gap-2 rounded-t-lg px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                                            selectedCategory === category.id
                                                ? 'border-b-2 border-blue-600 bg-gray-800 text-blue-400'
                                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                        }`}
                                    >
                                        <category.icon className="h-4 w-4" />
                                        {category.title}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Sub Tabs */}
                            {selectedCategory && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-wrap gap-1 overflow-x-auto sm:gap-2"
                                >
                                    {tabCategories
                                        .find((cat) => cat.id === selectedCategory)
                                        ?.tabs.map((tab) => (
                                            <motion.button
                                                key={tab.id}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleTabChange(tab.id)}
                                                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors ${
                                                    selectedTab === tab.id
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                                                }`}
                                            >
                                                <tab.icon className="h-3 w-3" />
                                                {tab.title}
                                            </motion.button>
                                        ))}
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Tab Content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                {/* Overview Tab */}
                                {selectedTab === 'overview' && (
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="space-y-6"
                                    >
                                        {/* Stats Grid */}
                                        <motion.div
                                            variants={containerVariants}
                                            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
                                        >
                                            {isCompany ? (
                                                // Company stats
                                                <>
                                                    <StatCard
                                                        icon={BriefcaseIcon}
                                                        title="Active Job Posts"
                                                        value={
                                                            jobPosts.filter((j) => j.isActive)
                                                                .length
                                                        }
                                                        color="bg-blue-100"
                                                    />
                                                    <StatCard
                                                        icon={Users}
                                                        title="Total Applications"
                                                        value={candidateApplications.length}
                                                        color="bg-green-100"
                                                    />
                                                    <StatCard
                                                        icon={Calendar}
                                                        title="Scheduled Meetings"
                                                        value={
                                                            meetings.filter(
                                                                (m) => m.status === 'scheduled',
                                                            ).length
                                                        }
                                                        color="bg-purple-100"
                                                    />
                                                    <StatCard
                                                        icon={Mail}
                                                        title="Unread Messages"
                                                        value={
                                                            messages.filter(
                                                                (m) =>
                                                                    !m.isRead && m.type === 'inbox',
                                                            ).length
                                                        }
                                                        color="bg-orange-100"
                                                    />
                                                </>
                                            ) : (
                                                // Candidate stats
                                                <>
                                                    <StatCard
                                                        icon={TargetIcon}
                                                        title="Problems Solved"
                                                        value={problemStats.solved}
                                                        color="bg-blue-100"
                                                    />
                                                    <StatCard
                                                        icon={Zap}
                                                        title="Current Streak"
                                                        value={problemStats.streak}
                                                        color="bg-green-100"
                                                    />
                                                    <StatCard
                                                        icon={BriefcaseIcon}
                                                        title="Job Applications"
                                                        value={jobApplications.length}
                                                        color="bg-purple-100"
                                                    />
                                                    <StatCard
                                                        icon={FileText}
                                                        title="Skills"
                                                        value={skills.length}
                                                        color="bg-orange-100"
                                                    />
                                                </>
                                            )}
                                        </motion.div>

                                        {/* Recent Activity */}
                                        <motion.div variants={cardVariants}>
                                            <Card className="border-0 bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                                <CardHeader>
                                                    <CardTitle className="flex items-center gap-2 text-white">
                                                        <TrendingUp className="h-5 w-5" />
                                                        Recent Activity
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <motion.div
                                                        variants={containerVariants}
                                                        className="space-y-4"
                                                    >
                                                        {isCompany ? (
                                                            // Company activity
                                                            <>
                                                                <ActivityItem
                                                                    icon={BriefcaseIcon}
                                                                    title="New job posted: Senior Full Stack Developer"
                                                                    time="2 hours ago"
                                                                    color="bg-blue-100"
                                                                />
                                                                <ActivityItem
                                                                    icon={Users}
                                                                    title="5 new applications received"
                                                                    time="1 day ago"
                                                                    color="bg-green-100"
                                                                />
                                                                <ActivityItem
                                                                    icon={Calendar}
                                                                    title="Interview scheduled with Sarah Johnson"
                                                                    time="2 days ago"
                                                                    color="bg-purple-100"
                                                                />
                                                            </>
                                                        ) : (
                                                            // Candidate activity
                                                            <>
                                                                <ActivityItem
                                                                    icon={CheckCircle}
                                                                    title="Solved Two Sum problem"
                                                                    time="2 hours ago"
                                                                    color="bg-green-100"
                                                                />
                                                                <ActivityItem
                                                                    icon={BriefcaseIcon}
                                                                    title="Applied to Google - Senior Software Engineer"
                                                                    time="1 day ago"
                                                                    color="bg-blue-100"
                                                                />
                                                                <ActivityItem
                                                                    icon={FileText}
                                                                    title="Published Building Scalable React Applications"
                                                                    time="3 days ago"
                                                                    color="bg-purple-100"
                                                                />
                                                            </>
                                                        )}
                                                    </motion.div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>

                                        {/* Company Chat - Only for companies */}
                                        {isCompany && (
                                            <motion.div variants={cardVariants}>
                                                <Card className="border-0 bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                                    <CardHeader>
                                                        <CardTitle className="flex items-center gap-2 text-white">
                                                            <MessageSquare className="h-5 w-5" />
                                                            Quick Chat
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="space-y-4">
                                                            <div className="h-64 space-y-3 overflow-y-auto rounded-lg bg-gray-700 p-3">
                                                                <div className="flex justify-end">
                                                                    <div className="max-w-xs rounded-lg bg-blue-600 p-3 text-white">
                                                                        <p className="text-sm">
                                                                            Hi! How can I help you
                                                                            today?
                                                                        </p>
                                                                        <p className="mt-1 text-xs text-blue-200">
                                                                            Just now
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex justify-start">
                                                                    <div className="max-w-xs rounded-lg bg-gray-600 p-3 text-white">
                                                                        <p className="text-sm">
                                                                            I need help with posting
                                                                            a new job
                                                                        </p>
                                                                        <p className="mt-1 text-xs text-gray-300">
                                                                            2 min ago
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex justify-end">
                                                                    <div className="max-w-xs rounded-lg bg-blue-600 p-3 text-white">
                                                                        <p className="text-sm">
                                                                            Sure! You can click the
                                                                            &quot;Post New Job&quot;
                                                                            button in the Job
                                                                            Management section.
                                                                            I&apos;ll guide you
                                                                            through the process.
                                                                        </p>
                                                                        <p className="mt-1 text-xs text-blue-200">
                                                                            1 min ago
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <Input
                                                                    placeholder="Type your message..."
                                                                    className="flex-1 border-gray-600 bg-gray-700 text-white"
                                                                />
                                                                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                                                                    <MessageSquare className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}

                                {/* Skills Tab */}
                                {selectedTab === 'skills' && (
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="space-y-6"
                                    >
                                        {/* Add Skill Form */}
                                        <motion.div variants={cardVariants}>
                                            <Card className="border-0 bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                                <CardHeader>
                                                    <CardTitle className="text-white">
                                                        Add New Skill
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                                        <div>
                                                            <label className="mb-2 block text-sm font-medium text-gray-300">
                                                                Skill Name
                                                            </label>
                                                            <Input
                                                                value={newSkill}
                                                                onChange={(e) =>
                                                                    setNewSkill(e.target.value)
                                                                }
                                                                placeholder="e.g., React, Node.js"
                                                                className="border-gray-600 bg-gray-700 text-white"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="mb-2 block text-sm font-medium text-gray-300">
                                                                Level
                                                            </label>
                                                            <select
                                                                value={skillLevel}
                                                                onChange={(e) =>
                                                                    setSkillLevel(
                                                                        e.target.value as any,
                                                                    )
                                                                }
                                                                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                                            >
                                                                <option value="beginner">
                                                                    Beginner
                                                                </option>
                                                                <option value="intermediate">
                                                                    Intermediate
                                                                </option>
                                                                <option value="advanced">
                                                                    Advanced
                                                                </option>
                                                                <option value="expert">
                                                                    Expert
                                                                </option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="mb-2 block text-sm font-medium text-gray-300">
                                                                Category
                                                            </label>
                                                            <select
                                                                value={skillCategory}
                                                                onChange={(e) =>
                                                                    setSkillCategory(
                                                                        e.target.value as any,
                                                                    )
                                                                }
                                                                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                                            >
                                                                <option value="frontend">
                                                                    Frontend
                                                                </option>
                                                                <option value="backend">
                                                                    Backend
                                                                </option>
                                                                <option value="database">
                                                                    Database
                                                                </option>
                                                                <option value="devops">
                                                                    DevOps
                                                                </option>
                                                                <option value="mobile">
                                                                    Mobile
                                                                </option>
                                                                <option value="other">Other</option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="mb-2 block text-sm font-medium text-gray-300">
                                                                Years of Experience
                                                            </label>
                                                            <Input
                                                                type="number"
                                                                value={yearsOfExperience}
                                                                onChange={(e) =>
                                                                    setYearsOfExperience(
                                                                        parseInt(e.target.value),
                                                                    )
                                                                }
                                                                min="0"
                                                                max="20"
                                                                className="border-gray-600 bg-gray-700 text-white"
                                                            />
                                                        </div>
                                                    </div>
                                                    <motion.div
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        <Button
                                                            onClick={addSkill}
                                                            className="mt-4"
                                                            disabled={!newSkill.trim()}
                                                        >
                                                            <Plus className="mr-2 h-4 w-4" />
                                                            Add Skill
                                                        </Button>
                                                    </motion.div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>

                                        {/* Skills List */}
                                        <motion.div variants={cardVariants}>
                                            <Card className="border-0 bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                                <CardHeader>
                                                    <CardTitle className="text-white">
                                                        Your Skills ({skills.length})
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <motion.div
                                                        variants={containerVariants}
                                                        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                                                    >
                                                        <AnimatePresence>
                                                            {skills.map((skill) => (
                                                                <SkillCard
                                                                    key={skill.id}
                                                                    skill={skill}
                                                                    onRemove={removeSkill}
                                                                />
                                                            ))}
                                                        </AnimatePresence>
                                                    </motion.div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </motion.div>
                                )}

                                {/* Experience Tab */}
                                {selectedTab === 'experience' && (
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="space-y-6"
                                    >
                                        <motion.div variants={cardVariants}>
                                            <Card className="border-0 bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                                <CardHeader>
                                                    <CardTitle className="flex items-center justify-between text-white">
                                                        Work Experience
                                                        <motion.div
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                        >
                                                            <Button>
                                                                <Plus className="mr-2 h-4 w-4" />
                                                                Add Experience
                                                            </Button>
                                                        </motion.div>
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <motion.div
                                                        variants={containerVariants}
                                                        className="space-y-6"
                                                    >
                                                        {experiences.map((exp) => (
                                                            <motion.div
                                                                key={exp.id}
                                                                variants={itemVariants}
                                                                className="border-l-4 border-blue-500 pl-6"
                                                            >
                                                                <div className="flex items-start justify-between">
                                                                    <div className="flex-1">
                                                                        <h3 className="text-lg font-semibold text-white">
                                                                            {exp.position}
                                                                        </h3>
                                                                        <p className="font-medium text-blue-400">
                                                                            {exp.company}
                                                                        </p>
                                                                        <p className="text-sm text-gray-400">
                                                                            {new Date(
                                                                                exp.startDate,
                                                                            ).toLocaleDateString()}{' '}
                                                                            -{' '}
                                                                            {exp.current
                                                                                ? 'Present'
                                                                                : new Date(
                                                                                      exp.endDate!,
                                                                                  ).toLocaleDateString()}
                                                                        </p>
                                                                        <p className="mt-2 text-gray-300">
                                                                            {exp.description}
                                                                        </p>

                                                                        <div className="mt-3">
                                                                            <h4 className="mb-2 text-sm font-medium text-white">
                                                                                Technologies:
                                                                            </h4>
                                                                            <div className="flex flex-wrap gap-2">
                                                                                {exp.technologies.map(
                                                                                    (tech) => (
                                                                                        <Badge
                                                                                            key={
                                                                                                tech
                                                                                            }
                                                                                            variant="outline"
                                                                                            className="border-gray-600 text-xs text-gray-300"
                                                                                        >
                                                                                            {tech}
                                                                                        </Badge>
                                                                                    ),
                                                                                )}
                                                                            </div>
                                                                        </div>

                                                                        <div className="mt-3">
                                                                            <h4 className="mb-2 text-sm font-medium text-white">
                                                                                Key Achievements:
                                                                            </h4>
                                                                            <ul className="list-inside list-disc space-y-1 text-sm text-gray-300">
                                                                                {exp.achievements.map(
                                                                                    (
                                                                                        achievement,
                                                                                        idx,
                                                                                    ) => (
                                                                                        <li
                                                                                            key={
                                                                                                idx
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                achievement
                                                                                            }
                                                                                        </li>
                                                                                    ),
                                                                                )}
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <motion.button
                                                                        whileHover={{ scale: 1.1 }}
                                                                        whileTap={{ scale: 0.9 }}
                                                                        className="rounded-lg p-2 text-gray-400 transition-colors hover:text-white"
                                                                    >
                                                                        <Edit3 className="h-4 w-4" />
                                                                    </motion.button>
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                    </motion.div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </motion.div>
                                )}

                                {/* Problems Tab */}
                                {selectedTab === 'problems' && (
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="space-y-6"
                                    >
                                        <motion.div variants={cardVariants}>
                                            <Card className="border-0 bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                                <CardHeader>
                                                    <CardTitle className="flex items-center gap-2 text-white">
                                                        <TargetIcon className="h-5 w-5" />
                                                        Problem Solving Progress
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-6">
                                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                                        {[
                                                            {
                                                                label: 'Easy',
                                                                solved: problemStats.easy.solved,
                                                                color: 'bg-green-900/20 text-green-400',
                                                            },
                                                            {
                                                                label: 'Medium',
                                                                solved: problemStats.medium.solved,
                                                                color: 'bg-yellow-900/20 text-yellow-400',
                                                            },
                                                            {
                                                                label: 'Hard',
                                                                solved: problemStats.hard.solved,
                                                                color: 'bg-red-900/20 text-red-400',
                                                            },
                                                        ].map((difficulty) => (
                                                            <motion.div
                                                                key={difficulty.label}
                                                                variants={itemVariants}
                                                                className={`rounded-lg ${difficulty.color} p-4 text-center`}
                                                            >
                                                                <div className="text-2xl font-bold">
                                                                    {difficulty.solved}
                                                                </div>
                                                                <div className="text-sm text-gray-400">
                                                                    {difficulty.label}
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </motion.div>
                                )}

                                {/* Jobs Tab - Different for companies vs candidates */}
                                {selectedTab === 'jobs' && !isCompany && (
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="space-y-6"
                                    >
                                        <motion.div variants={cardVariants}>
                                            <Card className="border-0 bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                                <CardHeader>
                                                    <CardTitle className="flex items-center gap-2 text-white">
                                                        <BriefcaseIcon className="h-5 w-5" />
                                                        Job Applications
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-4">
                                                        {jobApplications.map((job) => (
                                                            <div
                                                                key={job.id}
                                                                className="flex items-center gap-4 rounded-lg border border-gray-600 bg-gray-700 p-4 shadow-sm"
                                                            >
                                                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-600">
                                                                    <BriefcaseIcon className="h-6 w-6 text-gray-400" />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <h3 className="font-semibold text-white">
                                                                        {job.position}
                                                                    </h3>
                                                                    <p className="text-sm text-gray-400">
                                                                        {job.company}
                                                                    </p>
                                                                    <p className="text-xs text-gray-500">
                                                                        Applied{' '}
                                                                        {new Date(
                                                                            job.date,
                                                                        ).toLocaleDateString()}
                                                                    </p>
                                                                </div>
                                                                <Badge
                                                                    variant={
                                                                        job.status === 'offered'
                                                                            ? 'default'
                                                                            : job.status ===
                                                                                'interviewing'
                                                                              ? 'secondary'
                                                                              : job.status ===
                                                                                  'applied'
                                                                                ? 'outline'
                                                                                : 'destructive'
                                                                    }
                                                                    className={
                                                                        job.status === 'offered'
                                                                            ? 'bg-green-500'
                                                                            : job.status ===
                                                                                'interviewing'
                                                                              ? 'bg-blue-500'
                                                                              : job.status ===
                                                                                  'applied'
                                                                                ? 'bg-gray-500'
                                                                                : 'bg-red-500'
                                                                    }
                                                                >
                                                                    {job.status
                                                                        .charAt(0)
                                                                        .toUpperCase() +
                                                                        job.status.slice(1)}
                                                                </Badge>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </motion.div>
                                )}

                                {/* Job Posts Tab - Company Only */}
                                {selectedTab === 'job-posts' && isCompany && (
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="space-y-6"
                                    >
                                        <motion.div variants={cardVariants}>
                                            <Card className="border-0 bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                                <CardHeader>
                                                    <CardTitle className="flex items-center justify-between text-white">
                                                        <div className="flex items-center gap-2">
                                                            <BriefcaseIcon className="h-5 w-5" />
                                                            Job Posts
                                                        </div>
                                                        <motion.div
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                        >
                                                            <Button
                                                                className="bg-blue-600 text-white hover:bg-blue-700"
                                                                onClick={() =>
                                                                    setIsJobPostingModalOpen(true)
                                                                }
                                                            >
                                                                <Plus className="mr-2 h-4 w-4" />
                                                                Post New Job
                                                            </Button>
                                                        </motion.div>
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-4">
                                                        {jobPosts.map((job) => (
                                                            <motion.div
                                                                key={job.id}
                                                                className="cursor-pointer rounded-lg border border-gray-600 bg-gray-700 p-4 shadow-sm transition-colors hover:bg-gray-600"
                                                                onClick={() => handleJobClick(job)}
                                                                whileHover={{ scale: 1.02 }}
                                                                whileTap={{ scale: 0.98 }}
                                                            >
                                                                <div className="flex items-start justify-between">
                                                                    <div className="flex-1">
                                                                        <h3 className="font-semibold text-white">
                                                                            {job.title}
                                                                        </h3>
                                                                        <p className="mb-2 text-sm text-gray-400">
                                                                            {job.description.substring(
                                                                                0,
                                                                                100,
                                                                            )}
                                                                            ...
                                                                        </p>
                                                                        <div className="mb-3 flex flex-wrap gap-2">
                                                                            <Badge
                                                                                variant="outline"
                                                                                className="border-blue-400 text-blue-400"
                                                                            >
                                                                                {job.workType}
                                                                            </Badge>
                                                                            <Badge
                                                                                variant="outline"
                                                                                className="border-green-400 text-green-400"
                                                                            >
                                                                                {job.employmentType}
                                                                            </Badge>
                                                                            <Badge
                                                                                variant="outline"
                                                                                className="border-purple-400 text-purple-400"
                                                                            >
                                                                                {job.location}
                                                                            </Badge>
                                                                        </div>
                                                                        <div className="flex items-center gap-4 text-sm text-gray-400">
                                                                            <span>
                                                                                $
                                                                                {job.salaryMin.toLocaleString()}{' '}
                                                                                - $
                                                                                {job.salaryMax.toLocaleString()}
                                                                            </span>
                                                                            <span>
                                                                                {
                                                                                    job.applicationsCount
                                                                                }{' '}
                                                                                applications
                                                                            </span>
                                                                            <span>
                                                                                Expires{' '}
                                                                                {new Date(
                                                                                    job.expiresAt,
                                                                                ).toLocaleDateString()}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex gap-2">
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            className="border-gray-600 text-gray-300"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleJobClick(job);
                                                                            }}
                                                                        >
                                                                            <Eye className="h-4 w-4" />
                                                                        </Button>
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            className="border-gray-600 text-gray-300"
                                                                            onClick={(e) =>
                                                                                e.stopPropagation()
                                                                            }
                                                                        >
                                                                            <Edit3 className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </motion.div>
                                )}

                                {/* Applications Tab - Company Only */}
                                {selectedTab === 'applications' && isCompany && (
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="space-y-6"
                                    >
                                        <motion.div variants={cardVariants}>
                                            <Card className="border-0 bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                                <CardHeader>
                                                    <CardTitle className="flex items-center gap-2 text-white">
                                                        <Users className="h-5 w-5" />
                                                        Candidate Applications
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-4">
                                                        {candidateApplications.map(
                                                            (application) => (
                                                                <div
                                                                    key={application.id}
                                                                    className="rounded-lg border border-gray-600 bg-gray-700 p-4 shadow-sm"
                                                                >
                                                                    <div className="flex items-start gap-4">
                                                                        <Avatar className="h-12 w-12">
                                                                            <AvatarImage
                                                                                src={
                                                                                    application.candidateAvatar
                                                                                }
                                                                                alt={
                                                                                    application.candidateName
                                                                                }
                                                                            />
                                                                            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                                                                                {application.candidateName.charAt(
                                                                                    0,
                                                                                )}
                                                                            </AvatarFallback>
                                                                        </Avatar>
                                                                        <div className="flex-1">
                                                                            <div className="flex items-start justify-between">
                                                                                <div>
                                                                                    <h3 className="font-semibold text-white">
                                                                                        {
                                                                                            application.candidateName
                                                                                        }
                                                                                    </h3>
                                                                                    <p className="text-sm text-gray-400">
                                                                                        {
                                                                                            application.position
                                                                                        }
                                                                                    </p>
                                                                                    <p className="text-xs text-gray-500">
                                                                                        Applied{' '}
                                                                                        {new Date(
                                                                                            application.appliedAt,
                                                                                        ).toLocaleDateString()}
                                                                                    </p>
                                                                                </div>
                                                                                <Badge
                                                                                    variant={
                                                                                        application.status ===
                                                                                        'offered'
                                                                                            ? 'default'
                                                                                            : application.status ===
                                                                                                'shortlisted'
                                                                                              ? 'secondary'
                                                                                              : application.status ===
                                                                                                  'pending'
                                                                                                ? 'outline'
                                                                                                : 'destructive'
                                                                                    }
                                                                                    className={
                                                                                        application.status ===
                                                                                        'offered'
                                                                                            ? 'bg-green-500'
                                                                                            : application.status ===
                                                                                                'shortlisted'
                                                                                              ? 'bg-blue-500'
                                                                                              : application.status ===
                                                                                                  'pending'
                                                                                                ? 'bg-gray-500'
                                                                                                : 'bg-red-500'
                                                                                    }
                                                                                >
                                                                                    {application.status
                                                                                        .charAt(0)
                                                                                        .toUpperCase() +
                                                                                        application.status.slice(
                                                                                            1,
                                                                                        )}
                                                                                </Badge>
                                                                            </div>
                                                                            <div className="mt-3">
                                                                                <p className="mb-2 text-sm text-gray-300">
                                                                                    {application.coverLetter.substring(
                                                                                        0,
                                                                                        150,
                                                                                    )}
                                                                                    ...
                                                                                </p>
                                                                                <div className="flex flex-wrap gap-2">
                                                                                    {application.skills.map(
                                                                                        (skill) => (
                                                                                            <Badge
                                                                                                key={
                                                                                                    skill
                                                                                                }
                                                                                                variant="outline"
                                                                                                className="border-gray-600 text-xs text-gray-300"
                                                                                            >
                                                                                                {
                                                                                                    skill
                                                                                                }
                                                                                            </Badge>
                                                                                        ),
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mt-4 flex gap-2">
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            className="border-gray-600 text-gray-300"
                                                                        >
                                                                            <Eye className="h-4 w-4" />
                                                                            View Profile
                                                                        </Button>
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            className="border-gray-600 text-gray-300"
                                                                        >
                                                                            <Download className="h-4 w-4" />
                                                                            Download Resume
                                                                        </Button>
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            className="border-gray-600 text-gray-300"
                                                                        >
                                                                            <Calendar className="h-4 w-4" />
                                                                            Schedule Interview
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </motion.div>
                                )}

                                {/* Resume Tab */}
                                {selectedTab === 'resume' && (
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="space-y-6"
                                    >
                                        <motion.div variants={cardVariants}>
                                            <Card className="border-0 bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                                <CardHeader>
                                                    <CardTitle className="flex items-center justify-between text-white">
                                                        <FileText className="h-5 w-5" />
                                                        Resume Management
                                                        <motion.div
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                        >
                                                            <Button>
                                                                <Upload className="mr-2 h-4 w-4" />
                                                                Upload Resume
                                                            </Button>
                                                        </motion.div>
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-4">
                                                        {resumes.map((resume) => (
                                                            <div
                                                                key={resume.id}
                                                                className="rounded-lg border border-gray-600 bg-gray-700 p-4 shadow-sm"
                                                            >
                                                                <div className="flex items-center gap-4">
                                                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-400 to-purple-500">
                                                                        <FileText className="h-6 w-6 text-white" />
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <h3 className="font-semibold text-white">
                                                                            {resume.title}
                                                                        </h3>
                                                                        <p className="text-sm text-gray-400">
                                                                            Last updated:{' '}
                                                                            {new Date(
                                                                                resume.lastUpdated,
                                                                            ).toLocaleDateString()}
                                                                        </p>
                                                                        <p className="text-xs text-gray-500">
                                                                            Template:{' '}
                                                                            {resume.template}
                                                                        </p>
                                                                    </div>
                                                                    <div className="flex gap-2">
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            className="border-gray-600 text-gray-300"
                                                                        >
                                                                            <FileText className="h-4 w-4" />
                                                                        </Button>
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            className="border-gray-600 text-gray-300"
                                                                        >
                                                                            <Edit3 className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </motion.div>
                                )}

                                {/* Employees Tab - Company Only */}
                                {selectedTab === 'employees' && isCompany && (
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="space-y-6"
                                    >
                                        <motion.div variants={cardVariants}>
                                            <Card className="border-0 bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                                <CardHeader>
                                                    <CardTitle className="flex items-center justify-between text-white">
                                                        <div className="flex items-center gap-2">
                                                            <Users className="h-5 w-5" />
                                                            Company Employees
                                                        </div>
                                                        <motion.div
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                        >
                                                            <Button
                                                                className="bg-blue-600 text-white hover:bg-blue-700"
                                                                onClick={handleAddEmployee}
                                                            >
                                                                <UserPlus className="mr-2 h-4 w-4" />
                                                                Add Employee
                                                            </Button>
                                                        </motion.div>
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-4">
                                                        {employees.map((employee) => (
                                                            <div
                                                                key={employee.id}
                                                                className="rounded-lg border border-gray-600 bg-gray-700 p-4 shadow-sm"
                                                            >
                                                                <div className="flex items-center gap-4">
                                                                    <Avatar className="h-12 w-12">
                                                                        <AvatarImage
                                                                            src={employee.avatar}
                                                                            alt={employee.name}
                                                                        />
                                                                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                                                                            {employee.name.charAt(
                                                                                0,
                                                                            )}
                                                                        </AvatarFallback>
                                                                    </Avatar>
                                                                    <div className="flex-1">
                                                                        <h3 className="font-semibold text-white">
                                                                            {employee.name}
                                                                        </h3>
                                                                        <p className="text-sm text-gray-400">
                                                                            {employee.position} •{' '}
                                                                            {employee.department}
                                                                        </p>
                                                                        <p className="text-xs text-gray-500">
                                                                            Joined{' '}
                                                                            {new Date(
                                                                                employee.joinDate,
                                                                            ).toLocaleDateString()}
                                                                        </p>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <Badge
                                                                            variant={
                                                                                employee.status ===
                                                                                'active'
                                                                                    ? 'default'
                                                                                    : 'secondary'
                                                                            }
                                                                            className={
                                                                                employee.status ===
                                                                                'active'
                                                                                    ? 'bg-green-500'
                                                                                    : 'bg-gray-500'
                                                                            }
                                                                        >
                                                                            {employee.status
                                                                                .charAt(0)
                                                                                .toUpperCase() +
                                                                                employee.status.slice(
                                                                                    1,
                                                                                )}
                                                                        </Badge>
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            className="border-gray-600 text-gray-300"
                                                                        >
                                                                            <Mail className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </motion.div>
                                )}

                                {/* Blog Tab */}
                                {selectedTab === 'blog' && (
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="space-y-6"
                                    >
                                        <motion.div variants={cardVariants}>
                                            <Card className="border-0 bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                                <CardHeader>
                                                    <CardTitle className="flex items-center gap-2 text-white">
                                                        <FileText className="h-5 w-5" />
                                                        Blog Posts
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-4">
                                                        {blogPosts.map((post) => (
                                                            <div
                                                                key={post.id}
                                                                className="rounded-lg border border-gray-600 bg-gray-700 p-4 shadow-sm"
                                                            >
                                                                <div className="flex items-start justify-between">
                                                                    <div className="flex-1">
                                                                        <h3 className="mb-2 font-semibold text-white">
                                                                            {post.title}
                                                                        </h3>
                                                                        <p className="mb-3 text-sm text-gray-400">
                                                                            {post.excerpt}
                                                                        </p>
                                                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                                                            <span>
                                                                                {new Date(
                                                                                    post.publishedAt,
                                                                                ).toLocaleDateString()}
                                                                            </span>
                                                                            <span>
                                                                                {post.readTime} min
                                                                                read
                                                                            </span>
                                                                            <span>
                                                                                {post.views} views
                                                                            </span>
                                                                            <span>
                                                                                {post.likes} likes
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        className="border-gray-600 text-gray-300"
                                                                    >
                                                                        <FileText className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                                <div className="mt-3 flex gap-2">
                                                                    {post.tags.map((tag) => (
                                                                        <Badge
                                                                            key={tag}
                                                                            variant="outline"
                                                                            className="border-gray-600 text-xs text-gray-300"
                                                                        >
                                                                            {tag}
                                                                        </Badge>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </motion.div>
                                )}

                                {/* Meetings Tab - Company Only */}
                                {selectedTab === 'meetings' && isCompany && (
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="space-y-6"
                                    >
                                        <motion.div variants={cardVariants}>
                                            <Card className="border-0 bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                                <CardHeader>
                                                    <CardTitle className="flex items-center justify-between text-white">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="h-5 w-5" />
                                                            Meetings & Interviews
                                                        </div>
                                                        <motion.div
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                        >
                                                            <Button
                                                                className="bg-blue-600 text-white hover:bg-blue-700"
                                                                onClick={handleAddMeeting}
                                                            >
                                                                <Plus className="mr-2 h-4 w-4" />
                                                                Schedule Meeting
                                                            </Button>
                                                        </motion.div>
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-4">
                                                        {meetings.map((meeting) => (
                                                            <div
                                                                key={meeting.id}
                                                                className="rounded-lg border border-gray-600 bg-gray-700 p-4 shadow-sm"
                                                            >
                                                                <div className="flex items-start justify-between">
                                                                    <div className="flex-1">
                                                                        <h3 className="font-semibold text-white">
                                                                            {meeting.title}
                                                                        </h3>
                                                                        <div className="mt-2 flex items-center gap-4">
                                                                            <Badge
                                                                                variant="outline"
                                                                                className={
                                                                                    meeting.type ===
                                                                                    'interview'
                                                                                        ? 'border-blue-400 text-blue-400'
                                                                                        : meeting.type ===
                                                                                            'discussion'
                                                                                          ? 'border-green-400 text-green-400'
                                                                                          : 'border-purple-400 text-purple-400'
                                                                                }
                                                                            >
                                                                                {meeting.type
                                                                                    .charAt(0)
                                                                                    .toUpperCase() +
                                                                                    meeting.type.slice(
                                                                                        1,
                                                                                    )}
                                                                            </Badge>
                                                                            <span className="text-sm text-gray-400">
                                                                                {meeting.date} at{' '}
                                                                                {meeting.time}
                                                                            </span>
                                                                            <span className="text-sm text-gray-400">
                                                                                {meeting.duration}{' '}
                                                                                min
                                                                            </span>
                                                                        </div>
                                                                        <div className="mt-3">
                                                                            <p className="mb-2 text-sm text-gray-300">
                                                                                Participants:{' '}
                                                                                {meeting.participants.join(
                                                                                    ', ',
                                                                                )}
                                                                            </p>
                                                                            {meeting.notes && (
                                                                                <p className="text-sm text-gray-400">
                                                                                    Notes:{' '}
                                                                                    {meeting.notes}
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex gap-2">
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            className="border-gray-600 text-gray-300"
                                                                        >
                                                                            <Video className="h-4 w-4" />
                                                                        </Button>
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            className="border-gray-600 text-gray-300"
                                                                        >
                                                                            <Edit3 className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </motion.div>
                                )}

                                {/* Certificates Tab */}
                                {selectedTab === 'certificates' && (
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="space-y-6"
                                    >
                                        <motion.div variants={cardVariants}>
                                            <Card className="border-0 bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                                <CardHeader>
                                                    <CardTitle className="flex items-center gap-2 text-white">
                                                        <AwardIcon className="h-5 w-5" />
                                                        Certificates
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                        {certificates.map((cert) => (
                                                            <div
                                                                key={cert.id}
                                                                className="rounded-lg border border-gray-600 bg-gray-700 p-4 shadow-sm"
                                                            >
                                                                <div className="flex items-center gap-4">
                                                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-400 to-purple-500">
                                                                        <AwardIcon className="h-6 w-6 text-white" />
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <h3 className="font-semibold text-white">
                                                                            {cert.name}
                                                                        </h3>
                                                                        <p className="text-sm text-gray-400">
                                                                            {cert.issuer}
                                                                        </p>
                                                                        <p className="text-xs text-gray-500">
                                                                            Issued{' '}
                                                                            {new Date(
                                                                                cert.issueDate,
                                                                            ).toLocaleDateString()}
                                                                        </p>
                                                                    </div>
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        className="border-gray-600 text-gray-300"
                                                                    >
                                                                        <AwardIcon className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </motion.div>
                                )}

                                {/* Inbox Tab - Company Only */}
                                {selectedTab === 'inbox' && isCompany && (
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="space-y-6"
                                    >
                                        <motion.div variants={cardVariants}>
                                            <Card className="border-0 bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                                <CardHeader>
                                                    <CardTitle className="flex items-center gap-2 text-white">
                                                        <Mail className="h-5 w-5" />
                                                        Inbox
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-4">
                                                        {messages
                                                            .filter((m) => m.type === 'inbox')
                                                            .map((message) => (
                                                                <div
                                                                    key={message.id}
                                                                    className={`rounded-lg border p-4 shadow-sm transition-colors ${
                                                                        message.isRead
                                                                            ? 'border-gray-600 bg-gray-700'
                                                                            : 'border-blue-500 bg-blue-900/20'
                                                                    }`}
                                                                >
                                                                    <div className="flex items-start justify-between">
                                                                        <div className="flex-1">
                                                                            <div className="mb-2 flex items-center gap-2">
                                                                                <h3 className="font-semibold text-white">
                                                                                    {
                                                                                        message.subject
                                                                                    }
                                                                                </h3>
                                                                                {!message.isRead && (
                                                                                    <Badge className="bg-blue-500 text-white">
                                                                                        New
                                                                                    </Badge>
                                                                                )}
                                                                            </div>
                                                                            <p className="mb-2 text-sm text-gray-400">
                                                                                From: {message.from}
                                                                            </p>
                                                                            <p className="mb-2 text-sm text-gray-300">
                                                                                {message.content.substring(
                                                                                    0,
                                                                                    150,
                                                                                )}
                                                                                ...
                                                                            </p>
                                                                            <p className="text-xs text-gray-500">
                                                                                {new Date(
                                                                                    message.sentAt,
                                                                                ).toLocaleDateString()}
                                                                            </p>
                                                                        </div>
                                                                        <div className="flex gap-2">
                                                                            <Button
                                                                                variant="outline"
                                                                                size="sm"
                                                                                className="border-gray-600 text-gray-300"
                                                                            >
                                                                                <MessageSquare className="h-4 w-4" />
                                                                            </Button>
                                                                            <Button
                                                                                variant="outline"
                                                                                size="sm"
                                                                                className="border-gray-600 text-gray-300"
                                                                            >
                                                                                <Edit3 className="h-4 w-4" />
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </motion.div>
                                )}

                                {/* Contests Tab - Company Only */}
                                {selectedTab === 'contests' && isCompany && (
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="space-y-6"
                                    >
                                        <motion.div variants={cardVariants}>
                                            <Card className="border-0 bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                                <CardHeader>
                                                    <CardTitle className="flex items-center justify-between text-white">
                                                        <div className="flex items-center gap-2">
                                                            <AwardIcon className="h-5 w-5" />
                                                            Company Contests
                                                        </div>
                                                        <motion.div
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                        >
                                                            <Button
                                                                className="bg-blue-600 text-white hover:bg-blue-700"
                                                                onClick={handleAddContest}
                                                            >
                                                                <Plus className="mr-2 h-4 w-4" />
                                                                Create Contest
                                                            </Button>
                                                        </motion.div>
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-4">
                                                        {contests.map((contest) => (
                                                            <div
                                                                key={contest.id}
                                                                className="rounded-lg border border-gray-600 bg-gray-700 p-4 shadow-sm"
                                                            >
                                                                <div className="flex items-start justify-between">
                                                                    <div className="flex-1">
                                                                        <h3 className="font-semibold text-white">
                                                                            {contest.title}
                                                                        </h3>
                                                                        <p className="mb-3 text-sm text-gray-400">
                                                                            {contest.description}
                                                                        </p>
                                                                        <div className="mb-3 flex flex-wrap gap-2">
                                                                            <Badge
                                                                                variant="outline"
                                                                                className={
                                                                                    contest.type ===
                                                                                    'coding'
                                                                                        ? 'border-blue-400 text-blue-400'
                                                                                        : contest.type ===
                                                                                            'design'
                                                                                          ? 'border-purple-400 text-purple-400'
                                                                                          : 'border-green-400 text-green-400'
                                                                                }
                                                                            >
                                                                                {contest.type
                                                                                    .charAt(0)
                                                                                    .toUpperCase() +
                                                                                    contest.type.slice(
                                                                                        1,
                                                                                    )}
                                                                            </Badge>
                                                                            <Badge
                                                                                variant="outline"
                                                                                className={
                                                                                    contest.status ===
                                                                                    'active'
                                                                                        ? 'border-green-400 text-green-400'
                                                                                        : contest.status ===
                                                                                            'upcoming'
                                                                                          ? 'border-blue-400 text-blue-400'
                                                                                          : 'border-gray-400 text-gray-400'
                                                                                }
                                                                            >
                                                                                {contest.status
                                                                                    .charAt(0)
                                                                                    .toUpperCase() +
                                                                                    contest.status.slice(
                                                                                        1,
                                                                                    )}
                                                                            </Badge>
                                                                            <Badge
                                                                                variant="outline"
                                                                                className="border-yellow-400 text-yellow-400"
                                                                            >
                                                                                Prize:{' '}
                                                                                {contest.prize}
                                                                            </Badge>
                                                                        </div>
                                                                        <div className="flex items-center gap-4 text-sm text-gray-400">
                                                                            <span>
                                                                                {
                                                                                    contest.participants
                                                                                }{' '}
                                                                                participants
                                                                            </span>
                                                                            <span>
                                                                                Start:{' '}
                                                                                {new Date(
                                                                                    contest.startDate,
                                                                                ).toLocaleDateString()}
                                                                            </span>
                                                                            <span>
                                                                                End:{' '}
                                                                                {new Date(
                                                                                    contest.endDate,
                                                                                ).toLocaleDateString()}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex gap-2">
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            className="border-gray-600 text-gray-300"
                                                                        >
                                                                            <Eye className="h-4 w-4" />
                                                                        </Button>
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            className="border-gray-600 text-gray-300"
                                                                        >
                                                                            <Edit3 className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </motion.div>
                                )}

                                {/* Reports Tab - Company Only */}
                                {selectedTab === 'reports' && isCompany && (
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="space-y-6"
                                    >
                                        {/* Applications Over Time Chart */}
                                        <motion.div variants={cardVariants}>
                                            <Card className="border-0 bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                                <CardHeader>
                                                    <CardTitle className="flex items-center gap-2 text-white">
                                                        <TrendingUp className="h-5 w-5" />
                                                        Applications Over Time
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <ChartContainer
                                                        className="h-64"
                                                        config={{
                                                            applications: {
                                                                label: 'Applications',
                                                                color: 'hsl(var(--chart-1))',
                                                            },
                                                            interviews: {
                                                                label: 'Interviews',
                                                                color: 'hsl(var(--chart-2))',
                                                            },
                                                            hires: {
                                                                label: 'Hires',
                                                                color: 'hsl(var(--chart-3))',
                                                            },
                                                        }}
                                                    >
                                                        <LineChart
                                                            data={chartData.applicationsOverTime}
                                                        >
                                                            <XAxis
                                                                dataKey="month"
                                                                stroke="#888888"
                                                                fontSize={12}
                                                                tickLine={false}
                                                                axisLine={false}
                                                            />
                                                            <YAxis
                                                                stroke="#888888"
                                                                fontSize={12}
                                                                tickLine={false}
                                                                axisLine={false}
                                                                tickFormatter={(value) =>
                                                                    `${value}`
                                                                }
                                                            />
                                                            <CartesianGrid
                                                                strokeDasharray="3 3"
                                                                className="stroke-muted"
                                                            />
                                                            <ChartTooltip
                                                                content={({ active, payload }) => {
                                                                    if (
                                                                        active &&
                                                                        payload &&
                                                                        payload.length
                                                                    ) {
                                                                        return (
                                                                            <div className="bg-background rounded-lg border p-2 shadow-sm">
                                                                                <div className="grid grid-cols-2 gap-2">
                                                                                    {payload.map(
                                                                                        (
                                                                                            entry: any,
                                                                                            index: number,
                                                                                        ) => (
                                                                                            <div
                                                                                                key={
                                                                                                    index
                                                                                                }
                                                                                                className="flex items-center gap-2"
                                                                                            >
                                                                                                <div
                                                                                                    className="h-2 w-2 rounded-full"
                                                                                                    style={{
                                                                                                        backgroundColor:
                                                                                                            entry.color,
                                                                                                    }}
                                                                                                />
                                                                                                <span className="text-sm font-medium">
                                                                                                    {
                                                                                                        entry.name
                                                                                                    }

                                                                                                    :{' '}
                                                                                                    {
                                                                                                        entry.value
                                                                                                    }
                                                                                                </span>
                                                                                            </div>
                                                                                        ),
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    }
                                                                    return null;
                                                                }}
                                                            />
                                                            <Line
                                                                type="monotone"
                                                                dataKey="applications"
                                                                stroke="hsl(var(--chart-1))"
                                                                strokeWidth={2}
                                                                dot={false}
                                                            />
                                                            <Line
                                                                type="monotone"
                                                                dataKey="interviews"
                                                                stroke="hsl(var(--chart-2))"
                                                                strokeWidth={2}
                                                                dot={false}
                                                            />
                                                            <Line
                                                                type="monotone"
                                                                dataKey="hires"
                                                                stroke="hsl(var(--chart-3))"
                                                                strokeWidth={2}
                                                                dot={false}
                                                            />
                                                        </LineChart>
                                                    </ChartContainer>
                                                </CardContent>
                                            </Card>
                                        </motion.div>

                                        {/* Job Performance Chart */}
                                        <motion.div variants={cardVariants}>
                                            <Card className="border-0 bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                                <CardHeader>
                                                    <CardTitle className="flex items-center gap-2 text-white">
                                                        <BarChart3 className="h-5 w-5" />
                                                        Job Performance
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <ChartContainer
                                                        className="h-64"
                                                        config={{
                                                            applications: {
                                                                label: 'Applications',
                                                                color: 'hsl(var(--chart-1))',
                                                            },
                                                            views: {
                                                                label: 'Views',
                                                                color: 'hsl(var(--chart-2))',
                                                            },
                                                        }}
                                                    >
                                                        <BarChart data={chartData.jobPerformance}>
                                                            <XAxis
                                                                dataKey="job"
                                                                stroke="#888888"
                                                                fontSize={12}
                                                                tickLine={false}
                                                                axisLine={false}
                                                            />
                                                            <YAxis
                                                                stroke="#888888"
                                                                fontSize={12}
                                                                tickLine={false}
                                                                axisLine={false}
                                                                tickFormatter={(value) =>
                                                                    `${value}`
                                                                }
                                                            />
                                                            <CartesianGrid
                                                                strokeDasharray="3 3"
                                                                className="stroke-muted"
                                                            />
                                                            <ChartTooltip
                                                                content={({ active, payload }) => {
                                                                    if (
                                                                        active &&
                                                                        payload &&
                                                                        payload.length
                                                                    ) {
                                                                        return (
                                                                            <div className="bg-background rounded-lg border p-2 shadow-sm">
                                                                                <div className="grid grid-cols-2 gap-2">
                                                                                    {payload.map(
                                                                                        (
                                                                                            entry: any,
                                                                                            index: number,
                                                                                        ) => (
                                                                                            <div
                                                                                                key={
                                                                                                    index
                                                                                                }
                                                                                                className="flex items-center gap-2"
                                                                                            >
                                                                                                <div
                                                                                                    className="h-2 w-2 rounded-full"
                                                                                                    style={{
                                                                                                        backgroundColor:
                                                                                                            entry.color,
                                                                                                    }}
                                                                                                />
                                                                                                <span className="text-sm font-medium">
                                                                                                    {
                                                                                                        entry.name
                                                                                                    }

                                                                                                    :{' '}
                                                                                                    {
                                                                                                        entry.value
                                                                                                    }
                                                                                                </span>
                                                                                            </div>
                                                                                        ),
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    }
                                                                    return null;
                                                                }}
                                                            />
                                                            <Bar
                                                                dataKey="applications"
                                                                fill="hsl(var(--chart-1))"
                                                                radius={[4, 4, 0, 0]}
                                                            />
                                                            <Bar
                                                                dataKey="views"
                                                                fill="hsl(var(--chart-2))"
                                                                radius={[4, 4, 0, 0]}
                                                            />
                                                        </BarChart>
                                                    </ChartContainer>
                                                </CardContent>
                                            </Card>
                                        </motion.div>

                                        {/* Skills Demand Chart */}
                                        <motion.div variants={cardVariants}>
                                            <Card className="border-0 bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                                <CardHeader>
                                                    <CardTitle className="flex items-center gap-2 text-white">
                                                        <TargetIcon className="h-5 w-5" />
                                                        Skills in Demand
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <ChartContainer
                                                        className="h-64"
                                                        config={{
                                                            demand: {
                                                                label: 'Demand',
                                                                color: 'hsl(var(--chart-1))',
                                                            },
                                                        }}
                                                    >
                                                        <BarChart
                                                            data={chartData.skillDemand}
                                                            layout="horizontal"
                                                        >
                                                            <XAxis
                                                                type="number"
                                                                stroke="#888888"
                                                                fontSize={12}
                                                                tickLine={false}
                                                                axisLine={false}
                                                                tickFormatter={(value) =>
                                                                    `${value}%`
                                                                }
                                                            />
                                                            <YAxis
                                                                dataKey="skill"
                                                                type="category"
                                                                stroke="#888888"
                                                                fontSize={12}
                                                                tickLine={false}
                                                                axisLine={false}
                                                            />
                                                            <CartesianGrid
                                                                strokeDasharray="3 3"
                                                                className="stroke-muted"
                                                            />
                                                            <ChartTooltip
                                                                content={({ active, payload }) => {
                                                                    if (
                                                                        active &&
                                                                        payload &&
                                                                        payload.length
                                                                    ) {
                                                                        return (
                                                                            <div className="bg-background rounded-lg border p-2 shadow-sm">
                                                                                <div className="flex items-center gap-2">
                                                                                    <div
                                                                                        className="h-2 w-2 rounded-full"
                                                                                        style={{
                                                                                            backgroundColor:
                                                                                                payload[0]
                                                                                                    .color,
                                                                                        }}
                                                                                    />
                                                                                    <span className="text-sm font-medium">
                                                                                        {
                                                                                            payload[0]
                                                                                                .payload
                                                                                                .skill
                                                                                        }
                                                                                        :{' '}
                                                                                        {
                                                                                            payload[0]
                                                                                                .value
                                                                                        }
                                                                                        %
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    }
                                                                    return null;
                                                                }}
                                                            />
                                                            <Bar
                                                                dataKey="demand"
                                                                fill="hsl(var(--chart-1))"
                                                                radius={[0, 4, 4, 0]}
                                                            />
                                                        </BarChart>
                                                    </ChartContainer>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </motion.div>
                                )}

                                {/* Insights Tab - Company Only */}
                                {selectedTab === 'insights' && isCompany && (
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="space-y-6"
                                    >
                                        <motion.div variants={cardVariants}>
                                            <Card className="border-0 bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                                <CardHeader>
                                                    <CardTitle className="flex items-center gap-2 text-white">
                                                        <TrendingUp className="h-5 w-5" />
                                                        Hiring Insights
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-6">
                                                        <div className="rounded-lg border border-gray-600 bg-gray-700 p-4">
                                                            <h4 className="mb-3 font-semibold text-white">
                                                                Top Skills in Demand
                                                            </h4>
                                                            <div className="space-y-2">
                                                                {[
                                                                    'React',
                                                                    'TypeScript',
                                                                    'Node.js',
                                                                    'Python',
                                                                    'AWS',
                                                                ].map((skill, index) => (
                                                                    <div
                                                                        key={skill}
                                                                        className="flex items-center justify-between"
                                                                    >
                                                                        <span className="text-sm text-gray-300">
                                                                            {skill}
                                                                        </span>
                                                                        <div className="flex items-center gap-2">
                                                                            <div className="h-2 w-24 rounded-full bg-gray-600">
                                                                                <div
                                                                                    className="h-2 rounded-full bg-blue-500"
                                                                                    style={{
                                                                                        width: `${80 - index * 10}%`,
                                                                                    }}
                                                                                ></div>
                                                                            </div>
                                                                            <span className="text-sm text-white">
                                                                                {80 - index * 10}%
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="rounded-lg border border-gray-600 bg-gray-700 p-4">
                                                            <h4 className="mb-3 font-semibold text-white">
                                                                Application Sources
                                                            </h4>
                                                            <div className="space-y-2">
                                                                {[
                                                                    {
                                                                        source: 'Job Board',
                                                                        percentage: 45,
                                                                    },
                                                                    {
                                                                        source: 'Company Website',
                                                                        percentage: 30,
                                                                    },
                                                                    {
                                                                        source: 'Referrals',
                                                                        percentage: 15,
                                                                    },
                                                                    {
                                                                        source: 'Social Media',
                                                                        percentage: 10,
                                                                    },
                                                                ].map((item) => (
                                                                    <div
                                                                        key={item.source}
                                                                        className="flex items-center justify-between"
                                                                    >
                                                                        <span className="text-sm text-gray-300">
                                                                            {item.source}
                                                                        </span>
                                                                        <span className="text-sm text-white">
                                                                            {item.percentage}%
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </motion.div>
                                )}

                                {/* Courses Tab */}
                                {selectedTab === 'courses' && (
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="space-y-6"
                                    >
                                        <motion.div variants={cardVariants}>
                                            <Card className="border-0 bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                                <CardHeader>
                                                    <CardTitle className="flex items-center gap-2 text-white">
                                                        <BookOpenIcon className="h-5 w-5" />
                                                        Courses
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-4">
                                                        {courses.map((course) => (
                                                            <div
                                                                key={course.id}
                                                                className="rounded-lg border border-gray-600 bg-gray-700 p-4 shadow-sm"
                                                            >
                                                                <div className="flex items-center gap-4">
                                                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-400 to-purple-500">
                                                                        <BookOpenIcon className="h-6 w-6 text-white" />
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <h3 className="font-semibold text-white">
                                                                            {course.title}
                                                                        </h3>
                                                                        <p className="text-sm text-gray-400">
                                                                            {course.platform}
                                                                        </p>
                                                                        <div className="mt-2">
                                                                            <div className="mb-1 flex items-center justify-between text-sm">
                                                                                <span className="text-gray-300">
                                                                                    Progress
                                                                                </span>
                                                                                <span className="text-white">
                                                                                    {
                                                                                        course.progress
                                                                                    }
                                                                                    %
                                                                                </span>
                                                                            </div>
                                                                            <div className="h-2 w-full rounded-full bg-gray-600">
                                                                                <div
                                                                                    className="h-2 rounded-full bg-blue-600"
                                                                                    style={{
                                                                                        width: `${course.progress}%`,
                                                                                    }}
                                                                                ></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex flex-col gap-2">
                                                                        {course.completed && (
                                                                            <Badge className="bg-green-500 text-white">
                                                                                Completed
                                                                            </Badge>
                                                                        )}
                                                                        {course.certificate && (
                                                                            <Button
                                                                                variant="outline"
                                                                                size="sm"
                                                                                className="border-gray-600 text-gray-300"
                                                                            >
                                                                                <BookOpenIcon className="h-4 w-4" />
                                                                            </Button>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </div>

            {/* Modals */}
            <JobPostingModal
                isOpen={isJobPostingModalOpen}
                onClose={() => setIsJobPostingModalOpen(false)}
                onSubmit={handleJobPostingSubmit}
            />

            <JobDetailsModal
                isOpen={isJobDetailsModalOpen}
                onClose={() => setIsJobDetailsModalOpen(false)}
                job={selectedJob}
            />

            {/* Add Employee Modal */}
            {isAddEmployeeModalOpen && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-full max-w-md rounded-lg bg-gray-800 p-6"
                    >
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-white">Add Employee</h2>
                            <Button
                                variant="outline"
                                onClick={() => setIsAddEmployeeModalOpen(false)}
                                className="border-gray-600 text-gray-300"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                    Name
                                </label>
                                <Input
                                    placeholder="Employee name"
                                    className="border-gray-600 bg-gray-700 text-white"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                    Email
                                </label>
                                <Input
                                    placeholder="employee@company.com"
                                    className="border-gray-600 bg-gray-700 text-white"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                    Position
                                </label>
                                <Input
                                    placeholder="Software Engineer"
                                    className="border-gray-600 bg-gray-700 text-white"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                    Department
                                </label>
                                <select className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none">
                                    <option value="engineering">Engineering</option>
                                    <option value="marketing">Marketing</option>
                                    <option value="sales">Sales</option>
                                    <option value="hr">Human Resources</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-4 pt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsAddEmployeeModalOpen(false)}
                                    className="border-gray-600 text-gray-300"
                                >
                                    Cancel
                                </Button>
                                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                                    Add Employee
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Add Meeting Modal */}
            {isAddMeetingModalOpen && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-full max-w-md rounded-lg bg-gray-800 p-6"
                    >
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-white">Schedule Meeting</h2>
                            <Button
                                variant="outline"
                                onClick={() => setIsAddMeetingModalOpen(false)}
                                className="border-gray-600 text-gray-300"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                    Title
                                </label>
                                <Input
                                    placeholder="Meeting title"
                                    className="border-gray-600 bg-gray-700 text-white"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                    Type
                                </label>
                                <select className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none">
                                    <option value="interview">Interview</option>
                                    <option value="discussion">Discussion</option>
                                    <option value="presentation">Presentation</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-300">
                                        Date
                                    </label>
                                    <Input
                                        type="date"
                                        className="border-gray-600 bg-gray-700 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-300">
                                        Time
                                    </label>
                                    <Input
                                        type="time"
                                        className="border-gray-600 bg-gray-700 text-white"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                    Duration (minutes)
                                </label>
                                <Input
                                    type="number"
                                    placeholder="60"
                                    className="border-gray-600 bg-gray-700 text-white"
                                />
                            </div>
                            <div className="flex justify-end gap-4 pt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsAddMeetingModalOpen(false)}
                                    className="border-gray-600 text-gray-300"
                                >
                                    Cancel
                                </Button>
                                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                                    Schedule Meeting
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Add Contest Modal */}
            {isAddContestModalOpen && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-full max-w-md rounded-lg bg-gray-800 p-6"
                    >
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-white">Create Contest</h2>
                            <Button
                                variant="outline"
                                onClick={() => setIsAddContestModalOpen(false)}
                                className="border-gray-600 text-gray-300"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                    Title
                                </label>
                                <Input
                                    placeholder="Contest title"
                                    className="border-gray-600 bg-gray-700 text-white"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                    Type
                                </label>
                                <select className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none">
                                    <option value="coding">Coding</option>
                                    <option value="design">Design</option>
                                    <option value="hackathon">Hackathon</option>
                                </select>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                    Prize
                                </label>
                                <Input
                                    placeholder="$10,000"
                                    className="border-gray-600 bg-gray-700 text-white"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-300">
                                        Start Date
                                    </label>
                                    <Input
                                        type="date"
                                        className="border-gray-600 bg-gray-700 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-300">
                                        End Date
                                    </label>
                                    <Input
                                        type="date"
                                        className="border-gray-600 bg-gray-700 text-white"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 pt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsAddContestModalOpen(false)}
                                    className="border-gray-600 text-gray-300"
                                >
                                    Cancel
                                </Button>
                                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                                    Create Contest
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
}
