import { getTranslations } from "next-intl/server";
import { RegistrationForm } from "./Form";
import { getItemsTable, getRuntimeConfig } from "@/db";

export const dynamic = "force-dynamic";

export default async function Register() {
  const t = await getTranslations("RegistrationForm");

  const items = (await getItemsTable()).filter((i) => i.isAvailable);
  const registrationRuntimeConfigs = await getRuntimeConfig([
    "enableRegistrations",
    "enableSellingPins",
    "enableSellingShirts",
  ]);

  return (
    <div className="flex w-full max-w-screen-md flex-col items-center gap-4 p-4 py-8">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <p className="mb-4">{t("subtitle")}</p>

      {registrationRuntimeConfigs["enableRegistrations"] ? (
        <RegistrationForm items={items} config={registrationRuntimeConfigs} />
      ) : (
        <p className="text-center font-bold">{t("closed")}</p>
      )}
    </div>
  );
}
