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
    console.log('Storing appointment data in cookie for hospital:', hospitalSlug);
    
    // Calculate expiration time (appointment end time + 1 hour buffer)
    let expirationTime;
    try {
      // Combine date and end time
      const appointmentDate = new Date(appointmentData.appointmentDate);
      const endTime = new Date(appointmentData.endTime);
      
      // Create the full appointment end datetime
      const appointmentEndTime = new Date(
        appointmentDate.getFullYear(),
        appointmentDate.getMonth(),
        appointmentDate.getDate(),
        endTime.getHours(),
        endTime.getMinutes(),
        endTime.getSeconds()
      );
      
      expirationTime = new Date(appointmentEndTime.getTime() + (60 * 60 * 1000)); // +1 hour buffer
      
      console.log('Appointment end time:', appointmentEndTime);
      console.log('Cookie expiration time:', expirationTime);
    } catch (error) {
      console.error('Error parsing appointment time:', error);
      // Fallback: 24 hours from now
      expirationTime = new Date(Date.now() + (24 * 60 * 60 * 1000));
    }

    const cookieData = {
      data: appointmentData,
      hospitalSlug: hospitalSlug,
      createdAt: Date.now(),
      expiresAt: expirationTime.getTime(),
      appointmentId: appointmentData.id
    };

    // Store the appointment data
    const cookieName = `${COOKIE_PREFIX}${hospitalSlug}`;
    setCookie(cookieName, JSON.stringify(cookieData), expirationTime);

    // Update the list of stored appointments across all hospitals
    updateAppointmentCookieList(hospitalSlug, appointmentData.id, expirationTime.getTime());

    console.log(`Appointment data stored in cookie for ${hospitalSlug}, expires at: ${expirationTime}`);
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
      console.log(`Appointment cookie expired for hospital: ${hospitalSlug}`);
      removeAppointmentFromCookie(hospitalSlug);
      return null;
    }

    console.log(`Found valid appointment data in cookie for hospital: ${hospitalSlug}`);
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
    
    console.log(`Appointment cookie removed for hospital: ${hospitalSlug}`);
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
        console.log(`Cleaned up expired appointment cookie: ${item.hospitalSlug}`);
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
    
    console.log(`Cleanup complete. ${appointmentList.length - validAppointments.length} expired appointment cookies removed.`);
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
