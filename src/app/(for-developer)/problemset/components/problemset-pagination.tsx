'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProblemsetPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    loading?: boolean;
}

export function ProblemsetPagination({
    currentPage,
    totalPages,
    onPageChange,
    loading = false,
}: ProblemsetPaginationProps) {
    if (totalPages <= 1) {
        return null;
    }

    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (
            let i = Math.max(2, currentPage - delta);
            i <= Math.min(totalPages - 1, currentPage + delta);
            i++
        ) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        } else {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="flex items-center justify-center space-x-2 py-8">
            {/* Previous button */}
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
                className="border-gray-600 bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:hover:bg-gray-800/50 disabled:hover:text-gray-300"
            >
                <ChevronLeft className="h-4 w-4" />
                <span className="ml-1">Previous</span>
            </Button>

            {/* Page numbers */}
            <div className="flex items-center space-x-1">
                {visiblePages.map((page, index) => (
                    <div key={index}>
                        {page === '...' ? (
                            <span className="px-3 py-2 text-gray-400">...</span>
                        ) : (
                            <Button
                                variant={currentPage === page ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => onPageChange(page as number)}
                                disabled={loading}
                                className={
                                    currentPage === page
                                        ? 'border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-700'
                                        : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:text-white'
                                }
                            >
                                {page}
                            </Button>
                        )}
                    </div>
                ))}
            </div>

            {/* Next button */}
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages || loading}
                className="border-gray-600 bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:hover:bg-gray-800/50 disabled:hover:text-gray-300"
            >
                <span className="mr-1">Next</span>
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}
