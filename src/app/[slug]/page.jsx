"use client"

import { useState, use, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import DetailsProvider, { useDetails } from '@/context/DetailsProvider';
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
  
  return (
    <DetailsProvider subdomain={slug}>
      <SlugPageContent slug={slug} />
    </DetailsProvider>
  );
}

function SlugPageContent({ slug }) {
  const { details, loading, error, isReady } = useDetails();
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
      return;
    }
    
    successHandledRef.current = true;
        
    // Store appointment data in cookie
    const stored = storeAppointmentInCookie(slug, appointmentDetails);
    
    if (stored) {
      setExistingAppointment(appointmentDetails);

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
    
    // Remove from cookie
    removeAppointmentFromCookie(slug);
    
    // Reset state to show create new
    setExistingAppointment(null);
    setShowCreateNew(true);
  };

  // Show loading while fetching hospital details or checking appointments
  if (loading || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 border-r-gray-900">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  // Show error/no data message if hospital data is not found
  if (error || !details || !isReady) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-300 mb-4">Hospital Not Found</h1>
          <button 
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      {/* Show existing appointment if found and not creating new */}
      {existingAppointment && !showCreateNew ? (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-4">
        <ExistingAppointmentView
          appointmentData={existingAppointment.data}
          onCreateNew={handleCreateNewAppointment}
          onAppointmentCancelled={handleAppointmentCancelled}
        />
        </div>
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
  );
}
