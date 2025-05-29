"use client"

import { useState, use, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import DetailsProvider from '@/context/DetailsProvider';
import AppointmentCreationFlow from "@/components/appointments/AppointmentCreationFlow";
import ExistingAppointmentView from "@/components/appointments/ExistingAppointmentView";
import { SuccessDialog } from '@/components/ui/success-dialog';
import { 
  storeAppointmentInCookie, 
  getAppointmentFromCookie, 
  removeAppointmentFromCookie,
  initializeAppointmentCookies 
} from '@/lib/appointmentCookies';

export default function SlugPage({ params }) {
  const { slug } = use(params);
  const router = useRouter();
  const successHandledRef = useRef(false);
  
  const [existingAppointment, setExistingAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateNew, setShowCreateNew] = useState(false);

  const [successDialog, setSuccessDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    details: []
  });

  // Initialize cookies and check for existing appointment
  useEffect(() => {
    initializeAppointmentCookies();
    checkForExistingAppointment();
  }, [slug]);

  const checkForExistingAppointment = () => {
    try {
      setIsLoading(true);
      const appointment = getAppointmentFromCookie(slug);
      console.log('Checking for existing appointment for hospital:', slug);
      console.log('Found appointment:', appointment);
      
      if (appointment) {
        setExistingAppointment(appointment);
      } else {
        setExistingAppointment(null);
      }
    } catch (error) {
      console.error('Error checking for existing appointment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppointmentCreated = (appointmentDetails) => {
    // Prevent double execution in development mode
    if (successHandledRef.current) {
      console.log('Success handler already called, ignoring duplicate call');
      return;
    }
    
    successHandledRef.current = true;
        
    // Store appointment data in cookie
    const stored = storeAppointmentInCookie(slug, appointmentDetails);
    
    if (stored) {
      setExistingAppointment(appointmentDetails);
      console.log('Appointment created and stored:', appointmentDetails.data);

      setShowCreateNew(false); // Reset to show existing appointment view
    } else {
      console.error('Failed to store appointment data in cookie');
    }
    // Show success dialog
    setSuccessDialog({
      isOpen: true,
      title: 'Appointment Created Successfully!',
      message: 'Your appointment has been created and saved.',
      details: [
        `Patient: ${appointmentDetails.data.patientName}`,
        `Doctor: Dr. ${appointmentDetails.data.doctor.name}`,
        `Date: ${appointmentDetails.data.appointmentDate.split('T')[0]}`,
        `Time: ${new Date(appointmentDetails.data.startTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}`,
        `Status: ${appointmentDetails.data.status}`,
      ]
    });
  };

  const handleCreateNewAppointment = () => {
    setShowCreateNew(true);
    successHandledRef.current = false; // Reset success handler for new appointment
    // Don't clear existing appointment immediately - keep it until new one is created
  };

  const handleAppointmentCancelled = (appointmentId) => {
    console.log('Appointment cancelled:', appointmentId);

    
    // Remove from cookie
    removeAppointmentFromCookie(slug);
    
    // Reset state to show create new
    setExistingAppointment(null);
    setShowCreateNew(true);
  };

  if (isLoading) {
    return (
      <DetailsProvider subdomain={slug}>
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </DetailsProvider>
    );
  }

  return (
    <DetailsProvider subdomain={slug}>
      <div className="min-h-screen ">
        {/* Show existing appointment if found and not creating new */}
        {existingAppointment && !showCreateNew ? (
          <ExistingAppointmentView
            appointmentData={existingAppointment.data}
            onCreateNew={handleCreateNewAppointment}
            onAppointmentCancelled={handleAppointmentCancelled}
          />
        ) : (
          /* Show appointment creation flow */
          <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
            <AppointmentCreationFlow 
              onSuccess={handleAppointmentCreated}
            />
          </div>
        )}
        
        <SuccessDialog
          isOpen={successDialog.isOpen}
          onClose={() => setSuccessDialog({ ...successDialog, isOpen: false })}
          title={successDialog.title}
          message={successDialog.message}
          details={successDialog.details}
        />
      </div>
    </DetailsProvider>
  );
}
