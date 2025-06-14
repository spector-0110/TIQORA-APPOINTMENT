'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cancelAppointment } from '@/lib/patientAPI';
import { useIsMobile } from '@/hooks/use-mobile';
import trackingSocket from '@/lib/trackingSocket';

// Assuming you have this custom component
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog'; 
import { 
  CheckCircle, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Stethoscope, 
  MapPin,
  AlertTriangle,
  Eye,
  Share2,
  CreditCard,
  Building2,
  Plus,
  X
} from 'lucide-react';

/**
 * Existing Appointment Display Component
 * Shows appointment details when user returns to the same hospital
 *
 * @param {object} props - The component props.
 * @param {object} props.appointmentData - Object containing appointment details.
 * @param {function} props.onCreateNew - Function to call when user wants to create a new appointment.
 * @param {function} props.onAppointmentCancelled - Function to call after an appointment is successfully cancelled.
 */
const ExistingAppointmentView = ({ 
  appointmentData, 
  onCreateNew, 
  onAppointmentCancelled 
}) => {
  const [isCancelling, setIsCancelling] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [cancelError, setCancelError] = useState(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const [queueInfo, setQueueInfo] = useState(null);
  const isMobile = useIsMobile();

  // Socket event handlers for tracking
  useEffect(() => {
    const handleQueueUpdate = (info) => {
      setQueueInfo(info);
    };

    const handleError = (error) => {
      console.error('Tracking error:', error);
      setCopySuccess('Error tracking appointment');
      setTimeout(() => setCopySuccess(''), 2000);
    };

    // Add socket listeners
    trackingSocket.addListener('update', handleQueueUpdate);
    trackingSocket.addListener('error', handleError);

    // Cleanup function
    return () => {
      trackingSocket.removeListener('update', handleQueueUpdate);
      trackingSocket.removeListener('error', handleError);
      trackingSocket.stopTracking();
    };
  }, []);

  // Helper to extract tracking token from the tracking link URL
  const getTrackingToken = (trackingLink) => {
    try {
      if (!trackingLink) return null;
      const url = new URL(trackingLink);
      // Assumes the token is the last part of the path
      const pathParts = url.pathname.split('/');
      return pathParts[pathParts.length - 1]; 
    } catch (error) {
      console.error('Error extracting tracking token:', error);
      return null;
    }
  };

  // Handles tracking the appointment by opening the tracking page and starting socket tracking
  const handleTrackAppointment = async () => {
    try {
      const trackingLink = appointmentData?.trackingLink;
      if (!trackingLink) {
        setCopySuccess('No tracking link available');
        setTimeout(() => setCopySuccess(''), 2000);
        return;
      }
      
      const token = getTrackingToken(trackingLink);
      if (!token) {
        setCopySuccess('Invalid tracking link');
        setTimeout(() => setCopySuccess(''), 2000);
        return;
      }
      
      // Start socket tracking
      trackingSocket.startTracking(token);
      
      // Construct tracking URL and open in new tab
      const trackingUrl = `/track/${token}`;
      window.open(trackingUrl, '_blank');
      
      setCopySuccess('Opening tracking page...');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (error) {
      console.error('Failed to open tracking link:', error);
      setCopySuccess('Failed to open tracking page');
      setTimeout(() => setCopySuccess(''), 2000);
    }
  };

  // Handles sharing the tracking link using Web Share API or falling back to opening
  const handleShareTrackingLink = async () => {
    const trackingLink = appointmentData?.trackingLink;
    const hospitalName = appointmentData?.hospital?.name;
    
    if (!trackingLink) {
      // If no link, fall back to tracking (which shows a message)
      handleTrackAppointment();
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Appointment Tracking Link',
          text: `Track your appointment at ${hospitalName || 'Hospital'}`,
          url: trackingLink,
        });
      } catch (error) {
        console.error('Error sharing:', error);
        // Fallback if sharing fails (e.g., user cancels share dialog)
        handleTrackAppointment();
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      handleTrackAppointment();
    }
  };

  // Handles the cancellation of the appointment
  const handleCancelAppointment = async () => {
    const id = appointmentData?.id;
    if (!id) {
      setCancelError('Invalid id. Cannot cancel appointment.');
      return;
    }

    try {
      setIsCancelling(true);
      setCancelError(null); // Clear previous errors
      
      await cancelAppointment(id); // Call your actual API
      setIsCancelled(true);
      setShowCancelDialog(false); // Close dialog
      
      // Notify parent component about the cancellation
      
      if (onAppointmentCancelled) {
        onAppointmentCancelled(appointmentData?.id);
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      setCancelError(error.message || 'Failed to cancel appointment. Please try again.');
    } finally {
      setIsCancelling(false);
    }
  };

  // Formats date into a readable string (e.g., "Monday, 01 January 2024")
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isMobile) {
        // Shorter format for mobile: "01 Jan 2024"
        return date.toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        });
      }
      // Full format for desktop
      return date.toLocaleDateString('en-IN', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  // Extracts and formats time from ISO string (e.g., "09:00")
  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';

    try {
      // Extract time portion from ISO string "1970-01-01T09:00:00.000Z"
      const timePart = timeString.split('T')[1]; // Get "09:00:00.000Z"
      const timeOnly = timePart.split('.')[0]; // Get "09:00:00"
      const [hours, minutes] = timeOnly.split(':'); // Get ["09", "00"]
      
      // Convert to 12-hour format
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      return `${displayHour.toString().padStart(2, '0')}:${minutes} ${ampm}`;
    } catch (error) {
      console.error('Error formatting time:', error, 'Input:', timeString);
      return 'Invalid Time';
    }
  };

  // Returns Tailwind CSS classes for status badges based on status string
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'booked':
        return 'bg-emerald-900/50 text-emerald-300 border border-emerald-700';
      case 'cancelled':
        return 'bg-red-900/50 text-red-300 border border-red-700';
      case 'completed':
        return 'bg-blue-900/50 text-blue-300 border border-blue-700';
      case 'pending':
        return 'bg-amber-900/50 text-amber-300 border border-amber-700';
      default:
        return 'bg-slate-700/50 text-slate-300 border border-slate-600';
    }
  };

  // Returns Tailwind CSS classes for payment status badges
  const getPaymentStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'bg-emerald-900/50 text-emerald-300 border border-emerald-700';
      case 'unpaid':
        return 'bg-orange-900/50 text-orange-300 border border-orange-700';
      case 'pending':
        return 'bg-amber-900/50 text-amber-300 border border-amber-700';
      default:
        return 'bg-slate-700/50 text-slate-300 border border-slate-600';
    }
  };

  // --- Render logic for different states ---

  // // Display if no appointment data is provided
  // if (!appointmentData) {
  //   return (
  //     <div className="w-full max-w-xl mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-lg">
  //       <Card className="border-2 border-dashed border-gray-300 bg-gray-50 text-center py-8">
  //         <CardContent className="p-6">
  //           <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
  //           <h2 className="text-xl font-bold text-gray-800 mb-2">No Appointment Found</h2>
  //           <p className="text-gray-600 mb-6 max-w-sm mx-auto">
  //             We couldn't find any active appointment details.
  //           </p>
  //           <Button 
  //             onClick={onCreateNew} 
  //             className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 ease-in-out px-6 py-3 rounded-lg shadow-md hover:shadow-lg"
  //           >
  //             <Plus className="w-4 h-4 mr-2" />
  //             Create New Appointment
  //           </Button>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   );
  // }

  // // Display if the appointment has been successfully cancelled
  // if (isCancelled) {
  //   return (
  //     <div className="w-full max-w-xl mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-lg">
  //       <Card className="border-2 border-red-400 bg-red-50 text-center py-8">
  //         <CardContent className="p-6">
  //           <X className="w-16 h-16 text-red-600 mx-auto mb-4 animate-scale-in" />
  //           <h2 className="text-xl font-bold text-red-800 mb-2">Appointment Cancelled</h2>
  //           <p className="text-red-700 mb-6 max-w-sm mx-auto">
  //             Your appointment has been successfully cancelled.
  //           </p>
  //           <Button 
  //             onClick={onCreateNew} 
  //             className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 ease-in-out px-6 py-3 rounded-lg shadow-md hover:shadow-lg"
  //           >
  //             <Plus className="w-4 h-4 mr-2" />
  //             Create New Appointment
  //           </Button>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   );
  // }

  // Main display for an existing appointment
  return (
    <div className={`w-full mx-auto bg-gradient-to-b from-neutral-950 via-gray-900 to-gray-700 ${
      isMobile 
        ? 'p-2 space-y-2 min-h-screen max-h-screen overflow-y-auto' 
        : 'max-w-4xl p-4 lg:p-6 space-y-4 md:space-y-6 rounded-lg shadow-2xl border border-slate-700'
    }`}>
      
      {/* Header Section with Logo - Compact for mobile */}
      <div className="relative ">
        {/* TIQORA Logo in top-left corner */}
        <div className="absolute top-0 left-0 z-10">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            <img 
              src="/Tiqora1.png" 
              alt="Tiqora Logo" 
              className={`${isMobile ? 'h-6 w-auto' : 'h-8 w-auto'} object-contain`}
            />
          </div>
        </div>
        
        {/* Main Header Content */}
        <div className="text-center space-y-1 pt-2">
          <div className="flex items-center justify-center gap-1 mb-1">
            <CheckCircle className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5 sm:w-6 sm:h-6'} text-emerald-400`} />
            <h1 className={`${isMobile ? 'text-base' : 'text-lg sm:text-2xl lg:text-3xl'} font-bold text-white leading-tight`}>
              {isMobile ? 'Appointment Confirmed!' : 'Your Appointment Confirmed!'}
            </h1>
          </div>
          {!isMobile && (
            <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto">
              You have an existing appointment at this hospital.
            </p>
          )}
        </div>
      </div>

      {/* Status & Payment Cards - More compact for mobile */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        {/* Appointment Status Card */}
        <Card className="border-l-2 border-l-emerald-500 bg-gradient-to-br from-neutral-900  to-gray-800 shadow-lg border border-neutral-800">
          <CardContent className="p-2 sm:p-3 flex flex-col items-center text-center">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 mb-1" />
            <p className="text-xs text-slate-300">Status</p>
            <Badge className={`${getStatusColor(appointmentData?.status)} capitalize text-xs font-medium`}>
              {appointmentData?.status || 'Unknown'}
            </Badge>
          </CardContent>
        </Card>

        {/* Payment Status Card */}
        <Card className="border-l-2 border-l-blue-500 bg-gradient-to-br from-neutral-900 to-gray-800 shadow-lg border border-neutral-800">
          <CardContent className="p-2 sm:p-3 flex flex-col items-center text-center">
            <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mb-1" />
            <p className="text-xs text-slate-300">Payment</p>
            <Badge className={`${getPaymentStatusColor(appointmentData?.paymentStatus)} capitalize text-xs font-medium`}>
              {appointmentData?.paymentStatus || 'Unknown'}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Main Appointment Details Card - Compact mobile layout */}
      <Card className="bg-gradient-to-br from-neutral-900 to-slate-800 shadow-xl rounded-lg border border-slate-800">
        <CardHeader className={`${isMobile ? 'pb-1 px-3 pt-2' : 'pb-2'} border-b border-slate-600`}>
          <CardTitle className={`${isMobile ? 'text-sm' : 'text-base sm:text-lg'} font-bold text-white`}>
            {isMobile ? 'Details' : 'Booking Information'}
          </CardTitle>
        </CardHeader>
        <CardContent className={`${isMobile ? 'p-2 space-y-2' : 'p-3 sm:p-4 space-y-3 sm:space-y-4'}`}>
          
          {/* Date and Time - Single column on mobile */}
          <div className={`grid ${isMobile ? 'grid-cols-2 gap-2' : 'grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3'}`}>
            <div className="flex items-start gap-2">
              <Calendar className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-blue-400 mt-0.5 flex-shrink-0`} />
              <div className="min-w-0">
                <p className={`font-medium text-white ${isMobile ? 'text-xs' : 'text-sm'}`}>Date</p>
                <p className={`text-slate-300 ${isMobile ? 'text-xs truncate' : 'text-xs sm:text-sm'}`}>
                  {formatDate(appointmentData?.appointmentDate)}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Clock className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-blue-400 mt-0.5 flex-shrink-0`} />
              <div className="min-w-0">
                <p className={`font-medium text-white ${isMobile ? 'text-xs' : 'text-sm'}`}>Time</p>
                <p className={`text-slate-300 ${isMobile ? 'text-xs truncate' : 'text-xs sm:text-sm'}`}>
                  {formatTime(appointmentData?.startTime)} - {formatTime(appointmentData?.endTime)}
                </p>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-700" />

          {/* Patient Information - Compact grid */}
          <div>
            <h3 className={`font-semibold text-white mb-1 flex items-center gap-1 ${isMobile ? 'text-xs' : 'text-sm sm:text-base'}`}>
              <User className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-slate-300`} />
              Patient Details
            </h3>
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-1' : 'grid-cols-1 sm:grid-cols-3 gap-2'}`}>
              <div>
                <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-slate-400`}>Name</p>
                <p className={`font-medium text-slate-200 ${isMobile ? 'text-xs truncate' : 'text-sm'}`}>
                  {appointmentData?.patientName || 'N/A'}
                </p>
              </div>
              <div>
                <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-slate-400`}>Age</p>
                <p className={`font-medium text-slate-200 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  {appointmentData?.age ? `${appointmentData.age} years` : 'N/A'}
                </p>
              </div>
              <div>
                <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-slate-400`}>Mobile</p>
                <p className={`font-medium text-slate-200 ${isMobile ? 'text-xs' : 'text-sm'} flex items-center gap-1`}>
                    <Phone className={`${isMobile ? 'w-2 h-2' : 'w-3 h-3'} text-slate-400`} />
                    <span className="truncate">{appointmentData?.mobile || 'N/A'}</span>
                </p>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-600" />

          {/* Doctor Information - Photo on left, info on right with reduced gap */}
          <div>
            <h3 className={`font-semibold text-white mb-1 flex items-center gap-1 ${isMobile ? 'text-xs' : 'text-sm sm:text-base'}`}>
              <Stethoscope className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-slate-300`} />
              Doctor Information
            </h3>
            <div className="flex items-center gap-2">
              {/* Doctor Photo - Left side */}
              {appointmentData?.doctor?.photo && (
                <div className="flex-shrink-0">
                  <img
                    src={appointmentData.doctor.photo}
                    alt={`Dr. ${appointmentData?.doctor?.name || 'Doctor'}`}
                    className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16 sm:w-20 sm:h-20'} rounded-full object-cover border-2 border-blue-400 shadow-lg`}
                  />
                </div>
              )}
              
              {/* Doctor Info - Right side with minimal gap */}
              <div className="flex-1 min-w-0 pl-1">
                <p className={`font-bold ${isMobile ? 'text-xs' : 'text-sm sm:text-base'} text-white truncate`}>
                  Dr. {appointmentData?.doctor?.name || 'N/A'}
                </p>
                <p className={`text-blue-400 capitalize ${isMobile ? 'text-xs' : 'text-xs sm:text-sm'} truncate`}>
                  {appointmentData?.doctor?.specialization || 'N/A'}
                </p>
                <div className={isMobile ? 'mt-0.5' : 'mt-1'}>
                  <p className="text-xs text-slate-300 truncate">{appointmentData?.doctor?.qualification || 'N/A'}</p>
                  <p className="text-xs text-slate-300">
                    {appointmentData?.doctor?.experience ? `${appointmentData.doctor.experience} years exp` : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-600" />

          {/* Hospital Information - Enhanced Professional Layout */}
          <div className="w-full">
            <h3 className={`font-semibold text-white mb-2 flex items-center gap-1 ${isMobile ? 'text-xs' : 'text-sm sm:text-base'}`}>
              <Building2 className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-slate-300`} />
              Hospital Details
            </h3>
            <div className="w-full bg-gradient-to-r from-slate-800/70 to-gray-800/70 rounded-lg border border-slate-700 p-3">
              {/* Hospital Name with optional type badge */}
              <div className="flex items-center justify-between mb-2">
                <p className={`font-bold ${isMobile ? 'text-sm' : 'text-base'} text-white`}>
                  {appointmentData?.hospital?.name || 'N/A'}
                </p>
                {appointmentData?.hospital?.type && (
                  <Badge className="bg-blue-600 text-white text-xs">
                    {appointmentData.hospital.type}
                  </Badge>
                )}
              </div>
              
              {/* Hospital Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                {appointmentData?.hospital?.address && (
                  <div className="flex items-start gap-2">
                    <div className=" p-1 rounded-full flex-shrink-0">
                      <MapPin className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-blue-300`} />
                    </div>
                    <div className="text-slate-200 min-w-0">
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {appointmentData.hospital.address.street || 'N/A'}
                      </p>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-slate-300`}>
                        {appointmentData.hospital.address.city || 'N/A'}, {appointmentData.hospital.address.state || 'N/A'} {appointmentData.hospital.address.pincode || ''}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Hospital Contact */}
                <div className="flex flex-col space-y-1.5">
                  {appointmentData?.hospital?.contactInfo?.phone && (
                    <div className="flex items-center gap-2">
                      <div className=" p-1 rounded-full">
                        <Phone className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-blue-300`} />
                      </div>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-slate-200`}>
                        {appointmentData.hospital.contactInfo.phone}
                      </p>
                    </div>
                  )}
                  {appointmentData?.hospital?.contactInfo?.email && (
                    <div className="flex items-center gap-2">
                      <div className="bg-slate-700/80 p-1 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-blue-300`}>
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </div>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-slate-200 truncate`}>
                        {appointmentData.hospital.contactInfo.email}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Hospital working hours or additional info (if available) */}
              {appointmentData?.hospital?.workingHours && (
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-600/50">
                  <div className="bg-slate-700/80 p-1 rounded-full">
                    <Clock className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-blue-300`} />
                  </div>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-slate-200`}>
                    {appointmentData.hospital.workingHours}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons Section - Compact mobile layout */}
      <div className={`${isMobile ? 'space-y-1' : 'space-y-2'}`}>
        {/* Tracking Link Card - Compact */}
        <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 border border-blue-700 shadow-lg backdrop-blur-sm">
          <CardContent className={`${isMobile ? 'p-2' : 'p-3'}`}>
            <div className="flex flex-col gap-2">
              <div className="flex-1">
                <h4 className={`font-semibold text-blue-200 ${isMobile ? 'text-xs mb-0' : 'text-sm mb-1'}`}>
                  {isMobile ? 'Track Appointment' : 'Track Your Appointment'}
                </h4>
                {!isMobile && (
                  <p className="text-xs text-blue-300">
                    Stay updated on your appointment status.
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleTrackAppointment}
                  className={`flex-1 border-blue-500 bg-blue-900/30 text-blue-200 hover:bg-blue-800/50 hover:text-blue-100 ${
                    isMobile ? 'text-xs px-2 py-1 h-7' : 'text-xs px-2 py-1 h-8'
                  }`}
                >
                  <Eye className={`${isMobile ? 'w-3 h-3 mr-1' : 'w-3 h-3 mr-1'}`} />
                  Track
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShareTrackingLink}
                  className={`flex-1 border-blue-500 bg-blue-900/30 text-blue-200 hover:bg-blue-800/50 hover:text-blue-100 ${
                    isMobile ? 'text-xs px-2 py-1 h-7' : 'text-xs px-2 py-1 h-8'
                  }`}
                >
                  <Share2 className={`${isMobile ? 'w-3 h-3 mr-1' : 'w-3 h-3 mr-1'}`} />
                  Share
                </Button>
              </div>
            </div>
            {copySuccess && (
              <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-emerald-300 font-medium mt-1 text-center`}>
                {copySuccess}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Cancellation Button - Compact */}
        <div className="flex justify-center">
          <Button
            variant="destructive"
            onClick={() => setShowCancelDialog(true)}
            className={`w-full sm:w-auto px-4 py-2 font-medium rounded-lg shadow-lg transition-all duration-200 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border border-red-500 ${
              isMobile ? 'text-xs h-8' : 'text-sm h-9'
            }`}
            disabled={appointmentData?.status === 'cancelled' || isCancelling}
          >
            {isCancelling ? (
                <>
                    <svg className={`animate-spin -ml-1 mr-2 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-white`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isMobile ? 'Cancelling...' : 'Cancelling...'}
                </>
            ) : (
                <>
                    <X className={`${isMobile ? 'w-3 h-3 mr-1' : 'w-4 h-4 mr-1'}`} />
                    {isMobile ? 'Cancel' : 'Cancel Appointment'}
                </>
            )}
          </Button>
        </div>

        {/* Error Display - Compact */}
        {cancelError && (
          <div className={`${isMobile ? 'p-1' : 'p-2'} bg-red-900/50 border border-red-700 rounded-lg flex items-start gap-2 shadow-lg backdrop-blur-sm`}>
            <AlertTriangle className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-red-400 flex-shrink-0 mt-0.5`} />
            <p className={`text-red-300 ${isMobile ? 'text-xs' : 'text-xs'} font-medium`}>{cancelError}</p>
          </div>
        )}
      </div>

      {/* Cancellation Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onConfirm={handleCancelAppointment}
        title="Confirm Cancellation"
        message={`Are you absolutely sure you want to cancel your appointment with Dr. ${appointmentData?.doctor?.name || 'the doctor'} scheduled for ${formatDate(appointmentData?.appointmentDate)} at ${formatTime(appointmentData?.startTime)}? This action cannot be undone.`}
        confirmText={isCancelling ? "Cancelling..." : "Yes, Cancel My Appointment"}
        cancelText="No, Keep Appointment"
        type="destructive"
        isLoading={isCancelling}
      />
    </div>
  );
};

export default ExistingAppointmentView;