import type { CompanyLogo, Job, Profile, ReviewStats } from '../model/types';

export const reviewStats: ReviewStats = {
    totalReviews: 14000,
    rating: 4.9,
    userCount: 12000,
};

export const jobStats = {
    totalJobs: 37263,
    monthlyVisitors: '6M',
    yearsExperience: 10,
};

export const companyLogos: CompanyLogo[] = [
    { id: '1', name: 'Google', position: { x: 20, y: 15, rotation: -2 } },
    { id: '2', name: 'Amazon', position: { x: 50, y: 10, rotation: 1 } },
    { id: '3', name: 'GitHub', position: { x: 80, y: 18, rotation: -1 } },
    { id: '4', name: 'XM', position: { x: 15, y: 40, rotation: 2 } },
    { id: '5', name: 'Basecamp', position: { x: 85, y: 42, rotation: -2 } },
    { id: '6', name: 'doximity', position: { x: 55, y: 55, rotation: 1 } },
    { id: '7', name: 'mailer lite', position: { x: 25, y: 70, rotation: -1 } },
    { id: '8', name: 'in VISION', position: { x: 70, y: 75, rotation: 2 } },
    { id: '9', name: 'Microsoft', position: { x: 45, y: 85, rotation: -1 } },
];

export interface JobCategory {
    id: string;
    name: string;
    icon: string;
    jobCount: number;
    trend: 'up' | 'down' | 'stable';
}

export interface TopSkill {
    id: string;
    name: string;
    demand: number; // percentage
}

export const jobCategories: JobCategory[] = [
    { id: '1', name: 'Software Engineer', icon: '💻', jobCount: 8420, trend: 'up' },
    { id: '2', name: 'Product Designer', icon: '🎨', jobCount: 3210, trend: 'up' },
    { id: '3', name: 'Data Scientist', icon: '📊', jobCount: 2150, trend: 'up' },
    { id: '4', name: 'Marketing', icon: '📈', jobCount: 1890, trend: 'stable' },
    { id: '5', name: 'Customer Support', icon: '💬', jobCount: 1450, trend: 'stable' },
    { id: '6', name: 'Sales', icon: '🤝', jobCount: 1230, trend: 'up' },
];

export const topSkills: TopSkill[] = [
    { id: '1', name: 'React', demand: 92 },
    { id: '2', name: 'Python', demand: 88 },
    { id: '3', name: 'JavaScript', demand: 85 },
    { id: '4', name: 'TypeScript', demand: 78 },
    { id: '5', name: 'Node.js', demand: 75 },
    { id: '6', name: 'AWS', demand: 72 },
];

export const featuredJobs: Job[] = [
    {
        id: '1',
        title: 'Jr. PHP Developer',
        company: 'TripAdvisor',
        companyLogo: '/assets/logos/tripadvisor.svg',
        location: 'Canada, USA',
        salaryRange: '$5K - $8K',
        openings: 6,
        tags: [
            { label: 'Featured', variant: 'featured' },
            { label: 'Urgent', variant: 'urgent' },
            { label: 'Internship', variant: 'internship' },
        ],
    },
    {
        id: '2',
        title: 'Sr. UI/UX Designer',
        company: 'Adobe',
        companyLogo: '/assets/logos/adobe.svg',
        location: 'Liverpool, UK',
        salaryRange: '$4K - $5.5K',
        openings: 5,
        tags: [
            { label: 'Urgent', variant: 'urgent' },
            { label: 'Freelancer', variant: 'freelancer' },
        ],
    },
];

export const featuredProfiles: Profile[] = [
    {
        id: '1',
        name: 'Kr. Dhananjay Preet',
        title: 'Sr. Web Designer',
        location: 'London',
        avatar: '/assets/profiles/dhananjay.jpg',
    },
    {
        id: '2',
        name: 'Donald J. Merrick',
        title: 'Laravel Developer',
        location: 'California, USA',
        avatar: '/assets/profiles/donald.jpg',
    },
];
