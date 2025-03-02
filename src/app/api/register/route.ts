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
    const { name, phone, email, home, payment_proof, payment_amount } = await (
      req as any
    ).json();

    if (!name || !phone || !home || !payment_amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let trackingCode;
    do {
      trackingCode = generateTrackingCode();
    } while (!(await isTrackingCodeUnique(trackingCode)));

    const newRegister = await prisma.register.create({
      data: {
        name,
        phone,
        email: email || "",
        home,
        payment_proof: payment_proof || "",
        payment_amount,
        tracking_code: trackingCode,
      },
    });
    return NextResponse.json(newRegister, { status: 201 });
  } catch (error) {
    console.error("Error creating new register:", error);
    return NextResponse.json(
      { error: "Failed to create new register" },
      { status: 500 }
    );
  }
}
