import { validateUploadToken } from './actions';
import UploadClientPage from './client-page';
import { redirect } from 'next/navigation';

/**
 * Server Component - Upload Page
 * Handles token validation via backend API before rendering the client component
 * Prevents upload if documents already exist for the appointment
 */
export default async function UploadPage({ params }) {
  console.log('UploadPage - Received params:', params);
  // Await params before using its properties
  const { token } = await params;
  
  // Server-side token validation using backend API
  const result = await validateUploadToken(token);
  
  // If validation fails, redirect to error page
  if (!result.success) {
    redirect(`/error?message=${encodeURIComponent(result.error)}`);
  }
  
  // Check if documents already exist
  if (result.data.documentsExist) {
    redirect(`/error?message=${encodeURIComponent('Documents have already been uploaded for this appointment')}`);
  }
  
  // Pass the validated token data to the client component
  return <UploadClientPage tokenData={result.data} token={token} />;
}

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