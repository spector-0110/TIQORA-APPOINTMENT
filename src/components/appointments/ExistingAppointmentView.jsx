'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cancelAppointment } from '@/lib/patientAPI';

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

  // Handles tracking the appointment by opening the tracking page
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
      return new Date(dateString).toLocaleDateString('en-IN', {
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

  // Formats time into a readable string (e.g., "10:30 AM")
  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';

    try {
      // Parse the ISO date string and extract time
      const date = new Date(timeString);
      return date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      console.error('Error formatting time:', error, 'Input:', timeString);
      return 'Invalid Time';
    }
  };

  // Returns Tailwind CSS classes for status badges based on status string
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'booked':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  // Returns Tailwind CSS classes for payment status badges
  const getPaymentStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'unpaid':
        return 'bg-orange-100 text-orange-800 border border-orange-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  // --- Render logic for different states ---

  // Display if no appointment data is provided
  if (!appointmentData) {
    return (
      <div className="w-full max-w-xl mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-lg">
        <Card className="border-2 border-dashed border-gray-300 bg-gray-50 text-center py-8">
          <CardContent className="p-6">
            <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">No Appointment Found</h2>
            <p className="text-gray-600 mb-6 max-w-sm mx-auto">
              We couldn't find any active appointment details.
            </p>
            <Button 
              onClick={onCreateNew} 
              className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 ease-in-out px-6 py-3 rounded-lg shadow-md hover:shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Appointment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Display if the appointment has been successfully cancelled
  if (isCancelled) {
    return (
      <div className="w-full max-w-xl mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-lg">
        <Card className="border-2 border-red-400 bg-red-50 text-center py-8">
          <CardContent className="p-6">
            <X className="w-16 h-16 text-red-600 mx-auto mb-4 animate-scale-in" />
            <h2 className="text-xl font-bold text-red-800 mb-2">Appointment Cancelled</h2>
            <p className="text-red-700 mb-6 max-w-sm mx-auto">
              Your appointment has been successfully cancelled.
            </p>
            <Button 
              onClick={onCreateNew} 
              className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 ease-in-out px-6 py-3 rounded-lg shadow-md hover:shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Appointment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main display for an existing appointment
  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 md:space-y-8 bg-gray-50 rounded-xl shadow-lg">
      
      {/* Header Section */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CheckCircle className="w-7 h-7 text-green-600 animate-bounce-in" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">Your Appointment Confirmed!</h1>
        </div>
        <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
          You have an existing appointment at this hospital. All details are below.
        </p>
      </div>

      {/* Status & Payment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Appointment Status Card */}
        <Card className="border-l-4 border-l-green-500 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Appointment Status</p>
              <Badge className={`${getStatusColor(appointmentData?.status)} capitalize mt-1 text-base font-semibold`}>
                {appointmentData?.status || 'Unknown'}
              </Badge>
            </div>
            <Calendar className="w-6 h-6 text-green-500 opacity-80" />
          </CardContent>
        </Card>

        {/* Payment Status Card */}
        <Card className="border-l-4 border-l-blue-500 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Payment Status</p>
              <Badge className={`${getPaymentStatusColor(appointmentData?.paymentStatus)} capitalize mt-1 text-base font-semibold`}>
                {appointmentData?.paymentStatus || 'Unknown'}
              </Badge>
            </div>
            <CreditCard className="w-6 h-6 text-blue-500 opacity-80" />
          </CardContent>
        </Card>
      </div>

      {/* Main Appointment Details Card */}
      <Card className="bg-white shadow-lg rounded-xl">
        <CardHeader className="pb-4 border-b border-gray-100">
          <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">Your Booking Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6 lg:space-y-8">
          
          {/* Date and Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Date</p>
                <p className="text-gray-600 text-sm sm:text-base">{formatDate(appointmentData?.appointmentDate)}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Time</p>
                <p className="text-gray-600 text-sm sm:text-base">
                  {formatTime(appointmentData?.startTime)} - {formatTime(appointmentData?.endTime)}
                </p>
              </div>
            </div>
          </div>

          <Separator className="bg-gray-200" />

          {/* Patient Information */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2 text-lg">
              <User className="w-5 h-5 text-gray-700" />
              Patient Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium text-gray-900">{appointmentData?.patientName || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Age</p>
                <p className="font-medium text-gray-900">{appointmentData?.age ? `${appointmentData.age} years` : 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Mobile</p>
                <p className="font-medium text-gray-900 flex items-center gap-1">
                    <Phone className="w-4 h-4 text-gray-500" />
                    {appointmentData?.mobile || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          <Separator className="bg-gray-200" />

          {/* Doctor Information */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2 text-lg">
              <Stethoscope className="w-5 h-5 text-gray-700" />
              Doctor Information
            </h3>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              {appointmentData?.doctor?.photo && (
                <img
                  src={appointmentData.doctor.photo}
                  alt={`Dr. ${appointmentData?.doctor?.name || 'Doctor'}`}
                  className="w-20 h-20 rounded-full object-cover border-2 border-blue-200 shadow-md flex-shrink-0"
                />
              )}
              <div className="flex-1 text-center sm:text-left">
                <p className="font-bold text-xl text-gray-900">Dr. {appointmentData?.doctor?.name || 'N/A'}</p>
                <p className="text-blue-600 capitalize text-base mt-1">{appointmentData?.doctor?.specialization || 'N/A'}</p>
                <p className="text-sm text-gray-600 mt-0.5">{appointmentData?.doctor?.qualification || 'N/A'}</p>
                <p className="text-sm text-gray-600">
                  {appointmentData?.doctor?.experience ? `${appointmentData.doctor.experience} years experience` : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          <Separator className="bg-gray-200" />

          {/* Hospital Information */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2 text-lg">
              <Building2 className="w-5 h-5 text-gray-700" />
              Hospital Details
            </h3>
            <div className="space-y-2">
              <p className="font-medium text-lg text-gray-900">{appointmentData?.hospital?.name || 'N/A'}</p>
              {appointmentData?.hospital?.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-gray-600">
                    <p>{appointmentData.hospital.address.street || 'N/A'}</p>
                    <p>
                      {appointmentData.hospital.address.city || 'N/A'}, {appointmentData.hospital.address.state || 'N/A'} {appointmentData.hospital.address.pincode || ''}
                    </p>
                  </div>
                </div>
              )}
              {appointmentData?.hospital?.contactInfo?.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <p className="text-sm text-gray-600">{appointmentData.hospital.contactInfo.phone}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons Section */}
      <div className="space-y-4">
        {/* Tracking Link Card */}
        <Card className="bg-blue-50 border border-blue-200 shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900 text-lg mb-1">Track Your Appointment</h4>
                <p className="text-sm text-blue-700">
                  Stay updated on your appointment status and queue.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleTrackAppointment}
                  className="flex-1 sm:flex-auto border-blue-300 text-blue-700 hover:bg-blue-100 transition-colors duration-200"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Tracking
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShareTrackingLink}
                  className="flex-1 sm:flex-auto border-blue-300 text-blue-700 hover:bg-blue-100 transition-colors duration-200"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Link
                </Button>
              </div>
            </div>
            {copySuccess && (
              <p className="text-sm text-green-600 font-medium mt-2 text-center sm:text-left">{copySuccess}</p>
            )}
          </CardContent>
        </Card>

        {/* Cancellation Button */}
        <div className="flex justify-center"> {/* Center the button for better mobile UX */}
          <Button
            variant="destructive" // Custom variant for destructive action
            onClick={() => setShowCancelDialog(true)}
            className="w-full sm:w-auto px-8 py-3 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            disabled={appointmentData?.status === 'cancelled' || isCancelling} // Disable if already cancelled or cancelling
          >
            {isCancelling ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Cancelling...
                </>
            ) : (
                <>
                    <X className="w-5 h-5 mr-2" />
                    Cancel Appointment
                </>
            )}
          </Button>
        </div>


        {/* Error Display */}
        {cancelError && (
          <div className="p-4 bg-red-50 border border-red-300 rounded-lg flex items-start gap-3 shadow-sm">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm font-medium">{cancelError}</p>
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

// Example of how you might define custom styles or use shadcn/ui components if not already generated.
// This is illustrative, your shadcn/ui setup will usually handle this.

/*
// In components/ui/card.jsx (simplified example)
import * as React from "react";
import { cn } from "@/lib/utils"; // Your utility for combining class names

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

// In components/ui/button.jsx (simplified example)
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-red-500 text-white hover:bg-red-600", // Custom destructive variant
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

// In components/ui/badge.jsx (simplified example)
const Badge = ({ className, variant, ...props }) => {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variant === "default" && "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        className
      )}
      {...props}
    />
  );
};

// In components/ui/separator.jsx (simplified example)
import * as SeparatorPrimitive from "@radix-ui/react-separator";

const Separator = React.forwardRef(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

// In components/ui/confirmation-dialog.jsx (simplified example)
// This would be a more complex component using shadcn/ui's Dialog or AlertDialog
const ConfirmationDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText, type, isLoading }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 text-center">
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="text-gray-600 mb-6">{message}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="outline" onClick={onClose} disabled={isLoading} className="flex-1">
                        {cancelText}
                    </Button>
                    <Button 
                        variant={type === 'destructive' ? 'destructive' : 'default'} 
                        onClick={onConfirm} 
                        disabled={isLoading} 
                        className="flex-1"
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : null}
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>
    );
};
*/