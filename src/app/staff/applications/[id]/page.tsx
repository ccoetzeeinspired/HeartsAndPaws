'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft, User, Mail, Phone, MapPin, PawPrint, Calendar,
  CheckCircle, XCircle, Clock, AlertCircle, Save, Loader2
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

// Mock application data - in production this would come from API
const getMockApplication = (id: number) => ({
  application_id: id,
  animal_id: 1,
  animal_name: 'Max',
  animal_species: 'Dog',
  adopter_name: 'John Smith',
  status: 'Submitted',
  application_date: '2024-01-15T10:30:00',
  firstName: 'John',
  lastName: 'Smith',
  email: 'john.smith@email.com',
  phone: '(555) 123-4567',
  dateOfBirth: '1985-06-15',
  occupation: 'Software Engineer',
  address: '123 Main Street',
  city: 'San Francisco',
  state: 'CA',
  zipCode: '94102',
  housingType: 'House',
  ownRent: 'Own',
  yardFenced: true,
  yardSize: 'Large (50x30 ft)',
  experienceLevel: 'Intermediate',
  currentPets: '1 cat (Whiskers, 5 years old)',
  previousPets: 'Golden Retriever (passed away in 2022)',
  veterinarian: 'Dr. Sarah Johnson',
  veterinarianPhone: '(555) 987-6543',
  householdMembers: '3',
  childrenAges: '8, 12',
  activityLevel: 'High',
  hoursAlone: '3-5 hours',
  reference1Name: 'Jane Doe',
  reference1Phone: '(555) 111-2222',
  reference1Relationship: 'Friend',
  reference2Name: 'Bob Johnson',
  reference2Phone: '(555) 333-4444',
  reference2Relationship: 'Coworker',
  whyAdopt: 'Our family has been looking for a companion for our children and to provide a loving home to a dog in need.',
  expectations: 'We expect a loyal companion who will be part of our family.'
});

export default function ApplicationDetailPage() {
  const params = useParams();
  const applicationId = parseInt(params.id as string);
  const [application] = useState(getMockApplication(applicationId));
  const [isUpdating, setIsUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState(application.status);
  const [staffNote, setStaffNote] = useState('');

  const handleStatusUpdate = async () => {
    if (newStatus === application.status) {
      toast.info('Status unchanged');
      return;
    }

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, note: staffNote }),
      });

      if (!response.ok) throw new Error('Failed to update status');

      toast.success(`Application status updated to ${newStatus}`);
      setStaffNote('');
    } catch (error) {
      toast.error('Failed to update application status');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { color: string; icon: any }> = {
      'Submitted': { color: 'bg-blue-100 text-blue-800 border-blue-300', icon: Clock },
      'Under Review': { color: 'bg-yellow-100 text-yellow-800 border-yellow-300', icon: AlertCircle },
      'Interview Scheduled': { color: 'bg-purple-100 text-purple-800 border-purple-300', icon: Calendar },
      'Approved': { color: 'bg-green-100 text-green-800 border-green-300', icon: CheckCircle },
      'Rejected': { color: 'bg-red-100 text-red-800 border-red-300', icon: XCircle },
      'Completed': { color: 'bg-gray-100 text-gray-800 border-gray-300', icon: CheckCircle }
    };
    return configs[status] || configs['Submitted'];
  };

  const statusConfig = getStatusConfig(application.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/staff/applications"
                className="inline-flex items-center text-sanctuary-primary-600 hover:text-sanctuary-primary-700 mb-2"
                data-testid="back-to-applications-link"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to applications
              </Link>
              <h1 className="text-3xl font-bold text-sanctuary-primary-800" data-testid="application-title">
                Application #{application.application_id}
              </h1>
              <p className="text-gray-600 mt-1">
                Submitted {format(new Date(application.application_date), 'MMMM d, yyyy')}
              </p>
            </div>
            <div className={`px-4 py-2 rounded-lg border flex items-center ${statusConfig.color}`} data-testid="current-status-badge">
              <StatusIcon className="h-5 w-5 mr-2" />
              <span className="font-medium">{application.status}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <motion.div
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl font-semibold text-sanctuary-primary-800 mb-4">Application Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Animal</h3>
                  <div className="flex items-center">
                    <PawPrint className="h-5 w-5 text-sanctuary-primary-600 mr-2" />
                    <div>
                      <p className="font-semibold text-gray-800" data-testid="animal-name">{application.animal_name}</p>
                      <p className="text-sm text-gray-600">{application.animal_species}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Applicant</h3>
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-sanctuary-primary-600 mr-2" />
                    <div>
                      <p className="font-semibold text-gray-800" data-testid="applicant-name">{application.adopter_name}</p>
                      <p className="text-sm text-gray-600">{application.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Personal Information */}
            <motion.div className="bg-white rounded-lg shadow-md p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="text-xl font-semibold text-sanctuary-primary-800 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><p className="text-gray-500">Name</p><p className="font-medium text-gray-800">{application.firstName} {application.lastName}</p></div>
                <div><p className="text-gray-500">Date of Birth</p><p className="font-medium text-gray-800">{format(new Date(application.dateOfBirth), 'MMM d, yyyy')}</p></div>
                <div><p className="text-gray-500">Email</p><p className="font-medium text-gray-800">{application.email}</p></div>
                <div><p className="text-gray-500">Phone</p><p className="font-medium text-gray-800">{application.phone}</p></div>
                <div><p className="text-gray-500">Occupation</p><p className="font-medium text-gray-800">{application.occupation}</p></div>
              </div>
            </motion.div>

            {/* Address & Housing */}
            <motion.div className="bg-white rounded-lg shadow-md p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-xl font-semibold text-sanctuary-primary-800 mb-4">Address & Housing</h2>
              <div className="space-y-4 text-sm">
                <div><p className="text-gray-500">Address</p><p className="font-medium text-gray-800">{application.address}, {application.city}, {application.state} {application.zipCode}</p></div>
                <div className="grid grid-cols-3 gap-4">
                  <div><p className="text-gray-500">Housing</p><p className="font-medium text-gray-800">{application.housingType}</p></div>
                  <div><p className="text-gray-500">Own/Rent</p><p className="font-medium text-gray-800">{application.ownRent}</p></div>
                  <div><p className="text-gray-500">Yard</p><p className="font-medium text-gray-800">{application.yardFenced ? 'Fenced' : 'No'}</p></div>
                </div>
              </div>
            </motion.div>

            {/* Pet Experience */}
            <motion.div className="bg-white rounded-lg shadow-md p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h2 className="text-xl font-semibold text-sanctuary-primary-800 mb-4">Pet Experience</h2>
              <div className="space-y-3 text-sm">
                <div><p className="text-gray-500">Experience Level</p><p className="font-medium text-gray-800">{application.experienceLevel}</p></div>
                <div><p className="text-gray-500">Current Pets</p><p className="font-medium text-gray-800">{application.currentPets}</p></div>
                {application.veterinarian && (
                  <div className="grid grid-cols-2 gap-4">
                    <div><p className="text-gray-500">Veterinarian</p><p className="font-medium text-gray-800">{application.veterinarian}</p></div>
                    <div><p className="text-gray-500">Vet Phone</p><p className="font-medium text-gray-800">{application.veterinarianPhone}</p></div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Lifestyle */}
            <motion.div className="bg-white rounded-lg shadow-md p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <h2 className="text-xl font-semibold text-sanctuary-primary-800 mb-4">Lifestyle & Household</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-gray-500">Household Members</p><p className="font-medium text-gray-800">{application.householdMembers}</p></div>
                <div><p className="text-gray-500">Children Ages</p><p className="font-medium text-gray-800">{application.childrenAges}</p></div>
                <div><p className="text-gray-500">Activity Level</p><p className="font-medium text-gray-800">{application.activityLevel}</p></div>
                <div><p className="text-gray-500">Hours Alone</p><p className="font-medium text-gray-800">{application.hoursAlone}</p></div>
              </div>
            </motion.div>

            {/* Application Details */}
            <motion.div className="bg-white rounded-lg shadow-md p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <h2 className="text-xl font-semibold text-sanctuary-primary-800 mb-4">Application Details</h2>
              <div className="space-y-4">
                <div><p className="text-sm text-gray-500 mb-1">Why adopt?</p><p className="text-gray-800">{application.whyAdopt}</p></div>
                <div><p className="text-sm text-gray-500 mb-1">Expectations</p><p className="text-gray-800">{application.expectations}</p></div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Update */}
            <motion.div className="bg-white rounded-lg shadow-md p-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 className="text-lg font-semibold text-sanctuary-primary-800 mb-4">Update Status</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500"
                    data-testid="status-select"
                  >
                    <option value="Submitted">Submitted</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Interview Scheduled">Interview Scheduled</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Add Note</label>
                  <textarea
                    value={staffNote}
                    onChange={(e) => setStaffNote(e.target.value)}
                    rows={3}
                    placeholder="Add notes..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500"
                    data-testid="staff-note-input"
                  />
                </div>
                <button
                  onClick={handleStatusUpdate}
                  disabled={isUpdating || newStatus === application.status}
                  className="w-full bg-sanctuary-primary-600 text-white py-2 px-4 rounded-lg hover:bg-sanctuary-primary-700 disabled:opacity-50 flex items-center justify-center"
                  data-testid="update-status-button"
                >
                  {isUpdating ? <><Loader2 className="h-5 w-5 mr-2 animate-spin" />Updating...</> : <><Save className="h-5 w-5 mr-2" />Update Status</>}
                </button>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div className="bg-white rounded-lg shadow-md p-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <h3 className="text-lg font-semibold text-sanctuary-primary-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href={`/animals/${application.animal_id}`} className="block w-full text-center px-4 py-2 border border-sanctuary-primary-600 text-sanctuary-primary-600 rounded-lg hover:bg-sanctuary-primary-50" data-testid="view-animal-link">
                  View Animal Profile
                </Link>
                <a href={`mailto:${application.email}`} className="block w-full text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50" data-testid="email-applicant-link">
                  Email Applicant
                </a>
                <a href={`tel:${application.phone}`} className="block w-full text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50" data-testid="call-applicant-link">
                  Call Applicant
                </a>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div className="bg-sanctuary-primary-50 rounded-lg p-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <h3 className="text-lg font-semibold text-sanctuary-primary-800 mb-4">Applicant Contact</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center text-sanctuary-primary-700"><Mail className="h-4 w-4 mr-2" />{application.email}</div>
                <div className="flex items-center text-sanctuary-primary-700"><Phone className="h-4 w-4 mr-2" />{application.phone}</div>
                <div className="flex items-start text-sanctuary-primary-700"><MapPin className="h-4 w-4 mr-2 mt-0.5" /><div><p>{application.address}</p><p>{application.city}, {application.state} {application.zipCode}</p></div></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
