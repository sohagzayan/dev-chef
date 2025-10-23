'use client';

import { useState } from 'react';
import {
    BuildingOfficeIcon,
    CheckIcon,
    CogIcon,
    DocumentArrowDownIcon,
    DocumentTextIcon,
    EnvelopeIcon,
    EyeIcon,
    PlusIcon,
    SparklesIcon,
    TrashIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface CoverLetterSection {
    id: string;
    type: 'header' | 'opening' | 'body' | 'closing' | 'signature';
    title: string;
    content: any;
    isExpanded: boolean;
}

interface HeaderInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    date: string;
}

interface CompanyInfo {
    companyName: string;
    hiringManager: string;
    jobTitle: string;
    companyAddress: string;
    companyCity: string;
    companyState: string;
    companyZipCode: string;
}

interface BodyParagraph {
    id: string;
    content: string;
    type: 'introduction' | 'experience' | 'achievements' | 'motivation' | 'custom';
}

export default function CoverLetterPage() {
    const [activeSection, setActiveSection] = useState<string>('header');
    const [coverLetterSections, setCoverLetterSections] = useState<CoverLetterSection[]>([
        {
            id: 'header',
            type: 'header',
            title: 'Header & Contact Information',
            content: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                state: '',
                zipCode: '',
                date: new Date().toISOString().split('T')[0],
            },
            isExpanded: true,
        },
        {
            id: 'company',
            type: 'header',
            title: 'Company Information',
            content: {
                companyName: '',
                hiringManager: '',
                jobTitle: '',
                companyAddress: '',
                companyCity: '',
                companyState: '',
                companyZipCode: '',
            },
            isExpanded: false,
        },
        {
            id: 'opening',
            type: 'opening',
            title: 'Opening Paragraph',
            content: '',
            isExpanded: false,
        },
        {
            id: 'body',
            type: 'body',
            title: 'Body Paragraphs',
            content: [
                {
                    id: '1',
                    content: '',
                    type: 'introduction',
                },
            ],
            isExpanded: false,
        },
        {
            id: 'closing',
            type: 'closing',
            title: 'Closing Paragraph',
            content: '',
            isExpanded: false,
        },
        {
            id: 'signature',
            type: 'signature',
            title: 'Signature',
            content: '',
            isExpanded: false,
        },
    ]);

    const [showPreview, setShowPreview] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState('professional');

    const updateSectionContent = (sectionId: string, content: any) => {
        setCoverLetterSections((prev) =>
            prev.map((section) => (section.id === sectionId ? { ...section, content } : section)),
        );
    };

    const toggleSection = (sectionId: string) => {
        setCoverLetterSections((prev) =>
            prev.map((section) =>
                section.id === sectionId
                    ? { ...section, isExpanded: !section.isExpanded }
                    : section,
            ),
        );
    };

    const addBodyParagraph = () => {
        const bodySection = coverLetterSections.find((s) => s.type === 'body');
        if (bodySection) {
            const newParagraph: BodyParagraph = {
                id: Date.now().toString(),
                content: '',
                type: 'custom',
            };

            const updatedContent = [...bodySection.content, newParagraph];
            updateSectionContent('body', updatedContent);
        }
    };

    const updateBodyParagraph = (id: string, field: keyof BodyParagraph, value: any) => {
        const bodySection = coverLetterSections.find((s) => s.type === 'body');
        if (bodySection) {
            const updatedContent = bodySection.content.map((para: BodyParagraph) =>
                para.id === id ? { ...para, [field]: value } : para,
            );
            updateSectionContent('body', updatedContent);
        }
    };

    const removeBodyParagraph = (id: string) => {
        const bodySection = coverLetterSections.find((s) => s.type === 'body');
        if (bodySection && bodySection.content.length > 1) {
            const updatedContent = bodySection.content.filter(
                (para: BodyParagraph) => para.id !== id,
            );
            updateSectionContent('body', updatedContent);
        }
    };

    const getTemplateSuggestions = (type: string) => {
        const suggestions = {
            opening: {
                professional:
                    'I am writing to express my strong interest in the [Job Title] position at [Company Name]. With my background in [relevant field] and passion for [relevant area], I am excited about the opportunity to contribute to your team.',
                enthusiastic:
                    "I am thrilled to apply for the [Job Title] position at [Company Name]! Your company's innovative approach to [industry/field] and commitment to [company value] immediately caught my attention.",
                referral:
                    'I was excited to learn about the [Job Title] position at [Company Name] from [referrer name], who spoke highly of your company culture and the impactful work your team is doing.',
            },
            body: {
                introduction:
                    'My experience in [specific skill/field] has prepared me well for this role. I have successfully [specific achievement or project] that demonstrates my ability to [relevant skill].',
                experience:
                    'In my current role at [Current Company], I have developed expertise in [relevant skills] and led projects that resulted in [specific outcomes]. This experience has taught me the importance of [relevant lesson].',
                achievements:
                    'Some of my key achievements include [specific accomplishment with metrics], [another achievement], and [third achievement]. These experiences have equipped me with the skills needed to excel in this position.',
                motivation:
                    'What excites me most about this opportunity is [specific aspect of the role/company]. I am particularly drawn to [company project/initiative] and believe my background in [relevant area] would be valuable.',
            },
            closing: {
                professional:
                    "I am confident that my skills and experience make me a strong candidate for this position. I would welcome the opportunity to discuss how I can contribute to [Company Name]'s continued success.",
                enthusiastic:
                    "I am genuinely excited about the possibility of joining your team and contributing to [Company Name]'s mission. I look forward to discussing how my background and enthusiasm can benefit your organization.",
                'follow-up':
                    "Thank you for considering my application. I am available for an interview at your convenience and look forward to discussing how I can contribute to [Company Name]'s success.",
            },
        };
        return suggestions[type as keyof typeof suggestions] || {};
    };

    const renderHeaderSection = () => {
        const section = coverLetterSections.find((s) => s.id === 'header');
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
                                updateSectionContent('header', {
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
                                updateSectionContent('header', {
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
                                updateSectionContent('header', {
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
                                updateSectionContent('header', {
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
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Street Address
                    </label>
                    <input
                        type="text"
                        value={section.content.address}
                        onChange={(e) =>
                            updateSectionContent('header', {
                                ...section.content,
                                address: e.target.value,
                            })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        placeholder="123 Main Street"
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">City</label>
                        <input
                            type="text"
                            value={section.content.city}
                            onChange={(e) =>
                                updateSectionContent('header', {
                                    ...section.content,
                                    city: e.target.value,
                                })
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            placeholder="San Francisco"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            State
                        </label>
                        <input
                            type="text"
                            value={section.content.state}
                            onChange={(e) =>
                                updateSectionContent('header', {
                                    ...section.content,
                                    state: e.target.value,
                                })
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            placeholder="CA"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            ZIP Code
                        </label>
                        <input
                            type="text"
                            value={section.content.zipCode}
                            onChange={(e) =>
                                updateSectionContent('header', {
                                    ...section.content,
                                    zipCode: e.target.value,
                                })
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            placeholder="94105"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Date</label>
                    <input
                        type="date"
                        value={section.content.date}
                        onChange={(e) =>
                            updateSectionContent('header', {
                                ...section.content,
                                date: e.target.value,
                            })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
        );
    };

    const renderCompanySection = () => {
        const section = coverLetterSections.find((s) => s.id === 'company');
        if (!section) return null;

        return (
            <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Company Name *
                        </label>
                        <input
                            type="text"
                            value={section.content.companyName}
                            onChange={(e) =>
                                updateSectionContent('company', {
                                    ...section.content,
                                    companyName: e.target.value,
                                })
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            placeholder="TechCorp Inc."
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Hiring Manager
                        </label>
                        <input
                            type="text"
                            value={section.content.hiringManager}
                            onChange={(e) =>
                                updateSectionContent('company', {
                                    ...section.content,
                                    hiringManager: e.target.value,
                                })
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            placeholder="Jane Smith"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Job Title *
                    </label>
                    <input
                        type="text"
                        value={section.content.jobTitle}
                        onChange={(e) =>
                            updateSectionContent('company', {
                                ...section.content,
                                jobTitle: e.target.value,
                            })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        placeholder="Senior Software Engineer"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Company Address
                    </label>
                    <input
                        type="text"
                        value={section.content.companyAddress}
                        onChange={(e) =>
                            updateSectionContent('company', {
                                ...section.content,
                                companyAddress: e.target.value,
                            })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        placeholder="456 Business Ave"
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">City</label>
                        <input
                            type="text"
                            value={section.content.companyCity}
                            onChange={(e) =>
                                updateSectionContent('company', {
                                    ...section.content,
                                    companyCity: e.target.value,
                                })
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            placeholder="San Francisco"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            State
                        </label>
                        <input
                            type="text"
                            value={section.content.companyState}
                            onChange={(e) =>
                                updateSectionContent('company', {
                                    ...section.content,
                                    companyState: e.target.value,
                                })
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            placeholder="CA"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            ZIP Code
                        </label>
                        <input
                            type="text"
                            value={section.content.companyZipCode}
                            onChange={(e) =>
                                updateSectionContent('company', {
                                    ...section.content,
                                    companyZipCode: e.target.value,
                                })
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            placeholder="94105"
                        />
                    </div>
                </div>
            </div>
        );
    };

    const renderOpeningSection = () => {
        const section = coverLetterSections.find((s) => s.id === 'opening');
        if (!section) return null;

        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Opening Paragraph</h3>
                    <div className="flex space-x-2">
                        <select
                            value={selectedTemplate}
                            onChange={(e) => setSelectedTemplate(e.target.value)}
                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="professional">Professional</option>
                            <option value="enthusiastic">Enthusiastic</option>
                            <option value="referral">Referral</option>
                        </select>
                        <button
                            onClick={() => {
                                const suggestions = getTemplateSuggestions('opening');
                                const selectedSuggestion =
                                    suggestions[selectedTemplate as keyof typeof suggestions];
                                if (selectedSuggestion) {
                                    updateSectionContent('opening', selectedSuggestion);
                                }
                            }}
                            className="flex items-center space-x-2 rounded-lg bg-blue-100 px-3 py-2 text-sm text-blue-700 transition-colors duration-200 hover:bg-blue-200"
                        >
                            <SparklesIcon className="h-4 w-4" />
                            <span>Use Template</span>
                        </button>
                    </div>
                </div>

                <textarea
                    value={section.content}
                    onChange={(e) => updateSectionContent('opening', e.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="Write an engaging opening paragraph that captures the hiring manager's attention..."
                />
                <p className="text-sm text-gray-500">
                    Start with a strong hook and clearly state the position you're applying for.
                </p>
            </div>
        );
    };

    const renderBodySection = () => {
        const section = coverLetterSections.find((s) => s.id === 'body');
        if (!section) return null;

        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Body Paragraphs</h3>
                    <button
                        onClick={addBodyParagraph}
                        className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700"
                    >
                        <PlusIcon className="h-4 w-4" />
                        <span>Add Paragraph</span>
                    </button>
                </div>

                <div className="space-y-6">
                    {section.content.map((para: BodyParagraph, index: number) => (
                        <div key={para.id} className="rounded-lg border border-gray-200 p-4">
                            <div className="mb-4 flex items-center justify-between">
                                <h4 className="text-md font-medium text-gray-900">
                                    Paragraph {index + 1}
                                </h4>
                                {section.content.length > 1 && (
                                    <button
                                        onClick={() => removeBodyParagraph(para.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                )}
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Paragraph Type
                                    </label>
                                    <select
                                        value={para.type}
                                        onChange={(e) =>
                                            updateBodyParagraph(para.id, 'type', e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="introduction">
                                            Introduction & Background
                                        </option>
                                        <option value="experience">Relevant Experience</option>
                                        <option value="achievements">Key Achievements</option>
                                        <option value="motivation">Motivation & Interest</option>
                                        <option value="custom">Custom</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Content
                                    </label>
                                    <textarea
                                        value={para.content}
                                        onChange={(e) =>
                                            updateBodyParagraph(para.id, 'content', e.target.value)
                                        }
                                        rows={4}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        placeholder="Write your paragraph content here..."
                                    />
                                </div>

                                {para.type !== 'custom' && (
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => {
                                                const suggestions = getTemplateSuggestions('body');
                                                const selectedSuggestion =
                                                    suggestions[
                                                        para.type as keyof typeof suggestions
                                                    ];
                                                if (selectedSuggestion) {
                                                    updateBodyParagraph(
                                                        para.id,
                                                        'content',
                                                        selectedSuggestion,
                                                    );
                                                }
                                            }}
                                            className="flex items-center space-x-2 rounded-lg bg-blue-100 px-3 py-2 text-sm text-blue-700 transition-colors duration-200 hover:bg-blue-200"
                                        >
                                            <SparklesIcon className="h-4 w-4" />
                                            <span>Use Template</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderClosingSection = () => {
        const section = coverLetterSections.find((s) => s.id === 'closing');
        if (!section) return null;

        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Closing Paragraph</h3>
                    <div className="flex space-x-2">
                        <select
                            value={selectedTemplate}
                            onChange={(e) => setSelectedTemplate(e.target.value)}
                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="professional">Professional</option>
                            <option value="enthusiastic">Enthusiastic</option>
                            <option value="follow-up">Follow-up</option>
                        </select>
                        <button
                            onClick={() => {
                                const suggestions = getTemplateSuggestions('closing');
                                const selectedSuggestion =
                                    suggestions[selectedTemplate as keyof typeof suggestions];
                                if (selectedSuggestion) {
                                    updateSectionContent('closing', selectedSuggestion);
                                }
                            }}
                            className="flex items-center space-x-2 rounded-lg bg-blue-100 px-3 py-2 text-sm text-blue-700 transition-colors duration-200 hover:bg-blue-200"
                        >
                            <SparklesIcon className="h-4 w-4" />
                            <span>Use Template</span>
                        </button>
                    </div>
                </div>

                <textarea
                    value={section.content}
                    onChange={(e) => updateSectionContent('closing', e.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="Write a strong closing paragraph that reiterates your interest and includes a call to action..."
                />
                <p className="text-sm text-gray-500">
                    End with confidence and clearly state your next steps or call to action.
                </p>
            </div>
        );
    };

    const renderSignatureSection = () => {
        const section = coverLetterSections.find((s) => s.id === 'signature');
        if (!section) return null;

        return (
            <div className="space-y-4">
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Signature
                    </label>
                    <input
                        type="text"
                        value={section.content}
                        onChange={(e) => updateSectionContent('signature', e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        placeholder="Your full name"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        This will appear at the bottom of your cover letter.
                    </p>
                </div>
            </div>
        );
    };

    const renderSection = (section: CoverLetterSection) => {
        switch (section.id) {
            case 'header':
                return renderHeaderSection();
            case 'company':
                return renderCompanySection();
            case 'opening':
                return renderOpeningSection();
            case 'body':
                return renderBodySection();
            case 'closing':
                return renderClosingSection();
            case 'signature':
                return renderSignatureSection();
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
                    <h1 className="text-3xl font-bold text-gray-900">Cover Letter Builder</h1>
                </div>
                <p className="text-gray-600">
                    Create a compelling cover letter that showcases your qualifications
                </p>
            </div>

            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left Sidebar - Sections */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 rounded-2xl bg-white p-6 shadow-lg">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900">
                                Cover Letter Sections
                            </h2>
                            <div className="space-y-2">
                                {coverLetterSections.map((section) => (
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
                            {coverLetterSections.map(
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
                                                {section.id === 'header' && (
                                                    <UserIcon className="mr-2 h-5 w-5 text-blue-600" />
                                                )}
                                                {section.id === 'company' && (
                                                    <BuildingOfficeIcon className="mr-2 h-5 w-5 text-green-600" />
                                                )}
                                                {section.id === 'opening' && (
                                                    <DocumentTextIcon className="mr-2 h-5 w-5 text-purple-600" />
                                                )}
                                                {section.id === 'body' && (
                                                    <DocumentTextIcon className="mr-2 h-5 w-5 text-indigo-600" />
                                                )}
                                                {section.id === 'closing' && (
                                                    <DocumentTextIcon className="mr-2 h-5 w-5 text-yellow-600" />
                                                )}
                                                {section.id === 'signature' && (
                                                    <EnvelopeIcon className="mr-2 h-5 w-5 text-red-600" />
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
