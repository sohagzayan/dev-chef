'use client';

import { useEffect, useRef } from 'react';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

interface DualRangeSliderProps {
    min: number;
    max: number;
    step?: number;
    value: [number, number];
    onChange: (value: [number, number]) => void;
    formatValue?: (value: number) => string;
    className?: string;
}

export function DualRangeSlider({
    min,
    max,
    step = 1,
    value,
    onChange,
    formatValue,
    className = '',
}: DualRangeSliderProps) {
    const sliderRef = useRef<HTMLDivElement>(null);
    const sliderInstance = useRef<noUiSlider.Instance | null>(null);

    useEffect(() => {
        if (!sliderRef.current) return;

        // Initialize noUiSlider
        noUiSlider.create(sliderRef.current, {
            start: value,
            connect: true,
            range: {
                min,
                max,
            },
            step,
            pips: {
                mode: 'positions',
                values: [0, 100],
                density: 0,
                format: {
                    to: (val: number) => {
                        if (formatValue) {
                            return formatValue(val);
                        }
                        return val.toString();
                    },
                    from: (val: string) => Number(val),
                },
            },
        });

        sliderInstance.current = sliderRef.current.noUiSlider;

        // Listen to slider updates
        sliderRef.current.noUiSlider.on('update', (values) => {
            const [minVal, maxVal] = values.map(Number) as [number, number];
            onChange([minVal, maxVal]);
        });

        // Cleanup
        return () => {
            if (sliderInstance.current) {
                sliderInstance.current.destroy();
                sliderInstance.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only run once on mount

    // Update slider when value prop changes (from external source)
    useEffect(() => {
        if (sliderInstance.current) {
            const currentValues = sliderInstance.current.get() as number[];
            if (
                Math.abs(currentValues[0] - value[0]) > 0.01 ||
                Math.abs(currentValues[1] - value[1]) > 0.01
            ) {
                sliderInstance.current.set(value);
            }
        }
    }, [value]);

    return <div ref={sliderRef} className={className} id="payrate" />;
}
