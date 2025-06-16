import { motion } from 'framer-motion';
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
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="overflow-hidden rounded-full border-2 border-transparent transition-all duration-300 hover:border-amber-500/50"
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
            <DropdownMenuContent align="end" className="w-56 bg-white/90 backdrop-blur-md">
                <div className="border-b p-2">
                    <p className="font-medium">{authState.user?.name}</p>
                    <p className="text-muted-foreground text-sm">{authState.user?.email}</p>
                </div>
                <DropdownMenuItem className="cursor-pointer hover:bg-amber-500/10">
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-amber-500/10">
                    Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={toggleAuth}
                    className="cursor-pointer text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserMenu;
