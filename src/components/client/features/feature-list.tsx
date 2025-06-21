'use client';

import type React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface Feature {
    text: string;
    icon?: React.ComponentType<{ className?: string }>;
}

interface FeatureListProps {
    features: Feature[];
    title?: string;
}

export function FeatureList({ features, title }: FeatureListProps) {
    return (
        <div className="space-y-4 pt-4">
            {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
            {features.map((feature, index) => {
                const IconComponent = feature.icon || CheckCircle;
                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center space-x-3"
                    >
                        <IconComponent className="text-success-100 h-5 w-5 flex-shrink-0" />
                        <span className="text-white">{feature.text}</span>
                    </motion.div>
                );
            })}
        </div>
    );
}
