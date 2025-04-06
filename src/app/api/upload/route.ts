import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "uploads"); // ✅ NOT in /public

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const uploadMiddleware = async (req: NextRequest) => {
  const formData = await req.formData();
  const file = formData.get("payment_proof") as File;

  if (!file) {
    throw new Error("No file uploaded");
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const ext = path.extname(file.name);
  const base = path.basename(file.name, ext);
  const timestamp = Date.now();
  const uniqueName = `${base}-${timestamp}${ext}`;
  const filePath = path.join(uploadDir, uniqueName);

  await fs.promises.writeFile(filePath, buffer);

  return `/api/files/${uniqueName}`; // ✅ dynamic served path
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const filePath = await uploadMiddleware(req);
    return new NextResponse(JSON.stringify({ filePath }), { status: 200 });
  } catch (error) {
    console.error("Error during file upload:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error during file upload" }),
      { status: 500 }
    );
  }
}
