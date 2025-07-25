import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { AuthState, NavItem } from '@/types/client/common/navbar-types';

interface DesktopMenuProps {
    navItems: NavItem[];
    authState: AuthState;
    pathname: string;
    hoveredItem: string | null;
    setHoveredItem: (item: string | null) => void;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({
    navItems,
    authState,
    pathname,
    hoveredItem,
    setHoveredItem,
}) => {
    return (
        <nav className="hidden flex-1 items-center gap-1 md:flex md:gap-2 lg:gap-6">
            {navItems.map((item, index) => (
                <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    {item.dropdown ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        'group relative flex items-center gap-1 rounded-xl transition-all duration-300 hover:bg-gray-100/50',
                                        item.name === 'Store' && authState.isAuthenticated
                                            ? 'text-[rgba(0,55,32,1)]'
                                            : '',
                                    )}
                                    onMouseEnter={() => setHoveredItem(item.name)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    {item.name}
                                    <motion.div
                                        animate={{
                                            rotate: hoveredItem === item.name ? 180 : 0,
                                        }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                        <ChevronDown className="h-4 w-4" />
                                    </motion.div>
                                    <motion.div
                                        className={cn(
                                            'absolute -bottom-1 left-0 h-0.5 w-0 rounded-full',
                                            authState.isAuthenticated
                                                ? 'bg-[rgba(0,55,32,1)]'
                                                : 'bg-[rgba(0,55,32,1)]',
                                        )}
                                        animate={{
                                            width: hoveredItem === item.name ? '100%' : '0%',
                                        }}
                                        transition={{ duration: 0.4, ease: 'easeOut' }}
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="start"
                                className={cn(
                                    'animate-in fade-in-80 slide-in-from-top-5 border-0 shadow-xl backdrop-blur-xl',
                                    authState.isAuthenticated
                                        ? 'bg-white/95'
                                        : 'border-gray-700 bg-gray-800/95 text-white',
                                )}
                            >
                                <AnimatePresence>
                                    {item?.dropdown?.map((subItem, subIndex) => (
                                        <motion.div
                                            key={subItem.name}
                                            initial={{ opacity: 0, x: -20, scale: 0.95 }}
                                            animate={{ opacity: 1, x: 0, scale: 1 }}
                                            transition={{
                                                delay: subIndex * 0.05,
                                                duration: 0.3,
                                                ease: 'easeOut',
                                            }}
                                        >
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={subItem.href}
                                                    className="mx-1 w-full rounded-lg transition-all duration-200 hover:bg-emerald-500/10"
                                                >
                                                    {subItem.name}
                                                </Link>
                                            </DropdownMenuItem>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link
                            href={item.href}
                            className={cn(
                                'group text-md relative rounded-xl px-3 py-2 font-medium transition-all duration-300 hover:bg-gray-100/50',
                                pathname === item.href
                                    ? authState.isAuthenticated
                                        ? 'text-foreground'
                                        : 'text-foreground'
                                    : authState.isAuthenticated
                                      ? 'text-foreground/60 hover:text-foreground'
                                      : 'text-[rgba(106,108,106,1)] hover:text-[rgba(0,55,32,1)]',
                            )}
                            onMouseEnter={() => setHoveredItem(item.name)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            {item.name}
                            {pathname === item.href ? (
                                <motion.div
                                    layoutId="active-indicator"
                                    className={cn(
                                        'absolute bottom-0 left-0 h-0.5 w-full rounded-full',
                                        authState.isAuthenticated
                                            ? 'bg-[rgba(0,55,32,1)]'
                                            : 'bg-[rgba(0,55,32,1)]',
                                    )}
                                    initial={{ opacity: 0, scaleX: 0 }}
                                    animate={{ opacity: 1, scaleX: 1 }}
                                    transition={{ duration: 0.4, ease: 'easeOut' }}
                                />
                            ) : (
                                <motion.div
                                    className={cn(
                                        'absolute bottom-0 left-0 h-0.5 w-0 rounded-full',
                                        authState.isAuthenticated
                                            ? 'bg-[rgba(0,55,32,1)]'
                                            : 'bg-[rgba(0,55,32,1)]',
                                    )}
                                    animate={{
                                        width: hoveredItem === item.name ? '100%' : '0%',
                                    }}
                                    transition={{ duration: 0.4, ease: 'easeOut' }}
                                />
                            )}
                        </Link>
                    )}
                </motion.div>
            ))}
        </nav>
    );
};

export default DesktopMenu;
