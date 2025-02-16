"use server";

import { checkAdmin, clearToken, setAdminToken } from "./auth";
import { hash, verify } from "@node-rs/argon2";
import {
  db,
  getItemOrders,
  getItemsTable,
  getRegistrationDetails,
  getRegistrations,
  getRuntimeConfig,
  getTotalItemsCount,
  updateRegistration,
} from "@/db";
import { config as configTable, items as itemsTable, status as statusTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { generateSecret } from "jose";
import type { KeyObject } from "node:crypto";
import { omit } from "@/utils/utils";

// region Login/Logout
export async function login(password: string) {
  const adminPassword = (await getRuntimeConfig(["adminPassword"]))["adminPassword"];
  if (!adminPassword) throw new Error("Admin password not set correctly");

  const result = await verify(adminPassword, password);
  if (result) {
    await setAdminToken();
    return { result: true };
  } else {
    return { result: false };
  }
}

export async function logout() {
  await clearToken();
}
// endregion

export async function getMiscData() {
  await checkAdmin();

  return {
    items: await getItemsTable(),
    statuses: await getStatusTable(),
  };
}

export async function getOverview() {
  await checkAdmin();

  return { totalItemsCount: await getTotalItemsCount() };
}

// region Settings
export async function getAllRuntimeConfig() {
  await checkAdmin();

  return (await db.query.config.findMany()).map((entry) => {
    if (entry.key !== "jwtKey") {
      return entry;
    } else {
      return { key: "jwtKey", value: "[REDACTED]" };
    }
  });
}

export async function setRuntimeConfig(config: Record<string, string | null | undefined>) {
  await checkAdmin();

  const tasks: Promise<unknown>[] = [];
  for (const [key, val] of Object.entries(config)) {
    if (val === undefined) {
      tasks.push(db.delete(configTable).where(eq(configTable.key, key)));
    } else {
      tasks.push(
        db
          .insert(configTable)
          .values({ key, value: val })
          .onConflictDoUpdate({ target: configTable.key, set: { value: val } }),
      );
    }
  }
  return Promise.all(tasks);
}

export async function setAdminPassword(newPassword: string) {
  await checkAdmin();

  return setRuntimeConfig({
    adminPassword: await hash(newPassword),
  });
}

export async function resetJWTKey() {
  await checkAdmin();

  return setRuntimeConfig({
    jwtKey: ((await generateSecret("HS256", { extractable: true })) as KeyObject)
      .export()
      .toString("base64url"),
  });
}
// endregion

// region Registration table
export async function queryRegistrations(...args: Parameters<typeof getRegistrations>) {
  await checkAdmin();

  return getRegistrations(...args);
}

export async function queryRegistrationDetails(...args: Parameters<typeof getRegistrationDetails>) {
  await checkAdmin();

  const result = await getRegistrationDetails(...args);

  if (!result.found) {
    return result;
  }

  return {
    ...result,
    receipts: result.receipts.map((r) => ({ ...r, data: r.data.toString("base64") })),
  };
}

export async function queryItemOrders(...args: Parameters<typeof getItemOrders>) {
  await checkAdmin();

  return getItemOrders(...args);
}

export async function updateRegistrations(...args: Parameters<typeof updateRegistration>) {
  await checkAdmin();

  return updateRegistration(...args);
}
// endregion

// region Item and Status Table
export async function getItemTable() {
  await checkAdmin();

  return db.query.items.findMany();
}

export async function updateItemTable(item: typeof itemsTable.$inferInsert) {
  await checkAdmin();

  try {
    await db
      .insert(itemsTable)
      .values(item)
      .onConflictDoUpdate({ target: itemsTable.id, set: omit(item, "id") });
  } catch (e) {
    return { success: false as const, error: (e as Error).toString() };
  }

  return { success: true as const };
}

export async function removeItemTable(id: number) {
  await checkAdmin();

  try {
    await db.delete(itemsTable).where(eq(itemsTable.id, id));
  } catch (e) {
    return { success: false as const, error: (e as Error).toString() };
  }

  return { success: true as const };
}

export async function getStatusTable() {
  await checkAdmin();

  return db.query.status.findMany();
}

export async function updateStatusTable(status: typeof statusTable.$inferInsert) {
  await checkAdmin();

  try {
    await db
      .insert(statusTable)
      .values(status)
      .onConflictDoUpdate({ target: statusTable.id, set: omit(status, "id") });
  } catch (e) {
    return { success: false as const, error: (e as Error).toString() };
  }

  return { success: true as const };
}

export async function removeStatusTable(id: number) {
  await checkAdmin();

  try {
    await db.delete(statusTable).where(eq(statusTable.id, id));
  } catch (e) {
    return { success: false as const, error: (e as Error).toString() };
  }

  return { success: true as const };
}
// endregion
