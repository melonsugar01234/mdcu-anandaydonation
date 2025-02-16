import { redirect } from "next/navigation";
import { checkAdmin } from "@/app/admin/auth";
import { AdminUI } from "./AdminUI";
import { ConfirmationDialogProvider } from "@/components/ConfirmationDialog";

export const dynamic = "force-dynamic";

export default async function AdminUIPage() {
  try {
    await checkAdmin();
  } catch (_) {
    redirect("/admin");
  }

  return (
    <ConfirmationDialogProvider>
      <AdminUI />
    </ConfirmationDialogProvider>
  );
}
