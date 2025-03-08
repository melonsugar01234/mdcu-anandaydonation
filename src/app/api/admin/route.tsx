// src/app/api/register/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get("name");
  const paymentStatus = searchParams.get("payment_status");
  const shipmentStatus = searchParams.get("shipment_status");
  const receipt = searchParams.get("receipt");
  const cardCount = searchParams.get("card_count");
  const shirt = searchParams.get("shirt");

  try {
    const registrations = await prisma.register.findMany({
      where: {
        ...(name && { name: { contains: name } }),
        ...(paymentStatus && { payment_status: paymentStatus }),
        ...(shipmentStatus && { shipment_status: shipmentStatus }),
        ...(receipt && { receipt }),
        ...(cardCount && { card: { equals: cardCount } }),
        ...(shirt && { shirt: shirt === "not_null" ? { not: null } : null }),
      },
      orderBy: {
        created_at: "desc",
      },
      select: {
        id: true,
        name: true,
        created_at: true,
        shipment_status: true,
        payment_status: true,
        receipt: true,
        card: true,
        shirt: true,
      },
    });

    return NextResponse.json(registrations);
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}
