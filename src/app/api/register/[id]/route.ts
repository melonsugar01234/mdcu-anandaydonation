import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fetch a single registration by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!params?.id) throw new Error("Missing ID parameter.");

    const id = Number(params.id);
    const register = await prisma.register.findUnique({
      where: { id },
    });

    if (!register) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    return NextResponse.json(register);
  } catch (error) {
    console.error("Error fetching registration:", error);
    return NextResponse.json({ error: "Failed to fetch registration" }, { status: 500 });
  }
}

// Update shipment status or payment approval
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!params?.id) throw new Error("Missing ID parameter.");

    const id = Number(params.id);
    const { shipment_status, payment_status } = await req.json();

    const updatedRegister = await prisma.register.update({
      where: { id },
      data: {
        shipment_status: shipment_status ?? undefined, // Only update if provided
        payment_status: payment_status ?? undefined, // Only update if provided
      },
    });

    return NextResponse.json(updatedRegister);
  } catch (error) {
    console.error("Error updating register:", error);
    return NextResponse.json({ error: "Failed to update registration" }, { status: 500 });
  }
}
