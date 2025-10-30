'use client';

import { useMemo, useState } from 'react';

interface ChipProps {
    value: string;
    onRemove: (v: string) => void;
}

function Chip({ value, onRemove }: ChipProps) {
    return (
        <span className="inline-flex items-center gap-2 rounded-xl bg-blue-100 px-3 py-2 text-base font-semibold text-gray-900">
            {value}
            <button
                type="button"
                aria-label={`Remove ${value}`}
                className="text-gray-700 hover:text-gray-900"
                onClick={() => onRemove(value)}
            >
                ×
            </button>
        </span>
    );
}

export default function LocationPreferences() {
    // Regions suggestions
    const regionSuggestions = useMemo(
        () => [
            'Anywhere in the World',
            'North America Only',
            'Latin America Only',
            'Americas Only',
            'Europe Only',
            'UK Only',
            'EMEA Only',
            'Asia Only',
            'Africa Only',
            'Oceania Only',
        ],
        [],
    );

    // Timezone suggestions
    const timezoneSuggestions = useMemo(
        () => [
            'EST (UTC -5)',
            'CST (UTC -6)',
            'MST (UTC -7)',
            'PST (UTC -8)',
            'AKST (UTC -9)',
            'HST (UTC -10)',
            'ART (UTC -3)',
            'UTC -4',
            'UTC -4:30',
            'UTC -3',
            'UTC -2',
            'SBT (UTC +11)',
            'GMT (UTC +0)',
            'CET (UTC +1)',
            'EET (UTC +2)',
            'MSK (UTC +3)',
            'AST (UTC -4)',
            'FKST (UTC -3)',
            'NST (UTC -3:30)',
            'CEST (UTC +2)',
            'BST (UTC +1)',
            'JST (UTC +9)',
            'CST (UTC +8)',
            'WIB (UTC +7)',
            'MMT (UTC +6:30)',
            'BST (UTC +6)',
            'NPT (UTC +5:45)',
            'IST (UTC +5:30)',
            'UZT (UTC +5)',
            'IRDT (UTC +4:30)',
            'GST (UTC +4)',
            'CVT (UTC -1)',
            'WAT (UTC +1)',
            'SAST (UTC +2)',
            'EAT (UTC +3)',
            'LINT (UTC +14)',
            'TOT (UTC +13)',
            'CHAST (UTC +12:45)',
            'LHST (UTC +10:30)',
            'AEST (UTC +10)',
            'ACST (UTC +9:30)',
            'ACWST (UTC +8:45)',
            'MART (UTC -9:30)',
            'NUT (UTC -11)',
        ],
        [],
    );

    // Countries (expanded list sample)
    const countrySuggestions = useMemo(
        () => [
            'United States',
            'United Kingdom',
            'Canada',
            'Germany',
            'France',
            'Spain',
            'Italy',
            'Netherlands',
            'Sweden',
            'Norway',
            'Denmark',
            'Poland',
            'Portugal',
            'Ireland',
            'Switzerland',
            'Austria',
            'Czech Republic',
            'Finland',
            'Belgium',
            'Greece',
            'Hungary',
            'Romania',
            'Bulgaria',
            'Croatia',
            'Serbia',
            'Turkey',
            'Russia',
            'Ukraine',
            'India',
            'Pakistan',
            'Bangladesh',
            'Sri Lanka',
            'Nepal',
            'United Arab Emirates',
            'Saudi Arabia',
            'Qatar',
            'Oman',
            'Kuwait',
            'Israel',
            'South Africa',
            'Egypt',
            'Kenya',
            'Nigeria',
            'Ghana',
            'Morocco',
            'Ethiopia',
            'China',
            'Japan',
            'South Korea',
            'Singapore',
            'Malaysia',
            'Thailand',
            'Indonesia',
            'Philippines',
            'Vietnam',
            'Australia',
            'New Zealand',
            'Mexico',
            'Brazil',
            'Argentina',
            'Chile',
            'Colombia',
            'Peru',
        ],
        [],
    );

    const [regions, setRegions] = useState<string[]>([]);
    const [regionQuery, setRegionQuery] = useState('');
    const [showRegionList, setShowRegionList] = useState(false);
    const filteredRegions = useMemo(() => {
        const q = regionQuery.trim().toLowerCase();
        if (!q) return regionSuggestions.filter((r) => !regions.includes(r));
        return regionSuggestions.filter((r) => r.toLowerCase().includes(q) && !regions.includes(r));
    }, [regionQuery, regionSuggestions, regions]);

    const [timezones, setTimezones] = useState<string[]>([]);
    const [tzQuery, setTzQuery] = useState('');
    const [showTzList, setShowTzList] = useState(false);
    const filteredTz = useMemo(() => {
        const q = tzQuery.trim().toLowerCase();
        if (!q) return timezoneSuggestions.filter((r) => !timezones.includes(r));
        return timezoneSuggestions.filter(
            (r) => r.toLowerCase().includes(q) && !timezones.includes(r),
        );
    }, [tzQuery, timezoneSuggestions, timezones]);

    const [countryQuery, setCountryQuery] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [showCountryList, setShowCountryList] = useState(false);
    const filteredCountries = useMemo(() => {
        const q = countryQuery.trim().toLowerCase();
        if (!q) return countrySuggestions;
        return countrySuggestions.filter((c) => c.toLowerCase().includes(q));
    }, [countryQuery, countrySuggestions]);

    const addRegion = (v: string) => setRegions((prev) => [...prev, v]);
    const removeRegion = (v: string) => setRegions((prev) => prev.filter((x) => x !== v));
    const addTz = (v: string) => setTimezones((prev) => [...prev, v]);
    const removeTz = (v: string) => setTimezones((prev) => prev.filter((x) => x !== v));

    return (
        <div className="space-y-6">
            {/* Regions */}
            <div>
                <label className="block text-sm font-semibold text-gray-800">
                    Region(s) You're Able To Work In <span className="text-red-600">*</span>
                </label>
                <div className="relative mt-2">
                    <div className="flex items-center rounded-2xl border border-gray-200 bg-white px-4 py-2 text-gray-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-5 w-5"
                        >
                            <path d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.75 3.75a7.5 7.5 0 0012.9 12.9z" />
                        </svg>
                        <input
                            value={regionQuery}
                            onChange={(e) => setRegionQuery(e.target.value)}
                            onFocus={() => setShowRegionList(true)}
                            onBlur={() => setTimeout(() => setShowRegionList(false), 100)}
                            placeholder="Select your preferred regions"
                            className="ml-3 w-full border-0 p-0 text-base outline-none placeholder:text-gray-400"
                        />
                    </div>
                    {showRegionList && filteredRegions.length > 0 && (
                        <div className="absolute right-0 left-0 z-10 mt-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
                            <ul className="max-h-64 overflow-y-auto py-2">
                                {filteredRegions.map((r) => (
                                    <li key={r}>
                                        <button
                                            type="button"
                                            className="flex w-full items-center justify-between px-4 py-2 text-left text-sm font-semibold text-gray-700 hover:bg-gray-50"
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={() => {
                                                addRegion(r);
                                                setRegionQuery('');
                                            }}
                                        >
                                            <span>{r}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                {regions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-3">
                        {regions.map((s) => (
                            <Chip key={s} value={s} onRemove={removeRegion} />
                        ))}
                    </div>
                )}
            </div>

            {/* Time zones */}
            <div>
                <label className="block text-sm font-semibold text-gray-800">
                    Preferred Time Zones <span className="text-red-600">*</span>
                </label>
                <div className="relative mt-2">
                    <div className="flex items-center rounded-2xl border border-gray-200 bg-white px-4 py-2 text-gray-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-5 w-5"
                        >
                            <path d="M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5zM12.75 6a.75.75 0 00-1.5 0v6c0 .199.079.39.22.53l3 3a.75.75 0 101.06-1.06l-2.78-2.78V6z" />
                        </svg>
                        <input
                            value={tzQuery}
                            onChange={(e) => setTzQuery(e.target.value)}
                            onFocus={() => setShowTzList(true)}
                            onBlur={() => setTimeout(() => setShowTzList(false), 100)}
                            placeholder="Select your preferred time zones"
                            className="ml-3 w-full border-0 p-0 text-base outline-none placeholder:text-gray-400"
                        />
                    </div>
                    {showTzList && filteredTz.length > 0 && (
                        <div className="absolute right-0 left-0 z-10 mt-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
                            <ul className="max-h-64 overflow-y-auto py-2">
                                {filteredTz.map((r) => (
                                    <li key={r}>
                                        <button
                                            type="button"
                                            className="flex w-full items-center justify-between px-4 py-2 text-left text-sm font-semibold text-gray-700 hover:bg-gray-50"
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={() => {
                                                addTz(r);
                                                setTzQuery('');
                                            }}
                                        >
                                            <span>{r}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                {timezones.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-3">
                        {timezones.map((s) => (
                            <Chip key={s} value={s} onRemove={removeTz} />
                        ))}
                    </div>
                )}
            </div>

            {/* Country */}
            <div>
                <label className="block text-sm font-semibold text-gray-800">
                    Country <span className="text-red-600">*</span>
                </label>
                <div className="relative mt-2">
                    <div className="flex items-center rounded-2xl border border-gray-200 bg-white px-4 py-2 text-gray-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-5 w-5"
                        >
                            <path d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.75 3.75a7.5 7.5 0 0012.9 12.9z" />
                        </svg>
                        <input
                            value={selectedCountry || countryQuery}
                            onChange={(e) => {
                                setSelectedCountry('');
                                setCountryQuery(e.target.value);
                            }}
                            onFocus={() => setShowCountryList(true)}
                            onBlur={() => setTimeout(() => setShowCountryList(false), 100)}
                            placeholder="Search country..."
                            className="ml-3 w-full border-0 p-0 text-base outline-none placeholder:text-gray-400"
                        />
                    </div>
                    {showCountryList && filteredCountries.length > 0 && (
                        <div className="absolute right-0 left-0 z-10 mt-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
                            <ul className="max-h-64 overflow-y-auto py-2">
                                {filteredCountries.map((c) => (
                                    <li key={c}>
                                        <button
                                            type="button"
                                            className="flex w-full items-center justify-between px-4 py-2 text-left text-sm font-semibold text-gray-700 hover:bg-gray-50"
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={() => {
                                                setSelectedCountry(c);
                                                setCountryQuery(c);
                                                setShowCountryList(false);
                                            }}
                                        >
                                            <span>{c}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                {/* Single-select: value shown in field above */}
            </div>
        </div>
    );
}
