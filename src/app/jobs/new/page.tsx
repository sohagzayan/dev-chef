import { JobPostForm } from '@/features/jobs/components/JobPostForm';

export default function NewJobPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Post a remote job (FREE)</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Hirely Talent is for jobs that can be worked on remotely.{' '}
                        <a href="#" className="text-blue-600 hover:underline">
                            Learn more
                        </a>
                    </p>
                    <p className="mt-1 text-sm text-gray-500">Please use English</p>
                </div>

                <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                    {/* Main Form - Left Column (2/3 width) */}
                    <div className="lg:col-span-2">
                        <JobPostForm />
                    </div>

                    {/* FAQ Section - Right Column (1/3 width) */}
                    <div className="mt-8 lg:col-span-1 lg:mt-0">
                        <div className="sticky top-8 rounded-lg border border-gray-200 bg-white p-6">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900">FAQ</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">
                                        Q: Is there a fee to post a job?
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-600">
                                        There are no fees for posting a job on Hirely Talent. It is
                                        a 100% free service that we offer both for the employer and
                                        the contractor.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">
                                        Q: How do I find contractors for my job?
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-600">
                                        Posting a job on Hirely Talent will get your project in
                                        front of the most qualified contractors and agencies. You
                                        will then get applications for the job with the
                                        applicant&apos;s details and reasons why they are the best
                                        fit for the job. You can also search for contractors and
                                        invite them to apply.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">
                                        Q: How do I pay contractors?
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-600">
                                        You&apos;re free to pay your contractors however you want.
                                        If you use Hirely for time tracking, you can have your team
                                        paid automatically for their work through Paypal, Payoneer,
                                        or Bitwage (which allows you to pay via credit card, debit
                                        card, wire transfer, and more).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
