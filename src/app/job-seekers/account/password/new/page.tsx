export default function JobSeekerPasswordResetPage() {
    return (
        <main className="min-h-[70vh] py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-xl rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:p-8">
                    <h1 className="text-center text-4xl font-extrabold text-gray-900">
                        Reset your password
                    </h1>
                    <p className="mt-3 text-center text-gray-600">
                        Enter your email and we&apos;ll send you instructions to generate a new
                        password for your job seeker account.
                    </p>

                    <form className="mt-6 space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="mt-1 block w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-all duration-200 placeholder:text-gray-400 focus:border-red-300 focus:ring-4 focus:ring-red-100 focus:outline-none"
                                placeholder="Your email"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-2xl bg-red-600 px-4 py-3 text-base font-bold text-white shadow-sm transition-colors hover:bg-red-700"
                        >
                            Send me reset password instructions
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Didn&apos;t receive confirmation instructions?{' '}
                        <a href="#" className="font-semibold text-red-600 hover:underline">
                            Resend
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}
