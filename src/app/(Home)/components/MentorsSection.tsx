'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MessageSquare, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function MentorsSection() {
    const [selectedMentor, setSelectedMentor] = useState<number | null>(null);

    const mentors = [
        {
            name: 'Sarah Chen',
            role: 'Senior Software Engineer',
            company: 'Google',
            expertise: ['System Design', 'Algorithms', 'Career Growth'],
            rating: 4.9,
            sessions: 127,
            price: '$80/hr',
            availability: 'Available Now',
            languages: ['English', 'Mandarin'],
            experience: '8+ years',
            avatar: 'SC',
            specialties: ['FAANG Interview Prep', 'Distributed Systems'],
            nextSlot: 'Today 3:00 PM',
        },
        {
            name: 'Alex Kumar',
            role: 'Tech Lead',
            company: 'Meta',
            expertise: ['Data Structures', 'Competitive Programming', 'Mentorship'],
            rating: 4.8,
            sessions: 89,
            price: '$75/hr',
            availability: 'Busy',
            languages: ['English', 'Hindi'],
            experience: '6+ years',
            avatar: 'AK',
            specialties: ['Algorithm Optimization', 'Code Reviews'],
            nextSlot: 'Tomorrow 10:00 AM',
        },
        {
            name: 'Maria Rodriguez',
            role: 'Principal Engineer',
            company: 'Amazon',
            expertise: ['Leadership', 'Architecture', 'Scaling'],
            rating: 5.0,
            sessions: 156,
            price: '$120/hr',
            availability: 'Available Soon',
            languages: ['English', 'Spanish'],
            experience: '12+ years',
            avatar: 'MR',
            specialties: ['Technical Leadership', 'System Architecture'],
            nextSlot: 'This Week',
        },
    ];

    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="mb-4 text-5xl font-bold text-[rgba(14,15,12,1)]">
                        Connect with Expert Mentors
                    </h2>
                    <p className="text-xl text-[rgba(106,108,106,1)]">
                        Get personalized guidance from industry professionals
                    </p>
                </motion.div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {mentors.map((mentor, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            onHoverStart={() => setSelectedMentor(index)}
                            onHoverEnd={() => setSelectedMentor(null)}
                            className="group relative"
                        >
                            <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
                                {/* Availability Indicator */}
                                <div className="absolute top-4 right-4 z-20">
                                    <div
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                                            mentor.availability === 'Available Now'
                                                ? 'bg-green-100 text-green-800'
                                                : mentor.availability === 'Available Soon'
                                                  ? 'bg-yellow-100 text-yellow-800'
                                                  : 'bg-red-100 text-red-800'
                                        }`}
                                    >
                                        {mentor.availability}
                                    </div>
                                </div>

                                {/* Header with Avatar */}
                                <div className="relative overflow-hidden bg-gradient-to-br from-[rgb(148,242,127)] to-[rgba(0,55,32,1)] p-8 text-white">
                                    <motion.div
                                        className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10"
                                        animate={{ rotate: selectedMentor === index ? 360 : 0 }}
                                        transition={{ duration: 2 }}
                                    />
                                    <div className="relative z-10">
                                        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/30 bg-white/20 text-2xl font-bold backdrop-blur-sm">
                                            {mentor.avatar}
                                        </div>
                                        <h3 className="mb-1 text-2xl font-bold">{mentor.name}</h3>
                                        <p className="mb-2 text-white/80">
                                            {mentor.role} at {mentor.company}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <Star className="h-4 w-4 fill-current" />
                                            <span className="font-semibold">{mentor.rating}</span>
                                            <span className="text-white/60">
                                                ({mentor.sessions} sessions)
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    {/* Expertise Tags */}
                                    <div className="mb-4 flex flex-wrap gap-2">
                                        {mentor.expertise.map((skill, skillIndex) => (
                                            <Badge
                                                key={skillIndex}
                                                variant="secondary"
                                                className="bg-gray-100 text-gray-700"
                                            >
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* Specialties */}
                                    <div className="mb-4">
                                        <h4 className="mb-2 font-semibold text-[rgba(14,15,12,1)]">
                                            Specialties
                                        </h4>
                                        <div className="space-y-1">
                                            {mentor.specialties.map((specialty, specIndex) => (
                                                <div
                                                    key={specIndex}
                                                    className="flex items-center gap-2 text-sm text-[rgba(106,108,106,1)]"
                                                >
                                                    <div className="h-1.5 w-1.5 rounded-full bg-[rgb(148,242,127)]" />
                                                    {specialty}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Details Grid */}
                                    <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <div className="text-[rgba(106,108,106,1)]">
                                                Experience
                                            </div>
                                            <div className="font-semibold text-[rgba(14,15,12,1)]">
                                                {mentor.experience}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-[rgba(106,108,106,1)]">Rate</div>
                                            <div className="font-semibold text-[rgba(14,15,12,1)]">
                                                {mentor.price}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-[rgba(106,108,106,1)]">
                                                Languages
                                            </div>
                                            <div className="font-semibold text-[rgba(14,15,12,1)]">
                                                {mentor.languages.join(', ')}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-[rgba(106,108,106,1)]">
                                                Next Slot
                                            </div>
                                            <div className="font-semibold text-[rgba(14,15,12,1)]">
                                                {mentor.nextSlot}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <Button className="flex-1 bg-[rgb(148,242,127)] text-[rgba(0,55,32,1)] hover:bg-[rgb(148,242,127)]/80">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            Book Session
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="border-gray-200"
                                        >
                                            <MessageSquare className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
