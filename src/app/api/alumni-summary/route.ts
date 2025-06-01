import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    // Get all alumni with payment_status "Approved" and alumni true
    const alumni = await prisma.register.findMany({
      where: {
        payment_status: "Approved",
        alumni: true,
      },
      select: {
        alumni_gen: true,
        payment_amount: true,
      },
    });

    // Aggregate total payment_amount by alumni_gen (use "ไม่ระบุ" if alumni_gen is null or empty)
    const summary: { [key: string]: number } = {};
    for (const entry of alumni) {
      const gen =
        entry.alumni_gen && entry.alumni_gen.trim() !== ""
          ? entry.alumni_gen
          : "ไม่ระบุ";
      const amount = parseFloat(entry.payment_amount || "0") || 0;
      summary[gen] = (summary[gen] || 0) + amount;
    }

    // Convert to array sorted by alumni_gen (as number if possible)
    const result = Object.entries(summary)
      .map(([alumni_gen, total_amount]) => ({
        alumni_gen,
        total_amount,
      }))
      .sort((a, b) => {
        // Sort numerically if possible, otherwise by string
        const aNum = parseInt(a.alumni_gen);
        const bNum = parseInt(b.alumni_gen);
        if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum;
        return a.alumni_gen.localeCompare(b.alumni_gen);
      });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error aggregating alumni donations:", error);
    return NextResponse.json(
      { error: "Failed to aggregate alumni donations" },
      { status: 500 }
    );
  }
}
