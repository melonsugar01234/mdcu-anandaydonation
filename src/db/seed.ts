import { generateSecret } from "jose";
import type { KeyObject } from "node:crypto";
import { config, items, status } from "./schema";
import { db } from ".";

/**
 * Seed database with initial values
 */
async function main() {
  console.log("Start seeding database");
  const tasks: Promise<unknown>[] = [];

  tasks.push(
    db.insert(config).values([
      {
        key: "adminPassword",
        value:
          "$argon2id$v=19$m=19456,t=2,p=1$DY7D0SiTd4ivOftIIlRQ1w$8kx+HfqN/PC+nHlrt7ZZeet1rl1qCT8c8iEi6ypqb/M",
      },
      {
        key: "jwtKey",
        value: ((await generateSecret("HS256", { extractable: true })) as KeyObject)
          .export()
          .toString("base64url"),
      },
      { key: "enableRegistrations", value: "yes" },
      { key: "enableSellingPins", value: "yes" },
      { key: "enableSellingShirts", value: "yes" },
      { key: "enableTrackingCodeRecovery", value: "yes" },
      { key: "donationsCurrent", value: "100" },
      { key: "donationsGoal", value: "5000" },
    ]),
  );

  const insertItems: (typeof items.$inferInsert)[] = [];

  insertItems.push({ id: 1, isAvailable: true, price: 15000, nameEN: "Pin", nameTH: "เข็ม" });
  insertItems.push({
    id: 2,
    isAvailable: true,
    price: 15000,
    nameEN: "Group Pin",
    nameTH: "เข็มกลุ่ม",
  });

  const shirtSizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

  for (const [idx, size] of shirtSizes.entries()) {
    insertItems.push({
      id: (1 << 5) + idx,
      isAvailable: true,
      price: 29900,
      nameEN: `Red Shirt (Men ${size})`,
      nameTH: `เสื้อสีแดง (ชายไซส์ ${size})`,
    });
  }

  for (const [idx, size] of shirtSizes.entries()) {
    insertItems.push({
      id: (1 << 5) + (1 << 3) + idx,
      isAvailable: true,
      price: 29900,
      nameEN: `Red Shirt (Women ${size})`,
      nameTH: `เสื้อสีแดง (หญิงไซส์ ${size})`,
    });
  }

  for (const [idx, size] of shirtSizes.entries()) {
    insertItems.push({
      id: (1 << 5) + (1 << 4) + idx,
      isAvailable: true,
      price: 29900,
      nameEN: `Cream Shirt (Men ${size})`,
      nameTH: `เสื้อสีครีม (ชายไซส์ ${size})`,
    });
  }

  for (const [idx, size] of shirtSizes.entries()) {
    insertItems.push({
      id: (1 << 5) + (1 << 4) + (1 << 3) + idx,
      isAvailable: true,
      price: 29900,
      nameEN: `Cream Shirt (Women ${size})`,
      nameTH: `เสื้อสีครีม (หญิงไซส์ ${size})`,
    });
  }

  tasks.push(db.insert(items).values(insertItems));

  const allStatus: Record<number, [string, string]> = {
    0: ["กำลังตรวจสอบหลักฐานการโอนเงิน", "Verifying Transaction"],
    1: ["กำลังจัดเตรียมเข็มฯ / เสื้อ", "Preparing Order"],
    2: ["จัดส่งเข็มฯ / เสื้อ แล้ว", "Order shipped"],
    3: ["อยู่ระหว่างการออกใบเสร็จ", "Generating Receipt"],
    4: ["จัดส่งใบเสร็จแล้ว", "Receipt Shipped"],
    99: ["มีปัญหาเกิดขึ้น", "A problem has occurred"],
  };

  tasks.push(
    db.insert(status).values(
      Object.entries(allStatus).map(([statusCode, messages]) => ({
        id: Number(statusCode),
        nameTH: messages[0],
        nameEN: messages[1],
        isDefault: Number(statusCode) == 0,
      })),
    ),
  );

  await Promise.all(tasks);
  console.log("Done seeding database");
}

main();
