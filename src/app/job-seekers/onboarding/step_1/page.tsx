import Stepper from '@/features/onboarding/ui/Stepper';

export default function JobSeekerOnboardingStep1Page() {
    return (
        <main className="min-h-[70vh] py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-3xl">
                    {/* Step progress */}
                    <div className="mb-4">
                        <Stepper currentStep={1} totalSteps={3} />
                    </div>

                    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:p-8">
                        <h1 className="text-center text-3xl font-extrabold text-gray-900">
                            About you
                        </h1>
                        <p className="mt-2 text-center text-gray-600">
                            Tell us about yourself so companies know who you are.
                        </p>

                        <form className="mt-6 space-y-5">
                            {/* Upload */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-800">
                                    Upload Your Resume/CV <span className="text-red-600">*</span>
                                </label>
                                <div className="mt-2 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-600">
                                    Click or drag your file here to upload
                                    <div className="mt-1 text-[11px] text-gray-400">
                                        (File types: PDF, DOCX)
                                    </div>
                                </div>
                            </div>

                            {/* Full name */}
                            <div>
                                <label
                                    htmlFor="fullName"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Your full name <span className="text-red-600">*</span>
                                </label>
                                <input
                                    id="fullName"
                                    type="text"
                                    placeholder="Full Name"
                                    className="mt-2 block w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-red-300 focus:ring-4 focus:ring-red-100 focus:outline-none"
                                />
                            </div>

                            {/* Experience Level */}
                            <div>
                                <label
                                    htmlFor="experience"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Experience Level <span className="text-red-600">*</span>
                                </label>
                                <select
                                    id="experience"
                                    className="mt-2 block w-full appearance-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-red-300 focus:ring-4 focus:ring-red-100 focus:outline-none"
                                >
                                    <option value="">Select Experience Level</option>
                                    <option>Entry</option>
                                    <option>Mid</option>
                                    <option>Senior</option>
                                    <option>Lead/Manager</option>
                                </select>
                            </div>

                            {/* Job Status */}
                            <div>
                                <label
                                    htmlFor="jobStatus"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Job Status <span className="text-red-600">*</span>
                                </label>
                                <select
                                    id="jobStatus"
                                    className="mt-2 block w-full appearance-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-red-300 focus:ring-4 focus:ring-red-100 focus:outline-none"
                                >
                                    <option value="">Select Job Status</option>
                                    <option>Actively looking</option>
                                    <option>Open to offers</option>
                                    <option>Not looking</option>
                                </select>
                            </div>

                            {/* Salary Range */}
                            <div>
                                <label
                                    htmlFor="salary"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Preferred Salary Range <span className="text-red-600">*</span>
                                </label>
                                <select
                                    id="salary"
                                    className="mt-2 block w-full appearance-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-red-300 focus:ring-4 focus:ring-red-100 focus:outline-none"
                                >
                                    <option value="">Preferred Salary Range</option>
                                    <option>$10,000 - $25,000 USD</option>
                                    <option>$25,000 - $48,999 USD</option>
                                    <option>$50,000 - $74,999 USD</option>
                                    <option>$75,000 - $99,999 USD</option>
                                    <option>$100,000 or more USD</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-end pt-2">
                                <a
                                    href="/job-seekers/onboarding/step_2"
                                    className="inline-flex items-center justify-center rounded-2xl bg-red-600 px-5 py-3 font-bold text-white hover:bg-red-700"
                                >
                                    Continue
                                </a>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </main>
    );
}
