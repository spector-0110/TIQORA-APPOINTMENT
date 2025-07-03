'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, User, Building, CreditCard, CheckCircle, AlertCircle, 
  MapPin, Phone, Star, Activity, Shield, Stethoscope, HeartPulse, 
  FileText, Users, Timer, Bell, ChevronRight, Building2, Share2, Eye, X
} from 'lucide-react';

// Import utility functions from utils.js
import { formatDate, formatTime, formatWaitTime } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';


const StatusIndicator = ({ status }) => {
  const statusConfig = {
    completed: { 
      color: 'bg-emerald-600', 
      text: 'text-emerald-400', 
      bg: 'bg-emerald-600/10',
      border: 'border-emerald-600/30',
      label: 'Completed', 
      icon: CheckCircle 
    },
    cancelled: { 
      color: 'bg-destructive', 
      text: 'text-destructive', 
      bg: 'bg-destructive/10',
      border: 'border-destructive/20',
      label: 'Cancelled', 
      icon: AlertCircle 
    },
    booked: { 
      color: 'bg-info', 
      text: 'text-info', 
      bg: 'bg-info/10',
      border: 'border-info/20',
      label: 'booked', 
      icon: Calendar 
    },
    missed: { 
      color: 'bg-warning', 
      text: 'text-warning', 
      bg: 'bg-warning/10',   
      border: 'border-warning/20',
      label: 'Missed',
      icon: AlertCircle   
    },
  };

  const config = statusConfig[status?.toLowerCase()] || statusConfig.scheduled;
  const Icon = config.icon;
  
  return (
    <div className={`flex items-center gap-3 px-4 py-2 rounded-lg ${config.bg} border ${config.border}`}>
      <div className={`w-2 h-2 rounded-full ${config.color}`}></div>
      <span className={`${config.text} font-medium text-sm`}>{config.label}</span>
      <Icon className={`h-4 w-4 ${config.text}`} />
    </div>
  );
};

const ProfessionalProgress = ({ positionProgress, waitTimeProgress, total, current, estimatedWaitTime }) => {
  // Weighted average of position progress (70%) and wait time progress (30%)
  const combinedProgress = (positionProgress * 0.7) + (waitTimeProgress * 0.3);
  
  // Calculate estimated time of consultation
  const estimatedConsultTime = new Date();
  if (estimatedWaitTime) {
    estimatedConsultTime.setMinutes(estimatedConsultTime.getMinutes() + estimatedWaitTime);
  }
  
  // Determine overall status
  let statusText = "Waiting";
  let statusColor = "text-info";
  let statusBg = "bg-info/10";
  let statusBorder = "border-info/20";
  
  if (combinedProgress >= 95) {
    statusText = "Almost Ready";
    statusColor = "text-success";
    statusBg = "bg-success/10";
    statusBorder = "border-success/20";
  } else if (combinedProgress >= 75) {
    statusText = "Getting Close";
    statusColor = "text-brand-secondary";
    statusBg = "bg-brand-secondary/10";
    statusBorder = "border-brand-secondary/20";
  } else if (combinedProgress >= 50) {
    statusText = "Halfway There";
    statusColor = "text-info";
    statusBg = "bg-info/10";
    statusBorder = "border-info/20";
  } else if (combinedProgress >= 25) {
    statusText = "In Progress";
    statusColor = "text-brand-secondary";
    statusBg = "bg-brand-secondary/10";
    statusBorder = "border-brand-secondary/20";
  }
  
  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${statusBg} border ${statusBorder}`}>
            <Timer className={`h-4 w-4 ${statusColor}`} />
          </div>
          <div>
            <h4 className={`font-semibold ${statusColor}`}>{statusText}</h4>
            <p className="text-xs text-muted-foreground">Queue Position: {current} of {total}</p>
          </div>
        </div>
        
        <div className={`px-4 py-2 rounded-lg ${statusBg} border ${statusBorder}`}>
          <p className={`text-sm font-bold ${statusColor}`}>
            {Math.round(combinedProgress)}% Complete
          </p>
        </div>
      </div>
      
      {/* Main Progress Bar with Milestones */}
      <div className="relative">
        {/* Background Track */}
        <div className="relative h-6 bg-muted rounded-full overflow-hidden">
          {/* Combined progress bar */}
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-info via-brand-primary to-brand-secondary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${combinedProgress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          
          {/* Current position indicator */}
          <motion.div 
            className="absolute top-0 w-2 h-6 bg-background border border-border rounded-full shadow-lg"
            style={{ left: `${Math.max(0, combinedProgress - 1)}%` }}
            animate={{ 
              opacity: [0.7, 1, 0.7],
              boxShadow: [
                '0 0 5px 2px hsl(var(--primary) / 0.3)',
                '0 0 8px 3px hsl(var(--primary) / 0.5)',
                '0 0 5px 2px hsl(var(--primary) / 0.3)'
              ]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          
          {/* Milestone markers */}
          {[25, 50, 75].map(milestone => (
            <div 
              key={milestone}
              className="absolute top-0 bottom-0 w-0.5 bg-border"
              style={{ left: `${milestone}%` }}
            >
              <div 
                className={`absolute -top-6 transform -translate-x-1/2 text-xs ${
                  combinedProgress >= milestone ? 'text-primary' : 'text-muted-foreground'
                }`}
                style={{ left: '50%' }}
              >
                {milestone}%
              </div>
            </div>
          ))}
        </div>
        
        {/* Secondary Progress Indicators */}
        <div className="mt-2 flex">
          {/* Position Progress */}
          <div className="flex-1 pr-1">
            <div className="relative h-2 bg-muted/50 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-primary/70 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${positionProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
          
          {/* Wait Time Progress */}
          <div className="flex-1 pl-1">
            <div className="relative h-2 bg-muted/50 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-success/70 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${waitTimeProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress Details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 rounded-lg bg-info/10 border border-info/20">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-info" />
              <span className="text-xs font-medium text-info">Position Progress</span>
            </div>
            <span className="text-xs font-bold text-info">{Math.round(positionProgress)}%</span>
          </div>
          <p className="text-xs text-muted-foreground">Based on your queue position: {current} of {total}</p>
        </div>
        
        <div className="p-3 rounded-lg bg-success/10 border border-success/20">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-success" />
              <span className="text-xs font-medium text-success">Time Progress</span>
            </div>
            <span className="text-xs font-bold text-success">{Math.round(waitTimeProgress)}%</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {estimatedWaitTime ? `Est. time remaining: ${formatWaitTime(estimatedWaitTime)}` : 'Time-based estimate'}
          </p>
        </div>
      </div>
      
      {/* Weighted Progress Explanation */}
      <div className="flex items-center justify-between text-xs text-muted-foreground bg-muted/30 p-2 rounded">
        <span>Combined progress uses weighted average (70% position, 30% time)</span>
        <span className="cursor-help" title="Our algorithm uses multiple factors to predict your queue position, including historical data for this physician">ⓘ</span>
      </div>
    </div>
  );
};

const InfoCard = ({ icon: Icon, label, value, sublabel, color = "blue", actionable = false, onIconClick }) => {
  // Define color variants to handle dynamic colors in a Tailwind-friendly way
  const colorVariants = {
    blue: {
      bg: "bg-info/10",
      border: "border-info/20",
      text: "text-info"
    },
    green: {
      bg: "bg-success/10",
      border: "border-success/20",
      text: "text-success"
    },
    purple: {
      bg: "bg-brand-secondary/10",
      border: "border-brand-secondary/20",
      text: "text-brand-secondary"
    },
    orange: {
      bg: "bg-warning/10",
      border: "border-warning/20",
      text: "text-warning"
    },
    red: {
      bg: "bg-destructive/10",
      border: "border-destructive/20",
      text: "text-destructive"
    }
  };

  // Get color config or default to blue
  const colorConfig = colorVariants[color] || colorVariants.blue;
  
  // Create a more descriptive tooltip based on the action type
  const tooltipText = actionable 
    ? label === 'Location' 
      ? 'Click to view location on Google Maps' 
      : label === 'Contact' 
        ? 'Click to call this number' 
        : `Click to interact with ${label}`
    : '';

  return (
    <div className="h-full">
      <div className="group relative h-full">
        {/* Tooltip for when actionable */}
        {actionable && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-popover text-popover-foreground text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 pointer-events-none border">
            {tooltipText}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-popover rotate-45 border-r border-b"></div>
          </div>
        )}
        
        <motion.div 
          className={`p-4 rounded-xl bg-gradient-to-br from-card to-muted border border-border transition-all duration-200 h-full flex flex-col ${actionable ? 'cursor-pointer hover:border-primary/50 active:scale-98' : ''}`}
          whileHover={{ y: actionable ? -3 : -2 }}
          whileTap={actionable ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={actionable ? onIconClick : undefined}
          title={tooltipText}
        >
          <div className="flex items-start gap-3 flex-1">            
            <div 
              className={`p-2 rounded-lg ${colorConfig.bg} border ${colorConfig.border} ${actionable ? 'hover:brightness-125 transition-all' : ''}`}
            >
              <Icon className={`h-6 w-6 ${colorConfig.text}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
              <p className="font-semibold text-foreground text-sm mt-2 truncate">{value}</p>
              {sublabel && <p className="text-xs text-muted-foreground mt-1">{sublabel}</p>}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default function AppointmentTracker({ data }) {
  // Ensure data exists with default values
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const isMobile = useIsMobile();

  // Set time left when data changes
  useEffect(() => {
    if (data?.queue?.estimatedWaitTime) {
      setTimeLeft(data.queue.estimatedWaitTime);
    }
  }, [data?.queue?.estimatedWaitTime]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (timeLeft > 0 && data?.queue?.isPatientTurn === false) {
        // Decrease by 1/6th of a minute every 10 seconds (1 minute per minute)
        setTimeLeft(prev => Math.max(0, prev - 1/6));
      }
    }, 10000);
    
    return () => clearInterval(timer);
  }, [timeLeft, data?.queue?.isPatientTurn]);

  // Show loading state if no data
  if (!data) {
    return (
      <div className="w-full max-w-5xl mx-auto p-8 rounded-2xl bg-card border border-border shadow-lg text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded mb-4 mx-auto w-1/2"></div>
          <div className="h-4 bg-muted rounded mb-6 mx-auto w-3/4"></div>
          <div className="h-40 bg-muted rounded"></div>
        </div>
        <p className="text-muted-foreground mt-6">Loading appointment data...</p>
      </div>
    );
  }
  
  const { appointment, doctor, hospital, queue, refreshedAt } = data;
  
  // Position-based progress
  const positionProgress = queue?.appointmentsAhead === 0 ? 100 : 
    Math.max(0, Math.min(100, ((queue?.position - queue?.appointmentsAhead) / queue?.position) * 100)) || 0;
  
  // Wait time-based progress calculation
  // Calculate progress based on how much estimated wait time has elapsed
  const totalWaitTime = queue?.estimatedWaitTime || 0;
  const remainingTime = timeLeft || 0;
  const waitTimeProgress = totalWaitTime > 0 ? 
    Math.max(0, Math.min(100, ((totalWaitTime - remainingTime) / totalWaitTime) * 100)) : 
    positionProgress; // Fallback to position progress if no wait time available

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  // Get consultation type or default to "Medical"
  const consultationType = "Medical";

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`w-full ${isMobile ? 'mx-auto' : 'max-w-4xl mx-auto'}`}
    >
      {/* Main Professional Card */}
      <div className={`relative overflow-hidden  bg-card border border-border shadow-lg ${
        isMobile ? 'p-2 space-y-2' : 'p-4 space-y-4'
      }`}>
        {/* Header Bar */}
        <div className="h-1 bg-gradient-to-r from-primary via-brand-primary to-brand-secondary" />
        
        {/* Tiqora Logo in top-left corner
        <div className="absolute top-2 left-2 z-10">
          <div className="bg-background border border-border rounded-lg p-1 shadow-lg">
            <img 
              src="/Tiqora1.png" 
              alt="Tiqora Logo" 
              className={`${isMobile ? 'h-6 w-auto' : 'h-8 w-auto'} object-contain`}
            />
          </div>
        </div> */}
                
        {/* Main Content */}
        <div className="p-6 lg:p-8">
          {/* Header Section */}
          <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 mb-10">
            <div className="space-y-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-info/10 border border-info/20">
                  <FileText className="h-5 w-5 text-info" />
                </div>
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-foreground">
                    {consultationType} Appointment
                  </h1>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-info" />
                  {formatDate(appointment.appointmentDate, 'full')}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-info" />
                  {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-info" />
                  {hospital.name}
                </div>
              </div>
            </div>
            
            <StatusIndicator status={appointment.status} />
          </motion.div>

          

          {/* Queue Management Section */}
          <motion.div
            variants={itemVariants}
            className="p-6 lg:p-8 rounded-xl bg-muted/30 border border-border"
          >
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 gap-4">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Real-time appointment tracking</h3>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 rounded-lg bg-info/10 border border-info/20">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-info" />
                    <span className="text-info font-medium">Position {queue?.position || 'N/A'}</span>
                  </div>
                </div>
                
                <div className="px-4 py-2 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">Live Updates</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Progress Visualization */}
            <div className="mb-8">
              <ProfessionalProgress 
                positionProgress={positionProgress}
                waitTimeProgress={waitTimeProgress}
                total={queue?.position || 1}
                current={(queue?.position || 1) - (queue?.appointmentsAhead || 0)}
                estimatedWaitTime={queue?.estimatedWaitTime || 0}
              />
            </div>
            
            {/* Statistics Grid */}
           <div className="lg:col-span-2 mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                    { 
                        label: "Appointments Ahead", 
                        value: queue.appointmentsAhead,
                        icon: Users,
                        color: "text-warning"
                    },
                    { 
                        label: "Wait Time", 
                        value: queue.estimatedWaitTime ? formatWaitTime(queue.estimatedWaitTime) : "N/A",
                        icon: Clock,
                        color: "text-brand-secondary"
                    },
                    { 
                        label: "Queue Status", 
                        value: queue.appointmentsAhead === 0 
                        ? "Ready Soon" 
                        : `${Math.round((positionProgress * 0.7) + (waitTimeProgress * 0.3))}% Complete`,
                        icon: HeartPulse,
                        color: queue.appointmentsAhead === 0 ? "text-success" : "text-info"
                    }
                    ].map((stat, index) => (
                    <motion.div
                        key={index}
                        className="p-4 rounded-lg bg-muted/50 border border-border text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                    >
                        <stat.icon className={`h-5 w-5 ${stat.color} mx-auto mb-2`} />
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                        <p className={`font-bold text-lg ${stat.color}`}>{stat.value}</p>
                    </motion.div>
                    ))}
                </div>
            </div>
            
            {/* Status Message */}
            <motion.div 
              className={`p-4 rounded-lg border text-center ${
                queue?.isPatientTurn 
                  ? "bg-success/10 border-success/30 text-success" 
                  : "bg-info/10 border-info/30 text-info"
              }`}
              animate={queue?.isPatientTurn ? { 
                borderColor: ["hsl(var(--success) / 0.3)", "hsl(var(--success) / 0.6)", "hsl(var(--success) / 0.3)"]
              } : {}}
              transition={{ repeat: queue?.isPatientTurn ? Infinity : 0, duration: 2 }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Bell className="h-4 w-4" />
                <span className="font-semibold text-sm">
                  {queue?.isPatientTurn ? "CONSULTATION READY" : "QUEUE NOTIFICATION"}
                </span>
              </div>
              <p className="text-sm opacity-90">{queue?.queueStatus || "Waiting for queue status update..."}</p>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Footer */}
        <div className="bg-muted/50 border-t border-border px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">

              <span>Last updated: {refreshedAt ? formatDate(refreshedAt) + "  "  + formatTime(refreshedAt) : new Date().toLocaleTimeString()}</span>
              <span>•</span>
              <span>Auto-refresh: Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-success">System Online</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}