export interface Job {
    id: string;
    title: string;
    company: string;
    companyLogo: string;
    location: string;
    salaryRange: string;
    openings: number;
    tags: JobTag[];
}

export type JobTag = {
    label: string;
    variant: 'featured' | 'urgent' | 'internship' | 'freelancer';
};

export interface Profile {
    id: string;
    name: string;
    title: string;
    location: string;
    avatar: string;
}

export interface ReviewStats {
    totalReviews: number;
    rating: number;
    userCount: number;
}

export interface CompanyLogo {
    id: string;
    name: string;
    position: {
        x: number; // percentage
        y: number; // percentage
        rotation: number; // degrees
    };
}

export interface JobStats {
    totalJobs: number;
    monthlyVisitors: string;
    yearsExperience: number;
}
