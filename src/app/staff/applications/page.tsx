'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    FileText, Search, Filter, Eye, Clock,
    CheckCircle, XCircle, AlertCircle, Calendar,
    User, PawPrint, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useApplications } from '@/hooks/use-applications';
import { format } from 'date-fns';

export default function ApplicationsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Show 5 items per page for testing pagination

    const { data: response, isLoading, error } = useApplications();
    const applications = response?.data || [];

    // Filter applications
    const filteredApplications = applications.filter((app: any) => {
        const matchesSearch = searchTerm === '' ||
            app.adopter_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.adopter_email?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'all' || app.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    // Paginate filtered results
    const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedApplications = filteredApplications.slice(startIndex, endIndex);

    // Reset to page 1 when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filterStatus]);

    const getStatusConfig = (status: string) => {
        const configs: Record<string, { color: string; icon: any; label: string }> = {
            'Submitted': {
                color: 'bg-blue-100 text-blue-800 border-blue-300',
                icon: Clock,
                label: 'Submitted'
            },
            'Under Review': {
                color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
                icon: AlertCircle,
                label: 'Under Review'
            },
            'Interview Scheduled': {
                color: 'bg-purple-100 text-purple-800 border-purple-300',
                icon: Calendar,
                label: 'Interview Scheduled'
            },
            'Approved': {
                color: 'bg-green-100 text-green-800 border-green-300',
                icon: CheckCircle,
                label: 'Approved'
            },
            'Rejected': {
                color: 'bg-red-100 text-red-800 border-red-300',
                icon: XCircle,
                label: 'Rejected'
            },
            'Completed': {
                color: 'bg-gray-100 text-gray-800 border-gray-300',
                icon: CheckCircle,
                label: 'Completed'
            }
        };
        return configs[status] || configs['Submitted'];
    };

    const statusCounts = {
        all: applications.length,
        'Submitted': applications.filter((a: any) => a.status === 'Submitted').length,
        'Under Review': applications.filter((a: any) => a.status === 'Under Review').length,
        'Interview Scheduled': applications.filter((a: any) => a.status === 'Interview Scheduled').length,
        'Approved': applications.filter((a: any) => a.status === 'Approved').length,
        'Rejected': applications.filter((a: any) => a.status === 'Rejected').length,
        'Completed': applications.filter((a: any) => a.status === 'Completed').length,
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-sanctuary-primary-800" data-testid="applications-title">
                                Adoption Applications
                            </h1>
                            <p className="text-gray-600 mt-1">Review and manage adoption applications</p>
                        </div>
                        <Link
                            href="/staff/dashboard"
                            className="text-sanctuary-primary-600 hover:text-sanctuary-primary-700"
                        >
                            ← Dashboard
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Status Overview Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    {Object.entries(statusCounts).map(([status, count], index) => (
                        <motion.button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`p-4 rounded-lg border-2 transition-all ${filterStatus === status
                                ? 'border-sanctuary-primary-500 bg-sanctuary-primary-50'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.05 }}
                            data-testid={`status-filter-${status.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                            <div className="text-2xl font-bold text-gray-800">{count}</div>
                            <div className="text-xs text-gray-600 mt-1">
                                {status === 'all' ? 'All' : status}
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* Search and Filters */}
                <motion.div
                    className="bg-white rounded-lg shadow-md p-6 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Search */}
                        <div>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="text"
                                    placeholder="Search by adopter name or email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    data-testid="search-input"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Status Filter Dropdown */}
                        <div>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                data-testid="status-filter"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                            >
                                <option value="all">All Statuses</option>
                                <option value="Submitted">Submitted</option>
                                <option value="Under Review">Under Review</option>
                                <option value="Interview Scheduled">Interview Scheduled</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </div>
                </motion.div>

                {/* Loading State */}
                {isLoading && (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sanctuary-primary-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading applications...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <p className="text-red-600">Unable to load applications. Please try again later.</p>
                    </div>
                )}

                {/* Applications List */}
                {!isLoading && !error && (
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {paginatedApplications.length === 0 ? (
                            <div className="bg-white rounded-lg shadow-md p-12 text-center">
                                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                    No applications found
                                </h3>
                                <p className="text-gray-600">
                                    {searchTerm || filterStatus !== 'all'
                                        ? 'Try adjusting your search or filter criteria'
                                        : 'No adoption applications yet'}
                                </p>
                            </div>
                        ) : (
                            <>
                                {paginatedApplications.map((application: any, index: number) => {
                                    const statusConfig = getStatusConfig(application.status);
                                    const StatusIcon = statusConfig.icon;

                                    return (
                                        <motion.div
                                            key={application.application_id}
                                            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.5 + index * 0.05 }}
                                            data-testid={`application-card-${application.application_id}`}
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                                {/* Application Info */}
                                                <div className="flex-1 mb-4 md:mb-0">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div>
                                                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                                Application #{application.application_id}
                                                            </h3>
                                                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                                                <div className="flex items-center">
                                                                    <User className="h-4 w-4 mr-1" />
                                                                    {application.adopter_name || 'Unknown Adopter'}
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <PawPrint className="h-4 w-4 mr-1" />
                                                                    Animal ID: {application.animal_id}
                                                                </div>
                                                                {application.application_date && (
                                                                    <div className="flex items-center">
                                                                        <Calendar className="h-4 w-4 mr-1" />
                                                                        {format(new Date(application.application_date), 'MMM d, yyyy')}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Contact Info */}
                                                    {(application.adopter_email || application.adopter_phone) && (
                                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                            {application.adopter_email && (
                                                                <span>📧 {application.adopter_email}</span>
                                                            )}
                                                            {application.adopter_phone && (
                                                                <span>📞 {application.adopter_phone}</span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Status and Actions */}
                                                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                                    {/* Status Badge */}
                                                    <div className={`px-3 py-2 rounded-lg border flex items-center ${statusConfig.color}`}>
                                                        <StatusIcon className="h-4 w-4 mr-2" />
                                                        <span className="text-sm font-medium">{statusConfig.label}</span>
                                                    </div>

                                                    {/* View Button */}
                                                    <Link
                                                        href={`/staff/applications/${application.application_id}`}
                                                        className="bg-sanctuary-primary-600 text-white px-4 py-2 rounded-lg hover:bg-sanctuary-primary-700 transition-colors duration-200 flex items-center whitespace-nowrap"
                                                        data-testid={`view-application-${application.application_id}`}
                                                    >
                                                        <Eye className="h-4 w-4 mr-2" />
                                                        View Details
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}

                                {/* Pagination */}
                                <div className="bg-white rounded-lg shadow-md px-6 py-4">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-700">
                                            Showing <span className="font-medium">{startIndex + 1}-{Math.min(endIndex, filteredApplications.length)}</span> of <span className="font-medium">{filteredApplications.length}</span> applications
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => setCurrentPage(currentPage - 1)}
                                                disabled={currentPage === 1}
                                                className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                                                data-testid="prev-page"
                                            >
                                                <ChevronLeft className="h-5 w-5" />
                                            </button>
                                            <span className="text-sm text-gray-600">
                                                Page {currentPage} of {totalPages}
                                            </span>
                                            <button
                                                onClick={() => setCurrentPage(currentPage + 1)}
                                                disabled={currentPage >= totalPages}
                                                className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                                                data-testid="next-page"
                                            >
                                                <ChevronRight className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
