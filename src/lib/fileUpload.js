import supabase from './supabase';

/**
 * Upload multiple files to Supabase storage
 * 
 * @param {File[]} files - Array of files to upload
 * @param {string} hospitalId - Hospital ID for the path
 * @param {string} appointmentId - Appointment ID for the path
 * @returns {Promise<string[]>} Array of file URLs
 */
export async function uploadFilesToSupabase(files, hospitalId, appointmentId) {
  if (!files || !files.length) {
    throw new Error('No files provided for upload');
  }
  
  if (!hospitalId || !appointmentId) {
    throw new Error('Missing required parameters for upload path');
  }
  
  const uploadPath = `${hospitalId}/${appointmentId}`;
  const uploadPromises = [];
  
  // Process each file
  for (const file of files) {
    if (!file) continue;
    
    // Generate a unique filename with timestamp to avoid collisions
    const timestamp = Date.now();
    const fileExt = file.name.split('.').pop();
    const fileName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    
    const uploadPromise = supabase.storage
      .from('appointments')
      .upload(`${uploadPath}/${fileName}`, file, {
        cacheControl: '3600',
        upsert: true,
        contentType: file.type,
      })
      .then(response => {
        if (response.error) {
          console.error('Upload failed for file:', file.name, response.error);
          throw response.error;
        }
        
        // Get the public URL for the uploaded file
        const { data } = supabase.storage
          .from('appointments')
          .getPublicUrl(`${uploadPath}/${fileName}`);
          
        return data.publicUrl;
      });
      
    uploadPromises.push(uploadPromise);
  }
  
  // Wait for all uploads to complete
  return Promise.all(uploadPromises);
}

/**
 * Validate file types and size
 * 
 * @param {File} file - File to validate
 * @returns {boolean} True if valid, false otherwise
 */
export function validateFile(file) {
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'application/pdf'
  ];
  
  if (!file) return false;
  
  const isValidType = ALLOWED_TYPES.includes(file.type);
  const isValidSize = file.size <= MAX_SIZE;
  
  return isValidType && isValidSize;
}
