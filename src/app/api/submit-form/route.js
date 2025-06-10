import { getGoogleSheetsAuth } from '@/lib/googleConfig';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {

    const body = await request.json();
    const { phone, email, name,location } = body;

    const indianTime = new Date().toLocaleString('en-US', { 
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    console.log('Received form data:and time', body,indianTime);

    const sheets = await getGoogleSheetsAuth();
    
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:E',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[phone, email, name, indianTime,location]],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 });
  }
}
