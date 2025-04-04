import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get("name");
  const phone = searchParams.get("phone");

  if (!name || !phone) {
    return NextResponse.json(
      { error: "Name and phone parameters are required" },
      { status: 400 }
    );
  }

  try {
    const registrations = await prisma.register.findMany({
      where: {
        name: {
          contains: name,
        },
        phone: {
          equals: phone,
        },
      },
      select: {
        tracking_code: true,
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
