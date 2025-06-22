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
            {navItems.map((item) => (
                <div key={item.name}>
                    {item.dropdown ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        'group relative flex items-center gap-1',
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
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ChevronDown className="h-4 w-4" />
                                    </motion.div>
                                    <motion.div
                                        className={cn(
                                            'absolute -bottom-1 left-0 h-0.5 w-0 group-hover:w-full',
                                            authState.isAuthenticated
                                                ? 'bg-[rgba(0,55,32,1)]'
                                                : 'bg-[rgba(0,55,32,1)]',
                                        )}
                                        animate={{
                                            width: hoveredItem === item.name ? '100%' : '0%',
                                        }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="start"
                                className={cn(
                                    'animate-in fade-in-80 slide-in-from-top-5 backdrop-blur-md',
                                    authState.isAuthenticated
                                        ? 'bg-white/90'
                                        : 'border-gray-700 bg-gray-800/90 text-white',
                                )}
                            >
                                <AnimatePresence>
                                    {item?.dropdown?.map((subItem, index) => (
                                        <motion.div
                                            key={subItem.name}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={subItem.href}
                                                    className="w-full transition-colors hover:bg-amber-500/10"
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
                                'group text-md relative px-3 py-2 font-medium transition-all duration-300',
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
                                        'absolute bottom-0 left-0 h-0.5 w-full',
                                        authState.isAuthenticated
                                            ? 'bg-[rgba(0,55,32,1)]'
                                            : 'bg-[rgba(0,55,32,1)]',
                                    )}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            ) : (
                                <motion.div
                                    className={cn(
                                        'absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full',
                                        authState.isAuthenticated
                                            ? 'bg-[rgba(0,55,32,1)]'
                                            : 'bg-[rgba(0,55,32,1)]',
                                    )}
                                    animate={{
                                        width: hoveredItem === item.name ? '100%' : '0%',
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    );
};

export default DesktopMenu;
