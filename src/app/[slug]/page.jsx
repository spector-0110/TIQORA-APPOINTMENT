"use client"

import { useState, use } from 'react';

import DetailsProvider from '@/context/DetailsProvider';
import AppointmentCreationFlow from "@/components/appointments/AppointmentCreationFlow";
import { SuccessDialog } from '@/components/ui/success-dialog';

export default function SlugPage({ params }) {
  const { slug } = use(params);

    const [successDialog, setSuccessDialog] = useState({
        isOpen: false,
        title: '',
        message: '',
        details: []
    });


    const handleAppointmentCreated = (appointmentDetails) => {
    setSuccessDialog({
      isOpen: true,
      title: 'Appointment Created',
      message: 'New appointment has been successfully created.',
      details: [
        `Patient: ${appointmentDetails.patientName}`,
        `Doctor: Dr. ${appointmentDetails.doctorName}`,
        `Date: ${appointmentDetails.appointmentDate}`,
        `Time: ${appointmentDetails.appointmentTime}`,
      ]
    });
  };

  return (
    <DetailsProvider subdomain={slug}>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">        
        <AppointmentCreationFlow 
        onSuccess={handleAppointmentCreated}
        />
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
