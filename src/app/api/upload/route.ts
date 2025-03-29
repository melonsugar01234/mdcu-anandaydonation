import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Set the upload directory
const uploadDir = path.join(process.cwd(), 'public/uploads');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Helper function to handle file upload without multer
const uploadMiddleware = async (req: NextRequest) => {
  const formData = await req.formData();
  const file = formData.get('payment_proof') as File;

  if (!file) {
    throw new Error('No file uploaded');
  }

  const filePath = path.join(uploadDir, file.name);
  const buffer = Buffer.from(await file.arrayBuffer());

  // Write the file to the uploads folder
  fs.writeFileSync(filePath, buffer);

  return `/uploads/${file.name}`;  // Returning the file path
};

// Handle POST request with file upload
export const config = {
  api: {
    bodyParser: false, // Disable body parser so we can use the formData
  },
};

export async function POST(req: NextRequest) {
  try {
    const filePath = await uploadMiddleware(req);
    return new NextResponse(JSON.stringify({ filePath }), { status: 200 });
  } catch (error) {
    console.error('Error during file upload:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Error during file upload' }),
      { status: 500 }
    );
  }
}
