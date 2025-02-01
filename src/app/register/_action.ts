"use server";

import prisma from "../../lib/prisma";
import { redirect } from "next/navigation";

export async function handleCreatePersonalInfo(
  state: { error?: Record<string, string> } | null,
  form: FormData
) {
  const name = form.get("name") as string | null;
  const email = form.get("email") as string | null;
  const telephone = form.get("telephone") as string | null;
  const address = form.get("address") as string | null;
  const donate = form.get("donate") as string | null;

  const errors: Record<string, string> = {};

  if (!name) errors.name = "Name is required";
  if (!telephone) errors.telephone = "Telephone is required";
  if (!address) errors.address = "Address is required";

  if (Object.keys(errors).length > 0) {
    return { error: errors };
  }

  try {
    await prisma.registrations.create({
      data: {
        name: name!,
        email: email || "", // Ensures Prisma gets an empty string instead of null
        telephone: telephone!,
        address: address!,
        donate: donate ? parseInt(donate) : 0,
        status: 1, // Assuming 1 represents 'PENDING'
      },
    });

    redirect("/register/donation-info");
  } catch (error) {
    return { error: { general: "Database error. Please try again." } };
  }
}

export async function handleCreateDonationInfo() {
  // Handle donation info creation
}
