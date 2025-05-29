'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { 
  CheckCircle, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Stethoscope, 
  MapPin,
  ExternalLink,
  AlertTriangle,
  Copy,
  Share2,
  CreditCard,
  Building2,
  Plus,
  X
} from 'lucide-react';
import { cancelAppointment } from '@/lib/patientAPI';

/**
 * Existing Appointment Display Component
 * Shows appointment details when user returns to the same hospital
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

  // Extract tracking token from the tracking link
  const getTrackingToken = (trackingLink) => {
    try {
      const url = new URL(trackingLink);
      const pathParts = url.pathname.split('/');
      return pathParts[pathParts.length - 1]; // Get the last part (token)
    } catch (error) {
      console.error('Error extracting tracking token:', error);
      return null;
    }
  };

  const handleCopyTrackingLink = async () => {
    try {
      await navigator.clipboard.writeText(appointmentData.trackingLink);
      setCopySuccess('Tracking link copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (error) {
      console.error('Failed to copy tracking link:', error);
      setCopySuccess('Failed to copy link');
      setTimeout(() => setCopySuccess(''), 2000);
    }
  };

  const handleShareTrackingLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Appointment Tracking Link',
          text: `Track your appointment at ${appointmentData.hospital.name}`,
          url: appointmentData.trackingLink,
        });
      } catch (error) {
        console.error('Error sharing:', error);
        handleCopyTrackingLink();
      }
    } else {
      handleCopyTrackingLink();
    }
  };

  const handleCancelAppointment = async () => {
    const token = getTrackingToken(appointmentData.trackingLink);
    if (!token) {
      setCancelError('Invalid tracking link. Cannot cancel appointment.');
      return;
    }

    try {
      setIsCancelling(true);
      setCancelError(null);
      
      await cancelAppointment(token);
      setIsCancelled(true);
      setShowCancelDialog(false);
      
      // Notify parent component about the cancellation
      if (onAppointmentCancelled) {
        onAppointmentCancelled(appointmentData.id);
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      setCancelError(error.message || 'Failed to cancel appointment');
    } finally {
      setIsCancelling(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    // Handle null, undefined, or empty values
    if (!timeString) {
      return 'N/A';
    }

    try {
      // Handle both ISO date strings and time strings
      if (timeString.includes('T')) {
        return new Date(timeString).toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
      } else {
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
      }
    } catch (error) {
      console.error('Error formatting time:', error, 'Input:', timeString);
      return 'Invalid Time';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'booked':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'unpaid':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isCancelled) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6 text-center">
            <X className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-red-800 mb-2">Appointment Cancelled</h2>
            <p className="text-red-700 mb-6">
              Your appointment has been successfully cancelled.
            </p>
            <Button onClick={onCreateNew} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create New Appointment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Your Appointment</h1>
        </div>
        <p className="text-gray-600 text-sm sm:text-base">
          You have an existing appointment at this hospital
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <Badge className={`${getStatusColor(appointmentData.status)} capitalize mt-1`}>
                  {appointmentData.status}
                </Badge>
              </div>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Payment</p>
                <Badge className={`${getPaymentStatusColor(appointmentData.paymentStatus)} capitalize mt-1`}>
                  {appointmentData.paymentStatus}
                </Badge>
              </div>
              <CreditCard className="w-5 h-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Appointment Details */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg sm:text-xl">Appointment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Date and Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Date</p>
                <p className="text-gray-600 text-sm">{formatDate(appointmentData.appointmentDate)}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Time</p>
                <p className="text-gray-600 text-sm">
                  {formatTime(appointmentData.startTime)} - {formatTime(appointmentData.endTime)}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Patient Information */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <User className="w-4 h-4" />
              Patient Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{appointmentData.patientName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Age</p>
                <p className="font-medium">{appointmentData.age} years</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Mobile</p>
                <p className="font-medium">{appointmentData.mobile}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Doctor Information */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Stethoscope className="w-4 h-4" />
              Doctor Information
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              {appointmentData.doctor.photo && (
                <img
                  src={appointmentData.doctor.photo}
                  alt={`Dr. ${appointmentData.doctor.name}`}
                  className="w-16 h-16 rounded-full object-cover mx-auto sm:mx-0"
                />
              )}
              <div className="flex-1 text-center sm:text-left">
                <p className="font-medium text-lg">Dr. {appointmentData.doctor.name}</p>
                <p className="text-blue-600 capitalize">{appointmentData.doctor.specialization}</p>
                <p className="text-sm text-gray-600">{appointmentData.doctor.qualification}</p>
                <p className="text-sm text-gray-600">{appointmentData.doctor.experience} years experience</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Hospital Information */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Hospital Information
            </h3>
            <div className="space-y-2">
              <p className="font-medium text-lg">{appointmentData.hospital.name}</p>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-600">
                  <p>{appointmentData.hospital.address.street}</p>
                  <p>{appointmentData.hospital.address.city}, {appointmentData.hospital.address.state}</p>
                  <p>{appointmentData.hospital.address.pincode}</p>
                </div>
              </div>
              {appointmentData.hospital.contactInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <p className="text-sm text-gray-600">{appointmentData.hospital.contactInfo.phone}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-4">
        {/* Tracking Link */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-medium text-blue-900 mb-1">Track Your Appointment</h4>
                <p className="text-sm text-blue-700">
                  Use this link to track your appointment status and get updates
                </p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyTrackingLink}
                  className="flex-1 sm:flex-none border-blue-300 text-blue-700 hover:bg-blue-100"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Link
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShareTrackingLink}
                  className="flex-1 sm:flex-none border-blue-300 text-blue-700 hover:bg-blue-100"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
            {copySuccess && (
              <p className="text-sm text-green-600 mt-2">{copySuccess}</p>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onCreateNew}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Appointment
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setShowCancelDialog(true)}
            className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
            disabled={appointmentData.status === 'cancelled'}
          >
            <X className="w-4 h-4 mr-2" />
            Cancel Appointment
          </Button>
        </div>

        {/* Error Display */}
        {cancelError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{cancelError}</p>
            </div>
          </div>
        )}
      </div>

      {/* Cancellation Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onConfirm={handleCancelAppointment}
        title="Cancel Appointment"
        message={`Are you sure you want to cancel your appointment with Dr. ${appointmentData.doctor.name} on ${formatDate(appointmentData.appointmentDate)}?`}
        confirmText={isCancelling ? "Cancelling..." : "Yes, Cancel"}
        cancelText="No, Keep Appointment"
        type="destructive"
        isLoading={isCancelling}
      />
    </div>
  );
};

export default ExistingAppointmentView;
