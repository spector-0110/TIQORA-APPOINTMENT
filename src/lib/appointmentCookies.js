/**
 * Cookie-based Appointment Management
 * Stores appointment data in cookies with automatic expiration
 */

const COOKIE_PREFIX = 'tempus_appt_';
const COOKIE_LIST = 'tempus_appt_list';

/**
 * Set a cookie with expiration
 */
function setCookie(name, value, expirationDate) {
  const expires = expirationDate ? `expires=${expirationDate.toUTCString()};` : '';
  const sameSite = 'Lax'; // Better for cross-page navigation
  document.cookie = `${name}=${encodeURIComponent(value)};${expires}path=/;SameSite=${sameSite}`;
}

/**
 * Get a cookie value
 */
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  return null;
}

/**
 * Delete a cookie
 */
function deleteCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

/**
 * Store appointment data in cookie with automatic expiration
 */
export function storeAppointmentInCookie(hospitalSlug, appointmentData) {
  try {
    
    // Calculate expiration time (24 hours from now as fallback)
    // Store the complete backend response without any manipulation
    const expirationTime = new Date(Date.now() + (24 * 60 * 60 * 1000)); // 24 hours from now

    const cookieData = {
      data: appointmentData, // Store complete backend response as-is
      hospitalSlug: hospitalSlug,
      createdAt: Date.now(),
      expiresAt: expirationTime.getTime(),
      appointmentId: appointmentData.appointmentId || appointmentData.id // Support both possible ID fields
    };

    // Store the appointment data
    const cookieName = `${COOKIE_PREFIX}${hospitalSlug}`;
    setCookie(cookieName, JSON.stringify(cookieData), expirationTime);

    // Update the list of stored appointments across all hospitals
    updateAppointmentCookieList(hospitalSlug, appointmentData.appointmentId || appointmentData.id, expirationTime.getTime());

    return true;
  } catch (error) {
    console.error('Error storing appointment data in cookie:', error);
    return false;
  }
}

/**
 * Retrieve appointment data from cookie for a hospital
 */
export function getAppointmentFromCookie(hospitalSlug) {
  try {
    if (!hospitalSlug) {
      return null;
    }

    const cookieName = `${COOKIE_PREFIX}${hospitalSlug}`;
    const cookieValue = getCookie(cookieName);
    
    if (!cookieValue) {
      return null;
    }

    const cookieData = JSON.parse(cookieValue);
    
    // Check if data has expired
    if (Date.now() > cookieData.expiresAt) {
      removeAppointmentFromCookie(hospitalSlug);
      return null;
    }

    return cookieData.data;
  } catch (error) {
    console.error('Error retrieving appointment data from cookie:', error);
    return null;
  }
}

/**
 * Remove appointment data from cookie (when cancelled or expired)
 */
export function removeAppointmentFromCookie(hospitalSlug) {
  try {
    if (!hospitalSlug) {
      return false;
    }

    const cookieName = `${COOKIE_PREFIX}${hospitalSlug}`;
    deleteCookie(cookieName);
    
    // Update the appointment list
    removeFromAppointmentCookieList(hospitalSlug);
    
    return true;
  } catch (error) {
    console.error('Error removing appointment cookie:', error);
    return false;
  }
}

/**
 * Update the list of stored appointments
 */
function updateAppointmentCookieList(hospitalSlug, appointmentId, expirationTime) {
  try {
    let appointmentList = [];
    const existingList = getCookie(COOKIE_LIST);
    
    if (existingList) {
      appointmentList = JSON.parse(existingList);
    }

    // Remove existing entry if it exists
    appointmentList = appointmentList.filter(item => item.hospitalSlug !== hospitalSlug);
    
    // Add new entry
    appointmentList.push({
      hospitalSlug: hospitalSlug,
      appointmentId: appointmentId,
      expiresAt: expirationTime
    });

    // Set expiration for the list cookie (longest expiration among all appointments)
    const maxExpiration = Math.max(...appointmentList.map(item => item.expiresAt));
    setCookie(COOKIE_LIST, JSON.stringify(appointmentList), new Date(maxExpiration));
  } catch (error) {
    console.error('Error updating appointment list cookie:', error);
  }
}

/**
 * Remove from appointment list
 */
function removeFromAppointmentCookieList(hospitalSlug) {
  try {
    const existingList = getCookie(COOKIE_LIST);
    
    if (existingList) {
      let appointmentList = JSON.parse(existingList);
      appointmentList = appointmentList.filter(item => item.hospitalSlug !== hospitalSlug);
      
      if (appointmentList.length > 0) {
        const maxExpiration = Math.max(...appointmentList.map(item => item.expiresAt));
        setCookie(COOKIE_LIST, JSON.stringify(appointmentList), new Date(maxExpiration));
      } else {
        deleteCookie(COOKIE_LIST);
      }
    }
  } catch (error) {
    console.error('Error removing from appointment list cookie:', error);
  }
}

/**
 * Clean up expired appointment cookies
 */
export function cleanupExpiredAppointmentCookies() {
  try {
    const existingList = getCookie(COOKIE_LIST);
    
    if (!existingList) {
      return;
    }

    const appointmentList = JSON.parse(existingList);
    const currentTime = Date.now();
    const validAppointments = [];

    appointmentList.forEach(item => {
      if (currentTime > item.expiresAt) {
        // Remove expired appointment cookie
        const cookieName = `${COOKIE_PREFIX}${item.hospitalSlug}`;
        deleteCookie(cookieName);
      } else {
        validAppointments.push(item);
      }
    });

    // Update the list with only valid appointments
    if (validAppointments.length > 0) {
      const maxExpiration = Math.max(...validAppointments.map(item => item.expiresAt));
      setCookie(COOKIE_LIST, JSON.stringify(validAppointments), new Date(maxExpiration));
    } else {
      deleteCookie(COOKIE_LIST);
    }
    
  } catch (error) {
    console.error('Error during cookie cleanup:', error);
  }
}

/**
 * Get all active appointments across hospitals
 */
export function getAllActiveAppointmentCookies() {
  try {
    cleanupExpiredAppointmentCookies(); // Clean up first
    
    const existingList = getCookie(COOKIE_LIST);
    
    if (!existingList) {
      return [];
    }

    const appointmentList = JSON.parse(existingList);
    const appointments = [];

    appointmentList.forEach(item => {
      const appointmentData = getAppointmentFromCookie(item.hospitalSlug);
      if (appointmentData) {
        appointments.push({
          hospitalSlug: item.hospitalSlug,
          data: appointmentData
        });
      }
    });

    return appointments;
  } catch (error) {
    console.error('Error getting active appointment cookies:', error);
    return [];
  }
}

/**
 * Initialize cleanup on page load
 */
export function initializeAppointmentCookies() {
  // Clean up expired appointments when initialized
  cleanupExpiredAppointmentCookies();
  
  // Set up periodic cleanup (every 30 minutes)
  if (typeof window !== 'undefined') {
    setInterval(cleanupExpiredAppointmentCookies, 30 * 60 * 1000); // 30 minutes
  }
}
