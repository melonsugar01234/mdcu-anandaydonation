import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const TrackingCode = searchParams.get("TrackingCode");

  if (!TrackingCode) {
    return NextResponse.json(
      { error: "Name parameter is required" },
      { status: 400 }
    );
  }

  try {
    const registrations = await prisma.register.findMany({
      where: {
        tracking_code: {
          contains: TrackingCode,
        },
      },
      select: {
        id: true,
        name: true,
        tracking_code: true,
        shirt: true,
        card: true,
        shipment_status: true,
        payment_amount: true,
        payment_proof: true,
        payment_status: true,
      },
    });

    return NextResponse.json(registrations);
  } catch (error) {
    console.error("Error searching registrations:", error);
    return NextResponse.json(
      { error: "Failed to search registrations" },
      { status: 500 }
    );
  }
}
