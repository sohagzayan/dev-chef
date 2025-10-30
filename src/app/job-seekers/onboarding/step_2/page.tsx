import LocationPreferences from '@/features/onboarding/ui/LocationPreferences';
import Stepper from '@/features/onboarding/ui/Stepper';

export default function JobSeekerOnboardingStep2Page() {
    return (
        <main className="min-h-[70vh] py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-3xl">
                    {/* Step progress */}
                    <div className="mb-4">
                        <Stepper currentStep={2} totalSteps={3} />
                    </div>

                    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:p-8">
                        <h1 className="text-center text-3xl font-extrabold text-gray-900">
                            Curate your search
                        </h1>
                        <p className="mt-2 text-center text-gray-600">
                            Select your preferences. You can always edit this information later.
                        </p>

                        <div className="mt-6">
                            <LocationPreferences />
                        </div>

                        <h2 className="pt-8 text-center text-2xl font-extrabold text-gray-900">
                            Work authorization
                        </h2>

                        {/* Authorized to work */}
                        <fieldset className="mt-6 space-y-3">
                            <legend className="text-sm font-semibold text-gray-800">
                                Are you authorized to work in the US?
                            </legend>
                            <div className="flex items-center gap-6">
                                <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                                    <input
                                        type="radio"
                                        name="auth_us"
                                        className="h-4 w-4 text-red-600"
                                    />{' '}
                                    Yes
                                </label>
                                <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                                    <input
                                        type="radio"
                                        name="auth_us"
                                        className="h-4 w-4 text-red-600"
                                        defaultChecked
                                    />{' '}
                                    No
                                </label>
                            </div>
                        </fieldset>

                        {/* Sponsorship */}
                        <fieldset className="mt-8 space-y-3">
                            <legend className="text-sm font-semibold text-gray-800">
                                Will you now or in the future require sponsorship for employment
                                visa status?
                            </legend>
                            <div className="flex items-center gap-6">
                                <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                                    <input
                                        type="radio"
                                        name="sponsor"
                                        className="h-4 w-4 text-red-600"
                                    />{' '}
                                    Yes
                                </label>
                                <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                                    <input
                                        type="radio"
                                        name="sponsor"
                                        className="h-4 w-4 text-red-600"
                                        defaultChecked
                                    />{' '}
                                    No
                                </label>
                            </div>
                        </fieldset>

                        <div className="flex items-center justify-between pt-8">
                            <a
                                href="/job-seekers/onboarding/step_1"
                                className="rounded-2xl border border-gray-200 bg-white px-5 py-3 font-bold text-gray-700 hover:bg-gray-50"
                            >
                                Previous
                            </a>
                            <a
                                href="/job-seekers/onboarding/step_3"
                                className="rounded-2xl bg-red-600 px-5 py-3 font-bold text-white hover:bg-red-700"
                            >
                                Continue
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
