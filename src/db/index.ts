import { loadEnvConfig } from "@next/env";
const projectDir = process.cwd();
loadEnvConfig(projectDir);

import * as schema from "./schema";
const { config, registrations, items, orders, status, receipts } = schema;

import Sqlite from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { and, asc, desc, eq, getTableColumns, inArray, like, or, SQL, sql, sum } from "drizzle-orm";
import { SQLiteSyncDialect } from "drizzle-orm/sqlite-core";
import type { RegistrationFormData, RegistrationUpdateData } from "@/types/registration";
import { generateTrackingCode } from "@/utils/trackingCode";
import {
  TRACKING_CODE_GENERATION_LENGTH,
  TRACKING_CODE_GENERATION_RETRY,
  TRANSFER_RECEIPT_MAX_SIZE,
} from "@/config";

const client = new Sqlite(process.env["DB_FILE"]);
client.pragma("journal_mode = WAL");

export const db = drizzle({ client, schema });

/**
 * Get runtime config
 * @param keys list of config keys to get
 * @returns config value as string or null, undefined if key not in config table
 */
export async function getRuntimeConfig<T extends string>(keys: T[]) {
  const data = await db.query.config.findMany({ where: inArray(config.key, keys) });
  return Object.fromEntries(data.map((e) => [e.key, e.value])) as Record<
    T,
    string | null | undefined
  >;
}

/**
 * Get status table
 */
export async function getStatusTable() {
  return db.query.status.findMany();
}

/**
 * Get item table
 */
export async function getItemsTable() {
  return db.query.items.findMany();
}

/**
 * Get receipt blob data
 */
export async function getReceiptData(ids: number[]) {
  return db.query.receipts.findMany({ where: inArray(receipts.id, ids) });
}

/**
 * Add a new registration
 * @param formData data.
 */
export async function addRegistration(
  formData: RegistrationFormData,
): Promise<{ id: number; created: Date; updated: Date; trackingCode: string }> {
  const createdDate = new Date();
  let trackingCode = await generateTrackingCode(TRACKING_CODE_GENERATION_LENGTH);
  let id: number | undefined;

  await db.transaction(async (tx) => {
    for (let i = 0; i < TRACKING_CODE_GENERATION_RETRY; i++) {
      // Regenerate trackingCode if it is a duplicate (up to loop count, then we will fail)
      if ((await tx.$count(registrations, eq(registrations.trackingCode, trackingCode))) === 0)
        break;

      trackingCode = await generateTrackingCode(TRACKING_CODE_GENERATION_LENGTH);
    }

    // Add registration
    const registrationResult = await tx
      .insert(registrations)
      .values({
        created: createdDate,
        updated: createdDate,
        status: sql<
          number | null
        >`(SELECT ${status.id} FROM ${status} WHERE ${status.isDefault}=1 LIMIT 1)`,
        trackingCode: trackingCode,

        name: formData.name,
        tel: formData.tel,
        email: formData.email,
        address: formData.address,
        paymentMethod: formData.paymentMethod,
        requestReceipt: formData.requestReceipt,
        donateAmount: formData.donateAmount,
        nationalId: formData.nationalId,
        nameOnReceipt: formData.nameOnReceipt,
        addressOnReceipt: formData.addressOnReceipt,
        transferDateTime:
          formData.transferDateTime !== null && formData.transferDateTime !== undefined
            ? new Date(formData.transferDateTime)
            : formData.transferDateTime,
      })
      .returning({ id: registrations.id });

    id = registrationResult[0]?.id;
    if (id === undefined) throw new Error("Registration ID is unexpectedly undefined.");

    const tasks: Promise<unknown>[] = [];

    // Add orders
    if (formData.orders) {
      for (const order of formData.orders) {
        tasks.push(
          db.insert(orders).values({
            registrationId: id,
            itemId: order.id,
            amount: order.amount,
          }),
        );
      }
    }

    // Add receipts
    if (formData.receipts) {
      for (const receipt of formData.receipts) {
        const data = Buffer.from(receipt, "base64url");
        if (data.byteLength > TRANSFER_RECEIPT_MAX_SIZE)
          throw new Error(
            `Uploaded receipt exceeded max size (${data.byteLength} > ${TRANSFER_RECEIPT_MAX_SIZE}).`,
          );
        tasks.push(db.insert(receipts).values({ registrationId: id, data }));
      }
    }

    await Promise.all(tasks);
  });

  return { id: id!, trackingCode, created: createdDate, updated: createdDate };
}

/**
 * Update existing registrations, Throws an error if ID doesn't exist.
 * @param id identifies which registration to update
 * @param updateData updated data. To keep the old value of some fields, leave them empty (undefined).
 */
export async function updateRegistration(
  id: number,
  updateData: RegistrationUpdateData,
): Promise<{
  updated: Date;
}> {
  const updatedDate = new Date();

  await db.transaction(async (tx) => {
    // Update registration
    const registrationResult = await tx
      .update(registrations)
      .set({
        updated: updatedDate,
        status: updateData.status,
        trackingCode: updateData.trackingCode,
        isIncludedInTotal: updateData.isIncludedInTotal,

        name: updateData.name,
        tel: updateData.tel,
        email: updateData.email,
        address: updateData.address,
        paymentMethod: updateData.paymentMethod,
        requestReceipt: updateData.requestReceipt,
        donateAmount: updateData.donateAmount,
        nationalId: updateData.nationalId,
        nameOnReceipt: updateData.nameOnReceipt,
        addressOnReceipt: updateData.addressOnReceipt,
        transferDateTime:
          updateData.transferDateTime !== null && updateData.transferDateTime !== undefined
            ? new Date(updateData.transferDateTime)
            : updateData.transferDateTime,

        statusNotes: updateData.statusNotes,
        internalNotes: updateData.internalNotes,
      })
      .where(eq(registrations.id, id));

    if (registrationResult.changes !== 1) throw new Error(`Registration ID "${id}" doesn't exist.`);

    const tasks: Promise<unknown>[] = [];

    // Update orders
    if (updateData.orders) {
      await tx.delete(orders).where(eq(orders.registrationId, id));

      for (const order of updateData.orders) {
        tasks.push(
          db.insert(orders).values({
            registrationId: id,
            itemId: order.id,
            amount: order.amount,
          }),
        );
      }
    }

    // Update receipts
    if (updateData.receipts) {
      await tx.delete(receipts).where(eq(receipts.registrationId, id));

      for (const receipt of updateData.receipts) {
        tasks.push(
          db.insert(receipts).values({
            registrationId: id,
            data: Buffer.from(receipt, "base64url"),
          }),
        );
      }
    }

    await Promise.all(tasks);
  });

  return { updated: updatedDate };
}

/**
 * Get registrations by paginations
 */
export async function getRegistrations(param: {
  page: number;
  pageSize: number;
  sort?: { column: keyof typeof registrations.$inferSelect; desc: boolean }[];
  textSearch?: string | undefined;
  filters?: Partial<typeof registrations.$inferSelect>;
}) {
  const { page, pageSize, sort, textSearch, filters } = param;

  const textSearchPattern = `%${textSearch}%`;
  const textSearchFilter: SQL | undefined = textSearch
    ? or(
        like(registrations.name, textSearchPattern),
        like(registrations.tel, textSearchPattern),
        like(registrations.email, textSearchPattern),
        like(registrations.nameOnReceipt, textSearchPattern),
        like(registrations.trackingCode, textSearchPattern),
      )
    : undefined;

  const queryFilter: SQL[] = [];
  if (filters) {
    for (const [col, val] of Object.entries(filters)) {
      //@ts-expect-error good luck typing this :/
      queryFilter.push(eq(registrations[col], val));
    }
  }

  let query = db
    .select()
    .from(registrations)
    .limit(pageSize + 1)
    .offset(page * pageSize)
    .$dynamic();

  if (sort) {
    query = query.orderBy(
      ...sort.map((ord) =>
        ord.desc ? desc(registrations[ord.column]) : asc(registrations[ord.column]),
      ),
    );
  }

  if (textSearch || filters) {
    query = query.where(and(textSearchFilter, ...queryFilter));
  }

  const result = await query;
  return {
    result: result.slice(0, pageSize),
    hasMore: result.length > pageSize,
  };
}

/**
 * For lost tracking code recovery
 */
export async function getRegistrationsForLostTrackingCode(name: string, phoneNumber: string) {
  return db.query.registrations.findMany({
    where: and(eq(registrations.name, name), eq(registrations.tel, phoneNumber)),
  });
}

/**
 * Get registration details, including ordered items, item names, and status names
 */
export async function getRegistrationDetails(id: number) {
  const registrationPromise = db.query.registrations.findFirst({ where: eq(registrations.id, id) });
  const orderPromise = db.query.orders.findMany({ where: eq(orders.registrationId, id) });
  const receiptPromise = db.query.receipts.findMany({ where: eq(receipts.registrationId, id) });

  const registrationResult = await registrationPromise;
  const orderResult = await orderPromise;
  const receiptResult = await receiptPromise;

  if (!registrationResult) return { found: false as const };

  return {
    found: true as const,
    registration: registrationResult,
    orders: orderResult,
    receipts: receiptResult,
  };
}

/**
 * For displaying tracking code status to the user
 */
export async function getRegistrationByTrackingCode(trackingCodes: string[]) {
  return await db
    .select({
      ...getTableColumns(registrations),
      statusNameEN: status.nameEN,
      statusNameTH: status.nameTH,
    })
    .from(registrations)
    .where(inArray(registrations.trackingCode, trackingCodes))
    .leftJoin(status, eq(status.id, registrations.status));
}

/**
 * Get the total order amount for each item, only for ones which isIncludedInTotal=true
 */
export async function getTotalItemsCount() {
  /**
   * This query selects the orders with isIncludedInTotal=true, then sums the amount
   */
  const sumAmountQuery = db.$with("sumAmountQuery").as(
    db
      .select({
        itemId: orders.itemId,
        sumAmount: sum(orders.amount)
          .mapWith(Number as (value?: unknown) => number | null)
          .as("sumAmount"),
      })
      .from(orders)
      .innerJoin(registrations, eq(registrations.id, orders.registrationId))
      .where(eq(registrations.isIncludedInTotal, true))
      .groupBy(orders.itemId),
  );

  /**
   * Using result from the above query, this query then adds item name to the result
   */
  const sumAmountResult = db
    .with(sumAmountQuery)
    .select({ ...getTableColumns(items), sumAmount: sumAmountQuery.sumAmount })
    .from(sumAmountQuery)
    .rightJoin(items, eq(items.id, sql`"itemId"`));

  return sumAmountResult;
}

export async function getItemOrders(param: {
  page: number;
  pageSize: number;
  filters?: typeof registrations.$inferSelect;
}) {
  const { page, pageSize, filters } = param;

  let query = db
    .select()
    .from(orders)
    .limit(pageSize + 1)
    .offset(page * pageSize)
    .$dynamic();

  const queryFilter: SQL[] = [];
  if (filters) {
    for (const [col, val] of Object.entries(filters)) {
      //@ts-expect-error good luck typing this :/
      queryFilter.push(eq(registrations[col], val));
    }
  }

  if (filters) {
    query = query.where(and(...queryFilter));
  }

  const result = await query;
  return {
    result: result.slice(0, pageSize),
    hasMore: result.length > pageSize,
  };
}

/**
 * Get raw SQL Statement for debugging
 * @param sql result from .getSQL()
 */
export function debugGetSqlStatement(sql: SQL) {
  return new SQLiteSyncDialect().sqlToQuery(sql);
}
