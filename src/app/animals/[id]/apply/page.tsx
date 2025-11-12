'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAnimal } from '@/hooks/use-animals';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Heart, ArrowLeft, CheckCircle, AlertCircle,
  User, Mail, Phone, Home, MapPin, Briefcase,
  PawPrint, FileText, Upload, Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

// Validation schema
const adoptionApplicationSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  occupation: z.string().min(2, 'Occupation is required'),

  // Address Information
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'ZIP code is required'),

  // Housing Information
  housingType: z.string().min(1, 'Please select your housing type'),
  ownRent: z.string().min(1, 'Please specify if you own or rent'),
  landlordApproval: z.string().optional(),
  yardFenced: z.boolean(),
  yardSize: z.string().optional(),

  // Pet Experience
  experienceLevel: z.string().min(1, 'Please select your experience level'),
  currentPets: z.string().min(1, 'Please provide information about current pets'),
  previousPets: z.string().optional(),
  veterinarian: z.string().optional(),
  veterinarianPhone: z.string().optional(),

  // Lifestyle & Preferences
  householdMembers: z.string().min(1, 'Please specify number of household members'),
  childrenAges: z.string().optional(),
  activityLevel: z.string().min(1, 'Please select your activity level'),
  hoursAlone: z.string().min(1, 'Please specify hours pet will be alone'),

  // References
  reference1Name: z.string().min(2, 'Reference name is required'),
  reference1Phone: z.string().min(10, 'Reference phone is required'),
  reference1Relationship: z.string().min(2, 'Relationship is required'),
  reference2Name: z.string().optional(),
  reference2Phone: z.string().optional(),
  reference2Relationship: z.string().optional(),

  // Application Details
  whyAdopt: z.string().min(50, 'Please provide at least 50 characters explaining why you want to adopt'),
  expectations: z.string().min(30, 'Please describe your expectations'),

  // Agreements
  homeVisitConsent: z.boolean().refine(val => val === true, 'Home visit consent is required'),
  adoptionFeeAgreement: z.boolean().refine(val => val === true, 'Adoption fee agreement is required'),
  termsAgreement: z.boolean().refine(val => val === true, 'You must agree to the terms and conditions')
});

type AdoptionApplicationFormData = z.infer<typeof adoptionApplicationSchema>;

export default function AdoptionApplicationPage() {
  const params = useParams();
  const router = useRouter();
  const animalId = parseInt(params.id as string);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState('');

  const { data: response, isLoading: animalLoading } = useAnimal(animalId);
  const animal = response?.data;

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<AdoptionApplicationFormData>({
    resolver: zodResolver(adoptionApplicationSchema),
    defaultValues: {
      yardFenced: false,
      homeVisitConsent: false,
      adoptionFeeAgreement: false,
      termsAgreement: false
    }
  });

  const watchOwnRent = watch('ownRent');
  const totalSteps = 6;

  const onSubmit = async (data: AdoptionApplicationFormData) => {
    setIsSubmitting(true);
    try {
      // Step 1: Create adopter first
      const adopterResponse = await fetch('/api/adopters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          state: data.state,
          zip_code: data.zipCode,
          date_of_birth: data.dateOfBirth,
          occupation: data.occupation,
          housing_type: data.housingType,
          own_rent: data.ownRent,
          has_yard: data.yardFenced,
          yard_fenced: data.yardFenced,
          other_pets: data.currentPets,
          experience_level: data.experienceLevel
        }),
      });

      const adopterResult = await adopterResponse.json();

      if (!adopterResponse.ok) {
        throw new Error(adopterResult.error || 'Failed to create adopter profile');
      }

      const adopterId = adopterResult.data.adopterId;

      // Step 2: Create application with adopter_id and animal_id
      const applicationResponse = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adopter_id: adopterId,
          animal_id: animalId,
          reason_for_adoption: data.whyAdopt,
          living_arrangement: `${data.housingType}, ${data.ownRent}`,
          work_schedule: `${data.hoursAloneDaily} hours alone daily`,
          previous_pet_experience: data.previousPets || 'None provided',
          veterinarian_info: data.vetName ? `${data.vetName}, ${data.vetPhone}` : null,
          references: JSON.stringify({
            ref1: {
              name: data.ref1Name,
              phone: data.ref1Phone,
              relationship: data.ref1Relationship
            }
          })
        }),
      });

      const applicationResult = await applicationResponse.json();

      if (!applicationResponse.ok) {
        throw new Error(applicationResult.error || 'Failed to submit application');
      }

      setApplicationNumber(applicationResult.data?.applicationId || applicationResult.data?.application_id || 'PENDING');
      setShowSuccess(true);
      toast.success('Application submitted successfully!');
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (animalLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="loading-spinner">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sanctuary-primary-600"></div>
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Animal Not Found</h2>
          <p className="text-gray-600 mb-4">Sorry, we couldn't find the animal you're looking for.</p>
          <Link href="/animals" className="text-sanctuary-primary-600 hover:text-sanctuary-primary-700">
            ← Back to all animals
          </Link>
        </div>
      </div>
    );
  }

  if (animal.adoption_status !== 'Available') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Not Available for Adoption</h2>
          <p className="text-gray-600 mb-4">
            {animal.name} is currently {animal.adoption_status?.toLowerCase() || 'not available'} and not available for adoption applications.
          </p>
          <Link
            href={`/animals/${animalId}`}
            className="text-sanctuary-primary-600 hover:text-sanctuary-primary-700"
          >
            ← Back to {animal.name}'s profile
          </Link>
        </div>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sanctuary-nature-50 to-sanctuary-primary-50 flex items-center justify-center p-4">
        <motion.div
          className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          data-testid="success-confirmation"
        >
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-sanctuary-primary-800 mb-4">
            Application Submitted!
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Thank you for your interest in adopting {animal.name}!
          </p>
          <div className="bg-sanctuary-primary-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-sanctuary-primary-700 mb-2">
              Application Number:
            </p>
            <p className="text-2xl font-bold text-sanctuary-primary-800" data-testid="application-number">
              #{applicationNumber}
            </p>
          </div>
          <p className="text-gray-600 mb-6">
            Our adoption team will review your application within 2-3 business days.
            You'll receive an email confirmation shortly with next steps.
          </p>
          <div className="space-y-3">
            <Link
              href={`/animals/${animalId}`}
              className="block w-full bg-sanctuary-primary-600 text-white py-2 px-4 rounded-lg hover:bg-sanctuary-primary-700"
              data-testid="back-to-animal-button"
            >
              Back to {animal.name}'s Profile
            </Link>
            <Link
              href="/animals"
              className="block w-full text-sanctuary-primary-600 hover:text-sanctuary-primary-700"
            >
              Browse More Animals
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-sanctuary-primary-800">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  {...register('firstName')}
                  data-testid="first-name-input"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1" data-testid="first-name-error">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  {...register('lastName')}
                  data-testid="last-name-input"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1" data-testid="last-name-error">{errors.lastName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  {...register('email')}
                  data-testid="email-input"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1" data-testid="email-error">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  {...register('phone')}
                  data-testid="phone-input"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1" data-testid="phone-error">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  {...register('dateOfBirth')}
                  data-testid="dob-input"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Occupation *
                </label>
                <input
                  type="text"
                  {...register('occupation')}
                  data-testid="occupation-input"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                />
                {errors.occupation && (
                  <p className="text-red-500 text-sm mt-1">{errors.occupation.message}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-sanctuary-primary-800">Address Information</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address *
              </label>
              <input
                type="text"
                {...register('address')}
                data-testid="address-input"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  {...register('city')}
                  data-testid="city-input"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <input
                  type="text"
                  {...register('state')}
                  data-testid="state-input"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  {...register('zipCode')}
                  data-testid="zip-input"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-sanctuary-primary-800">Housing Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Housing Type *
                </label>
                <select
                  {...register('housingType')}
                  data-testid="housing-type-select"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                >
                  <option value="">Select housing type</option>
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Condo">Condo</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Other">Other</option>
                </select>
                {errors.housingType && (
                  <p className="text-red-500 text-sm mt-1">{errors.housingType.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Do you own or rent? *
                </label>
                <select
                  {...register('ownRent')}
                  data-testid="own-rent-select"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                >
                  <option value="">Select option</option>
                  <option value="Own">Own</option>
                  <option value="Rent">Rent</option>
                </select>
                {errors.ownRent && (
                  <p className="text-red-500 text-sm mt-1">{errors.ownRent.message}</p>
                )}
              </div>
            </div>

            {watchOwnRent === 'Rent' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Landlord Approval (if renting)
                </label>
                <input
                  type="text"
                  {...register('landlordApproval')}
                  placeholder="Has your landlord approved pet ownership?"
                  data-testid="landlord-approval-input"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                />
              </div>
            )}

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('yardFenced')}
                  data-testid="yard-fenced-checkbox"
                  className="h-4 w-4 text-sanctuary-primary-600 focus:ring-sanctuary-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">I have a fenced yard</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Yard Size (optional)
              </label>
              <input
                type="text"
                {...register('yardSize')}
                placeholder="e.g., Small, Medium, Large, or dimensions"
                data-testid="yard-size-input"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-sanctuary-primary-800">Pet Experience</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience Level *
              </label>
              <select
                {...register('experienceLevel')}
                data-testid="experience-level-select"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
              >
                <option value="">Select experience level</option>
                <option value="First Time">First Time Pet Owner</option>
                <option value="Beginner">Beginner (1-2 years)</option>
                <option value="Intermediate">Intermediate (3-5 years)</option>
                <option value="Expert">Expert (5+ years)</option>
              </select>
              {errors.experienceLevel && (
                <p className="text-red-500 text-sm mt-1">{errors.experienceLevel.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Pets *
              </label>
              <textarea
                {...register('currentPets')}
                rows={3}
                placeholder="Please list any current pets, their species, and ages. If none, write 'None'"
                data-testid="current-pets-input"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
              />
              {errors.currentPets && (
                <p className="text-red-500 text-sm mt-1">{errors.currentPets.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Previous Pets (optional)
              </label>
              <textarea
                {...register('previousPets')}
                rows={2}
                placeholder="Tell us about pets you've had in the past"
                data-testid="previous-pets-input"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Veterinarian Name (optional)
                </label>
                <input
                  type="text"
                  {...register('veterinarian')}
                  data-testid="vet-name-input"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Veterinarian Phone (optional)
                </label>
                <input
                  type="tel"
                  {...register('veterinarianPhone')}
                  data-testid="vet-phone-input"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-sanctuary-primary-800">Lifestyle & References</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Household Members *
                </label>
                <input
                  type="text"
                  {...register('householdMembers')}
                  placeholder="Number of people in household"
                  data-testid="household-members-input"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                />
                {errors.householdMembers && (
                  <p className="text-red-500 text-sm mt-1">{errors.householdMembers.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Children Ages (optional)
                </label>
                <input
                  type="text"
                  {...register('childrenAges')}
                  placeholder="If applicable, list ages"
                  data-testid="children-ages-input"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Activity Level *
                </label>
                <select
                  {...register('activityLevel')}
                  data-testid="activity-level-select"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                >
                  <option value="">Select activity level</option>
                  <option value="Low">Low (mostly indoors)</option>
                  <option value="Moderate">Moderate (daily walks)</option>
                  <option value="High">High (very active)</option>
                </select>
                {errors.activityLevel && (
                  <p className="text-red-500 text-sm mt-1">{errors.activityLevel.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hours Alone Daily *
                </label>
                <input
                  type="text"
                  {...register('hoursAlone')}
                  placeholder="e.g., 0-2, 3-5, 6-8 hours"
                  data-testid="hours-alone-input"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                />
                {errors.hoursAlone && (
                  <p className="text-red-500 text-sm mt-1">{errors.hoursAlone.message}</p>
                )}
              </div>
            </div>

            <h4 className="text-lg font-semibold text-sanctuary-primary-700 mt-6">References</h4>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reference 1 Name *
                  </label>
                  <input
                    type="text"
                    {...register('reference1Name')}
                    data-testid="ref1-name-input"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                  />
                  {errors.reference1Name && (
                    <p className="text-red-500 text-sm mt-1">{errors.reference1Name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    {...register('reference1Phone')}
                    data-testid="ref1-phone-input"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                  />
                  {errors.reference1Phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.reference1Phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Relationship *
                  </label>
                  <input
                    type="text"
                    {...register('reference1Relationship')}
                    placeholder="e.g., Friend, Coworker"
                    data-testid="ref1-relationship-input"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                  />
                  {errors.reference1Relationship && (
                    <p className="text-red-500 text-sm mt-1">{errors.reference1Relationship.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reference 2 Name (optional)
                  </label>
                  <input
                    type="text"
                    {...register('reference2Name')}
                    data-testid="ref2-name-input"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    {...register('reference2Phone')}
                    data-testid="ref2-phone-input"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Relationship (optional)
                  </label>
                  <input
                    type="text"
                    {...register('reference2Relationship')}
                    data-testid="ref2-relationship-input"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-sanctuary-primary-800">Final Details & Agreements</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Why do you want to adopt {animal.name}? *
              </label>
              <textarea
                {...register('whyAdopt')}
                rows={4}
                placeholder="Tell us about your motivation for adopting and why you think you'd be a good match..."
                data-testid="why-adopt-input"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
              />
              {errors.whyAdopt && (
                <p className="text-red-500 text-sm mt-1" data-testid="why-adopt-error">{errors.whyAdopt.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What are your expectations? *
              </label>
              <textarea
                {...register('expectations')}
                rows={3}
                placeholder="What do you expect from your new pet and from the adoption process?"
                data-testid="expectations-input"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
              />
              {errors.expectations && (
                <p className="text-red-500 text-sm mt-1">{errors.expectations.message}</p>
              )}
            </div>

            <div className="bg-sanctuary-primary-50 rounded-lg p-6 space-y-4">
              <h4 className="font-semibold text-sanctuary-primary-800">Required Agreements</h4>

              <label className="flex items-start">
                <input
                  type="checkbox"
                  {...register('homeVisitConsent')}
                  data-testid="home-visit-consent"
                  className="h-4 w-4 text-sanctuary-primary-600 focus:ring-sanctuary-primary-500 border-gray-300 rounded mt-1"
                />
                <span className="ml-3 text-sm text-gray-700">
                  I consent to a home visit by sanctuary staff as part of the adoption process *
                </span>
              </label>
              {errors.homeVisitConsent && (
                <p className="text-red-500 text-sm">{errors.homeVisitConsent.message}</p>
              )}

              <label className="flex items-start">
                <input
                  type="checkbox"
                  {...register('adoptionFeeAgreement')}
                  data-testid="adoption-fee-agreement"
                  className="h-4 w-4 text-sanctuary-primary-600 focus:ring-sanctuary-primary-500 border-gray-300 rounded mt-1"
                />
                <span className="ml-3 text-sm text-gray-700">
                  I understand and agree to pay the adoption fee of ${animal.adoption_fee} *
                </span>
              </label>
              {errors.adoptionFeeAgreement && (
                <p className="text-red-500 text-sm">{errors.adoptionFeeAgreement.message}</p>
              )}

              <label className="flex items-start">
                <input
                  type="checkbox"
                  {...register('termsAgreement')}
                  data-testid="terms-agreement"
                  className="h-4 w-4 text-sanctuary-primary-600 focus:ring-sanctuary-primary-500 border-gray-300 rounded mt-1"
                />
                <span className="ml-3 text-sm text-gray-700">
                  I agree to the terms and conditions, including providing proper care, veterinary attention,
                  and returning the animal if I can no longer care for them *
                </span>
              </label>
              {errors.termsAgreement && (
                <p className="text-red-500 text-sm">{errors.termsAgreement.message}</p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sanctuary-nature-50 to-sanctuary-primary-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href={`/animals/${animalId}`}
            className="inline-flex items-center text-sanctuary-primary-600 hover:text-sanctuary-primary-700"
            data-testid="back-to-animal-link"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to {animal.name}'s profile
          </Link>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-sanctuary-primary-800" data-testid="form-title">
              Adoption Application for {animal.name}
            </h2>
            <span className="text-sm text-gray-600" data-testid="step-counter">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-sanctuary-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              data-testid="progress-bar"
            ></div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="bg-white rounded-lg shadow-md p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} data-testid="adoption-application-form">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  data-testid="previous-step-button"
                >
                  Previous
                </button>
              )}

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="ml-auto px-6 py-2 bg-sanctuary-primary-600 text-white rounded-lg hover:bg-sanctuary-primary-700"
                  data-testid="next-step-button"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-auto px-8 py-3 bg-sanctuary-primary-600 text-white rounded-lg hover:bg-sanctuary-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  data-testid="submit-application-button"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Submit Application
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
