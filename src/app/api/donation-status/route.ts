import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET request to fetch donation status
export async function GET() {
  try {
    const status = await prisma.donationStatus.findFirst();
    if (!status) {
      return NextResponse.json({ isOpen: false }); // Default to 'false' if no data found
    }
    return NextResponse.json(status);
  } catch (error) {
    console.error("Error fetching donation status:", error);
    return NextResponse.json(
      { error: "Failed to fetch donation status" },
      { status: 500 }
    );
  }
}

// PUT request to update donation status
export async function PUT(request: NextRequest) {
  try {
    const { isOpen } = await request.json();

    const status = await prisma.donationStatus.findFirst();

    if (status) {
      const updatedStatus = await prisma.donationStatus.update({
        where: { id: status.id }, // Assuming there's only one record
        data: { isOpen },
      });
      return NextResponse.json(updatedStatus);
    } else {
      const newStatus = await prisma.donationStatus.create({
        data: { isOpen },
      });
      return NextResponse.json(newStatus);
    }
  } catch (error) {
    console.error("Error updating donation status:", error);
    return NextResponse.json(
      { error: "Failed to update donation status" },
      { status: 500 }
    );
  }
}
