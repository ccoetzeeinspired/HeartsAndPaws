'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Users, Search, Filter, Plus, Eye, Edit,
    Mail, Phone, MapPin, Calendar, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useAdopters } from '@/hooks/use-adopters';

export default function AdoptersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    const { data: response, isLoading, error } = useAdopters();
    const adopters = response?.data || [];

    // Filter adopters based on search
    const filteredAdopters = adopters.filter((adopter: any) => {
        const matchesSearch = searchTerm === '' ||
            adopter.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            adopter.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            adopter.email.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-sanctuary-primary-800" data-testid="adopters-title">
                                Adopters Management
                            </h1>
                            <p className="text-gray-600 mt-1">Manage adopter profiles and applications</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/staff/dashboard"
                                className="text-sanctuary-primary-600 hover:text-sanctuary-primary-700"
                            >
                                ← Dashboard
                            </Link>
                            <Link
                                href="/staff/adopters/new"
                                className="bg-sanctuary-primary-600 text-white px-4 py-2 rounded-lg hover:bg-sanctuary-primary-700 transition-colors duration-200 flex items-center"
                                data-testid="add-adopter-button"
                            >
                                <Plus className="h-5 w-5 mr-2" />
                                Add Adopter
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search and Filters */}
                <motion.div
                    className="bg-white rounded-lg shadow-md p-6 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="md:col-span-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="text"
                                    placeholder="Search by name or email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    data-testid="search-input"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Filter */}
                        <div>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                data-testid="filter-select"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                            >
                                <option value="all">All Adopters</option>
                                <option value="active">Active Applications</option>
                                <option value="approved">Approved</option>
                                <option value="completed">Completed Adoptions</option>
                            </select>
                        </div>
                    </div>
                </motion.div>

                {/* Loading State */}
                {isLoading && (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sanctuary-primary-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading adopters...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <p className="text-red-600">Unable to load adopters. Please try again later.</p>
                    </div>
                )}

                {/* Adopters Table */}
                {!isLoading && !error && (
                    <motion.div
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {filteredAdopters.length === 0 ? (
                            <div className="text-center py-12">
                                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                    No adopters found
                                </h3>
                                <p className="text-gray-600">
                                    {searchTerm ? 'Try adjusting your search criteria' : 'Add your first adopter to get started'}
                                </p>
                            </div>
                        ) : (
                            <>
                                {/* Desktop Table View */}
                                <div className="hidden md:block overflow-x-auto">
                                    <table className="w-full" data-testid="adopters-table">
                                        <thead className="bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Contact
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Location
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Housing
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Experience
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredAdopters.map((adopter: any) => (
                                                <tr
                                                    key={adopter.adopter_id}
                                                    className="hover:bg-gray-50 transition-colors"
                                                    data-testid={`adopter-row-${adopter.adopter_id}`}
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {adopter.first_name} {adopter.last_name}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                ID: {adopter.adopter_id}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-900 space-y-1">
                                                            <div className="flex items-center">
                                                                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                                                {adopter.email}
                                                            </div>
                                                            <div className="flex items-center">
                                                                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                                                {adopter.phone}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {adopter.city}, {adopter.state}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {adopter.zip_code}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {adopter.housing_type}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {adopter.yard_fenced ? '✓ Fenced yard' : '✗ No fence'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${adopter.experience_level === 'Expert' ? 'bg-green-100 text-green-800' :
                                                                adopter.experience_level === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                                                                    'bg-gray-100 text-gray-800'
                                                            }`}>
                                                            {adopter.experience_level}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex items-center justify-end space-x-2">
                                                            <Link
                                                                href={`/staff/adopters/${adopter.adopter_id}`}
                                                                className="text-sanctuary-primary-600 hover:text-sanctuary-primary-900"
                                                                data-testid={`view-adopter-${adopter.adopter_id}`}
                                                            >
                                                                <Eye className="h-5 w-5" />
                                                            </Link>
                                                            <Link
                                                                href={`/staff/adopters/${adopter.adopter_id}/edit`}
                                                                className="text-gray-600 hover:text-gray-900"
                                                                data-testid={`edit-adopter-${adopter.adopter_id}`}
                                                            >
                                                                <Edit className="h-5 w-5" />
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile Card View */}
                                <div className="md:hidden divide-y divide-gray-200">
                                    {filteredAdopters.map((adopter: any) => (
                                        <div key={adopter.adopter_id} className="p-4">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {adopter.first_name} {adopter.last_name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">ID: {adopter.adopter_id}</p>
                                                </div>
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${adopter.experience_level === 'Expert' ? 'bg-green-100 text-green-800' :
                                                        adopter.experience_level === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {adopter.experience_level}
                                                </span>
                                            </div>
                                            <div className="space-y-2 text-sm text-gray-600 mb-4">
                                                <div className="flex items-center">
                                                    <Mail className="h-4 w-4 mr-2" />
                                                    {adopter.email}
                                                </div>
                                                <div className="flex items-center">
                                                    <Phone className="h-4 w-4 mr-2" />
                                                    {adopter.phone}
                                                </div>
                                                <div className="flex items-center">
                                                    <MapPin className="h-4 w-4 mr-2" />
                                                    {adopter.city}, {adopter.state}
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <Link
                                                    href={`/staff/adopters/${adopter.adopter_id}`}
                                                    className="flex-1 bg-sanctuary-primary-600 text-white py-2 px-4 rounded-lg hover:bg-sanctuary-primary-700 text-center text-sm"
                                                >
                                                    View Details
                                                </Link>
                                                <Link
                                                    href={`/staff/adopters/${adopter.adopter_id}/edit`}
                                                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 text-center text-sm"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-700">
                                            Showing <span className="font-medium">{filteredAdopters.length}</span> adopters
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                disabled={currentPage === 1}
                                                className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                                            >
                                                <ChevronLeft className="h-5 w-5" />
                                            </button>
                                            <button
                                                className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100"
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
