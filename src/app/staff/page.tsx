'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StaffPortalPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');

    if (token) {
      // If authenticated, redirect to dashboard
      router.push('/staff/dashboard');
    } else {
      // If not authenticated, redirect to login
      router.push('/login');
    }
  }, [router]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-br from-sanctuary-nature-50 to-sanctuary-primary-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sanctuary-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}