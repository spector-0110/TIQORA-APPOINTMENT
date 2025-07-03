'use server';

import { redirect } from 'next/navigation';
import { verifyUploadToken } from '@/lib/patientAPI';

/**
 * Server action to validate the upload token using backend API
 * 
 * @param {string} token - Token to validate
 * @returns {object} Validated token data or error
 */
export async function validateUploadToken(token) {
      console.log('validateUploadToken - Validating upload token:', token);

  try {
    if (!token) {
      redirect('/error?message=' + encodeURIComponent('No token provided'));
    }
    
    // Call backend API to verify upload token
    const result = await verifyUploadToken(token);
    
    if (result.success) {
      return { 
        success: true, 
        data: {
          appointmentId: result.appointmentId,
          message: result.message,
          documentsExist: result.documentsExist
        }
      };
    } else {
      return { 
        success: false, 
        error: result.message || 'Token verification failed' 
      };
    }
  } catch (error) {
    console.error('Token validation failed:', error);
    
    // Handle specific error cases based on backend response
    if (error.status === 401) {
      return { 
        success: false, 
        error: 'Invalid or expired token' 
      };
    } else if (error.status === 405) {
      return { 
        success: false, 
        error: 'Documents already exist, upload not allowed' 
      };
    } else if (error.status === 404) {
      return { 
        success: false, 
        error: 'Appointment not found' 
      };
    } else if (error.status === 400) {
      return { 
        success: false, 
        error: 'Invalid token format' 
      };
    }
    
    return { 
      success: false, 
      error: error.message || 'Failed to verify upload token' 
    };
  }
}
