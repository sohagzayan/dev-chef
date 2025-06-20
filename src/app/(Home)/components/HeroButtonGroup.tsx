import { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { Wrench, Zap } from 'lucide-react';

export default function HeroButtonGroup() {
    const [isClient, setIsClient] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const button1Ref = useRef<HTMLButtonElement>(null);
    const button2Ref = useRef<HTMLButtonElement>(null);

    const button1X = useSpring(0, { stiffness: 150, damping: 15 });
    const button1Y = useSpring(0, { stiffness: 150, damping: 15 });
    const button2X = useSpring(0, { stiffness: 150, damping: 15 });
    const button2Y = useSpring(0, { stiffness: 150, damping: 15 });

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distance < 200) {
                const force = Math.max(0, 1 - distance / 200);
                button1X.set(deltaX * force * 0.1);
                button1Y.set(deltaY * force * 0.1);
                button2X.set(-deltaX * force * 0.08);
                button2Y.set(-deltaY * force * 0.08);
            } else {
                button1X.set(0);
                button1Y.set(0);
                button2X.set(0);
                button2Y.set(0);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [button1X, button1Y, button2X, button2Y]);

    if (!isClient) {
        return null;
    }

    return (
        <div ref={containerRef} className="flex items-center justify-center gap-6">
            <motion.button
                ref={button1Ref}
                style={{ x: button1X, y: button1Y }}
                className="group relative overflow-hidden"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <motion.div
                    className="relative flex h-11 w-40 items-center justify-center gap-2 text-sm font-bold text-white"
                    initial={{ borderRadius: '12px' }}
                    whileHover={{ borderRadius: '20px' }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"
                        initial={{ borderRadius: '12px' }}
                        whileHover={{
                            borderRadius: '20px',
                            background:
                                'linear-gradient(45deg, #94f27f, #94f27f, #79d65e, #94f27f)',
                        }}
                        animate={{
                            background: [
                                'linear-gradient(0deg, #94f27f, #79d65e, #79d65e)',
                                'linear-gradient(120deg, #79d65e, #79d65e, #94f27f)',
                                'linear-gradient(240deg, #79d65e, #94f27f, #79d65e)',
                                'linear-gradient(360deg, #94f27f, #79d65e, #79d65e)',
                            ],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: 'linear',
                        }}
                    />

                    {/* Morphing blob overlay */}
                    <motion.div
                        className="absolute inset-0 bg-white/10"
                        initial={{ borderRadius: '12px' }}
                        whileHover={{
                            borderRadius: ['20px', '25px', '15px', '20px'],
                            scale: [1, 1.05, 0.98, 1],
                        }}
                        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                    />

                    {/* Content */}
                    <motion.div
                        className="relative z-10 flex items-center gap-2"
                        whileHover={{ y: [-1, 1, -1] }}
                        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                        <motion.div
                            whileHover={{
                                rotate: [0, 180, 360],
                                scale: [1, 1.3, 1],
                            }}
                            transition={{ duration: 0.6 }}
                        >
                            <Zap className="h-4 w-4" />
                        </motion.div>
                        <span>Try Now, No Cost</span>
                    </motion.div>

                    {/* Particle effects */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute h-1 w-1 rounded-full bg-white"
                                style={{
                                    left: `${20 + Math.random() * 60}%`,
                                    top: `${20 + Math.random() * 60}%`,
                                }}
                                animate={{
                                    scale: [0, 1, 0],
                                    opacity: [0, 1, 0],
                                    x: [0, (Math.random() - 0.5) * 40],
                                    y: [0, (Math.random() - 0.5) * 40],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Number.POSITIVE_INFINITY,
                                    delay: i * 0.2,
                                    ease: 'easeOut',
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            </motion.button>

            {/* Hack Away Button */}
            <motion.button
                ref={button2Ref}
                style={{ x: button2X, y: button2Y }}
                className="group relative overflow-hidden"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <motion.div
                    className="relative flex h-11 w-40 items-center justify-center gap-2 text-sm font-bold"
                    initial={{ borderRadius: '12px' }}
                    whileHover={{ borderRadius: ['12px', '6px', '18px', '12px'] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                    {/* Glassmorphism background */}
                    <motion.div
                        className="absolute inset-0 border border-white/30 bg-white/20 backdrop-blur-md"
                        initial={{ borderRadius: '12px' }}
                        whileHover={{
                            borderRadius: ['12px', '6px', '18px', '12px'],
                            background: 'rgba(255,255,255,0.3)',
                        }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    />

                    {/* Animated grid pattern */}
                    <motion.div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `
                linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
              `,
                            backgroundSize: '8px 8px',
                        }}
                        animate={{
                            backgroundPosition: ['0px 0px', '8px 8px', '0px 0px'],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: 'linear',
                        }}
                    />

                    {/* Content */}
                    <motion.div
                        className="relative z-10 flex items-center gap-2 text-gray-800"
                        whileHover={{
                            textShadow: '0 0 8px rgba(0,0,0,0.3)',
                        }}
                    >
                        <motion.div
                            whileHover={{
                                rotateY: [0, 180, 360],
                                rotateX: [0, 180, 0],
                            }}
                            transition={{ duration: 0.8 }}
                        >
                            <Wrench className="h-4 w-4" />
                        </motion.div>
                        <motion.span
                            whileHover={{
                                letterSpacing: '0.1em',
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            For developer
                        </motion.span>
                    </motion.div>

                    {/* Glitch effect overlay */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100"
                        animate={{
                            x: ['-100%', '100%'],
                            skewX: [0, 15, -15, 0],
                        }}
                        transition={{
                            duration: 0.6,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatDelay: 2,
                        }}
                    />
                </motion.div>
            </motion.button>
        </div>
    );
}
