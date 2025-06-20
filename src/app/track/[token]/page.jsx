'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import trackingSocket from '@/lib/trackingSocket';
import AppointmentTracker from '@/components/appointments/AppointmentTracker';

export default function TrackingPage() {
  const params = useParams();
  const [queueInfo, setQueueInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = params.token;
    
    console.log('Initializing tracking with token:', token);
    
    const handleUpdate = (rawInfo) => {
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
          <CardTitle className="text-xl font-semibold text-destructive">
            Error Tracking Queue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!queueInfo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-4">
        <Card className="w-full max-w-2xl mx-auto bg-card border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold text-foreground">
              Connecting to Queue...
            </CardTitle>
          </CardHeader>
          <CardContent>
              <div className="w-full mx-auto p-8 rounded-2xl bg-card shadow-lg text-center">
                <div className="animate-pulse">
                  <div className="h-8 bg-muted rounded mb-4 mx-auto w-1/2"></div>
                  <div className="h-4 bg-muted rounded mb-6 mx-auto w-3/4"></div>
                  <div className="h-40 bg-muted rounded"></div>
                </div>
                <p className="text-muted-foreground mt-6">Loading appointment data...</p>
              </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Using formatTime utility function from utils.js in the AppointmentTracker component

  return(
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-4 bg-background">
      <AppointmentTracker data={queueInfo} />
    </div>
  )
  
}
