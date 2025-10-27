'use client';

import { useState } from 'react';
import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    AlertTriangle,
    Briefcase,
    Building2,
    Camera,
    ChevronDown,
    Edit2,
    Globe,
    GraduationCap,
    LinkedinIcon,
    Loader2,
    MessageCircleQuestion,
    MessageSquare,
    Pencil,
    Plus,
    Save,
    Search,
    Trash2,
    Upload,
    User,
    X,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function UserProfilePage() {
    const [profileData, setProfileData] = useState({
        name: 'Dfdfd',
        salary: '',
        location: '',
        skills: ['Basic Java Script', 'Basic java', 'Python'],
        lastActive: '1 minute ago',
        avatar: '',
    });
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const [showSalaryModal, setShowSalaryModal] = useState(false);
    const [showUserSettingsModal, setShowUserSettingsModal] = useState(false);
    const [activeSettingsTab, setActiveSettingsTab] = useState('user');
    const [isLoading, setIsLoading] = useState(false);
    const [salaryPeriod, setSalaryPeriod] = useState<'year' | 'month' | 'hour'>('year');
    const [salaryFrom, setSalaryFrom] = useState('');
    const [salaryTo, setSalaryTo] = useState('');
    const [hideSalary, setHideSalary] = useState(false);
    const [userSettings, setUserSettings] = useState({
        fullName: 'Dfdfd',
        location: 'Bangladesh',
        email: 'sohagbbv@gmail.com',
        password: '********',
    });

    const [privacySettings, setPrivacySettings] = useState({
        profilePrivate: false,
    });

    const [showSkillsModal, setShowSkillsModal] = useState(false);
    const [selectedSkills, setSelectedSkills] = useState<string[]>(profileData.skills);
    const [skillSearchQuery, setSkillSearchQuery] = useState('');
    const [availableSkills] = useState([
        'JavaScript',
        'Python',
        'Java',
        'React',
        'Node.js',
        'Vue.js',
        'Angular',
        'TypeScript',
        'HTML',
        'CSS',
        'SQL',
        'MongoDB',
        'Express',
        'Django',
        'Flask',
        'AWS',
        'Docker',
        'Git',
    ]);

    const completedItems = ['Set Job Preferences', 'Set Skills'];
    const incompleteItems = [
        'Upload Resume',
        'Set Location',
        'Upload Photo',
        'Set Language',
        'Preferred Salary',
    ];

    const handleSaveSalary = () => {
        const salaryText = salaryFrom
            ? `$${salaryFrom}${salaryTo ? ` - $${salaryTo}` : ''} ${salaryPeriod === 'year' ? 'per year' : salaryPeriod === 'month' ? 'per month' : 'per hour'}`
            : '';
        setProfileData({ ...profileData, salary: salaryText });
        setShowSalaryModal(false);
    };

    const handleSaveLocation = (location: string) => {
        setProfileData({ ...profileData, location });
    };

    const handleChangeField = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
    };

    const handleSaveSettings = async () => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        // Save location to profile
        handleSaveLocation(userSettings.location);
        setIsLoading(false);
        setShowUserSettingsModal(false);
    };

    const handleOpenSkillsModal = () => {
        setSelectedSkills(profileData.skills);
        setShowSkillsModal(true);
    };

    const handleSaveSkills = () => {
        setProfileData({ ...profileData, skills: selectedSkills });
        setShowSkillsModal(false);
    };

    const handleAddSkill = (skill: string) => {
        if (!selectedSkills.includes(skill)) {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    const handleRemoveSkill = (skill: string) => {
        setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    };

    const filteredSkills = availableSkills.filter(
        (skill) =>
            skill.toLowerCase().includes(skillSearchQuery.toLowerCase()) &&
            !selectedSkills.includes(skill),
    );

    // Work Experience Modal State
    const [showWorkExperienceModal, setShowWorkExperienceModal] = useState(false);
    const [workExperienceForm, setWorkExperienceForm] = useState({
        jobTitle: '',
        company: '',
        industry: '',
        skills: [] as string[],
        remoteWork: false,
        currentPosition: false,
        startYear: '',
        startMonth: '',
        endYear: '',
        endMonth: '',
        summary: '',
    });
    const [workExperienceErrors, setWorkExperienceErrors] = useState<{
        [key: string]: string;
    }>({});
    const [skillSearch, setSkillSearch] = useState('');
    const [showSkillDropdown, setShowSkillDropdown] = useState(false);
    const [showSkillInput, setShowSkillInput] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);
    const [isShaking, setIsShaking] = useState(false);
    const [workSkillsList] = useState([
        'Ajax.js',
        'Angular.js',
        'Apache JMeter',
        'Asesoría Jurídica',
        'Backbone.js',
        'Basic java',
        'JavaScript',
        'Python',
        'React',
        'Node.js',
        'Vue.js',
        'TypeScript',
        'HTML',
        'CSS',
        'SQL',
        'MongoDB',
        'Express',
        'Django',
        'Flask',
        'AWS',
        'Docker',
        'Git',
    ]);

    const handleOpenWorkExperienceModal = () => {
        setShowWorkExperienceModal(true);
        setWorkExperienceErrors({});
        setSkillSearch('');
        setShowSkillDropdown(false);
        setShowSkillInput(false);
        setShowEndDate(false);
        setIsShaking(false);
    };

    const handleShakeModal = () => {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
    };

    const handleWorkExperienceFieldChange = (field: string, value: string | boolean) => {
        setWorkExperienceForm({ ...workExperienceForm, [field]: value });
        // Clear error for this field when user starts typing
        if (workExperienceErrors[field]) {
            setWorkExperienceErrors({ ...workExperienceErrors, [field]: '' });
        }
    };

    const handleSaveWorkExperience = () => {
        const errors: { [key: string]: string } = {};

        if (!workExperienceForm.jobTitle.trim()) {
            errors.jobTitle = 'Job Title is a required field';
        }
        if (!workExperienceForm.company.trim()) {
            errors.company = 'Company is a required field';
        }
        if (!workExperienceForm.industry.trim()) {
            errors.industry = 'Industry is a required field';
        }

        if (Object.keys(errors).length > 0) {
            setWorkExperienceErrors(errors);
            return;
        }

        // Here you would save the work experience
        console.log('Saving work experience:', workExperienceForm);
        setShowWorkExperienceModal(false);
        // Reset form
        setWorkExperienceForm({
            jobTitle: '',
            company: '',
            industry: '',
            skills: [],
            remoteWork: false,
            currentPosition: false,
            startYear: '',
            startMonth: '',
            endYear: '',
            endMonth: '',
            summary: '',
        });
    };

    const handleAddWorkSkill = (skill: string) => {
        if (!workExperienceForm.skills.includes(skill)) {
            setWorkExperienceForm({
                ...workExperienceForm,
                skills: [...workExperienceForm.skills, skill],
            });
        }
        setSkillSearch('');
        setShowSkillDropdown(false);
        setShowSkillInput(false);
    };

    const handleRemoveWorkSkill = (skillToRemove: string) => {
        setWorkExperienceForm({
            ...workExperienceForm,
            skills: workExperienceForm.skills.filter((skill) => skill !== skillToRemove),
        });
    };

    const filteredWorkSkills = workSkillsList.filter(
        (skill) =>
            skill.toLowerCase().includes(skillSearch.toLowerCase()) &&
            !workExperienceForm.skills.includes(skill),
    );

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <div className="border-b bg-white px-6 py-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Home</span>
                    <span>/</span>
                    <span className="font-medium text-gray-900">Profiles</span>
                    <span>/</span>
                    <span>Design</span>
                    <span>/</span>
                    <span>UI/UX Design / Web Design</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto w-full px-6 py-8">
                {/* Profile Header */}
                <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                    <div className="mb-4 flex flex-col items-center justify-between md:flex-row md:items-start">
                        <div className="mb-4 flex w-full flex-col items-center gap-4 md:mb-0 md:w-auto md:flex-row md:items-start">
                            <div className="group relative">
                                <Avatar className="h-20 w-20 cursor-pointer rounded-full bg-gray-100 md:h-20 md:w-20">
                                    <AvatarImage src={profileData.avatar} alt={profileData.name} />
                                    <AvatarFallback className="bg-gray-200 text-xl">
                                        {profileData.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                {/* Camera overlay on hover */}
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
                                >
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800">
                                        <Camera className="h-5 w-5 text-white" />
                                    </div>
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/png,image/jpeg,image/jpg,image/webp"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setProfileData({
                                                    ...profileData,
                                                    avatar: reader.result as string,
                                                });
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                            </div>
                            <div className="w-full text-center md:w-auto md:pt-1 md:text-left">
                                <button
                                    onClick={() => setShowUserSettingsModal(true)}
                                    className="group mb-2 flex w-full items-center justify-center gap-2 transition-opacity hover:opacity-80 md:mb-3 md:w-auto md:justify-start"
                                >
                                    <Pencil className="h-4 w-4 text-gray-400 md:invisible md:group-hover:visible" />
                                    <h1 className="text-xl font-semibold text-green-600">
                                        {profileData.name}
                                    </h1>
                                </button>
                                <button
                                    onClick={() => setShowSalaryModal(true)}
                                    className="group mb-1 flex w-full items-center justify-center gap-2 text-sm text-gray-900 hover:text-green-600 md:w-auto md:justify-start"
                                >
                                    <Pencil className="h-3 w-3 text-gray-400 md:invisible md:group-hover:visible" />
                                    {profileData.salary || 'Add salary'}
                                </button>
                                <button
                                    onClick={() => setShowUserSettingsModal(true)}
                                    className="group mb-2 flex w-full items-center justify-center gap-2 text-sm text-gray-900 hover:text-green-600 md:w-auto md:justify-start"
                                >
                                    <Pencil className="h-3 w-3 text-gray-400 md:invisible md:group-hover:visible" />
                                    {profileData.location || 'Add location'}
                                </button>
                                <div className="text-center text-sm text-gray-900 md:text-left">
                                    {profileData.skills.join(', ')}
                                </div>
                            </div>
                        </div>
                        <div className="text-center text-xs text-gray-500 md:text-left md:text-sm">
                            Last active {profileData.lastActive}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 border-t pt-3 md:flex-row md:gap-3 md:pt-4">
                        <Button
                            variant="outline"
                            className="w-full border-gray-200 bg-gray-50 text-xs text-gray-500 hover:bg-gray-100 md:flex-1 md:text-sm"
                        >
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Message
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full border-gray-200 bg-white text-xs text-gray-900 hover:bg-gray-50 md:flex-1 md:text-sm"
                        >
                            <LinkedinIcon className="mr-2 h-4 w-4" />
                            Set LinkedIn
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full border-gray-200 bg-white text-xs text-gray-900 hover:bg-gray-50 md:flex-1 md:text-sm"
                        >
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Resume
                        </Button>
                    </div>
                </div>

                {/* Profile Completion Section */}
                <div className="mb-8">
                    <h2 className="mb-4 text-sm font-semibold text-gray-900 md:text-lg">
                        Finish your profile and make your job application stand out over other
                        candidates:
                    </h2>

                    {/* Progress Steps - Full Width Grid */}
                    <div className="mb-4 flex w-full flex-wrap gap-2 overflow-x-auto sm:grid-cols-2 lg:flex-nowrap">
                        {completedItems.map((item) => (
                            <div
                                key={item}
                                className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs whitespace-nowrap text-green-600 md:text-sm"
                            >
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-semibold">
                                    ✓
                                </span>
                                <span className="font-medium">{item}</span>
                            </div>
                        ))}
                        {incompleteItems.map((item) => (
                            <div
                                key={item}
                                className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs whitespace-nowrap text-gray-400 md:text-sm"
                            >
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-500">
                                    {item.charAt(0)}
                                </span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>

                    {/* Warning Message */}
                    <div className="flex flex-col gap-2 rounded-lg border border-yellow-200 bg-yellow-50 p-2 md:flex-row md:p-3">
                        <AlertTriangle className="h-3 w-3 shrink-0 text-yellow-600 md:h-4 md:w-4" />
                        <div className="text-xs">
                            <h3 className="mb-1 text-xs font-semibold text-gray-900">
                                Finish Your Profile
                            </h3>
                            <p className="text-xs leading-relaxed text-gray-700">
                                By completing your profile, our team will be able to send you
                                relevant jobs that match your experience. You&apos;ll also be able
                                to apply to jobs faster if you choose to fill out your profile
                                completely. After you apply to a job on Dynamite Jobs companies may
                                visit your profile to learn more about you. Having complete profile
                                will move your job application higher over other candidates. Be sure
                                to present yourself professionally.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Top Skills Section */}
                <div className="mb-8 border-b pb-8">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Top Skills</h3>
                    </div>
                    <div
                        onClick={handleOpenSkillsModal}
                        className="group relative mb-4 cursor-pointer rounded-lg border-2 border-solid border-gray-300 p-3 transition-all hover:border-dashed hover:border-gray-400"
                    >
                        <div className="flex items-end justify-end">
                            <Edit2 className="h-4 w-4 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                        <div className="mb-2 flex flex-wrap gap-2">
                            {profileData.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                        <p className="text-right text-sm text-gray-500">
                            Your skills are also added automatically from your work experience
                            below.
                        </p>
                    </div>
                </div>

                {/* Work Experience Section */}
                <div className="mb-4 border-b pb-4">
                    <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                            <Briefcase className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
                            <p className="text-sm text-gray-500">
                                Showcase your professional background
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleOpenWorkExperienceModal}
                        className="group flex w-full items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-4 text-left transition-all hover:border-blue-400 hover:bg-blue-50"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-transform group-hover:scale-110">
                            <Plus className="h-5 w-5 text-gray-500 group-hover:text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <span className="block font-medium text-gray-900">
                                Add work experience
                            </span>
                            <span className="text-sm text-gray-500">
                                Include your current and previous roles
                            </span>
                        </div>
                    </button>
                </div>

                {/* Education & Training Section */}
                <div className="mb-4 border-b pb-4">
                    <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                            <GraduationCap className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                Education & Training
                            </h3>
                            <p className="text-sm text-gray-500">Add your educational background</p>
                        </div>
                    </div>
                    <button className="group flex w-full items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-4 text-left transition-all hover:border-purple-400 hover:bg-purple-50">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-transform group-hover:scale-110">
                            <Plus className="h-5 w-5 text-gray-500 group-hover:text-purple-600" />
                        </div>
                        <div className="flex-1">
                            <span className="block font-medium text-gray-900">Add education</span>
                            <span className="text-sm text-gray-500">
                                Degrees, certifications, and courses
                            </span>
                        </div>
                    </button>
                </div>

                {/* Job Application Answers Section */}
                <div className="mb-4 border-b pb-4">
                    <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                            <MessageCircleQuestion className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                Job Application Answers
                            </h3>
                            <p className="text-sm text-gray-500">
                                Pre-fill answers to common questions
                            </p>
                        </div>
                    </div>
                    <button className="group flex w-full items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-4 text-left transition-all hover:border-green-400 hover:bg-green-50">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-transform group-hover:scale-110">
                            <Plus className="h-5 w-5 text-gray-500 group-hover:text-green-600" />
                        </div>
                        <div className="flex-1">
                            <span className="block font-medium text-gray-900">Add answer</span>
                            <span className="text-sm text-gray-500">
                                Save time on future applications
                            </span>
                        </div>
                    </button>
                </div>

                {/* Languages Section */}
                <div className="mb-4 border-b pb-4">
                    <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                            <Globe className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Languages</h3>
                            <p className="text-sm text-gray-500">
                                Languages you speak and proficiency level
                            </p>
                        </div>
                    </div>
                    <button className="group flex w-full items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-4 text-left transition-all hover:border-orange-400 hover:bg-orange-50">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-transform group-hover:scale-110">
                            <Plus className="h-5 w-5 text-gray-500 group-hover:text-orange-600" />
                        </div>
                        <div className="flex-1">
                            <span className="block font-medium text-gray-900">Add language</span>
                            <span className="text-sm text-gray-500">
                                Show your multilingual abilities
                            </span>
                        </div>
                    </button>
                </div>

                {/* Profile Links Section */}
                <div className="mb-4 border-b pb-4">
                    <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100">
                            <Globe className="h-5 w-5 text-pink-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Profile Links</h3>
                            <p className="text-sm text-gray-500">
                                Portfolio, blog, or other relevant links
                            </p>
                        </div>
                    </div>
                    <button className="group flex w-full items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-4 text-left transition-all hover:border-pink-400 hover:bg-pink-50">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-transform group-hover:scale-110">
                            <Plus className="h-5 w-5 text-gray-500 group-hover:text-pink-600" />
                        </div>
                        <div className="flex-1">
                            <span className="block font-medium text-gray-900">Add link</span>
                            <span className="text-sm text-gray-500">
                                Showcase your online presence
                            </span>
                        </div>
                    </button>
                </div>

                {/* Expected Salary Modal */}
                {showSalaryModal && (
                    <div
                        className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
                        onClick={() => setShowSalaryModal(false)}
                    >
                        <div className="flex h-full items-center justify-center">
                            <div className="animate-in fade-in-0 zoom-in-95 w-full max-w-2xl rounded-lg bg-white px-10 py-8 shadow-xl duration-200">
                                <div className="mb-6 flex items-center justify-between">
                                    <h2 className="text-2xl font-semibold text-gray-900">
                                        Expected Salary
                                    </h2>
                                    <button
                                        onClick={() => setShowSalaryModal(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                                <p className="mb-8 text-sm text-gray-600">
                                    Candidates who make their expected salary public are more likely
                                    to be contacted by employers. You can change these numbers or
                                    make them private at any time.
                                </p>

                                {/* Salary Period Selection */}
                                <div className="mb-8">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setSalaryPeriod('year')}
                                            className={`flex-1 rounded-lg border px-4 py-2 text-sm font-medium ${
                                                salaryPeriod === 'year'
                                                    ? 'border-orange-500 bg-orange-500 text-white'
                                                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            Per Year
                                        </button>
                                        <button
                                            onClick={() => setSalaryPeriod('month')}
                                            className={`flex-1 rounded-lg border px-4 py-2 text-sm font-medium ${
                                                salaryPeriod === 'month'
                                                    ? 'border-orange-500 bg-orange-500 text-white'
                                                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            Per Month
                                        </button>
                                        <button
                                            onClick={() => setSalaryPeriod('hour')}
                                            className={`flex-1 rounded-lg border px-4 py-2 text-sm font-medium ${
                                                salaryPeriod === 'hour'
                                                    ? 'border-orange-500 bg-orange-500 text-white'
                                                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            Per Hour
                                        </button>
                                    </div>
                                </div>

                                {/* Salary Input Fields */}
                                <div className="mb-8 grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="mb-2 text-sm text-gray-700">
                                            Yearly From
                                        </Label>
                                        <div className="relative">
                                            <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">
                                                $
                                            </span>
                                            <Input
                                                type="number"
                                                value={salaryFrom}
                                                onChange={(e) => setSalaryFrom(e.target.value)}
                                                className="rounded-lg border-gray-300 bg-gray-50 pr-12 pl-8"
                                                placeholder="0"
                                            />
                                            <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-1 text-sm text-gray-500">
                                                <span>USD</span>
                                                <ChevronDown className="h-4 w-4" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="mb-2 text-sm text-gray-700">
                                            To (optional)
                                        </Label>
                                        <div className="relative">
                                            <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">
                                                $
                                            </span>
                                            <Input
                                                type="number"
                                                value={salaryTo}
                                                onChange={(e) => setSalaryTo(e.target.value)}
                                                className="rounded-lg border-gray-300 bg-gray-50 pr-12 pl-8"
                                                placeholder="0"
                                            />
                                            <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-1 text-sm text-gray-500">
                                                <span>USD</span>
                                                <ChevronDown className="h-4 w-4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Hide Salary Toggle */}
                                <div className="mb-8 flex items-center justify-between">
                                    <Label className="text-sm text-gray-700">
                                        Hide salary from companies
                                    </Label>
                                    <Switch checked={hideSalary} onCheckedChange={setHideSalary} />
                                </div>

                                {/* Save Button */}
                                <Button
                                    onClick={handleSaveSalary}
                                    className="w-full bg-orange-500 text-white hover:bg-orange-600"
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* User Settings Modal */}
                <AnimatePresence>
                    {showUserSettingsModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                            onClick={() => setShowUserSettingsModal(false)}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 30,
                                }}
                                className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl md:w-full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {isLoading && (
                                    <div className="absolute inset-0 z-50 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm">
                                        <div className="flex flex-col items-center gap-3">
                                            <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
                                            <p className="font-medium text-gray-600">Updating...</p>
                                        </div>
                                    </div>
                                )}

                                {/* Header */}
                                <div className="border-b border-gray-200 px-4 py-3 md:px-6 md:py-4">
                                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                        <h1 className="text-lg font-bold text-gray-900 md:text-xl">
                                            User Settings
                                        </h1>
                                        <div className="flex gap-4 md:gap-6">
                                            <button
                                                onClick={() => setActiveSettingsTab('user')}
                                                className={`text-xs font-medium transition-colors md:text-sm ${
                                                    activeSettingsTab === 'user'
                                                        ? 'border-b-2 border-gray-900 text-gray-900'
                                                        : 'text-gray-400 hover:text-gray-600'
                                                }`}
                                            >
                                                User
                                            </button>
                                            <button
                                                onClick={() => setActiveSettingsTab('privacy')}
                                                className={`text-xs font-medium transition-colors md:text-sm ${
                                                    activeSettingsTab === 'privacy'
                                                        ? 'border-b-2 border-gray-900 text-gray-900'
                                                        : 'text-gray-400 hover:text-gray-600'
                                                }`}
                                            >
                                                Privacy
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6">
                                    {activeSettingsTab === 'user' ? (
                                        <div className="space-y-4 md:space-y-6">
                                            {/* Profile Photo Section */}
                                            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
                                                <div className="flex items-center gap-3 md:flex-shrink-0">
                                                    <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-300 md:h-20 md:w-20">
                                                        <div className="flex h-full w-full items-center justify-center bg-gray-300">
                                                            <span className="text-xl font-bold text-gray-600 md:text-2xl">
                                                                {userSettings.fullName.charAt(0)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <button className="rounded-lg border-2 border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 md:px-4 md:text-sm">
                                                        Change photo
                                                    </button>
                                                </div>
                                                <p className="text-xs leading-relaxed text-gray-600 md:flex-1">
                                                    Photo must be headshot of your face. Please
                                                    don&apos;t use avatars, logos or cartoons.
                                                    Supported formats are PNG, JPG, JPEG or WEBP up
                                                    to 10MB with at least 128x128px.
                                                </p>
                                            </div>

                                            {/* Full Name */}
                                            <div>
                                                <label className="mb-2 block text-xs font-medium text-gray-900 md:text-sm">
                                                    Full Name
                                                </label>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={userSettings.fullName}
                                                        onChange={(e) =>
                                                            setUserSettings({
                                                                ...userSettings,
                                                                fullName: e.target.value,
                                                            })
                                                        }
                                                        className="w-full rounded-lg border-2 border-gray-300 px-2 py-2 text-xs transition-colors focus:border-orange-500 focus:outline-none md:w-[85%] md:px-3 md:text-sm"
                                                    />
                                                    <button className="rounded-lg border-2 border-gray-300 p-2 transition-colors hover:bg-gray-50">
                                                        <Edit2 className="h-3 w-3 text-gray-600 md:h-4 md:w-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Location */}
                                            <div>
                                                <label className="mb-2 block text-xs font-medium text-gray-900 md:text-sm">
                                                    Location
                                                </label>
                                                <select
                                                    value={userSettings.location}
                                                    onChange={(e) =>
                                                        setUserSettings({
                                                            ...userSettings,
                                                            location: e.target.value,
                                                        })
                                                    }
                                                    className="w-full appearance-none rounded-lg border-2 border-gray-300 bg-white px-2 py-2 text-xs transition-colors focus:border-orange-500 focus:outline-none md:w-[85%] md:px-3 md:text-sm"
                                                    style={{
                                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                                                        backgroundRepeat: 'no-repeat',
                                                        backgroundPosition: 'right 0.5rem center',
                                                        paddingRight: '2rem',
                                                    }}
                                                >
                                                    <option>Bangladesh</option>
                                                    <option>United States</option>
                                                    <option>United Kingdom</option>
                                                    <option>Canada</option>
                                                </select>
                                            </div>

                                            {/* Email Address */}
                                            <div>
                                                <label className="mb-2 block text-xs font-medium text-gray-900 md:text-sm">
                                                    Email address
                                                </label>
                                                <div className="flex flex-col gap-2 sm:flex-row">
                                                    <input
                                                        type="email"
                                                        value={userSettings.email}
                                                        onChange={(e) =>
                                                            setUserSettings({
                                                                ...userSettings,
                                                                email: e.target.value,
                                                            })
                                                        }
                                                        className="w-full rounded-lg border-2 border-gray-300 px-2 py-2 text-xs transition-colors focus:border-orange-500 focus:outline-none sm:w-[65%] md:px-3 md:text-sm"
                                                    />
                                                    <button
                                                        onClick={handleChangeField}
                                                        className="w-full rounded-lg bg-orange-500 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-orange-600 sm:w-auto md:px-5 md:text-sm"
                                                    >
                                                        Change
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Password */}
                                            <div>
                                                <label className="mb-2 block text-xs font-medium text-gray-900 md:text-sm">
                                                    Password
                                                </label>
                                                <div className="flex flex-col gap-2 sm:flex-row">
                                                    <input
                                                        type="password"
                                                        value={userSettings.password}
                                                        onChange={(e) =>
                                                            setUserSettings({
                                                                ...userSettings,
                                                                password: e.target.value,
                                                            })
                                                        }
                                                        className="w-full rounded-lg border-2 border-gray-300 px-2 py-2 text-xs transition-colors focus:border-orange-500 focus:outline-none sm:w-[65%] md:px-3 md:text-sm"
                                                    />
                                                    <button
                                                        onClick={handleChangeField}
                                                        className="w-full rounded-lg bg-orange-500 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-orange-600 sm:w-auto md:px-5 md:text-sm"
                                                    >
                                                        Change
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-4 md:space-y-6">
                                            {/* Profile Visibility */}
                                            <div>
                                                <h3 className="mb-3 text-xs font-medium text-gray-900 md:mb-4 md:text-sm">
                                                    Profile Visibility
                                                </h3>
                                                <div className="flex items-center justify-between">
                                                    <label
                                                        htmlFor="profilePrivate"
                                                        className="text-xs text-gray-700 md:text-sm"
                                                    >
                                                        Keep my profile private
                                                    </label>
                                                    <Switch
                                                        id="profilePrivate"
                                                        checked={privacySettings.profilePrivate}
                                                        onCheckedChange={(checked) =>
                                                            setPrivacySettings({
                                                                ...privacySettings,
                                                                profilePrivate: checked,
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            {/* Danger Zone */}
                                            <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 md:p-6">
                                                <div className="mb-3 flex items-center gap-2">
                                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 md:h-8 md:w-8">
                                                        <AlertTriangle className="h-4 w-4 text-orange-600 md:h-5 md:w-5" />
                                                    </div>
                                                    <h3 className="text-sm font-semibold text-gray-900 md:text-base">
                                                        Danger Zone
                                                    </h3>
                                                </div>
                                                <p className="mb-3 text-xs leading-relaxed text-gray-700 md:mb-4 md:text-sm">
                                                    If you no longer wish to use Dynamite Jobs
                                                    platform, you can delete your profile. With the
                                                    deletion of your account, you will lose your
                                                    progress on your profile and any messages you
                                                    might have received from hiring managers. In
                                                    addition, we will remove you from our emails,
                                                    and we will no longer notify you about the
                                                    latest remote jobs available. But we strongly
                                                    recommend just setting your profile to private
                                                    using the option above. In that case, you can
                                                    always return to your profile when you need it.
                                                </p>
                                                <button
                                                    onClick={() => {
                                                        // Handle delete account
                                                        console.log('Delete account clicked');
                                                    }}
                                                    className="flex items-center gap-2 text-xs font-medium text-orange-700 hover:text-orange-800 md:text-sm"
                                                >
                                                    <Trash2 className="h-3 w-3 md:h-4 md:w-4" />I
                                                    want to delete my account
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-3 md:px-6 md:py-4">
                                    <button
                                        onClick={() => setShowUserSettingsModal(false)}
                                        className="rounded-lg border-2 border-gray-300 px-4 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100 md:px-5 md:text-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveSettings}
                                        className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-orange-600 md:px-5 md:text-sm"
                                    >
                                        <span>💾</span> Save
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Skills Modal */}
                {showSkillsModal && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                        onClick={() => setShowSkillsModal(false)}
                    >
                        <div
                            className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="mb-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-bold text-gray-900">
                                        Preferred skills
                                    </span>
                                </div>
                                <button
                                    onClick={() => setShowSkillsModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Description */}
                            <p className="mb-4 text-sm text-gray-600">
                                Select at least 3 skills you have that will help us match you to
                                employers. You can also specify your skills next to each work
                                experience in your profile. Those skills are not editable from here
                                but from your profile.
                            </p>

                            {/* Selected Skills */}
                            {selectedSkills.length > 0 && (
                                <div className="mb-4">
                                    <p className="mb-2 text-sm font-medium text-gray-700">
                                        Selected skills ({selectedSkills.length})
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedSkills.map((skill) => (
                                            <div
                                                key={skill}
                                                className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1.5 text-sm text-blue-700"
                                            >
                                                <span>{skill}</span>
                                                <button
                                                    onClick={() => handleRemoveSkill(skill)}
                                                    className="ml-1 hover:opacity-70"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Search Input */}
                            <div className="mb-4">
                                <div className="relative">
                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        type="text"
                                        placeholder="Type to search for a skill"
                                        value={skillSearchQuery}
                                        onChange={(e) => setSkillSearchQuery(e.target.value)}
                                        className="rounded-lg border-2 border-green-200 bg-gray-50 pr-4 pl-10"
                                    />
                                </div>
                            </div>

                            {/* Available Skills */}
                            {filteredSkills.length > 0 && (
                                <div className="mb-6 max-h-60 overflow-y-auto">
                                    <div className="flex flex-wrap gap-2">
                                        {filteredSkills.map((skill) => (
                                            <button
                                                key={skill}
                                                onClick={() => handleAddSkill(skill)}
                                                className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 transition-colors hover:border-blue-400 hover:bg-blue-50"
                                            >
                                                {skill}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {filteredSkills.length === 0 && skillSearchQuery && (
                                <div className="mb-6 text-center text-sm text-gray-500">
                                    No skills found
                                </div>
                            )}

                            {/* Save Button */}
                            <div className="flex justify-end">
                                <Button
                                    onClick={handleSaveSkills}
                                    disabled={selectedSkills.length < 3}
                                    className="rounded-lg bg-orange-500 px-6 text-white hover:bg-orange-600 disabled:opacity-50"
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Work Experience Modal */}
                {showWorkExperienceModal && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                        onClick={handleShakeModal}
                    >
                        <div
                            className="relative flex h-[90vh] max-h-[700px] w-full max-w-3xl flex-col overflow-hidden rounded-lg bg-white shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="shrink-0 border-b border-gray-200 bg-white px-6 py-4">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Work Experience
                                </h2>
                            </div>

                            {/* Scrollable Content */}
                            <motion.div
                                className="flex-1 overflow-y-auto px-6 py-6"
                                animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : { x: 0 }}
                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                            >
                                {/* Job Title */}
                                <div className="mb-4">
                                    <Label className="mb-2 text-sm font-medium text-gray-700">
                                        Job Title
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-orange-500" />
                                        <Input
                                            type="text"
                                            placeholder="Job Title"
                                            value={workExperienceForm.jobTitle}
                                            onChange={(e) =>
                                                handleWorkExperienceFieldChange(
                                                    'jobTitle',
                                                    e.target.value,
                                                )
                                            }
                                            className="rounded-lg border-2 border-gray-300 bg-gray-50 pr-10 pl-10"
                                        />
                                        {workExperienceErrors.jobTitle && (
                                            <AlertTriangle className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-orange-500" />
                                        )}
                                    </div>
                                    {workExperienceErrors.jobTitle && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {workExperienceErrors.jobTitle}
                                        </p>
                                    )}
                                </div>

                                {/* Company */}
                                <div className="mb-4">
                                    <Label className="mb-2 text-sm font-medium text-gray-700">
                                        Company
                                    </Label>
                                    <div className="relative">
                                        <Building2 className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-orange-500" />
                                        <Input
                                            type="text"
                                            placeholder="Company"
                                            value={workExperienceForm.company}
                                            onChange={(e) =>
                                                handleWorkExperienceFieldChange(
                                                    'company',
                                                    e.target.value,
                                                )
                                            }
                                            className="rounded-lg border-2 border-gray-300 bg-gray-50 pr-10 pl-10"
                                        />
                                        {workExperienceErrors.company && (
                                            <AlertTriangle className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-orange-500" />
                                        )}
                                    </div>
                                    {workExperienceErrors.company && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {workExperienceErrors.company}
                                        </p>
                                    )}
                                </div>

                                {/* Industry */}
                                <div className="mb-4">
                                    <Label className="mb-2 text-sm font-medium text-gray-700">
                                        Industry
                                    </Label>
                                    <div className="relative">
                                        <Briefcase className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-orange-500" />
                                        <Input
                                            type="text"
                                            placeholder="Industry"
                                            value={workExperienceForm.industry}
                                            onChange={(e) =>
                                                handleWorkExperienceFieldChange(
                                                    'industry',
                                                    e.target.value,
                                                )
                                            }
                                            className="rounded-lg border-2 border-gray-300 bg-gray-50 pr-10 pl-10"
                                        />
                                        {workExperienceErrors.industry && (
                                            <AlertTriangle className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-orange-500" />
                                        )}
                                    </div>
                                    {workExperienceErrors.industry && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {workExperienceErrors.industry}
                                        </p>
                                    )}
                                </div>

                                {/* Skills */}
                                <div className="mb-4">
                                    <Label className="mb-2 text-sm font-medium text-gray-700">
                                        Skills
                                    </Label>

                                    {/* Selected Skills */}
                                    {workExperienceForm.skills.length > 0 && (
                                        <div className="mb-2 flex flex-wrap gap-2">
                                            {workExperienceForm.skills.map((skill) => (
                                                <div
                                                    key={skill}
                                                    className="flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
                                                >
                                                    <span>{skill}</span>
                                                    <button
                                                        onClick={() => handleRemoveWorkSkill(skill)}
                                                        className="text-orange-500 hover:text-orange-600"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Conditional: Button or Input */}
                                    <AnimatePresence mode="wait">
                                        {!showSkillInput ? (
                                            <motion.div
                                                key="button"
                                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                                transition={{ duration: 0.2, ease: 'easeInOut' }}
                                            >
                                                <Button
                                                    onClick={() => setShowSkillInput(true)}
                                                    className="w-full justify-start bg-orange-500 text-white hover:bg-orange-600"
                                                >
                                                    <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-white">
                                                        <Plus className="h-4 w-4 text-orange-500" />
                                                    </div>
                                                    Add skill, software, or tool
                                                </Button>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="input"
                                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                                transition={{ duration: 0.2, ease: 'easeInOut' }}
                                                className="relative"
                                            >
                                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                                <Input
                                                    type="text"
                                                    placeholder="Type to search for a skill"
                                                    value={skillSearch}
                                                    onChange={(e) => {
                                                        setSkillSearch(e.target.value);
                                                        setShowSkillDropdown(true);
                                                    }}
                                                    onFocus={() => setShowSkillDropdown(true)}
                                                    onBlur={() => {
                                                        setTimeout(() => {
                                                            setShowSkillDropdown(false);
                                                            setShowSkillInput(false);
                                                            setSkillSearch('');
                                                        }, 200);
                                                    }}
                                                    autoFocus
                                                    className="rounded-lg border-2 border-green-200 bg-gray-50 pr-4 pl-10"
                                                />

                                                {/* Dropdown Suggestions */}
                                                {showSkillDropdown &&
                                                    skillSearch &&
                                                    filteredWorkSkills.length > 0 && (
                                                        <div className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                                                            {filteredWorkSkills.map((skill) => (
                                                                <button
                                                                    key={skill}
                                                                    onClick={() =>
                                                                        handleAddWorkSkill(skill)
                                                                    }
                                                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                                                                >
                                                                    {skill}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Toggle Switches */}
                                <div className="mb-4 flex flex-col gap-3">
                                    <div className="flex items-center gap-3">
                                        <Switch
                                            id="remoteWork"
                                            checked={workExperienceForm.remoteWork}
                                            onCheckedChange={(checked) =>
                                                handleWorkExperienceFieldChange(
                                                    'remoteWork',
                                                    checked,
                                                )
                                            }
                                        />
                                        <Label
                                            htmlFor="remoteWork"
                                            className="text-sm text-gray-700"
                                        >
                                            This was a remote work position
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Switch
                                            id="currentPosition"
                                            checked={workExperienceForm.currentPosition}
                                            onCheckedChange={(checked) =>
                                                handleWorkExperienceFieldChange(
                                                    'currentPosition',
                                                    checked,
                                                )
                                            }
                                        />
                                        <Label
                                            htmlFor="currentPosition"
                                            className="text-sm text-gray-700"
                                        >
                                            This is my current position
                                        </Label>
                                    </div>
                                </div>

                                {/* Date Range */}
                                <div className="mb-4">
                                    <div className="mb-3 flex flex-col gap-3 md:flex-row md:gap-6">
                                        <div className="flex-1">
                                            <Label className="mb-1 text-sm font-medium text-gray-700 md:mb-2">
                                                From
                                            </Label>
                                            <div className="flex gap-2">
                                                <select
                                                    value={workExperienceForm.startYear}
                                                    onChange={(e) =>
                                                        handleWorkExperienceFieldChange(
                                                            'startYear',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-3 py-2 pr-8 text-sm"
                                                    style={{
                                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http:// Konum/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                                                        backgroundRepeat: 'no-repeat',
                                                        backgroundPosition: 'right 0.5rem center',
                                                    }}
                                                >
                                                    <option value="">Year</option>
                                                    {Array.from({ length: 30 }, (_, i) => (
                                                        <option key={2025 - i} value={2025 - i}>
                                                            {2025 - i}
                                                        </option>
                                                    ))}
                                                </select>
                                                <select
                                                    value={workExperienceForm.startMonth}
                                                    onChange={(e) =>
                                                        handleWorkExperienceFieldChange(
                                                            'startMonth',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="flex-1 rounded-lg border-2 border-green-200 bg-white px-3 py-2 pr-8 text-sm"
                                                    style={{
                                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                                                        backgroundRepeat: 'no-repeat',
                                                        backgroundPosition: 'right 0.5rem center',
                                                    }}
                                                >
                                                    <option value="">---</option>
                                                    <option value="01">January</option>
                                                    <option value="02">February</option>
                                                    <option value="03">March</option>
                                                    <option value="04">April</option>
                                                    <option value="05">May</option>
                                                    <option value="06">June</option>
                                                    <option value="07">July</option>
                                                    <option value="08">August</option>
                                                    <option value="09">September</option>
                                                    <option value="10">October</option>
                                                    <option value="11">November</option>
                                                    <option value="12">December</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <Label className="mb-1 text-sm font-medium text-gray-700 md:mb-2">
                                                To
                                            </Label>
                                            {!showEndDate ? (
                                                <button
                                                    onClick={() => setShowEndDate(true)}
                                                    className="flex w-full items-center justify-start gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                    Add end
                                                </button>
                                            ) : (
                                                <div className="flex gap-2">
                                                    <select
                                                        value={workExperienceForm.endYear}
                                                        onChange={(e) =>
                                                            handleWorkExperienceFieldChange(
                                                                'endYear',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-3 py-2 pr-8 text-sm"
                                                        style={{
                                                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                                                            backgroundRepeat: 'no-repeat',
                                                            backgroundPosition:
                                                                'right 0.5rem center',
                                                        }}
                                                    >
                                                        <option value="">Year</option>
                                                        {Array.from({ length: 30 }, (_, i) => (
                                                            <option key={2025 - i} value={2025 - i}>
                                                                {2025 - i}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <select
                                                        value={workExperienceForm.endMonth}
                                                        onChange={(e) =>
                                                            handleWorkExperienceFieldChange(
                                                                'endMonth',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="flex-1 rounded-lg border-2 border-green-200 bg-white px-3 py-2 pr-8 text-sm"
                                                        style={{
                                                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' itsBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                                                            backgroundRepeat: 'no-repeat',
                                                            backgroundPosition:
                                                                'right 0.5rem center',
                                                        }}
                                                    >
                                                        <option value="">---</option>
                                                        <option value="01">January</option>
                                                        <option value="02">February</option>
                                                        <option value="03">March</option>
                                                        <option value="04">April</option>
                                                        <option value="05">May</option>
                                                        <option value="06">June</option>
                                                        <option value="07">July</option>
                                                        <option value="08">August</option>
                                                        <option value="09">September</option>
                                                        <option value="10">October</option>
                                                        <option value="11">November</option>
                                                        <option value="12">December</option>
                                                    </select>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Work Experience Summary */}
                                <div className="mb-6">
                                    <Label className="mb-2 text-sm font-medium text-gray-700">
                                        Work Experience Summary
                                    </Label>
                                    <textarea
                                        placeholder="Write a few sentences about your work experience"
                                        value={workExperienceForm.summary}
                                        onChange={(e) =>
                                            handleWorkExperienceFieldChange(
                                                'summary',
                                                e.target.value,
                                            )
                                        }
                                        className="h-32 w-full rounded-lg border-2 border-gray-300 bg-gray-50 px-3 py-2 text-sm"
                                        rows={4}
                                    />
                                </div>
                            </motion.div>

                            {/* Footer */}
                            <div className="flex shrink-0 items-center justify-between border-t border-gray-200 bg-white px-6 py-4">
                                <div className="flex flex-col gap-1">
                                    <Button
                                        variant="ghost"
                                        onClick={() => setShowWorkExperienceModal(false)}
                                        className="text-gray-600"
                                    >
                                        Cancel
                                    </Button>
                                    {workExperienceErrors.company && (
                                        <p className="text-xs text-red-500">
                                            {workExperienceErrors.company}
                                        </p>
                                    )}
                                </div>
                                <Button
                                    onClick={handleSaveWorkExperience}
                                    className="flex items-center gap-2 bg-orange-500 text-white hover:bg-orange-600"
                                >
                                    <Save className="h-4 w-4" />
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
