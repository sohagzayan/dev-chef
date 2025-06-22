'use client';

import { Filter, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface FiltersSidebarProps {
    filters: {
        difficulty: string;
        status: string;
        search: string;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onFiltersChange: (filters: any) => void;
}

export function FiltersSidebar({ filters, onFiltersChange }: FiltersSidebarProps) {
    return (
        <Card className="sticky top-28 border-0 shadow-lg">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                        <Filter className="h-4 w-4 text-white" />
                    </div>
                    Filters
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Enhanced Search */}
                <div>
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                        Search Problems
                    </label>
                    <div className="relative">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                        <Input
                            placeholder="Search by title or tag..."
                            className="border-gray-200 pl-10 focus:border-blue-500 focus:ring-blue-500"
                            value={filters.search}
                            onChange={(e) =>
                                onFiltersChange({ ...filters, search: e.target.value })
                            }
                        />
                    </div>
                </div>

                {/* Status Filter */}
                <div>
                    <label className="mb-3 block text-sm font-semibold text-gray-700">Status</label>
                    <div className="space-y-3">
                        {[
                            { status: 'Solved', icon: '✅', count: 45 },
                            { status: 'Attempted', icon: '🔄', count: 12 },
                            { status: 'Unsolved', icon: '⭕', count: 93 },
                        ].map(({ status, icon, count }) => (
                            <div key={status} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <Checkbox
                                        id={status}
                                        checked={filters.status === status}
                                        onCheckedChange={(checked) =>
                                            onFiltersChange({
                                                ...filters,
                                                status: checked ? status : '',
                                            })
                                        }
                                        className="border-gray-300"
                                    />
                                    <label
                                        htmlFor={status}
                                        className="flex items-center gap-2 text-sm"
                                    >
                                        <span>{icon}</span>
                                        {status}
                                    </label>
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                    {count}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Difficulty Filter */}
                <div>
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                        Difficulty
                    </label>
                    <Select
                        value={filters.difficulty}
                        onValueChange={(value) =>
                            onFiltersChange({ ...filters, difficulty: value })
                        }
                    >
                        <SelectTrigger className="border-gray-200 focus:border-blue-500">
                            <SelectValue placeholder="All difficulties" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All difficulties">All difficulties</SelectItem>
                            <SelectItem value="Easy">🟢 Easy</SelectItem>
                            <SelectItem value="Medium">🟡 Medium</SelectItem>
                            <SelectItem value="Hard">🔴 Hard</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Companies */}
                <div>
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                        Companies
                    </label>
                    <div className="max-h-32 space-y-2 overflow-y-auto">
                        {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix'].map(
                            (company) => (
                                <div key={company} className="flex items-center space-x-2">
                                    <Checkbox id={company} className="border-gray-300" />
                                    <label htmlFor={company} className="text-sm">
                                        {company}
                                    </label>
                                </div>
                            ),
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
