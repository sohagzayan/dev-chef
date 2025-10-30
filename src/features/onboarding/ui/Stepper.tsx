interface StepperProps {
    currentStep: number; // 1-indexed
    totalSteps: number;
    className?: string;
}

// Server component: lightweight, no client JS needed
export default function Stepper({ currentStep, totalSteps, className = '' }: StepperProps) {
    const clampedCurrent = Math.max(1, Math.min(currentStep, totalSteps));
    const progress = (clampedCurrent / totalSteps) * 100;

    return (
        <div className={className} aria-label={`Step ${clampedCurrent} of ${totalSteps}`}>
            <div className="text-xs font-bold text-gray-700">{`STEP ${clampedCurrent} OF ${totalSteps}`}</div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200">
                <div
                    className="h-1.5 rounded-full bg-red-600"
                    style={{ width: `${progress}%` }}
                    aria-hidden="true"
                />
            </div>
        </div>
    );
}
