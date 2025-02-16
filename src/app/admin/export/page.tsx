import { redirect } from "next/navigation";
import { checkAdmin } from "@/app/admin/auth";
import { ConfirmationDialogProvider } from "@/components/ConfirmationDialog";
import { Export } from "./Export";

export const dynamic = "force-dynamic";

export default async function AdminUIPage() {
  try {
    await checkAdmin();
  } catch (_) {
    redirect("/admin");
  }

  return (
    <ConfirmationDialogProvider>
      <Export />
    </ConfirmationDialogProvider>
  );
}
