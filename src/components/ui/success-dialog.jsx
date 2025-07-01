'use client';

import * as React from "react";
import { CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/**
 * SuccessDialog component for displaying success messages
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the dialog is open or not
 * @param {function} props.onClose - Function to call when the dialog should be closed
 * @param {string} props.title - Title of the success dialog (optional)
 * @param {string} props.message - Success message to display
 * @param {Array<string>} props.details - Optional array of additional details to display
 */
const SuccessDialog = ({ 
  isOpen, 
  onClose, 
  title = "Success", 
  message,
  details = []
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md mx-4 sm:mx-auto sm:max-w-lg md:max-w-md rounded-lg">
        <DialogHeader className="pb-2 sm:pb-4">
          <div className="flex items-center gap-2 sm:gap-3 text-green-600 dark:text-green-400">
            <CheckCircle className="h-6 w-6 sm:h-5 sm:w-5 flex-shrink-0" />
            <DialogTitle className="text-lg sm:text-xl font-semibold text-left">{title}</DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="py-2 sm:py-3 space-y-3 sm:space-y-4">
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {message}
          </p>
          
          {details && details.length > 0 && (
            <div className="mt-3 sm:mt-4 max-h-48 sm:max-h-60 overflow-auto border rounded-md p-3 sm:p-4 bg-muted/50 border-border">
              <ul className="list-disc pl-4 sm:pl-5 text-xs sm:text-sm space-y-1 sm:space-y-2">
                {details.map((detail, index) => (
                  <li key={index} className="text-muted-foreground leading-relaxed">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <DialogFooter className="pt-2 sm:pt-4 flex-col sm:flex-row gap-2 sm:gap-0">
          <Button 
            onClick={onClose} 
            variant="default"
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-white font-medium py-2.5 sm:py-2 px-6 rounded-md transition-colors duration-200 min-h-[44px] sm:min-h-[36px]"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { SuccessDialog };
