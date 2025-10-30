export interface NavItem {
    id: string;
    label: string;
    href?: string;
    hasDropdown?: boolean;
    items?: NavDropdownItem[];
}

export interface NavDropdownItem {
    id: string;
    label: string;
    href: string;
    badge?: {
        text: string;
        variant: 'new' | 'featured';
    };
    hasSubmenu?: boolean;
    icon?: string;
}
