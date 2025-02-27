"use server";

import {
  getRegistrationByTrackingCode,
  getRegistrationsForLostTrackingCode,
  getRuntimeConfig,
} from "@/db";
import { pick } from "@/utils/utils";

export async function getStatus(trackingCodes: string[]) {
  const registrations = await getRegistrationByTrackingCode(trackingCodes);

  return registrations.map((i) =>
    pick(i, "trackingCode", "status", "statusNameEN", "statusNameTH", "statusNotes"),
  );
}

export async function findLostTrackingCode(
  name: string,
  phoneNumber: string,
): Promise<{ error: true } | { error?: false; result: string[] }> {
  const config = await getRuntimeConfig(["enableTrackingCodeRecovery"]);
  if (!config.enableTrackingCodeRecovery) {
    return { error: true };
  }

  const registrations = await getRegistrationsForLostTrackingCode(name, phoneNumber);
  return { result: registrations.map((i) => i.trackingCode) };
}
