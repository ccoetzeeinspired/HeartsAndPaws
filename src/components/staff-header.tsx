'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';
import ConfirmationModal from './confirmation-modal';

interface StaffHeaderProps {
    title: string;
    subtitle?: string;
    showBackToDashboard?: boolean;
}

export default function StaffHeader({ title, subtitle, showBackToDashboard = true }: StaffHeaderProps) {
    const router = useRouter();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const handleLogoutConfirm = () => {
        // Clear authentication tokens
        localStorage.removeItem('auth_token');
        sessionStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');

        // Show success message
        toast.success('Logged out successfully');

        // Close modal
        setShowLogoutModal(false);

        // Redirect to homepage
        router.push('/');
    };

    const handleLogoutCancel = () => {
        setShowLogoutModal(false);
    };

    return (
        <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-sanctuary-primary-800">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-gray-600 mt-1">{subtitle}</p>
                        )}
                    </div>
                    <div className="flex items-center space-x-4">
                        {showBackToDashboard ? (
                            <Link
                                href="/staff/dashboard"
                                className="text-sanctuary-primary-600 hover:text-sanctuary-primary-700"
                            >
                                ← Dashboard
                            </Link>
                        ) : (
                            <Link
                                href="/"
                                className="text-sanctuary-primary-600 hover:text-sanctuary-primary-700"
                                data-testid="back-to-site"
                            >
                                ← Back to Site
                            </Link>
                        )}
                        <button
                            onClick={handleLogoutClick}
                            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            data-testid="logout-button"
                        >
                            <LogOut className="h-5 w-5" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            <ConfirmationModal
                isOpen={showLogoutModal}
                onClose={handleLogoutCancel}
                onConfirm={handleLogoutConfirm}
                title="Confirm Logout"
                message="Are you sure you want to logout? You will need to login again to access staff features."
                confirmText="Logout"
                cancelText="Cancel"
                type="warning"
            />
        </div>
    );
}
