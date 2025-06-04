'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import trackingSocket from '@/lib/trackingSocket';

export default function TrackingPage() {
  const params = useParams();
  const [queueInfo, setQueueInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = params.token;
    
    console.log('Initializing tracking with token:', token);
    
    const handleUpdate = (rawInfo) => {
      console.log('Queue update received:', {
        timestamp: new Date().toISOString(),
        rawInfo: rawInfo
      });
      
      // Parse the JSON string if it's a string
      const info = typeof rawInfo === 'string' ? JSON.parse(rawInfo) : rawInfo;
      
      if (info.success && info.data) {
        setQueueInfo(info.data);
        setError(null);
      } else {
        setError(info.message || 'Invalid response format');
        setQueueInfo(null);
      }
    };

    const handleError = (err) => {
      console.error('Tracking error:', {
        timestamp: new Date().toISOString(),
        error: err
      });
      setError(err.message || 'Failed to track appointment');
      setQueueInfo(null);
    };

    // Add listeners for updates and errors
    trackingSocket.addListener('update', handleUpdate);
    trackingSocket.addListener('error', handleError);

    // Start tracking with the token from URL
    trackingSocket.startTracking(token);

    // Cleanup when component unmounts
    return () => {
      trackingSocket.stopTracking();
      trackingSocket.removeListener('update', handleUpdate);
      trackingSocket.removeListener('error', handleError);
    };
  }, [params.token]);

  if (error) {
    return (
      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold text-red-600">
            Error Tracking Queue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!queueInfo) {
    return (
      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold">
            Connecting to Queue...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={undefined} className="w-full" />
        </CardContent>
      </Card>
    );
  }

  const formatAppointmentTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-semibold">
          Queue Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Appointment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div className="space-y-2">
                <p className="text-gray-600">
                  Patient: <span className="text-gray-900">{queueInfo.appointment.patientName}</span>
                </p>
                <p className="text-gray-600">
                  Doctor: <span className="text-gray-900">{queueInfo.doctor.name}</span>
                  <span className="block text-sm text-gray-500">{queueInfo.doctor.specialization}</span>
                </p>
                <p className="text-gray-600">
                  Hospital: <span className="text-gray-900">{queueInfo.hospital.name}</span>
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">
                  Date: <span className="text-gray-900">
                    {new Date(queueInfo.appointment.appointmentDate).toLocaleDateString('en-IN')}
                  </span>
                </p>
                <p className="text-gray-600">
                  Time: <span className="text-gray-900">
                    {formatAppointmentTime(queueInfo.appointment.startTime)}
                  </span>
                </p>
                <p className="text-gray-600">
                  Status: <span className="font-medium text-green-600">{queueInfo.appointment.status}</span>
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">Queue Position</h3>
            <div className="mt-4 space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-lg font-medium text-center text-blue-600">
                  {queueInfo.queue.queueStatus}
                </p>
              </div>
              
              <Progress 
                value={((queueInfo.queue.totalAppointmentsToday - queueInfo.queue.appointmentsAhead) / 
                        queueInfo.queue.totalAppointmentsToday) * 100} 
                className="w-full" 
              />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-600">People Ahead</p>
                  <p className="text-2xl font-bold text-gray-900">{queueInfo.queue.appointmentsAhead}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Wait Time</p>
                  <p className="text-2xl font-bold text-gray-900">{queueInfo.queue.estimatedWaitTime} mins</p>
                </div>
              </div>
              </div>
            </div>
          </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            Please keep this page open to receive real-time updates about your queue position.
            <br />
            <span className="text-xs text-gray-600 mt-1 block">
              Last updated: {new Date(queueInfo.refreshedAt).toLocaleTimeString('en-IN')}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
