import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// Updated GET handler
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    if (!(await params)?.id) throw new Error("Missing ID parameter.");

    const id = Number((await params).id);
    const register = await prisma.register.findUnique({
      where: { id },
    });

    if (!register) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(register);
  } catch (error) {
    console.error("Error fetching registration:", error);
    return NextResponse.json(
      { error: "Failed to fetch registration" },
      { status: 500 }
    );
  }
}

// Updated PUT handler
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    if (!(await params)?.id) throw new Error("Missing ID parameter.");

    const id = Number((await params).id);
    const {
      shipment_status,
      payment_status,
      item_tracking_number,
      receipt_tracking_number,
      error_details,
      alumni,
      alumni_gen,
    } = await request.json();

    const updatedRegister = await prisma.register.update({
      where: { id },
      data: {
        shipment_status: shipment_status ?? undefined,
        payment_status: payment_status ?? undefined,
        item_tracking_number: item_tracking_number ?? undefined,
        receipt_tracking_number: receipt_tracking_number ?? undefined,
        error_details: error_details ?? undefined,
        alumni: alumni ?? undefined,
        alumni_gen: alumni_gen ?? undefined,
      },
    });

    return NextResponse.json(updatedRegister);
  } catch (error) {
    console.error("Error updating register:", error);
    return NextResponse.json(
      { error: "Failed to update registration" },
      { status: 500 }
    );
  }
}

// Updated DELETE handler
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    if (!(await params)?.id) throw new Error("Missing ID parameter.");

    const id = Number((await params).id);
    const register = await prisma.register.findUnique({
      where: { id },
    });

    if (!register) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      );
    }

    await prisma.register.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Registration deleted successfully" });
  } catch (error) {
    console.error("Error deleting registration:", error);
    return NextResponse.json(
      { error: "Failed to delete registration" },
      { status: 500 }
    );
  }
}
