'use client';

import { useState } from 'react';
import {
    AcademicCapIcon,
    BriefcaseIcon,
    CheckIcon,
    CogIcon,
    DocumentArrowDownIcon,
    DocumentTextIcon,
    EyeIcon,
    PlusIcon,
    StarIcon,
    TrashIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface ResumeSection {
    id: string;
    type:
        | 'personal'
        | 'summary'
        | 'experience'
        | 'education'
        | 'skills'
        | 'projects'
        | 'certifications';
    title: string;
    content: any;
    isExpanded: boolean;
}

interface PersonalInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    portfolio: string;
}

interface Experience {
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
    description: string[];
}

interface Education {
    id: string;
    institution: string;
    degree: string;
    field: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa: string;
    achievements: string[];
}

interface Skill {
    id: string;
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    category: string;
}

interface Project {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link: string;
    github: string;
}

interface Certification {
    id: string;
    name: string;
    issuer: string;
    date: string;
    expiryDate?: string;
    credentialId: string;
}

export default function ResumeBuilderPage() {
    const [activeSection, setActiveSection] = useState<string>('personal');
    const [resumeSections, setResumeSections] = useState<ResumeSection[]>([
        {
            id: 'personal',
            type: 'personal',
            title: 'Personal Information',
            content: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                portfolio: '',
            },
            isExpanded: true,
        },
        {
            id: 'summary',
            type: 'summary',
            title: 'Professional Summary',
            content: '',
            isExpanded: false,
        },
        {
            id: 'experience',
            type: 'experience',
            title: 'Work Experience',
            content: [],
            isExpanded: false,
        },
        {
            id: 'education',
            type: 'education',
            title: 'Education',
            content: [],
            isExpanded: false,
        },
        {
            id: 'skills',
            type: 'skills',
            title: 'Skills',
            content: [],
            isExpanded: false,
        },
        {
            id: 'projects',
            type: 'projects',
            title: 'Projects',
            content: [],
            isExpanded: false,
        },
        {
            id: 'certifications',
            type: 'certifications',
            title: 'Certifications',
            content: [],
            isExpanded: false,
        },
    ]);

    const [showPreview, setShowPreview] = useState(false);

    const updateSectionContent = (sectionId: string, content: any) => {
        setResumeSections((prev) =>
            prev.map((section) => (section.id === sectionId ? { ...section, content } : section)),
        );
    };

    const toggleSection = (sectionId: string) => {
        setResumeSections((prev) =>
            prev.map((section) =>
                section.id === sectionId
                    ? { ...section, isExpanded: !section.isExpanded }
                    : section,
            ),
        );
    };

    const addExperience = () => {
        const newExperience: Experience = {
            id: Date.now().toString(),
            company: '',
            position: '',
            location: '',
            startDate: '',
            endDate: '',
            isCurrent: false,
            description: [''],
        };

        const experienceSection = resumeSections.find((s) => s.type === 'experience');
        if (experienceSection) {
            const updatedContent = [...experienceSection.content, newExperience];
            updateSectionContent('experience', updatedContent);
        }
    };

    const updateExperience = (id: string, field: keyof Experience, value: any) => {
        const experienceSection = resumeSections.find((s) => s.type === 'experience');
        if (experienceSection) {
            const updatedContent = experienceSection.content.map((exp: Experience) =>
                exp.id === id ? { ...exp, [field]: value } : exp,
            );
            updateSectionContent('experience', updatedContent);
        }
    };

    const removeExperience = (id: string) => {
        const experienceSection = resumeSections.find((s) => s.type === 'experience');
        if (experienceSection) {
            const updatedContent = experienceSection.content.filter(
                (exp: Experience) => exp.id !== id,
            );
            updateSectionContent('experience', updatedContent);
        }
    };

    const addEducation = () => {
        const newEducation: Education = {
            id: Date.now().toString(),
            institution: '',
            degree: '',
            field: '',
            location: '',
            startDate: '',
            endDate: '',
            gpa: '',
            achievements: [''],
        };

        const educationSection = resumeSections.find((s) => s.type === 'education');
        if (educationSection) {
            const updatedContent = [...educationSection.content, newEducation];
            updateSectionContent('education', updatedContent);
        }
    };

    const updateEducation = (id: string, field: keyof Education, value: any) => {
        const educationSection = resumeSections.find((s) => s.type === 'education');
        if (educationSection) {
            const updatedContent = educationSection.content.map((edu: Education) =>
                edu.id === id ? { ...edu, [field]: value } : edu,
            );
            updateSectionContent('education', updatedContent);
        }
    };

    const removeEducation = (id: string) => {
        const educationSection = resumeSections.find((s) => s.type === 'education');
        if (educationSection) {
            const updatedContent = educationSection.content.filter(
                (edu: Education) => edu.id !== id,
            );
            updateSectionContent('education', updatedContent);
        }
    };

    const addSkill = () => {
        const newSkill: Skill = {
            id: Date.now().toString(),
            name: '',
            level: 'intermediate',
            category: 'Technical',
        };

        const skillsSection = resumeSections.find((s) => s.type === 'skills');
        if (skillsSection) {
            const updatedContent = [...skillsSection.content, newSkill];
            updateSectionContent('skills', updatedContent);
        }
    };

    const updateSkill = (id: string, field: keyof Skill, value: any) => {
        const skillsSection = resumeSections.find((s) => s.type === 'skills');
        if (skillsSection) {
            const updatedContent = skillsSection.content.map((skill: Skill) =>
                skill.id === id ? { ...skill, [field]: value } : skill,
            );
            updateSectionContent('skills', updatedContent);
        }
    };

    const removeSkill = (id: string) => {
        const skillsSection = resumeSections.find((s) => s.type === 'skills');
        if (skillsSection) {
            const updatedContent = skillsSection.content.filter((skill: Skill) => skill.id !== id);
            updateSectionContent('skills', updatedContent);
        }
    };

    const getSkillLevelColor = (level: string) => {
        switch (level) {
            case 'beginner':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'intermediate':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'advanced':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'expert':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const renderPersonalSection = () => {
        const section = resumeSections.find((s) => s.type === 'personal');
        if (!section) return null;

        return (
            <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            First Name *
                        </label>
                        <input
                            type="text"
                            value={section.content.firstName}
                            onChange={(e) =>
                                updateSectionContent('personal', {
                                    ...section.content,
                                    firstName: e.target.value,
                                })
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            placeholder="John"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Last Name *
                        </label>
                        <input
                            type="text"
                            value={section.content.lastName}
                            onChange={(e) =>
                                updateSectionContent('personal', {
                                    ...section.content,
                                    lastName: e.target.value,
                                })
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            placeholder="Doe"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Email *
                        </label>
                        <input
                            type="email"
                            value={section.content.email}
                            onChange={(e) =>
                                updateSectionContent('personal', {
                                    ...section.content,
                                    email: e.target.value,
                                })
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            placeholder="john.doe@email.com"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Phone
                        </label>
                        <input
                            type="tel"
                            value={section.content.phone}
                            onChange={(e) =>
                                updateSectionContent('personal', {
                                    ...section.content,
                                    phone: e.target.value,
                                })
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            placeholder="+1 (555) 123-4567"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Location</label>
                    <input
                        type="text"
                        value={section.content.location}
                        onChange={(e) =>
                            updateSectionContent('personal', {
                                ...section.content,
                                location: e.target.value,
                            })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        placeholder="San Francisco, CA"
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            LinkedIn
                        </label>
                        <input
                            type="url"
                            value={section.content.linkedin}
                            onChange={(e) =>
                                updateSectionContent('personal', {
                                    ...section.content,
                                    linkedin: e.target.value,
                                })
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            placeholder="linkedin.com/in/johndoe"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            GitHub
                        </label>
                        <input
                            type="url"
                            value={section.content.github}
                            onChange={(e) =>
                                updateSectionContent('personal', {
                                    ...section.content,
                                    github: e.target.value,
                                })
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            placeholder="github.com/johndoe"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Portfolio
                        </label>
                        <input
                            type="url"
                            value={section.content.portfolio}
                            onChange={(e) =>
                                updateSectionContent('personal', {
                                    ...section.content,
                                    portfolio: e.target.value,
                                })
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            placeholder="johndoe.dev"
                        />
                    </div>
                </div>
            </div>
        );
    };

    const renderSummarySection = () => {
        const section = resumeSections.find((s) => s.type === 'summary');
        if (!section) return null;

        return (
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Professional Summary
                </label>
                <textarea
                    value={section.content}
                    onChange={(e) => updateSectionContent('summary', e.target.value)}
                    rows={6}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="Write a compelling summary of your professional background, key skills, and career objectives..."
                />
                <p className="mt-1 text-sm text-gray-500">
                    Keep it concise (2-4 sentences) and highlight your unique value proposition.
                </p>
            </div>
        );
    };

    const renderExperienceSection = () => {
        const section = resumeSections.find((s) => s.type === 'experience');
        if (!section) return null;

        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Work Experience</h3>
                    <button
                        onClick={addExperience}
                        className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700"
                    >
                        <PlusIcon className="h-4 w-4" />
                        <span>Add Experience</span>
                    </button>
                </div>

                {section.content.length === 0 ? (
                    <div className="py-8 text-center text-gray-500">
                        <BriefcaseIcon className="mx-auto mb-4 h-12 w-12" />
                        <p>No work experience added yet.</p>
                        <p className="text-sm">Click "Add Experience" to get started.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {section.content.map((exp: Experience) => (
                            <div key={exp.id} className="rounded-lg border border-gray-200 p-4">
                                <div className="mb-4 flex items-center justify-between">
                                    <h4 className="text-md font-medium text-gray-900">
                                        Experience #{section.content.indexOf(exp) + 1}
                                    </h4>
                                    <button
                                        onClick={() => removeExperience(exp.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Company *
                                        </label>
                                        <input
                                            type="text"
                                            value={exp.company}
                                            onChange={(e) =>
                                                updateExperience(exp.id, 'company', e.target.value)
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="Company Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Position *
                                        </label>
                                        <input
                                            type="text"
                                            value={exp.position}
                                            onChange={(e) =>
                                                updateExperience(exp.id, 'position', e.target.value)
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="Job Title"
                                        />
                                    </div>
                                </div>

                                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            value={exp.location}
                                            onChange={(e) =>
                                                updateExperience(exp.id, 'location', e.target.value)
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="City, State"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Start Date
                                        </label>
                                        <input
                                            type="month"
                                            value={exp.startDate}
                                            onChange={(e) =>
                                                updateExperience(
                                                    exp.id,
                                                    'startDate',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            End Date
                                        </label>
                                        <input
                                            type="month"
                                            value={exp.endDate}
                                            onChange={(e) =>
                                                updateExperience(exp.id, 'endDate', e.target.value)
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            disabled={exp.isCurrent}
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={exp.isCurrent}
                                            onChange={(e) =>
                                                updateExperience(
                                                    exp.id,
                                                    'isCurrent',
                                                    e.target.checked,
                                                )
                                            }
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700">
                                            I currently work here
                                        </span>
                                    </label>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        value={exp.description.join('\n')}
                                        onChange={(e) =>
                                            updateExperience(
                                                exp.id,
                                                'description',
                                                e.target.value.split('\n'),
                                            )
                                        }
                                        rows={4}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        placeholder="Describe your responsibilities and achievements..."
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        Use bullet points or separate lines for different
                                        responsibilities.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const renderSkillsSection = () => {
        const section = resumeSections.find((s) => s.type === 'skills');
        if (!section) return null;

        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Skills</h3>
                    <button
                        onClick={addSkill}
                        className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700"
                    >
                        <PlusIcon className="h-4 w-4" />
                        <span>Add Skill</span>
                    </button>
                </div>

                {section.content.length === 0 ? (
                    <div className="py-8 text-center text-gray-500">
                        <StarIcon className="mx-auto mb-4 h-12 w-12" />
                        <p>No skills added yet.</p>
                        <p className="text-sm">Click "Add Skill" to get started.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {section.content.map((skill: Skill) => (
                            <div key={skill.id} className="rounded-lg border border-gray-200 p-4">
                                <div className="mb-3 flex items-center justify-between">
                                    <h4 className="text-md font-medium text-gray-900">
                                        Skill #{section.content.indexOf(skill) + 1}
                                    </h4>
                                    <button
                                        onClick={() => removeSkill(skill.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Skill Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={skill.name}
                                            onChange={(e) =>
                                                updateSkill(skill.id, 'name', e.target.value)
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="e.g., React, Python, Project Management"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Category
                                        </label>
                                        <select
                                            value={skill.category}
                                            onChange={(e) =>
                                                updateSkill(skill.id, 'category', e.target.value)
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="Technical">Technical</option>
                                            <option value="Soft Skills">Soft Skills</option>
                                            <option value="Tools">Tools</option>
                                            <option value="Languages">Languages</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Proficiency Level
                                        </label>
                                        <select
                                            value={skill.level}
                                            onChange={(e) =>
                                                updateSkill(skill.id, 'level', e.target.value)
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="beginner">Beginner</option>
                                            <option value="intermediate">Intermediate</option>
                                            <option value="advanced">Advanced</option>
                                            <option value="expert">Expert</option>
                                        </select>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <span
                                            className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${getSkillLevelColor(skill.level)}`}
                                        >
                                            {skill.level.charAt(0).toUpperCase() +
                                                skill.level.slice(1)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const renderSection = (section: ResumeSection) => {
        switch (section.type) {
            case 'personal':
                return renderPersonalSection();
            case 'summary':
                return renderSummarySection();
            case 'experience':
                return renderExperienceSection();
            case 'skills':
                return renderSkillsSection();
            default:
                return (
                    <div className="py-8 text-center text-gray-500">
                        <CogIcon className="mx-auto mb-4 h-12 w-12" />
                        <p>This section is under development.</p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 lg:p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="mb-2 flex items-center space-x-3">
                    <DocumentTextIcon className="h-8 w-8 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
                </div>
                <p className="text-gray-600">
                    Create a professional resume with our easy-to-use builder
                </p>
            </div>

            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left Sidebar - Sections */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 rounded-2xl bg-white p-6 shadow-lg">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900">
                                Resume Sections
                            </h2>
                            <div className="space-y-2">
                                {resumeSections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => toggleSection(section.id)}
                                        className={`w-full rounded-lg px-4 py-3 text-left transition-all duration-200 ${
                                            section.isExpanded
                                                ? 'border border-blue-200 bg-blue-100 text-blue-900'
                                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">{section.title}</span>
                                            <div className="flex items-center space-x-2">
                                                {section.content &&
                                                    (Array.isArray(section.content)
                                                        ? section.content.length > 0
                                                        : section.content !== '') && (
                                                        <CheckIcon className="h-4 w-4 text-green-600" />
                                                    )}
                                                <span
                                                    className={`transform transition-transform duration-200 ${
                                                        section.isExpanded ? 'rotate-180' : ''
                                                    }`}
                                                >
                                                    ▼
                                                </span>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content - Form */}
                    <div className="lg:col-span-2">
                        <div className="rounded-2xl bg-white p-6 shadow-lg">
                            {resumeSections.map(
                                (section) =>
                                    section.isExpanded && (
                                        <motion.div
                                            key={section.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="mb-8 last:mb-0"
                                        >
                                            <h2 className="mb-4 flex items-center text-xl font-semibold text-gray-900">
                                                {section.type === 'personal' && (
                                                    <UserIcon className="mr-2 h-5 w-5 text-blue-600" />
                                                )}
                                                {section.type === 'summary' && (
                                                    <DocumentTextIcon className="mr-2 h-5 w-5 text-green-600" />
                                                )}
                                                {section.type === 'experience' && (
                                                    <BriefcaseIcon className="mr-2 h-5 w-5 text-purple-600" />
                                                )}
                                                {section.type === 'education' && (
                                                    <AcademicCapIcon className="mr-2 h-5 w-5 text-indigo-600" />
                                                )}
                                                {section.type === 'skills' && (
                                                    <StarIcon className="mr-2 h-5 w-5 text-yellow-600" />
                                                )}
                                                {section.title}
                                            </h2>
                                            {renderSection(section)}
                                        </motion.div>
                                    ),
                            )}

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => setShowPreview(!showPreview)}
                                        className="flex items-center space-x-2 rounded-lg bg-gray-100 px-6 py-3 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200"
                                    >
                                        <EyeIcon className="h-5 w-5" />
                                        <span>{showPreview ? 'Hide' : 'Show'} Preview</span>
                                    </button>
                                </div>

                                <div className="flex space-x-4">
                                    <button className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50">
                                        Save Draft
                                    </button>
                                    <button className="flex items-center space-x-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700">
                                        <DocumentArrowDownIcon className="h-5 w-5" />
                                        <span>Download PDF</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
