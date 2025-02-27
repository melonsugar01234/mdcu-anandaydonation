import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, blob, check, primaryKey } from "drizzle-orm/sqlite-core";

export const config = sqliteTable("config", {
  key: text().primaryKey(),
  value: text(),
});

export const items = sqliteTable("items", {
  id: integer().primaryKey({ autoIncrement: true }),
  isAvailable: integer({ mode: "boolean" }).notNull().default(false),
  price: integer().notNull(),
  nameTH: text().notNull(),
  nameEN: text().notNull(),
});

export const status = sqliteTable("status", {
  id: integer().primaryKey({ autoIncrement: true }),
  nameTH: text().notNull(),
  nameEN: text().notNull(),
  isDefault: integer({ mode: "boolean" }).notNull().default(false),
});

export const registrations = sqliteTable(
  "registrations",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    created: integer({ mode: "timestamp" }).notNull(),
    updated: integer({ mode: "timestamp" }).notNull(),
    status: integer()
      .notNull()
      .references(() => status.id),
    trackingCode: text().notNull().unique(),
    isIncludedInTotal: integer({ mode: "boolean" }).notNull().default(true),

    name: text(),
    tel: text(),
    email: text(),
    address: text(),
    paymentMethod: integer(),
    requestReceipt: integer({ mode: "boolean" }),
    donateAmount: integer(),
    nationalId: text(),
    nameOnReceipt: text(),
    addressOnReceipt: text(),
    transferDateTime: integer({ mode: "timestamp" }),

    statusNotes: text(),
    internalNotes: text(),
  },
  (table) => [check("donateAmount_nonnegative", sql`${table.donateAmount} >= 0`)],
);

export const receipts = sqliteTable("receipts", {
  id: integer().primaryKey({ autoIncrement: true }),
  registrationId: integer()
    .notNull()
    .references(() => registrations.id),
  data: blob({ mode: "buffer" }).notNull(),
});

export const orders = sqliteTable(
  "orders",
  {
    registrationId: integer()
      .notNull()
      .references(() => registrations.id),
    itemId: integer()
      .notNull()
      .references(() => items.id),
    amount: integer().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.registrationId, table.itemId] }),
    check("amount_nonnegative", sql`${table.amount} >= 0`),
  ],
);
