'use server';

import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/tokenVerification';

/**
 * Server action to validate the upload token
 * 
 * @param {string} token - Token to validate
 * @returns {object} Validated token data or error
 */
export async function validateUploadToken(token) {
  try {
    if (!token) {
      redirect('/error?message=' + encodeURIComponent('No token provided'));
    }
    
    const decodedToken = await verifyToken(token);
    return { success: true, data: decodedToken };
  } catch (error) {
    console.error('Token validation failed:', error);
    return { 
      success: false, 
      error: error.message || 'Invalid or expired token' 
    };
  }
}
