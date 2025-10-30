import Stepper from '@/features/onboarding/ui/Stepper';

export default function JobSeekerOnboardingStep3Page() {
    return (
        <main className="min-h-[70vh] py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-3xl">
                    <div className="mb-4">
                        <Stepper currentStep={3} totalSteps={3} />
                    </div>

                    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:p-8">
                        <h1 className="text-center text-3xl font-extrabold text-gray-900">
                            Get Full Access to All We Work Remotely Jobs
                        </h1>
                        <p className="mt-2 text-center text-gray-600">
                            Accelerate your remote job search for less than a coffee ☕
                        </p>

                        {/* Pricing highlight */}
                        <div className="mt-6 rounded-2xl border border-gray-200 bg-indigo-50 p-5">
                            <div className="text-sm text-gray-500 line-through">$14.95/month</div>
                            <div className="mt-1 text-3xl font-extrabold text-gray-900">
                                $2.95<span className="text-sm font-semibold">/first month</span>
                            </div>
                            <p className="mt-2 text-sm text-gray-700">
                                Unlock everything you need to accelerate your remote job search for
                                just $2.95 for your first month, then $14.95/month.
                            </p>
                        </div>

                        {/* Mock payment form (non-functional) */}
                        <div className="mt-8 space-y-4">
                            <h2 className="text-lg font-extrabold text-gray-900">Payment Method</h2>

                            <label className="block text-sm font-medium text-gray-800">
                                Card Number
                            </label>
                            <input
                                className="w-full rounded-2xl border border-gray-200 px-4 py-3"
                                placeholder="1234 1234 1234 1234"
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-800">
                                        Expiration
                                    </label>
                                    <input
                                        className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3"
                                        placeholder="MM / YY"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-800">
                                        CVC
                                    </label>
                                    <input
                                        className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3"
                                        placeholder="CVC"
                                    />
                                </div>
                            </div>

                            <h3 className="mt-6 text-lg font-extrabold text-gray-900">
                                Billing Address
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-1">
                                    <label className="block text-sm font-medium text-gray-800">
                                        Country
                                    </label>
                                    <input
                                        className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3"
                                        placeholder="United States"
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="block text-sm font-medium text-gray-800">
                                        State/Province
                                    </label>
                                    <input
                                        className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3"
                                        placeholder="Alabama"
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="block text-sm font-medium text-gray-800">
                                        Zip Code
                                    </label>
                                    <input
                                        className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3"
                                        placeholder="Zip Code"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 text-right text-sm text-gray-700">
                                <div>
                                    Subtotal <span className="ml-4 font-semibold">$14.95</span>
                                </div>
                                <div>
                                    Discount <span className="ml-4 font-semibold">-$12.00</span>
                                </div>
                                <div>
                                    % Tax <span className="ml-4 font-semibold">$0.00</span>
                                </div>
                                <div className="mt-2 text-lg font-extrabold">
                                    Billed now <span className="ml-4">$2.95</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between">
                            <a
                                href="/job-seekers/onboarding/step_2"
                                className="rounded-2xl border border-gray-200 bg-white px-5 py-3 font-bold text-gray-700 hover:bg-gray-50"
                            >
                                Previous
                            </a>
                            <a
                                href="/"
                                className="rounded-2xl bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-700"
                            >
                                Get Full Access
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
