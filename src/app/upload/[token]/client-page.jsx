'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { uploadFilesToSupabase, validateFile } from '@/lib/fileUpload';
import { uploadDocuments } from '@/lib/patientAPI';
import { SuccessDialog } from '@/components/ui/success-dialog';
import { ErrorDialog } from '@/components/ui/error-dialog';

// File types display helper
const getFileTypeIcon = (fileName) => {
  const extension = fileName.split('.').pop().toLowerCase();
  switch (extension) {
    case 'pdf':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      );
    case 'jpg':
    case 'jpeg':
    case 'png':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
        </svg>
      );
  }
};

/**
 * Client Component - Upload Page UI
 * Receives pre-validated token data from server component
 */
export default function UploadClientPage({ tokenData, token }) {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  
  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const MAX_FILES = 5;
    
    if (selectedFiles.length + files.length > MAX_FILES) {
      setDialogMessage(`You can upload maximum ${MAX_FILES} files.`);
      setShowErrorDialog(true);
      return;
    }
    
    // Validate each file
    const invalidFiles = selectedFiles.filter(file => !validateFile(file));
    if (invalidFiles.length > 0) {
      setDialogMessage('Only images (JPG, PNG) and PDF files up to 10MB are allowed.');
      setShowErrorDialog(true);
      return;
    }
    
    setFiles([...files, ...selectedFiles]);
  };
  
  // Remove file from selection
  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (files.length === 0) {
      setDialogMessage('Please select at least one file to upload.');
      setShowErrorDialog(true);
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(10);
    
    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 15, 90));
      }, 500);
      
      // Upload files to Supabase
      const fileUrls = await uploadFilesToSupabase(
        files,
        tokenData.hospitalId,
        tokenData.appointmentId
      );
      
      setUploadProgress(95);
      
      // Upload documents metadata to API
      await uploadDocuments(token, { documents: fileUrls });
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Show success dialog
      setDialogMessage('Your documents were successfully uploaded!');
      setShowSuccessDialog(true);
      
      // Reset form
      setFiles([]);
    } catch (error) {
      console.error('Upload failed:', error);
      setDialogMessage(error.message || 'Failed to upload files. Please try again.');
      setShowErrorDialog(true);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="text-center border-b pb-4">
          <CardTitle className="text-2xl font-bold">Upload Documents</CardTitle>
          <p className="text-gray-500 mt-2">
            Please upload your medical documents (images or PDFs)
          </p>
        </CardHeader>
        
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="border-2 border-dashed rounded-lg p-6 text-center bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-lg font-medium text-gray-700">
                      {files.length > 0 ? 'Add more files' : 'Drag and drop files here'}
                    </span>
                    <span className="text-sm text-gray-500">
                      or click to browse (JPG, PNG, PDF up to 10MB)
                    </span>
                  </div>
                  <Input 
                    id="file-upload" 
                    type="file" 
                    accept=".jpg,.jpeg,.png,.pdf" 
                    multiple 
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isUploading || files.length >= 5}
                  />
                </Label>
              </div>
              
              <div className="text-xs text-gray-500 mt-2">
                Maximum 5 files. Supported formats: JPG, PNG, PDF. Max size: 10MB per file.
              </div>
            </div>
            
            {files.length > 0 && (
              <div className="mt-6 mb-6">
                <h3 className="text-lg font-semibold mb-2">Selected Files</h3>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center space-x-2">
                        {getFileTypeIcon(file.name)}
                        <div className="flex flex-col">
                          <span className="font-medium truncate max-w-[200px]">{file.name}</span>
                          <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                        </div>
                      </div>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeFile(index)}
                        disabled={isUploading}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 hover:text-red-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {isUploading && (
              <div className="mb-6">
                <div className="flex justify-between mb-2 text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress 
                  value={uploadProgress} 
                  className="h-2" 
                  indicatorClassName="bg-blue-500" 
                />
              </div>
            )}
            
            <div className="flex justify-end space-x-2 mt-6">
              <Button
                type="button"
                variant="outline"
                disabled={isUploading}
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={files.length === 0 || isUploading}
              >
                {isUploading ? 'Uploading...' : 'Upload Documents'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {/* Success Dialog */}
      <SuccessDialog
        isOpen={showSuccessDialog}
        onClose={() => {
          setShowSuccessDialog(false);
          router.push('/'); // Redirect to home page after successful upload
        }}
        title="Upload Successful"
        message={dialogMessage}
      />
      
      {/* Error Dialog */}
      <ErrorDialog
        isOpen={showErrorDialog}
        onClose={() => setShowErrorDialog(false)}
        title="Upload Error"
        message={dialogMessage}
      />
    </div>
  );
}
