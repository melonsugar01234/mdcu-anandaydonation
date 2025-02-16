"use server";

import { addRegistration, getItemsTable } from "@/db";
import { RegistrationFormDataZ, type RegistrationFormData } from "@/types/registration";

export async function doRegister(formData: RegistrationFormData) {
  // Convert empty strings to null values
  if (formData.email?.length === 0) formData.email = null;
  if (!formData.requestReceipt) {
    formData.nationalId = null;
    formData.nameOnReceipt = null;
    formData.addressOnReceipt = null;
  }

  // Basic shape validation
  const parsedFormData = RegistrationFormDataZ.parse(formData);

  // Get item prices from DB
  const itemsMap = new Map<number, number>(); // Map item ID => price
  const items = await getItemsTable();
  for (const item of items) {
    if (item.isAvailable) itemsMap.set(item.id, item.price);
  }

  // Validate orders
  let totalPrice = 0;
  for (const order of parsedFormData.orders) {
    const price = itemsMap.get(order.id);
    if (price === undefined) throw new Error(`Item ID "${order.id}" doesn't exist`);
    totalPrice += price * order.amount;
  }
  if (totalPrice > parsedFormData.donateAmount)
    throw new Error("Total item price exceeded donation amount");

  // Add registration to database
  const { created, trackingCode } = await addRegistration(parsedFormData);
  return { created, trackingCode };
}
