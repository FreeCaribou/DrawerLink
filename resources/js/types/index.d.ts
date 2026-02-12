import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Draw {
    id: number;
    label: string;
    description: string;
    saved_links: SavedLink[];
    saved_links_count: number;
    [key: string]: unknown;
}

export interface Tag {
    id: number;
    label: string;
}

export interface SavedLink {
    id: number;
    label: string;
    description: string;
    saved_object_props: SavedObjectProp[];
    draw: Draw;
    tags: Tag[];
    [key: string]: unknown;
}

export interface SavedObjectProp {
    id: number;
    name: string;
    mime_type: string;
    size: number;
    saved_object?: SavedObject
    [key: string]: unknown;
}

export interface SavedObject {
    id: number;
    content: string;
    [key: string]: unknown;
}

export interface FlashProps {
    success?: string;
    error?: string;
    messages?: string[];
    [key: string]: unknown;
}
