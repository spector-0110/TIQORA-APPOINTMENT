import jwt from 'jsonwebtoken';

/**
 * Verify and decode a tracking token
 *
 * @param {string} token - The JWT token to verify
 * @returns {Promise<object>} Decoded token data: { appointmentId, hospitalId, doctorId }
 */
export async function verifyToken(token) {
  // Basic validation
  if (!token || typeof token !== 'string' || token.trim() === '') {
    throw new Error('Token is empty or invalid format');
  }

  try {
    // Get secret from environment variable with fallback
    const jwtSecret = process.env.JWT_SECRET || 'appointment-tracking-secret';
    
    // Verify the token
    const decodedToken = jwt.verify(token, jwtSecret);

    // Validate required fields
    if (!decodedToken) {
      throw new Error('Invalid token structure');
    }
    
    const { appointmentId, hospitalId, doctorId, exp } = decodedToken;
    
    if (!appointmentId) {
      throw new Error('Token missing appointmentId');
    }
    
    if (!hospitalId) {
      throw new Error('Token missing hospitalId');
    }
    
    if (!doctorId) {
      throw new Error('Token missing doctorId');
    }
    
    // Check if token is expired (additional validation)
    const currentTime = Math.floor(Date.now() / 1000);
    if (exp && currentTime > exp) {
      throw new Error('Token has expired');
    }

    return decodedToken;
  } catch (error) {
    // Handle specific JWT errors with better messaging
    if (error.name === 'TokenExpiredError') {
      console.error('Token expired:', error.message);
      throw new Error('Your access link has expired. Please request a new one.');
    } else if (error.name === 'JsonWebTokenError') {
      console.error('JWT error:', error.message);
      throw new Error('Invalid access token. Please check your link and try again.');
    } else {
      console.error('Token verification error:', error);
      throw new Error(error.message || 'Invalid or expired access token');
    }
  }
}
