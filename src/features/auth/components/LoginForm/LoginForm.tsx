'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAction, type LoginActionResult } from '../../actions';

export function LoginForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
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
                    className="mt-1 block w-full rounded-md border px-3 py-2"
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
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                />
            </div>

            {errors.form && <div className="text-sm text-red-600">{errors.form}</div>}

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
}
