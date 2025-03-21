import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fetch a single registration by ID
export async function GET(req: NextApiRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const register = await prisma.register.findUnique({
      where: { id: Number(id) },
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

// Update shipment status
export async function PUT(req: NextApiRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const { shipment_status } = await (req as any).json();

    const updatedRegister = await prisma.register.update({
      where: { id: Number(id) },
      data: { shipment_status },
    });

    return NextResponse.json(updatedRegister);
  } catch (error) {
    console.error("Error updating shipment status:", error);
    return NextResponse.json({ error: "Failed to update shipment status" }, { status: 500 });
  }
}
