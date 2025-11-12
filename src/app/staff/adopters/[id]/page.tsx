'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowLeft, User, Mail, Phone, MapPin, Home,
    Calendar, FileText, CheckCircle
} from 'lucide-react';
import { useAdopter } from '@/hooks/use-adopters';

export default function AdopterDetailPage() {
    const params = useParams();
    const router = useRouter();
    const adopterId = parseInt(params.id as string);

    const { data: response, isLoading, error } = useAdopter(adopterId);
    const adopter = response?.data;

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sanctuary-primary-600"></div>
            </div>
        );
    }

    if (error || !adopter) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Adopter Not Found</h2>
                    <p className="text-gray-600 mb-4">Sorry, we couldn't find this adopter.</p>
                    <Link href="/staff/adopters" className="text-sanctuary-primary-600 hover:text-sanctuary-primary-700">
                        ← Back to adopters
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link
                        href="/staff/adopters"
                        className="inline-flex items-center text-sanctuary-primary-600 hover:text-sanctuary-primary-700 mb-4"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Back to adopters
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-sanctuary-primary-800">
                            {adopter.first_name} {adopter.last_name}
                        </h1>
                        <p className="text-gray-600 mt-1">Adopter Profile</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Contact Information */}
                        <motion.div
                            className="bg-white rounded-lg shadow-md p-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <User className="h-5 w-5 mr-2 text-sanctuary-primary-600" />
                                Contact Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Email</p>
                                    <div className="flex items-center text-gray-900">
                                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                        <a href={`mailto:${adopter.email}`} className="hover:text-sanctuary-primary-600">
                                            {adopter.email}
                                        </a>
                                    </div>
                                </div>
                                {adopter.phone && (
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Phone</p>
                                        <div className="flex items-center text-gray-900">
                                            <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                            <a href={`tel:${adopter.phone}`} className="hover:text-sanctuary-primary-600">
                                                {adopter.phone}
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Address */}
                        {adopter.address && (
                            <motion.div
                                className="bg-white rounded-lg shadow-md p-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                    <MapPin className="h-5 w-5 mr-2 text-sanctuary-primary-600" />
                                    Address
                                </h2>
                                <div className="text-gray-900">
                                    <p>{adopter.address}</p>
                                    <p>{adopter.city}, {adopter.state} {adopter.zip_code}</p>
                                </div>
                            </motion.div>
                        )}

                        {/* Housing Information */}
                        <motion.div
                            className="bg-white rounded-lg shadow-md p-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <Home className="h-5 w-5 mr-2 text-sanctuary-primary-600" />
                                Housing Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {adopter.housing_type && (
                                    <div>
                                        <p className="text-sm text-gray-600">Housing Type</p>
                                        <p className="font-medium text-gray-900">{adopter.housing_type}</p>
                                    </div>
                                )}
                                {adopter.yard_fenced !== undefined && (
                                    <div>
                                        <p className="text-sm text-gray-600">Fenced Yard</p>
                                        <p className="font-medium text-gray-900">
                                            {adopter.yard_fenced ? '✓ Yes' : '✗ No'}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Pet Experience */}
                        {(adopter.other_pets_details || adopter.previous_pet_experience) && (
                            <motion.div
                                className="bg-white rounded-lg shadow-md p-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                    Pet Experience
                                </h2>
                                {adopter.other_pets_details && (
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-600 mb-1">Other Pets</p>
                                        <p className="text-gray-900">{adopter.other_pets_details}</p>
                                    </div>
                                )}
                                {adopter.previous_pet_experience && (
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Previous Experience</p>
                                        <p className="text-gray-900">{adopter.previous_pet_experience}</p>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Info */}
                        <motion.div
                            className="bg-white rounded-lg shadow-md p-6"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Info</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Adopter ID</span>
                                    <span className="font-medium">#{adopter.adopter_id}</span>
                                </div>
                                {adopter.experience_level && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Experience</span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${adopter.experience_level === 'Expert' ? 'bg-green-100 text-green-800' :
                                                adopter.experience_level === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'
                                            }`}>
                                            {adopter.experience_level}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Actions */}
                        <motion.div
                            className="bg-white rounded-lg shadow-md p-6"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions</h3>
                            <div className="space-y-2">
                                <Link
                                    href={`/staff/adopters/${adopter.adopter_id}/edit`}
                                    className="block w-full bg-sanctuary-primary-600 text-white py-2 px-4 rounded-lg hover:bg-sanctuary-primary-700 text-center"
                                >
                                    Edit Profile
                                </Link>
                                <button
                                    onClick={() => window.print()}
                                    className="block w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 text-center"
                                >
                                    Print Profile
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
