import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { AuthState, NavItem } from '@/types/client/common/navbar-types';

interface MobileMenuProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    navItems: NavItem[];
    authState: AuthState;
    toggleAuth: () => void;
    pathname: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
    isOpen,
    setIsOpen,
    navItems,
    authState,
    toggleAuth,
    pathname,
}) => {
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="mr-2">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isOpen ? 'close' : 'menu'}
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                        >
                            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </motion.div>
                    </AnimatePresence>
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent
                side="left"
                className={cn(
                    'transition-colors duration-300',
                    authState.isAuthenticated
                        ? 'bg-white/95 backdrop-blur-md'
                        : 'bg-gray-900/95 text-white backdrop-blur-md',
                )}
            >
                <nav className="mt-8 flex flex-col gap-4">
                    <AnimatePresence>
                        {navItems.map((item, index) => (
                            <motion.div
                                key={item.name}
                                className="flex flex-col"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                {item.dropdown ? (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className={cn(
                                                    'w-full justify-start px-2 text-left',
                                                    item.name === 'Store' &&
                                                        authState.isAuthenticated
                                                        ? 'text-amber-500'
                                                        : '',
                                                )}
                                            >
                                                {item.name}
                                                <ChevronDown className="ml-1 h-4 w-4" />
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
                                                {item.dropdown.map((subItem, subIndex) => (
                                                    <motion.div
                                                        key={subItem.name}
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{
                                                            delay: subIndex * 0.05,
                                                        }}
                                                    >
                                                        <DropdownMenuItem asChild>
                                                            <Link
                                                                href={subItem.href}
                                                                className="w-full"
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
                                            'group relative px-2 py-2 text-lg',
                                            pathname === item.href
                                                ? 'font-medium'
                                                : 'text-muted-foreground hover:text-foreground transition-colors',
                                        )}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                        {pathname === item.href && (
                                            <motion.div
                                                layoutId="mobile-active-indicator"
                                                className={cn(
                                                    'absolute bottom-0 left-0 h-0.5 w-full',
                                                    authState.isAuthenticated
                                                        ? 'bg-amber-500'
                                                        : 'bg-amber-400',
                                                )}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}
                                    </Link>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {!authState.isAuthenticated && (
                        <motion.div
                            className="mt-4 space-y-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Button
                                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300 hover:from-amber-600 hover:to-amber-700"
                                onClick={toggleAuth}
                            >
                                Sign in
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full border-amber-500/50 text-amber-500 transition-all duration-300 hover:bg-amber-500/10"
                            >
                                Sign up
                            </Button>
                        </motion.div>
                    )}
                </nav>
            </SheetContent>
        </Sheet>
    );
};

export default MobileMenu;
