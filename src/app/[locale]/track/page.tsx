import { getRuntimeConfig } from "@/db";
import { getTranslations } from "next-intl/server";
import { TrackingList } from "./TrackingList";
import { ConfirmationDialogProvider } from "@/components/ConfirmationDialog";

export const dynamic = "force-dynamic";

export default async function Track() {
  const t = await getTranslations("TrackingPage");
  const runtimeConfigs = getRuntimeConfig(["enableTrackingCodeRecovery"]);

  return (
    <div className="flex w-full max-w-screen-md flex-col items-center gap-4 p-4 py-8">
      <h1 className="text-2xl font-bold">{t("title")}</h1>

      <ConfirmationDialogProvider>
        <TrackingList config={await runtimeConfigs} />
      </ConfirmationDialogProvider>
    </div>
  );
}
