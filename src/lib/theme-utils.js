// Theme-aware utility functions for consistent styling
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Theme-aware status colors
export const getStatusStyles = (status) => {
  const statusMap = {
    completed: {
      background: 'bg-success/10',
      text: 'text-success',
      border: 'border-success/30',
      dot: 'bg-success'
    },
    cancelled: {
      background: 'bg-destructive/10',
      text: 'text-destructive',
      border: 'border-destructive/30',
      dot: 'bg-destructive'
    },
    pending: {
      background: 'bg-warning/10',
      text: 'text-warning',
      border: 'border-warning/30',
      dot: 'bg-warning'
    },
    missed: {
      background: 'bg-warning/10',
      text: 'text-warning',
      border: 'border-warning/30',
      dot: 'bg-warning'
    },
    booked: {
      background: 'bg-info/10',
      text: 'text-info',
      border: 'border-info/30',
      dot: 'bg-info'
    },
    scheduled: {
      background: 'bg-info/10',
      text: 'text-info',
      border: 'border-info/30',
      dot: 'bg-info'
    },
    default: {
      background: 'bg-muted',
      text: 'text-muted-foreground',
      border: 'border-muted',
      dot: 'bg-muted-foreground'
    }
  };

  return statusMap[status?.toLowerCase()] || statusMap.default;
};

// Theme-aware payment status colors
export const getPaymentStatusStyles = (status) => {
  const paymentMap = {
    paid: {
      background: 'bg-success/10',
      text: 'text-success',
      border: 'border-success/30'
    },
    unpaid: {
      background: 'bg-warning/10',
      text: 'text-warning',
      border: 'border-warning/30'
    },
    pending: {
      background: 'bg-info/10',
      text: 'text-info',
      border: 'border-info/30'
    },
    failed: {
      background: 'bg-destructive/10',
      text: 'text-destructive',
      border: 'border-destructive/30'
    },
    default: {
      background: 'bg-muted',
      text: 'text-muted-foreground',
      border: 'border-muted'
    }
  };

  return paymentMap[status?.toLowerCase()] || paymentMap.default;
};

// Theme-aware priority styles
export const getPriorityStyles = (priority) => {
  const priorityMap = {
    high: {
      background: 'bg-destructive/10',
      text: 'text-destructive',
      border: 'border-destructive/30'
    },
    medium: {
      background: 'bg-warning/10',
      text: 'text-warning',
      border: 'border-warning/30'
    },
    low: {
      background: 'bg-success/10',
      text: 'text-success',
      border: 'border-success/30'
    },
    urgent: {
      background: 'bg-destructive/20',
      text: 'text-destructive-foreground',
      border: 'border-destructive'
    },
    default: {
      background: 'bg-muted',
      text: 'text-muted-foreground',
      border: 'border-muted'
    }
  };

  return priorityMap[priority?.toLowerCase()] || priorityMap.default;
};

// Theme-aware notification styles
export const getNotificationStyles = (type) => {
  const notificationMap = {
    success: {
      background: 'bg-success/10',
      text: 'text-success',
      border: 'border-success/30',
      icon: 'text-success'
    },
    error: {
      background: 'bg-destructive/10',
      text: 'text-destructive',
      border: 'border-destructive/30',
      icon: 'text-destructive'
    },
    warning: {
      background: 'bg-warning/10',
      text: 'text-warning',
      border: 'border-warning/30',
      icon: 'text-warning'
    },
    info: {
      background: 'bg-info/10',
      text: 'text-info',
      border: 'border-info/30',
      icon: 'text-info'
    },
    default: {
      background: 'bg-muted',
      text: 'text-muted-foreground',
      border: 'border-muted',
      icon: 'text-muted-foreground'
    }
  };

  return notificationMap[type?.toLowerCase()] || notificationMap.default;
};

// Common gradient classes for theme consistency
export const gradientClasses = {
  primary: 'bg-gradient-to-r from-brand-primary to-brand-secondary',
  secondary: 'bg-gradient-to-r from-secondary to-muted',
  success: 'bg-gradient-to-r from-success to-success/80',
  warning: 'bg-gradient-to-r from-warning to-warning/80',
  error: 'bg-gradient-to-r from-destructive to-destructive/80',
  info: 'bg-gradient-to-r from-info to-info/80',
  hero: 'hero-gradient',
  section1: 'section-gradient-1',
  section2: 'section-gradient-2',
  section3: 'section-gradient-3'
};

// Theme-aware button variants
export const buttonVariants = {
  primary: 'cta-primary text-primary-foreground',
  secondary: 'cta-secondary text-foreground',
  tertiary: 'cta-tertiary text-foreground',
  success: 'bg-success hover:bg-success/90 text-success-foreground',
  warning: 'bg-warning hover:bg-warning/90 text-warning-foreground',
  destructive: 'bg-destructive hover:bg-destructive/90 text-destructive-foreground',
  info: 'bg-info hover:bg-info/90 text-info-foreground',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-accent hover:text-accent-foreground'
};

// Date formatting helper
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(new Date(date));
};

// Time formatting helper
export const formatTime = (time) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(new Date(time));
};

// Wait time formatting helper
export const formatWaitTime = (minutes) => {
  if (minutes < 60) {
    return `${minutes} min`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  }
};
