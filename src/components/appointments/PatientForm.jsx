'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Phone, Calendar } from 'lucide-react';

/**
 * Patient Details Form Component
 * Step 1 of the appointment booking flow - Enhanced for hospital staff use
 */
const PatientForm = ({ 
  patientData, 
  onPatientDataChange, 
  validationErrors = {},
  isLoading = false 
}) => {
  const handleInputChange = (field, value) => {
    // Format mobile number to only contain digits
    if (field === 'mobile') {
      value = value.replace(/\D/g, '');
    }
    
    // Format age to only contain digits
    if (field === 'age') {
      value = value.replace(/\D/g, '');
    }
    
    // Format name to remove extra spaces and capitalize
    if (field === 'name') {
      value = value.replace(/\s+/g, ' '); // Replace multiple spaces with single space
    }
    
    onPatientDataChange(field, value);
  };

  const isFormValid = () => {
    return (
      patientData.name?.trim() && 
      patientData.age && 
      patientData.mobile?.length === 10 &&
      Object.keys(validationErrors).length === 0
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl font-semibold">Patient Details</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Please provide patient information to book the appointment
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="patient-name" className="text-sm font-medium">
              Full Name *
            </Label>
            <Input
              id="patient-name"
              type="text"
              placeholder="Enter patient's full name"
              value={patientData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`h-11 transition-colors ${
                validationErrors.name 
                  ? 'border-destructive focus:border-destructive' 
                  : 'focus:border-primary'
              }`}
              aria-describedby={validationErrors.name ? 'name-error' : undefined}
            />
            {validationErrors.name && (
              <p id="name-error" className="text-xs text-destructive flex items-center gap-1">
                <span className="text-destructive">⚠</span>
                {validationErrors.name}
              </p>
            )}
          </div>

          {/* Age and Mobile Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Age Field */}
            <div className="space-y-2">
              <Label htmlFor="patient-age" className="text-sm font-medium">
                Age *
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="patient-age"
                  type="text"
                  placeholder="Age in years"
                  value={patientData.age || ''}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  maxLength={3}
                  className={`pl-10 h-11 transition-colors ${
                    validationErrors.age 
                      ? 'border-destructive focus:border-destructive' 
                      : 'focus:border-primary'
                  }`}
                  aria-describedby={validationErrors.age ? 'age-error' : undefined}
                />
              </div>
              {validationErrors.age && (
                <p id="age-error" className="text-xs text-destructive flex items-center gap-1">
                  <span className="text-destructive">⚠</span>
                  {validationErrors.age}
                </p>
              )}
            </div>

            {/* Mobile Field */}
            <div className="space-y-2">
              <Label htmlFor="patient-mobile" className="text-sm font-medium">
                Mobile Number *
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="patient-mobile"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={patientData.mobile || ''}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                  maxLength={10}
                  className={`pl-10 h-11 transition-colors ${
                    validationErrors.mobile 
                      ? 'border-destructive focus:border-destructive' 
                      : 'focus:border-primary'
                  }`}
                  aria-describedby={validationErrors.mobile ? 'mobile-error' : undefined}
                />
              </div>
              {validationErrors.mobile && (
                <p id="mobile-error" className="text-xs text-destructive flex items-center gap-1">
                  <span className="text-destructive">⚠</span>
                  {validationErrors.mobile}
                </p>
              )}
            </div>
          </div>

          {/* Form Validation Summary */}
          {Object.keys(validationErrors).length > 0 && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <h4 className="text-sm font-medium text-destructive mb-1">
                Please fix the following errors:
              </h4>
              <ul className="text-xs text-destructive/80 space-y-1">
                {Object.values(validationErrors).map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-info/10 p-4 rounded-lg border border-info/20">
            <h4 className="text-sm font-medium text-info mb-2">Information Required</h4>
            <ul className="text-xs text-info/80 space-y-1">
              <li>• Full name as per government ID</li>
              <li>• Current age of the patient</li>
              <li>• Active mobile number for appointment confirmations</li>
            </ul>
          </div>

          {/* Privacy Notice */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              <span className="inline-block w-3 h-3 bg-success/20 border border-success rounded-full mr-2"></span>
              Your information is secure and will only be used for appointment booking and medical records.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientForm;
