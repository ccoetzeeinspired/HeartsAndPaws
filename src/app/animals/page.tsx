'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAnimals } from '@/hooks/use-animals';
import { Heart, Search, Filter, MapPin, Calendar, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

// ===================================================================
// ANIMALS BROWSE PAGE
// ===================================================================

export default function AnimalsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch animals with filters
  const { 
    data: animalsResponse, 
    isLoading, 
    error 
  } = useAnimals({
    species: selectedSpecies || undefined,
    status: selectedStatus || undefined,
    page: currentPage,
    limit: 12,
    available_only: !selectedStatus ? true : undefined
  });

  const animals = animalsResponse?.data || [];
  const pagination = animalsResponse?.pagination;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sanctuary-nature-50 to-sanctuary-primary-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <motion.h1 
              className="text-4xl font-bold text-sanctuary-primary-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Find Your Forever Friend
            </motion.h1>
            <motion.p 
              className="text-lg text-sanctuary-primary-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Every animal deserves a loving home. Browse our wonderful companions waiting to meet you.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <motion.div 
          className="bg-white rounded-lg shadow-md p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                data-testid="animal-search-input"
              />
            </div>

            {/* Species Filter */}
            <select
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
              data-testid="species-filter-select"
            >
              <option value="">All Species</option>
              <option value="Dog">Dogs</option>
              <option value="Cat">Cats</option>
              <option value="Rabbit">Rabbits</option>
              <option value="Bird">Birds</option>
              <option value="Other">Other</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
              data-testid="status-filter-select"
            >
              <option value="">Available Only</option>
              <option value="Available">Available</option>
              <option value="Pending">Pending Adoption</option>
              <option value="Medical Hold">Medical Hold</option>
            </select>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedSpecies('');
                setSelectedStatus('');
                setCurrentPage(1);
              }}
              className="px-4 py-2 bg-sanctuary-primary-600 text-white rounded-lg hover:bg-sanctuary-primary-700 transition-colors duration-200"
              data-testid="clear-filters-button"
            >
              Clear Filters
            </button>
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sanctuary-primary-600 mx-auto"></div>
            <p className="mt-4 text-sanctuary-primary-600">Loading our wonderful animals...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">
              Unable to load animals at the moment. Please try again later.
            </p>
            <p className="text-red-500 text-sm mt-2">
              Note: Database connection needs to be configured with your PostgreSQL credentials.
            </p>
          </div>
        )}

        {/* Animals Grid */}
        {!isLoading && !error && (
          <>
            {animals.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="h-16 w-16 text-sanctuary-primary-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-sanctuary-primary-700 mb-2">
                  No animals match your criteria
                </h3>
                <p className="text-sanctuary-primary-600">
                  Try adjusting your filters to see more animals.
                </p>
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {animals.map((animal, index) => (
                  <AnimalCard key={animal.animalId} animal={animal} index={index} data-testid={`animal-card-${animal.animalId}`} />
                ))}
              </motion.div>
            )}

            {/* Pagination */}
            {pagination && pagination.total_pages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={!pagination.has_prev_page}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sanctuary-primary-50"
                    data-testid="pagination-previous"
                  >
                    Previous
                  </button>
                  
                  <span className="px-4 py-2 bg-sanctuary-primary-600 text-white rounded-lg">
                    {pagination.current_page} of {pagination.total_pages}
                  </span>
                  
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={!pagination.has_next_page}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sanctuary-primary-50"
                    data-testid="pagination-next"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ===================================================================
// ANIMAL CARD COMPONENT
// ===================================================================

interface AnimalCardProps {
  animal: any;
  index: number;
}

function AnimalCard({ animal, index }: AnimalCardProps) {
  const statusColors: Record<string, string> = {
    Available: 'bg-green-100 text-green-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    'Medical Hold': 'bg-red-100 text-red-800',
    Adopted: 'bg-blue-100 text-blue-800',
  };

  // Generate a dynamic image URL based on animal attributes
  const getAnimalImageUrl = () => {
    if (animal.photos) {
      return animal.photos;
    }

    // Curated list of animal photos from Unsplash - organized by species
    const animalImages = {
      dog: [
        'photo-1587300003388-59208cc962cb',
        'photo-1601758228041-f3b2795255f1',
        'photo-1583511655857-d19b40a7a54e',
        'photo-1548199973-03cce0bbc87b',
        'photo-1534361960057-19889db9621e',
        'photo-1537151608828-ea2b11777ee8',
        'photo-1543466835-00a7907e9de1',
        'photo-1558788353-f76d92427f16',
        'photo-1477884213360-7e9d7dcc1e48',
        'photo-1552053831-71594a27632d'
      ],
      cat: [
        'photo-1514888286974-6c03e2ca1dba',
        'photo-1574158622682-e40e69881006',
        'photo-1573865526739-10c1dd7e8e8c',
        'photo-1495360010541-f48722b34f7d',
        'photo-1519052537078-e6302a4968d4',
        'photo-1511044568932-338cba0ad803',
        'photo-1529778873920-4da4926a72c2',
        'photo-1542652694-40abf526446e',
        'photo-1533738363-b7f9aef128ce',
        'photo-1478098711619-5ab0b478d6e6'
      ],
      rabbit: [
        'photo-1585110396000-c9ffd4e4b308',
        'photo-1535241749838-299277b6305f',
        'photo-1580561184820-8c86e5c6b8f8',
        'photo-1606425271394-c3ca9aa1696c',
        'photo-1558865869-c9c5c8b54fe6',
        'photo-1518796745738-41048802f99a',
        'photo-1559827260-dc66d52bef19',
        'photo-1612528443702-f6741f70a049',
        'photo-1538268029259-09f6da8e5742',
        'photo-1518791841217-8f162f1e1131'
      ],
      bird: [
        'photo-1552728089-57bdde30beb3',
        'photo-1444464666168-49d633b86797',
        'photo-1570262790473-3609850f8e69',
        'photo-1552728089-57bdde30beb3',
        'photo-1525523958073-31fc82b0e7f5',
        'photo-1611689342806-0863700ce1e4',
        'photo-1552728089-57bdde30beb3',
        'photo-1559827260-dc66d52bef19',
        'photo-1582377909774-b97efc94793e',
        'photo-1559235038-1b0faab8e997'
      ],
      other: [
        'photo-1425082661705-1834bfd09dca',
        'photo-1535591273668-578e31182c4f',
        'photo-1556909114-f6e7ad7d3136',
        'photo-1452857297128-d9c29adba80b',
        'photo-1544735716-392fe2489ffa',
        'photo-1560743173-567a0b5d1def',
        'photo-1484406566174-9da000fda645',
        'photo-1558788353-f76d92427f16',
        'photo-1444212477490-ca407925329e',
        'photo-1415369629372-26f2fe60c467'
      ]
    };

    // Get species-specific images or default to 'other'
    const species = animal.species?.toLowerCase() || 'other';
    const imageList = animalImages[species as keyof typeof animalImages] || animalImages.other;

    // Use animal ID to consistently pick the same image
    const seed = animal.animalId || animal.name || '0';
    const hashCode = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash);
    };

    const imageIndex = hashCode(String(seed)) % imageList.length;
    const photoId = imageList[imageIndex];

    return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=400&h=300&q=80`;
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -2 }}
    >
      {/* Photo */}
      <div className="h-48 bg-gradient-to-br from-sanctuary-primary-200 to-sanctuary-nature-200 flex items-center justify-center overflow-hidden">
        <img
          src={getAnimalImageUrl()}
          alt={`${animal.name} - ${animal.species}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to heart icon if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = '<svg class="h-12 w-12 text-sanctuary-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>';
            }
          }}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-sanctuary-primary-800">
            {animal.name}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[animal.adoptionStatus] || 'bg-gray-100 text-gray-800'}`}>
            {animal.adoptionStatus}
          </span>
        </div>

        <div className="space-y-2 text-sm text-sanctuary-primary-600">
          <div className="flex items-center">
            <span className="font-medium">{animal.species}</span>
            {animal.breed && <span className="ml-1">• {animal.breed}</span>}
          </div>
          
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{animal.age} years old</span>
          </div>
          
          {animal.habitatName && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{animal.habitatName}</span>
            </div>
          )}
          
          {animal.adoptionFee > 0 && (
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              <span>${animal.adoptionFee} adoption fee</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-4">
          <Link
            href={`/animals/${animal.animalId}`}
            className="block w-full bg-sanctuary-primary-600 text-white py-2 px-4 rounded-lg hover:bg-sanctuary-primary-700 transition-colors duration-200 text-center"
            data-testid={`view-animal-${animal.animalId}`}
          >
            Learn More
          </Link>
        </div>
      </div>
    </motion.div>
  );
}