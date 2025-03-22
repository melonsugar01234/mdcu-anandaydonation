import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function generateTrackingCode() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

async function isTrackingCodeUnique(code: string) {
  const existing = await prisma.register.findFirst({
    where: { tracking_code: code },
  });
  return !existing;
}

export async function POST(req: NextApiRequest) {
  try {
    const { name, phone, email, home, payment_proof, payment_amount, payment_method, card, shirts, receipt, national_id, name_on_receipt, address_on_receipt} =
      await (req as any).json();
    if (!name || !phone || !home || !payment_amount || !payment_proof) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let trackingCode;
    do {
      trackingCode = generateTrackingCode();
    } while (!(await isTrackingCodeUnique(trackingCode)));

    let shipmentStatus = "0"; // Default status
    if ((card === "0" || card === "") && (shirts === "")) {
      shipmentStatus = "ไม่มีคำสั่งซื้อ"; // No order status
    }

    const newRegister = await prisma.register.create({
      data: {
        name,
        phone,
        email: email || "",
        home,
        payment_proof: payment_proof || "",
        payment_amount,
        tracking_code: trackingCode,
        card,
        shirts: shirts || "",
        payment_status: "Pending",
        shipment_status: shipmentStatus,
        receipt,
        payment_method,
        national_id: national_id || "",
        name_on_receipt: name_on_receipt || "",
        address_on_receipt: address_on_receipt || "",
      },
    });
    
    
    return NextResponse.json(newRegister, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Log the stack trace of the error for debugging
      console.error("Error creating new register:", error.stack);
    } else {
      // If the error is not an instance of Error, just log a generic message
      console.error("An unknown error occurred:", error);
    }  
    return NextResponse.json(
      { error: "Failed to create new register" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const registers = await prisma.register.findMany();
    return NextResponse.json(registers);
  } catch (error) {
    console.error("Error fetching register data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

