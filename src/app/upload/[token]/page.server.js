import { notFound } from 'next/navigation';
import { verifyToken } from '@/lib/tokenVerification';

/**
 * Server-side data fetching with token verification
 * 
 * @param {Object} params - URL parameters
 * @returns {Object} Verified token data or redirects to error page
 */
export async function getUploadPageData({ params }) {
  try {
    const { token } = params;
    
    if (!token) {
      notFound();
    }
    
    // Verify the token on the server side
    const decodedToken = await verifyToken(token);
    
    // Return the verified data to the client component
    return {
      success: true,
      data: decodedToken,
    };
  } catch (error) {
    console.error('Server-side token verification failed:', error);
    
    return {
      success: false,
      error: error.message || 'Invalid or expired token',
    };
  }
}
