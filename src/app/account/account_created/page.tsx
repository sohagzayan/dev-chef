interface Props {
    searchParams?: { [key: string]: string | string[] | undefined };
}

export default function AccountCreatedPage({ searchParams }: Props) {
    const emailParam = searchParams?.user_email;
    const email = Array.isArray(emailParam) ? emailParam[0] : emailParam;

    return (
        <main className="min-h-[70vh] py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-xl rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:p-8">
                    <h1 className="text-center text-4xl font-extrabold text-gray-900">
                        Account created
                    </h1>
                    <p className="mt-3 text-center text-gray-600">
                        You&apos;re almost there. Click on the email verification link sent to{' '}
                        <span className="font-semibold text-gray-900">{email || 'your email'}</span>
                        .
                    </p>

                    <div className="mt-6 grid gap-3">
                        <a
                            href="/job-seekers/onboarding/step_1"
                            className="block w-full rounded-2xl bg-red-600 px-4 py-3 text-center font-bold text-white transition-colors hover:bg-red-700"
                        >
                            Verify and setup your account
                        </a>
                        <a
                            href="/account"
                            className="block w-full rounded-2xl border border-red-200 bg-white px-4 py-3 text-center font-bold text-red-600 transition-colors hover:bg-red-50"
                        >
                            Sign in
                        </a>
                    </div>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        It may take a minute to arrive. If you haven&apos;t received it yet,{' '}
                        <a href="#" className="font-semibold text-red-600 hover:underline">
                            click to resend the verification
                        </a>
                        .
                    </p>
                </div>
            </div>
        </main>
    );
}
