import { google } from 'googleapis';

export async function getGoogleSheetsAuth() {
  const jwtClient = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    undefined,
    (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    ['https://www.googleapis.com/auth/spreadsheets'] 
  );

  const sheets = google.sheets({ version: 'v4', auth: jwtClient });
  return sheets;
}