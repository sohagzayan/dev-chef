import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Beaker,
    BookOpen,
    CheckSquare,
    ChevronRight,
    ClipboardList,
    Eye,
    Gift,
    Lightbulb,
    LogOut,
    Monitor,
    PieChart,
    Settings,
    User,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AuthState } from '@/types/client/common/navbar-types';

interface UserMenuProps {
    authState: AuthState;
    toggleAuth: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ authState, toggleAuth }) => {
    const router = useRouter();

    const featureButtons = [
        { icon: CheckSquare, label: 'My Lists', color: 'text-emerald-600' },
        { icon: BookOpen, label: 'Notebook', color: 'text-blue-600' },
        { icon: Lightbulb, label: 'Submissions', color: 'text-amber-600' },
        { icon: PieChart, label: 'Progress', color: 'text-green-600' },
        { icon: Gift, label: 'Points', color: 'text-purple-600' },
    ];

    const menuItems = [
        { icon: User, label: 'Profile', onClick: () => router.push('/profile') },
        { icon: Beaker, label: 'Try New Features' },
        { icon: ClipboardList, label: 'Orders' },
        { icon: Monitor, label: 'My Playgrounds' },
        { icon: Settings, label: 'Settings' },
        { icon: Eye, label: 'Appearance', hasArrow: true },
        { icon: LogOut, label: 'Sign Out', onClick: toggleAuth, isDestructive: true },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="overflow-hidden rounded-full border-2 border-transparent transition-all duration-300 hover:border-amber-500/50"
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push('/profile');
                        }}
                    >
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                src={authState.user?.avatarUrl || '/placeholder.svg'}
                                alt={authState.user?.name || 'User'}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-amber-400 to-amber-600">
                                {authState.user?.name?.charAt(0) || 'U'}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-80 border border-gray-200 bg-white/95 p-0 shadow-xl backdrop-blur-xl"
            >
                {/* User Profile Header */}
                <div
                    className="cursor-pointer border-b border-gray-200 p-4 transition-colors duration-200 hover:bg-gray-50"
                    onClick={() => router.push('/profile')}
                >
                    <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                            <AvatarImage
                                src={authState.user?.avatarUrl || '/placeholder.svg'}
                                alt={authState.user?.name || 'User'}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 font-semibold text-white">
                                {authState.user?.name?.charAt(0) || 'U'}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="text-lg font-semibold text-gray-900">
                                {authState.user?.name || 'User'}
                            </p>
                            <p className="text-sm font-medium text-emerald-600">
                                Access all features with our Premium subscription!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Feature Buttons Grid */}
                <div className="border-b border-gray-200 p-4">
                    <div className="grid grid-cols-3 gap-3">
                        {featureButtons.map((feature) => (
                            <motion.div
                                key={feature.label}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 p-3 transition-all duration-200 hover:bg-emerald-50"
                            >
                                <feature.icon className={`h-6 w-6 ${feature.color}`} />
                                <span className="text-xs font-medium text-gray-700">
                                    {feature.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Menu Options List */}
                <div className="p-2">
                    {menuItems.map((item, index) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <DropdownMenuItem
                                onClick={item.onClick}
                                className={`flex cursor-pointer items-center justify-between rounded-lg p-3 transition-all duration-200 hover:bg-emerald-50 ${
                                    item.isDestructive
                                        ? 'text-red-600 hover:bg-red-50 hover:text-red-700'
                                        : 'text-gray-700 hover:text-gray-900'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className="h-5 w-5" />
                                    <span className="font-medium">{item.label}</span>
                                </div>
                                {item.hasArrow && (
                                    <ChevronRight className="h-4 w-4 text-gray-400" />
                                )}
                            </DropdownMenuItem>
                        </motion.div>
                    ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserMenu;
