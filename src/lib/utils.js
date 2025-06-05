import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date to a human-readable string
 * @param {string} dateString - ISO date string
 * @param {string} format - 'full' (default), 'short', or 'medium'
 * @returns {string} Formatted date string
 */
export function formatDate(dateString, format = 'full') {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    
    switch(format) {
      case 'short':
        return date.toLocaleDateString('en-US', { 
          day: 'numeric', 
          month: 'short'
        });
      case 'medium':
        return date.toLocaleDateString('en-US', { 
          day: 'numeric', 
          month: 'short',
          year: 'numeric'
        });
      case 'full':
      default:
        return date.toLocaleDateString('en-US', { 
          weekday: 'long', 
          day: 'numeric', 
          month: 'long',
          year: 'numeric'
        });
    }
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
}

/**
 * Format time from ISO string to 12-hour format
 * @param {string} timeString - ISO time string
 * @returns {string} Formatted time string (e.g., "09:00 AM")
 */
export function formatTime(timeString) {
  if (!timeString) return 'N/A';

  try {
    // Extract time portion from ISO string "1970-01-01T09:00:00.000Z"
    const timePart = timeString.split('T')[1]; // Get "09:00:00.000Z"
    const timeOnly = timePart.split('.')[0]; // Get "09:00:00"
    const [hours, minutes] = timeOnly.split(':'); // Get ["09", "00"]
    
    // Convert to 12-hour format
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  } catch (error) {
    console.error('Error formatting time:', error);
    return 'Invalid Time';
  }
}

/**
 * Format wait time in minutes to a human-readable string
 * @param {number} minutes - Wait time in minutes
 * @returns {string} Formatted wait time string (e.g., "2 hours 30 mins")
 */
export function formatWaitTime(minutes) {
  if (!minutes && minutes !== 0) return 'N/A';
  
  if (minutes < 1) return 'Less than a minute';
  if (minutes < 60) return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
  
  const hours = Math.floor(minutes / 60);
  const remainingMins = minutes % 60;
  
  if (remainingMins === 0) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  }
  
  return `${hours} ${hours === 1 ? 'hour' : 'hours'} ${remainingMins} ${remainingMins === 1 ? 'minute' : 'minutes'}`;
}
