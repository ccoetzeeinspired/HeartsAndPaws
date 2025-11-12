'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Calendar, MapPin, Clock, Users, Heart,
  ArrowRight, Filter, Search, Tag
} from 'lucide-react';
import { format, addDays } from 'date-fns';

export default function EventsPage() {
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  // Mock events data
  const events = [
    {
      id: 1,
      title: 'Weekend Adoption Event',
      description: 'Meet our wonderful animals looking for forever homes. All adoption fees reduced by 50%!',
      date: addDays(new Date(), 5),
      time: '10:00 AM - 4:00 PM',
      location: 'Paws & Hearts Sanctuary',
      address: '123 Sanctuary Lane, Hope Valley, CA',
      type: 'adoption',
      capacity: 100,
      registered: 45,
      image: 'photo-1450778869180-41d0601e046e'
    },
    {
      id: 2,
      title: 'Volunteer Orientation',
      description: 'Learn about volunteer opportunities and get trained to help care for our animals.',
      date: addDays(new Date(), 8),
      time: '2:00 PM - 4:00 PM',
      location: 'Education Center',
      address: '123 Sanctuary Lane, Hope Valley, CA',
      type: 'volunteer',
      capacity: 30,
      registered: 22,
      image: 'photo-1516734212186-a967f81ad0d7'
    },
    {
      id: 3,
      title: 'Annual Fundraiser Gala',
      description: 'Join us for an elegant evening of dinner, dancing, and supporting our mission.',
      date: addDays(new Date(), 15),
      time: '6:00 PM - 10:00 PM',
      location: 'Grand Ballroom',
      address: '456 Event Plaza, Hope Valley, CA',
      type: 'fundraiser',
      capacity: 200,
      registered: 156,
      image: 'photo-1511795409834-ef04bbd61622'
    },
    {
      id: 4,
      title: 'Pet Care Workshop',
      description: 'Learn essential pet care skills from our veterinary team. Topics include nutrition, grooming, and basic health care.',
      date: addDays(new Date(), 12),
      time: '1:00 PM - 3:00 PM',
      location: 'Education Center',
      address: '123 Sanctuary Lane, Hope Valley, CA',
      type: 'education',
      capacity: 40,
      registered: 28,
      image: 'photo-1581888227599-779811939961'
    },
    {
      id: 5,
      title: 'Dog Walking Social',
      description: 'Help socialize our dogs while meeting other animal lovers. Refreshments provided!',
      date: addDays(new Date(), 3),
      time: '9:00 AM - 11:00 AM',
      location: 'Sanctuary Trails',
      address: '123 Sanctuary Lane, Hope Valley, CA',
      type: 'volunteer',
      capacity: 25,
      registered: 18,
      image: 'photo-1548199973-03cce0bbc87b'
    },
    {
      id: 6,
      title: 'Kids & Pets Day',
      description: 'Family-friendly event teaching children about responsible pet ownership and animal welfare.',
      date: addDays(new Date(), 20),
      time: '11:00 AM - 3:00 PM',
      location: 'Paws & Hearts Sanctuary',
      address: '123 Sanctuary Lane, Hope Valley, CA',
      type: 'education',
      capacity: 80,
      registered: 42,
      image: 'photo-1601758125946-6ec2ef64daf8'
    }
  ];

  const eventTypes = [
    { value: 'all', label: 'All Events', icon: Calendar },
    { value: 'adoption', label: 'Adoption Events', icon: Heart },
    { value: 'volunteer', label: 'Volunteer', icon: Users },
    { value: 'fundraiser', label: 'Fundraisers', icon: Tag },
    { value: 'education', label: 'Education', icon: Calendar }
  ];

  const filteredEvents = events.filter(event => {
    const matchesType = filterType === 'all' || event.type === filterType;
    const matchesSearch = searchTerm === '' ||
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      adoption: 'bg-sanctuary-nature-100 text-sanctuary-nature-800 border-sanctuary-nature-300',
      volunteer: 'bg-sanctuary-care-100 text-sanctuary-care-800 border-sanctuary-care-300',
      fundraiser: 'bg-sanctuary-primary-100 text-sanctuary-primary-800 border-sanctuary-primary-300',
      education: 'bg-purple-100 text-purple-800 border-purple-300'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sanctuary-nature-50 to-sanctuary-primary-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-sanctuary-primary-800 mb-6">
              Upcoming Events
            </h1>
            <p className="text-xl text-sanctuary-primary-600 max-w-3xl mx-auto">
              Join us for adoption events, volunteer opportunities, fundraisers, and educational workshops.
              Every event helps us continue our mission of caring for animals in need.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  data-testid="search-events"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                />
              </div>

              {/* Type Filter */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                data-testid="filter-events"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
              >
                {eventTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Type Badges */}
            <div className="flex flex-wrap gap-2">
              {eventTypes.map(type => (
                <button
                  key={type.value}
                  onClick={() => setFilterType(type.value)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${filterType === type.value
                      ? 'bg-sanctuary-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No events found
            </h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search criteria' : 'Check back soon for upcoming events'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                data-testid={`event-card-${event.id}`}
              >
                {/* Event Image */}
                {event.image ? (
                  <Image
                    src={`https://images.unsplash.com/${event.image}?auto=format&fit=crop&w=600&h=400&q=80`}
                    alt={event.title}
                    width={600}
                    height={400}
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="h-48 bg-gradient-to-br from-sanctuary-primary-200 to-sanctuary-nature-200 flex items-center justify-center">
                    <Calendar className="h-16 w-16 text-sanctuary-primary-400" />
                  </div>
                )}

                {/* Event Content */}
                <div className="p-6">
                  {/* Type Badge */}
                  <div className="mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(event.type)}`}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-sanctuary-primary-500" />
                      <span>{format(event.date, 'EEEE, MMMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-sanctuary-primary-500" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 text-sanctuary-primary-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{event.location}</p>
                        <p className="text-xs">{event.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* Capacity */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">
                        <Users className="h-4 w-4 inline mr-1" />
                        {event.registered} / {event.capacity} registered
                      </span>
                      <span className="text-gray-600">
                        {Math.round((event.registered / event.capacity) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-sanctuary-primary-600 h-2 rounded-full"
                        style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Register Button */}
                  <button
                    className={`w-full py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center ${event.registered >= event.capacity
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : 'bg-sanctuary-primary-600 text-white hover:bg-sanctuary-primary-700'
                      }`}
                    disabled={event.registered >= event.capacity}
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowRegistrationModal(true);
                    }}
                    data-testid={`register-event-${event.id}`}
                  >
                    {event.registered >= event.capacity ? 'Event Full' : 'Register Now'}
                    {event.registered < event.capacity && <ArrowRight className="h-4 w-4 ml-2" />}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          className="mt-12 bg-white rounded-lg shadow-md p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-sanctuary-primary-800 mb-4">
            Want to Host an Event?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Interested in organizing a fundraiser, adoption event, or educational workshop?
            We'd love to work with you to make it happen!
          </p>
          <Link
            href="/contact"
            className="inline-block bg-sanctuary-primary-600 text-white px-8 py-3 rounded-lg hover:bg-sanctuary-primary-700 transition-colors duration-200"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>

      {/* Event Registration Modal */}
      {showRegistrationModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            data-testid="event-registration-modal"
          >
            <h3 className="text-2xl font-bold text-sanctuary-primary-800 mb-4">
              Register for Event
            </h3>
            <p className="text-gray-700 font-semibold mb-2">
              {selectedEvent.title}
            </p>
            <p className="text-gray-600 text-sm mb-4">
              {format(selectedEvent.date, 'EEEE, MMMM d, yyyy')} at {selectedEvent.time}
            </p>

            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              alert('Event registration successful! You will receive a confirmation email shortly.');
              setShowRegistrationModal(false);
            }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                  data-testid="registration-name-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                  data-testid="registration-email-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                  data-testid="registration-phone-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Attendees *
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  defaultValue="1"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanctuary-primary-500 focus:border-transparent"
                  data-testid="registration-attendees-input"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowRegistrationModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  data-testid="registration-cancel-button"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-sanctuary-primary-600 text-white rounded-lg hover:bg-sanctuary-primary-700"
                  data-testid="registration-submit-button"
                >
                  Register
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
