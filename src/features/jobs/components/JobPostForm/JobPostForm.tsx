'use client';

import { useEffect, useRef, useState } from 'react';
import { m } from 'framer-motion';
import { TiptapEditor } from '../TiptapEditor';

const SKILLS_LIST = [
    'Admin',
    'Account Management',
    'Airbnb Management',
    'Anthropology',
    'PHP',
    'JavaScript',
    'Python',
    'React',
    'Node.js',
    'WordPress',
    'Graphic Design',
    'UI/UX Design',
    'Project Management',
    'Content Writing',
    'SEO',
    'Data Analysis',
    'Marketing',
    'Sales',
    'Customer Support',
];

const LANGUAGES_LIST = [
    'Afrikaans',
    'Arabic',
    'Bengali',
    'Tibetan',
    'Bulgarian',
    'Catalan',
    'Chinese',
    'Czech',
    'Danish',
    'Dutch',
    'English',
    'Finnish',
    'French',
    'German',
    'Greek',
    'Hebrew',
    'Hindi',
    'Hungarian',
    'Italian',
    'Japanese',
    'Korean',
    'Norwegian',
    'Polish',
    'Portuguese',
    'Romanian',
    'Russian',
    'Spanish',
    'Swedish',
    'Turkish',
    'Ukrainian',
    'Urdu',
    'Vietnamese',
];

const PREDEFINED_QUESTIONS = [
    'Why would you be a good fit for this position?',
    'What makes you stand out against other candidates?',
    "Can you list a few related projects you've worked on in the past?",
    'Do you prefer to work certain hours? If so, please list them, including timezones.',
    'What do you like about this project?',
    'What are you currently working on?',
    'Can you please share a few links that would allow us to see the quality of your work?',
    'How much time do you currently have available to work on this project?',
];

export function JobPostForm() {
    const [formData, setFormData] = useState({
        jobTitle: '',
        jobDescription: '',
        skills: [] as string[],
        experienceLevel: '',
        languages: [] as string[],
        jobType: 'Full-time (40 hrs/wk)',
        payRate: '',
        questions: ['Why would you be a good fit for this position?'],
        companyName: '',
        companyWebsite: '',
        companyCountry: '',
        companyState: '',
        companyCity: '',
        jobVisibility: 'Everyone',
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [skillInput, setSkillInput] = useState('');
    const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
    const [languageInput, setLanguageInput] = useState('');
    const [showLanguagesDropdown, setShowLanguagesDropdown] = useState(false);
    const [showExperienceDropdown, setShowExperienceDropdown] = useState(false);

    const skillsDropdownRef = useRef<HTMLDivElement>(null);
    const languagesDropdownRef = useRef<HTMLDivElement>(null);
    const experienceDropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                skillsDropdownRef.current &&
                !skillsDropdownRef.current.contains(event.target as Node)
            ) {
                setShowSkillsDropdown(false);
            }
            if (
                languagesDropdownRef.current &&
                !languagesDropdownRef.current.contains(event.target as Node)
            ) {
                setShowLanguagesDropdown(false);
            }
            if (
                experienceDropdownRef.current &&
                !experienceDropdownRef.current.contains(event.target as Node)
            ) {
                setShowExperienceDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleAddQuestion = () => {
        setFormData({
            ...formData,
            questions: [...formData.questions, ''],
        });
    };

    const handleQuestionChange = (index: number, value: string) => {
        const newQuestions = [...formData.questions];
        newQuestions[index] = value;
        setFormData({
            ...formData,
            questions: newQuestions,
        });
    };

    const filteredSkills = SKILLS_LIST.filter(
        (skill) =>
            skill.toLowerCase().includes(skillInput.toLowerCase()) &&
            !formData.skills.includes(skill),
    );

    const filteredLanguages = LANGUAGES_LIST.filter(
        (lang) =>
            lang.toLowerCase().includes(languageInput.toLowerCase()) &&
            !formData.languages.includes(lang),
    );

    const handleAddSkill = (skill: string) => {
        if (!formData.skills.includes(skill)) {
            setFormData({
                ...formData,
                skills: [...formData.skills, skill],
            });
            setSkillInput('');
            setShowSkillsDropdown(false);
        }
    };

    const handleRemoveSkill = (skill: string) => {
        setFormData({
            ...formData,
            skills: formData.skills.filter((s) => s !== skill),
        });
    };

    const handleAddLanguage = (language: string) => {
        if (!formData.languages.includes(language)) {
            setFormData({
                ...formData,
                languages: [...formData.languages, language],
            });
            setLanguageInput('');
            setShowLanguagesDropdown(false);
        }
    };

    const handleRemoveLanguage = (language: string) => {
        setFormData({
            ...formData,
            languages: formData.languages.filter((l) => l !== language),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        // Basic validation
        if (!formData.jobTitle.trim()) {
            setErrors({ jobTitle: 'Job title is required' });
            setLoading(false);
            return;
        }
        // Check if job description has actual content (strip HTML tags)
        const textContent = formData.jobDescription.replace(/<[^>]*>/g, '').trim();
        if (!textContent) {
            setErrors({ jobDescription: 'Job description is required' });
            setLoading(false);
            return;
        }
        if (formData.skills.length === 0) {
            setErrors({ skills: 'At least one skill is required' });
            setLoading(false);
            return;
        }

        // TODO: Implement actual job posting logic
        console.log('Job post form submitted:', formData);
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Tell us about your job */}
            <div className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                    TELL US ABOUT YOUR JOB:
                </h2>
                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="jobTitle"
                            className="block text-xs font-semibold tracking-wide text-gray-700 uppercase"
                        >
                            Job title <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="jobTitle"
                            type="text"
                            value={formData.jobTitle}
                            onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                            placeholder="Enter the type of work you need done or job title you are hiring for"
                            className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                        />
                        {errors.jobTitle && (
                            <p className="mt-1 text-sm text-red-600">{errors.jobTitle}</p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="jobDescription"
                            className="block text-xs font-semibold tracking-wide text-gray-700 uppercase"
                        >
                            Describe your job <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">
                            <TiptapEditor
                                content={formData.jobDescription}
                                onChange={(content) =>
                                    setFormData({ ...formData, jobDescription: content })
                                }
                                placeholder="Describe the work to be done. Example: We are looking for a Wordpress developer to work on our company website. In addition to making changes to various pages we need several plugins installed and integrated. You will be working with our designer and a few other team members. In addition to Wordpress, a strong grasp of front-end technologies is necessary"
                            />
                        </div>
                        {errors.jobDescription && (
                            <p className="mt-1 text-sm text-red-600">{errors.jobDescription}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Section 2: Job Requirements */}
            <div className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                    WHAT ARE THE JOB REQUIREMENTS?
                </h2>
                <div className="space-y-4">
                    {/* Skills Multi-select */}
                    <div className="relative" ref={skillsDropdownRef}>
                        <label
                            htmlFor="skills"
                            className="block text-xs font-semibold tracking-wide text-gray-700 uppercase"
                        >
                            Skills <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">
                            <div className="flex min-h-[48px] flex-wrap gap-2 rounded-lg border border-blue-500 bg-white px-4 py-2">
                                {formData.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="inline-flex items-center gap-1 rounded bg-blue-100 px-2 py-1 text-sm text-gray-900"
                                    >
                                        {skill}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveSkill(skill)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <svg
                                                className="h-4 w-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                ))}
                                <input
                                    id="skills"
                                    type="text"
                                    value={skillInput}
                                    onChange={(e) => {
                                        setSkillInput(e.target.value);
                                        setShowSkillsDropdown(true);
                                    }}
                                    onFocus={() => setShowSkillsDropdown(true)}
                                    placeholder={
                                        formData.skills.length === 0
                                            ? 'Select the skills needed for the job'
                                            : ''
                                    }
                                    className="flex-1 border-none bg-transparent px-0 py-1 text-gray-900 placeholder:text-gray-400 focus:outline-none"
                                />
                            </div>
                            {showSkillsDropdown && filteredSkills.length > 0 && (
                                <div className="absolute z-10 mt-1 w-full rounded-lg border border-blue-500 bg-white shadow-lg">
                                    {filteredSkills.map((skill) => (
                                        <button
                                            key={skill}
                                            type="button"
                                            onClick={() => handleAddSkill(skill)}
                                            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-900 hover:bg-gray-100"
                                        >
                                            {formData.skills.includes(skill) && (
                                                <svg
                                                    className="h-4 w-4 text-green-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            )}
                                            {skill}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        {errors.skills && (
                            <p className="mt-1 text-sm text-red-600">{errors.skills}</p>
                        )}
                    </div>

                    {/* Experience Level */}
                    <div className="relative" ref={experienceDropdownRef}>
                        <label
                            htmlFor="experienceLevel"
                            className="block text-xs font-semibold tracking-wide text-gray-700 uppercase"
                        >
                            Experience level <span className="text-gray-400">(optional)</span>
                        </label>
                        <div className="mt-2">
                            <input
                                id="experienceLevel"
                                type="text"
                                value={formData.experienceLevel}
                                onClick={() => setShowExperienceDropdown(!showExperienceDropdown)}
                                onChange={(e) =>
                                    setFormData({ ...formData, experienceLevel: e.target.value })
                                }
                                placeholder="Select one or more experience levels"
                                readOnly
                                className="block w-full cursor-pointer rounded-lg border border-blue-500 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                            />
                            {showExperienceDropdown && (
                                <div className="absolute z-10 mt-1 w-full rounded-lg border border-blue-500 bg-white shadow-lg">
                                    {[
                                        'Beginner (1 - 3 yrs)',
                                        'Intermediate (3 - 5 yrs)',
                                        'Expert (5+ yrs)',
                                    ].map((level) => (
                                        <button
                                            key={level}
                                            type="button"
                                            onClick={() => {
                                                setFormData({
                                                    ...formData,
                                                    experienceLevel: level,
                                                });
                                                setShowExperienceDropdown(false);
                                            }}
                                            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-900 hover:bg-gray-100"
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Languages Multi-select */}
                    <div className="relative" ref={languagesDropdownRef}>
                        <label
                            htmlFor="languages"
                            className="block text-xs font-semibold tracking-wide text-gray-700 uppercase"
                        >
                            Languages <span className="text-gray-400">(optional)</span>
                        </label>
                        <div className="mt-2">
                            <div className="flex min-h-[48px] flex-wrap gap-2 rounded-lg border border-blue-500 bg-white px-4 py-2">
                                {formData.languages.map((language) => (
                                    <span
                                        key={language}
                                        className="inline-flex items-center gap-1 rounded bg-blue-100 px-2 py-1 text-sm text-gray-900"
                                    >
                                        {language}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveLanguage(language)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <svg
                                                className="h-4 w-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                ))}
                                <input
                                    id="languages"
                                    type="text"
                                    value={languageInput}
                                    onChange={(e) => {
                                        setLanguageInput(e.target.value);
                                        setShowLanguagesDropdown(true);
                                    }}
                                    onFocus={() => setShowLanguagesDropdown(true)}
                                    placeholder={
                                        formData.languages.length === 0
                                            ? 'Select the languages needed for the job'
                                            : ''
                                    }
                                    className="flex-1 border-none bg-transparent px-0 py-1 text-gray-900 placeholder:text-gray-400 focus:outline-none"
                                />
                            </div>
                            {showLanguagesDropdown && filteredLanguages.length > 0 && (
                                <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-blue-500 bg-white shadow-lg">
                                    {filteredLanguages.map((language) => (
                                        <button
                                            key={language}
                                            type="button"
                                            onClick={() => handleAddLanguage(language)}
                                            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-900 hover:bg-gray-100"
                                        >
                                            {language}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3: Pay */}
            <div className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                    WHAT DOES THIS JOB PAY?
                </h2>
                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="jobType"
                            className="block text-xs font-semibold tracking-wide text-gray-700 uppercase"
                        >
                            Job type
                        </label>
                        <select
                            id="jobType"
                            value={formData.jobType}
                            onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                            className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                        >
                            <option value="Full-time (40 hrs/wk)">Full-time (40 hrs/wk)</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="payRate"
                            className="block text-xs font-semibold tracking-wide text-gray-700 uppercase"
                        >
                            Pay rate ($/hr) <span className="text-gray-400">(optional)</span>
                        </label>
                        <div className="mt-2 flex gap-2">
                            <input
                                id="payRate"
                                type="number"
                                value={formData.payRate}
                                onChange={(e) =>
                                    setFormData({ ...formData, payRate: e.target.value })
                                }
                                placeholder="Enter the pay rate per hour ($ USD)"
                                className="block flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                            />
                            <span className="flex items-center text-sm text-gray-600">USD</span>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">$5/hr or higher is recommended</p>
                    </div>
                </div>
            </div>

            {/* Section 4: Candidate Questions */}
            <div className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                    WHAT QUESTIONS DO YOU WANT TO ASK CANDIDATES?
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                    It&apos;s recommended to ask at least three questions in order to ensure you
                    receive quality applications.
                </p>
                <div className="space-y-4">
                    {formData.questions.map((question, index) => (
                        <div key={index}>
                            <label
                                htmlFor={`question-${index}`}
                                className="block text-xs font-semibold tracking-wide text-gray-700 uppercase"
                            >
                                Question {index + 1}
                                {index === 0 && <span className="text-red-500"> *</span>}
                            </label>
                            {index === 0 ? (
                                <textarea
                                    id={`question-${index}`}
                                    value={question}
                                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                                    rows={2}
                                    className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                />
                            ) : (
                                <div className="mt-2 space-y-2">
                                    <select
                                        id={`question-select-${index}`}
                                        value={
                                            PREDEFINED_QUESTIONS.includes(question)
                                                ? question
                                                : question
                                                  ? 'Custom question'
                                                  : ''
                                        }
                                        onChange={(e) => {
                                            if (e.target.value === 'Custom question') {
                                                handleQuestionChange(index, '');
                                            } else if (e.target.value) {
                                                handleQuestionChange(index, e.target.value);
                                            } else {
                                                handleQuestionChange(index, '');
                                            }
                                        }}
                                        className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                    >
                                        <option value="">Select a question</option>
                                        {PREDEFINED_QUESTIONS.map((predefQuestion) => (
                                            <option key={predefQuestion} value={predefQuestion}>
                                                {predefQuestion}
                                            </option>
                                        ))}
                                        <option value="Custom question">Custom question</option>
                                    </select>
                                    {question && !PREDEFINED_QUESTIONS.includes(question) && (
                                        <textarea
                                            id={`question-custom-${index}`}
                                            value={question}
                                            onChange={(e) =>
                                                handleQuestionChange(index, e.target.value)
                                            }
                                            placeholder="Enter your custom question"
                                            rows={2}
                                            className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddQuestion}
                        className="text-sm font-medium text-blue-600 hover:underline"
                    >
                        Add another question
                    </button>
                </div>
            </div>

            {/* Section 5: Company Information */}
            <div className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                    TELL US A LITTLE ABOUT YOUR COMPANY:
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                    The more information you provide the better your chances of attracting
                    candidates.
                </p>
                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="companyName"
                            className="block text-xs font-semibold tracking-wide text-gray-700 uppercase"
                        >
                            Company name <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="companyName"
                            type="text"
                            value={formData.companyName}
                            onChange={(e) =>
                                setFormData({ ...formData, companyName: e.target.value })
                            }
                            placeholder="Enter the name of the company"
                            className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="companyWebsite"
                            className="block text-xs font-semibold tracking-wide text-gray-700 uppercase"
                        >
                            Company website <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="companyWebsite"
                            type="url"
                            value={formData.companyWebsite}
                            onChange={(e) =>
                                setFormData({ ...formData, companyWebsite: e.target.value })
                            }
                            placeholder="Enter the company website URL"
                            className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            No website? Use your company&apos;s Facebook page, Linkedin profile,
                            etc.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                            <label
                                htmlFor="companyCountry"
                                className="block text-xs font-semibold tracking-wide text-gray-700 uppercase"
                            >
                                Company country <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="companyCountry"
                                value={formData.companyCountry}
                                onChange={(e) =>
                                    setFormData({ ...formData, companyCountry: e.target.value })
                                }
                                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                            >
                                <option value="">Select country</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="UK">United Kingdom</option>
                                <option value="AU">Australia</option>
                                <option value="NZ">New Zealand</option>
                                <option value="DE">Germany</option>
                                <option value="FR">France</option>
                                <option value="IT">Italy</option>
                                <option value="ES">Spain</option>
                                <option value="NL">Netherlands</option>
                                <option value="BE">Belgium</option>
                                <option value="CH">Switzerland</option>
                                <option value="AT">Austria</option>
                                <option value="SE">Sweden</option>
                                <option value="NO">Norway</option>
                                <option value="DK">Denmark</option>
                                <option value="FI">Finland</option>
                                <option value="PL">Poland</option>
                                <option value="PT">Portugal</option>
                                <option value="IE">Ireland</option>
                                <option value="GR">Greece</option>
                                <option value="CZ">Czech Republic</option>
                                <option value="HU">Hungary</option>
                                <option value="RO">Romania</option>
                                <option value="BG">Bulgaria</option>
                                <option value="HR">Croatia</option>
                                <option value="SK">Slovakia</option>
                                <option value="SI">Slovenia</option>
                                <option value="EE">Estonia</option>
                                <option value="LV">Latvia</option>
                                <option value="LT">Lithuania</option>
                                <option value="JP">Japan</option>
                                <option value="KR">South Korea</option>
                                <option value="CN">China</option>
                                <option value="IN">India</option>
                                <option value="SG">Singapore</option>
                                <option value="MY">Malaysia</option>
                                <option value="TH">Thailand</option>
                                <option value="PH">Philippines</option>
                                <option value="ID">Indonesia</option>
                                <option value="VN">Vietnam</option>
                                <option value="BR">Brazil</option>
                                <option value="MX">Mexico</option>
                                <option value="AR">Argentina</option>
                                <option value="CL">Chile</option>
                                <option value="CO">Colombia</option>
                                <option value="PE">Peru</option>
                                <option value="ZA">South Africa</option>
                                <option value="EG">Egypt</option>
                                <option value="NG">Nigeria</option>
                                <option value="KE">Kenya</option>
                                <option value="IL">Israel</option>
                                <option value="AE">United Arab Emirates</option>
                                <option value="SA">Saudi Arabia</option>
                                <option value="TR">Turkey</option>
                                <option value="RU">Russia</option>
                                <option value="UA">Ukraine</option>
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="companyState"
                                className="block text-xs font-semibold tracking-wide text-gray-700 uppercase"
                            >
                                Company state/region <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="companyState"
                                type="text"
                                value={formData.companyState}
                                onChange={(e) =>
                                    setFormData({ ...formData, companyState: e.target.value })
                                }
                                placeholder="Enter company state"
                                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="companyCity"
                                className="block text-xs font-semibold tracking-wide text-gray-700 uppercase"
                            >
                                Company city <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="companyCity"
                                type="text"
                                value={formData.companyCity}
                                onChange={(e) =>
                                    setFormData({ ...formData, companyCity: e.target.value })
                                }
                                placeholder="Enter company city"
                                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                        <p className="text-sm text-blue-900">
                            Providing the location of the company headquarters increases the number
                            of applications
                        </p>
                    </div>
                </div>
            </div>

            {/* Section 6: Job Visibility */}
            <div className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">JOB VISIBILITY:</h2>
                <div className="flex gap-6">
                    {['Everyone', 'Only invited users', 'Only me'].map((option) => (
                        <label key={option} className="flex cursor-pointer items-center gap-2">
                            <input
                                type="radio"
                                name="jobVisibility"
                                value={option}
                                checked={formData.jobVisibility === option}
                                onChange={(e) =>
                                    setFormData({ ...formData, jobVisibility: e.target.value })
                                }
                                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{option}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Section 7: Create Account */}
            <div className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">CREATE A FREE ACCOUNT:</h2>
                <p className="mb-4 text-sm text-gray-600">
                    There are no fees. Your account is used to notify you of applications and for
                    messaging candidates.
                </p>
                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="fullName"
                            className="block text-xs font-semibold tracking-wide text-gray-700 uppercase"
                        >
                            Full name <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="fullName"
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="Enter your first and last name"
                            className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-xs font-semibold tracking-wide text-gray-700 uppercase"
                        >
                            Email address <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Enter your email address"
                            className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-xs font-semibold tracking-wide text-gray-700 uppercase"
                            >
                                Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative mt-2">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                    placeholder="Enter password"
                                    className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-xs font-semibold tracking-wide text-gray-700 uppercase"
                            >
                                Password confirmation <span className="text-red-500">*</span>
                            </label>
                            <div className="relative mt-2">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            confirmPassword: e.target.value,
                                        })
                                    }
                                    placeholder="Confirm password"
                                    className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? (
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="font-medium text-blue-600 hover:underline">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pb-8">
                <button
                    type="button"
                    className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                    Cancel
                </button>
                <m.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-50"
                >
                    {loading ? 'Posting...' : 'Post your job for 60 days (FREE)'}
                </m.button>
            </div>
        </form>
    );
}
