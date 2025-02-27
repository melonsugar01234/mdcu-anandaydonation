import { redirect } from "next/navigation";
import { checkAdmin } from "@/app/admin/auth";
import { ConfirmationDialogProvider } from "@/components/ConfirmationDialog";
import { RegistrationEditor } from "./RegistrationEditor";
import { getItemsTable, getStatusTable } from "@/db";

export const dynamic = "force-dynamic";

export default async function AdminUIPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  try {
    await checkAdmin();
  } catch (_) {
    redirect("/admin");
  }

  const { id } = await params;
  const itemsData = await getItemsTable();
  const statusData = await getStatusTable();

  return (
    <ConfirmationDialogProvider>
      <RegistrationEditor registrationId={id} itemsData={itemsData} statusData={statusData} />
    </ConfirmationDialogProvider>
  );
}
