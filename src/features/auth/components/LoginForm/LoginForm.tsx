'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { m } from 'framer-motion';
import { loginAction, type LoginActionResult } from '../../actions';

export function LoginForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [keepSignedIn, setKeepSignedIn] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            const formDataObj = new FormData();
            formDataObj.append('email', formData.email);
            formDataObj.append('password', formData.password);

            const result: LoginActionResult = await loginAction(formDataObj);

            if (result.success) {
                // Redirect to dashboard on success
                router.push('/dashboard');
                router.refresh();
            } else {
                setErrors({ form: result.error || 'Login failed' });
            }
        } catch (error) {
            if (error instanceof Error) {
                setErrors({ form: error.message });
            } else {
                setErrors({ form: 'An unexpected error occurred' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 block w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-all duration-200 placeholder:text-gray-400 focus:border-red-300 focus:ring-4 focus:ring-red-100 focus:outline-none"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="mt-1 block w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-all duration-200 placeholder:text-gray-400 focus:border-red-300 focus:ring-4 focus:ring-red-100 focus:outline-none"
                />
            </div>

            <div className="flex items-center justify-between">
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-800">
                    <input
                        type="checkbox"
                        checked={keepSignedIn}
                        onChange={(e) => setKeepSignedIn(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-red-600 shadow-sm transition-colors focus:ring-red-200"
                    />
                    Keep me signed in
                </label>
                <a
                    href="/job-seekers/account/password/new"
                    className="text-sm font-semibold text-red-600 hover:underline"
                >
                    Forgot your password?
                </a>
            </div>

            {errors.form && <div className="text-sm text-red-600">{errors.form}</div>}

            <m.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full rounded-2xl bg-red-600 px-4 py-3 text-base font-bold text-white shadow-sm transition-colors hover:bg-red-700 disabled:opacity-50"
            >
                {loading ? 'Logging in...' : 'Sign in'}
            </m.button>
        </form>
    );
}
