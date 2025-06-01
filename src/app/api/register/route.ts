import { NextRequest, NextResponse } from "next/server"; // Import NextRequest
import prisma from "@/lib/db";

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

export async function POST(req: NextRequest) {
  // Use NextRequest instead of NextApiRequest
  try {
    const {
      name,
      phone,
      email,
      home,
      payment_proof,
      payment_amount,
      payment_method,
      card,
      cardwithbox,
      shirts,
      receipt,
      national_id,
      name_on_receipt,
      address_on_receipt,
      alumni,           // <-- add this
      alumni_gen,       // <-- add this
    } = await req.json(); // Since it's NextRequest, you can directly use `req.json()`

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
    if (
      (card === 0 || card === "") &&
      shirts === "" &&
      (cardwithbox === 0 || cardwithbox === "")
    ) {
      shipmentStatus = "5"; // No order status
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
        cardwithbox,
        shirts: shirts || "",
        payment_status: "Pending",
        shipment_status: shipmentStatus,
        receipt,
        payment_method,
        national_id: national_id || "",
        name_on_receipt: name_on_receipt || "",
        address_on_receipt: address_on_receipt || "",
        alumni: alumni === "true" ? "true" : null, 
        alumni_gen: alumni_gen || null,
      },
    });

    return NextResponse.json(newRegister, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating new register:", error.stack);
    } else {
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
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
