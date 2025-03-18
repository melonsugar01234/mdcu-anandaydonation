import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Total donators
    const totalDonators = await prisma.register.count();

    // Donators without order
    const donatorsWithoutOrder = await prisma.register.count({
      where: { shipment_status: "No order" },
    });

    // Donators with shirt order
    const donatorsWithShirtOrder = await prisma.register.count({
      where: { shirts: { not: "" } },
    });

    // Donators with commemorable card order
    const donatorsWithCardOrder = await prisma.register.count({
      where: { card: { not: 0 } },
    });

    // Donators with both shirt and card order
    const donatorsWithBothOrders = await prisma.register.count({
      where: {
        card: { not: 0 },
        shirts: { not: "" },
      },
    });

    // Total commemorable card order
    const totalCardOrdersData = await prisma.register.findMany();
    const totalCardOrders = totalCardOrdersData.reduce((sum, registration) => {
      const cardValue = registration.card || 0; // Convert string to number, default to 0 if null
      return sum + cardValue;
    }, 0);

    // Total commemorable card order from users with approved payment
    const totalCardOrdersApprovedData = await prisma.register.findMany({
      where: { payment_status: "accepted" },
    });
    const totalCardOrdersApproved = totalCardOrdersApprovedData.reduce(
      (sum, registration) => {
        const cardValue = registration.card || 0; // Convert string to number, default to 0 if null
        return sum + cardValue;
      },
      0
    );

    // Total shirt orders
    const totalShirtOrders = await prisma.register.findMany();
    const shirtCounts: { [key: string]: number } = {};

    totalShirtOrders.forEach((registration) => {
      if (registration.shirts) {
        const shirts = registration.shirts.split(";");
        shirts.forEach((shirt) => {
          const [size, color, amount] = shirt.split("-");
          const key = `${size}-${color}`;
          shirtCounts[key] = (shirtCounts[key] || 0) + parseInt(amount);
        });
      }
    });

    // Total shirt orders with approved payment status
    const totalShirtOrdersApproved = await prisma.register.findMany({
      where: { payment_status: "accepted" },
    });

    const shirtCountsApproved: { [key: string]: number } = {};
    totalShirtOrdersApproved.forEach((registration) => {
      if (registration.shirts) {
        const shirts = registration.shirts.split(";");
        shirts.forEach((shirt) => {
          const [size, color, amount] = shirt.split("-");
          const key = `${size}-${color}`;
          shirtCountsApproved[key] =
            (shirtCountsApproved[key] || 0) + parseInt(amount);
        });
      }
    });

    return NextResponse.json({
      totalDonators,
      donatorsWithoutOrder,
      donatorsWithShirtOrder,
      donatorsWithCardOrder,
      donatorsWithBothOrders,
      totalCardOrders,
      totalCardOrdersApproved,
      totalShirtOrders: shirtCounts,
      totalShirtOrdersApproved: shirtCountsApproved,
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
