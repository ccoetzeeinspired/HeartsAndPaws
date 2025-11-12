'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Heart, Users, FileText, Calendar, TrendingUp,
    AlertCircle, CheckCircle, Clock, DollarSign,
    PawPrint, Home, Activity
} from 'lucide-react';
import StaffHeader from '@/components/staff-header';

export default function StaffDashboardPage() {
    // Mock data - in real app, this would come from API
    const stats = [
        {
            label: 'Total Animals',
            value: '127',
            change: '+5 this week',
            icon: PawPrint,
            color: 'sanctuary-primary',
            trend: 'up'
        },
        {
            label: 'Available for Adoption',
            value: '45',
            change: '35% of total',
            icon: Heart,
            color: 'sanctuary-nature',
            trend: 'neutral'
        },
        {
            label: 'Pending Applications',
            value: '23',
            change: '8 need review',
            icon: FileText,
            color: 'sanctuary-care',
            trend: 'up'
        },
        {
            label: 'Active Volunteers',
            value: '156',
            change: '+12 this month',
            icon: Users,
            color: 'sanctuary-primary',
            trend: 'up'
        }
    ];

    const recentActivity = [
        {
            id: 1,
            type: 'adoption',
            message: 'Max was adopted by the Johnson family',
            time: '2 hours ago',
            icon: Heart,
            color: 'text-green-600 bg-green-100'
        },
        {
            id: 2,
            type: 'application',
            message: 'New adoption application for Luna',
            time: '4 hours ago',
            icon: FileText,
            color: 'text-blue-600 bg-blue-100'
        },
        {
            id: 3,
            type: 'animal',
            message: 'New animal intake: Bella (Cat)',
            time: '6 hours ago',
            icon: PawPrint,
            color: 'text-purple-600 bg-purple-100'
        },
        {
            id: 4,
            type: 'volunteer',
            message: 'Sarah completed 10 volunteer hours',
            time: '1 day ago',
            icon: Users,
            color: 'text-orange-600 bg-orange-100'
        },
        {
            id: 5,
            type: 'medical',
            message: 'Charlie completed vaccination schedule',
            time: '1 day ago',
            icon: Activity,
            color: 'text-red-600 bg-red-100'
        }
    ];

    const quickActions = [
        {
            label: 'Add New Animal',
            href: '/staff/animals/new',
            icon: PawPrint,
            color: 'bg-sanctuary-primary-600 hover:bg-sanctuary-primary-700'
        },
        {
            label: 'Review Applications',
            href: '/staff/applications',
            icon: FileText,
            color: 'bg-sanctuary-care-600 hover:bg-sanctuary-care-700'
        },
        {
            label: 'Manage Adopters',
            href: '/staff/adopters',
            icon: Users,
            color: 'bg-sanctuary-nature-600 hover:bg-sanctuary-nature-700'
        },
        {
            label: 'Schedule Event',
            href: '/staff/events/new',
            icon: Calendar,
            color: 'bg-sanctuary-primary-600 hover:bg-sanctuary-primary-700'
        }
    ];

    const alerts = [
        {
            id: 1,
            type: 'warning',
            message: '8 applications pending review for more than 48 hours',
            action: 'Review Now',
            href: '/staff/applications?status=pending'
        },
        {
            id: 2,
            type: 'info',
            message: '3 animals need medical checkups this week',
            action: 'View Schedule',
            href: '/staff/medical'
        }
    ];

    const animalsByStatus = [
        { status: 'Available', count: 45, color: 'bg-green-500' },
        { status: 'Pending', count: 18, color: 'bg-yellow-500' },
        { status: 'Medical Hold', count: 12, color: 'bg-red-500' },
        { status: 'Adopted', count: 52, color: 'bg-blue-500' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <StaffHeader
                title="Staff Dashboard"
                subtitle="Welcome back! Here's what's happening today."
                showBackToDashboard={false}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className="bg-white rounded-lg shadow-md p-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            data-testid={`stat-card-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                                    <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                                </div>
                                {stat.trend === 'up' && (
                                    <TrendingUp className="h-5 w-5 text-green-500" />
                                )}
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
                                <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                                <p className="text-xs text-gray-500">{stat.change}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Alerts */}
                {alerts.length > 0 && (
                    <motion.div
                        className="mb-8 space-y-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {alerts.map((alert) => (
                            <div
                                key={alert.id}
                                className={`p-4 rounded-lg border flex items-center justify-between ${alert.type === 'warning'
                                    ? 'bg-yellow-50 border-yellow-200'
                                    : 'bg-blue-50 border-blue-200'
                                    }`}
                                data-testid="alert-banner"
                            >
                                <div className="flex items-center">
                                    <AlertCircle className={`h-5 w-5 mr-3 ${alert.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                                        }`} />
                                    <p className={`text-sm font-medium ${alert.type === 'warning' ? 'text-yellow-800' : 'text-blue-800'
                                        }`}>
                                        {alert.message}
                                    </p>
                                </div>
                                <Link
                                    href={alert.href}
                                    className={`text-sm font-medium px-4 py-2 rounded-lg ${alert.type === 'warning'
                                        ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                >
                                    {alert.action}
                                </Link>
                            </div>
                        ))}
                    </motion.div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Quick Actions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {quickActions.map((action, index) => (
                                    <Link
                                        key={action.label}
                                        href={action.href}
                                        className={`${action.color} text-white p-4 rounded-lg transition-colors duration-200 text-center`}
                                        data-testid={`quick-action-${action.label.toLowerCase().replace(/\s+/g, '-')}`}
                                    >
                                        <action.icon className="h-8 w-8 mx-auto mb-2" />
                                        <p className="text-sm font-medium">{action.label}</p>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>

                        {/* Animals by Status */}
                        <motion.div
                            className="bg-white rounded-lg shadow-md p-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Animals by Status</h2>
                            <div className="space-y-4">
                                {animalsByStatus.map((item) => (
                                    <div key={item.status}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700">{item.status}</span>
                                            <span className="text-sm font-semibold text-gray-800">{item.count}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`${item.color} h-2 rounded-full`}
                                                style={{ width: `${(item.count / 127) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link
                                href="/staff/animals"
                                className="mt-4 block text-center text-sanctuary-primary-600 hover:text-sanctuary-primary-700 text-sm font-medium"
                            >
                                View All Animals →
                            </Link>
                        </motion.div>

                        {/* Recent Activity */}
                        <motion.div
                            className="bg-white rounded-lg shadow-md p-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
                            <div className="space-y-4" data-testid="activity-feed">
                                {recentActivity.map((activity) => (
                                    <div key={activity.id} className="flex items-start">
                                        <div className={`w-10 h-10 rounded-full ${activity.color} flex items-center justify-center flex-shrink-0`}>
                                            <activity.icon className="h-5 w-5" />
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <p className="text-sm text-gray-800">{activity.message}</p>
                                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Upcoming Events */}
                        <motion.div
                            className="bg-white rounded-lg shadow-md p-6"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Events</h2>
                            <div className="space-y-4">
                                <div className="border-l-4 border-sanctuary-primary-500 pl-4 py-2">
                                    <p className="font-medium text-gray-800">Adoption Day</p>
                                    <p className="text-sm text-gray-600">Saturday, 10:00 AM</p>
                                </div>
                                <div className="border-l-4 border-sanctuary-care-500 pl-4 py-2">
                                    <p className="font-medium text-gray-800">Volunteer Training</p>
                                    <p className="text-sm text-gray-600">Tuesday, 2:00 PM</p>
                                </div>
                                <div className="border-l-4 border-sanctuary-nature-500 pl-4 py-2">
                                    <p className="font-medium text-gray-800">Fundraiser Gala</p>
                                    <p className="text-sm text-gray-600">Next Friday, 6:00 PM</p>
                                </div>
                            </div>
                            <Link
                                href="/staff/events"
                                className="mt-4 block text-center text-sanctuary-primary-600 hover:text-sanctuary-primary-700 text-sm font-medium"
                            >
                                View All Events →
                            </Link>
                        </motion.div>

                        {/* Tasks */}
                        <motion.div
                            className="bg-white rounded-lg shadow-md p-6"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.9 }}
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Tasks</h2>
                            <div className="space-y-3">
                                <label className="flex items-start">
                                    <input
                                        type="checkbox"
                                        className="mt-1 h-4 w-4 text-sanctuary-primary-600 focus:ring-sanctuary-primary-500 border-gray-300 rounded"
                                    />
                                    <span className="ml-3 text-sm text-gray-700">Review pending applications</span>
                                </label>
                                <label className="flex items-start">
                                    <input
                                        type="checkbox"
                                        className="mt-1 h-4 w-4 text-sanctuary-primary-600 focus:ring-sanctuary-primary-500 border-gray-300 rounded"
                                    />
                                    <span className="ml-3 text-sm text-gray-700">Update animal profiles</span>
                                </label>
                                <label className="flex items-start">
                                    <input
                                        type="checkbox"
                                        className="mt-1 h-4 w-4 text-sanctuary-primary-600 focus:ring-sanctuary-primary-500 border-gray-300 rounded"
                                    />
                                    <span className="ml-3 text-sm text-gray-700">Schedule vet appointments</span>
                                </label>
                                <label className="flex items-start">
                                    <input
                                        type="checkbox"
                                        className="mt-1 h-4 w-4 text-sanctuary-primary-600 focus:ring-sanctuary-primary-500 border-gray-300 rounded"
                                    />
                                    <span className="ml-3 text-sm text-gray-700">Respond to inquiries</span>
                                </label>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
