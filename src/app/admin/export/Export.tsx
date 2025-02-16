"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { stringify as csvStringify } from "csv-stringify";
import { getMiscData, queryRegistrations, queryItemOrders } from "@/app/admin/actions";
import { PaymentMethods, type PaymentMethodsT } from "@/types/registration";
import { EXPORT_PAGE_SIZE } from "@/config";

function downloadBlob(name: string, blob: Blob) {
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}

async function exportToCsv(
  log: (msg: string) => void,
  useLocalTime: boolean,
  useBOM: boolean,
): Promise<Blob> {
  log("Started export to CSV");

  log("Getting misc. data");
  let { items, statuses } = await getMiscData();

  // Generate status ID to name map
  const statusMap = new Map(statuses.map((s) => [s.id, `${s.nameTH}/${s.nameEN}`]));

  // Generate item headers
  const itemColumns: string[] = [];
  const itemIdForCol: number[] = [];
  for (const item of items) {
    itemColumns.push(`#${item.nameTH}/${item.nameEN}`);
    itemIdForCol.push(item.id);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-expressions
  (items = null as any), (statuses = null as any);

  // Get all registrations
  let allRegistrations: Awaited<ReturnType<typeof queryRegistrations>>["result"] = [];
  for (let page = 0; ; page++) {
    log(`Getting registrations data (page=${page + 1})`);
    const chunk = await queryRegistrations({ page, pageSize: EXPORT_PAGE_SIZE });
    allRegistrations.push(...chunk.result);
    if (!chunk.hasMore) break;
  }

  // Get all item orders
  let allItemOrders: Awaited<ReturnType<typeof queryItemOrders>>["result"] = [];
  for (let page = 0; ; page++) {
    log(`Getting item orders data (page=${page + 1})`);
    const chunk = await queryItemOrders({ page, pageSize: EXPORT_PAGE_SIZE });
    allItemOrders.push(...chunk.result);
    if (!chunk.hasMore) break;
  }

  log(`Grouping item orders`);
  let groupedItemOrders = Object.groupBy(allItemOrders, ({ registrationId }) => registrationId);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  allItemOrders = null as any;

  log(`Starting CSV processing`);
  const CSVStringify = csvStringify({
    bom: useBOM,
    quoted_string: true,
  });

  // Write headers
  CSVStringify.write([
    "ID",
    "Created Time",
    "Last Updated Time",
    "Status ID",
    "Status Name",
    "Tracking Code",
    "Included in Total Count",
    "Name",
    "Phone Number",
    "Email",
    "Address",
    "Payment Method",
    "Request Receipt",
    "Donate Amount",
    "National ID",
    "Name on Receipt",
    "Address on Receipt",
    "Transfer Time",
    "Status Notes",
    "Internal Notes",
    ...itemColumns,
  ]);

  log(`Writing CSV content`);
  for (const entry of allRegistrations) {
    const paymentMethod = entry["paymentMethod"] as PaymentMethodsT;
    const itemOrders = Object.fromEntries(
      (groupedItemOrders[entry.id] ?? []).map((i) => [i.itemId, i.amount]),
    );

    // For future maintainers, make sure that this aligns with the headers (see above).
    CSVStringify.write([
      entry["id"],
      useLocalTime ? entry["created"].toLocaleString() : entry["created"].toISOString(),
      useLocalTime ? entry["updated"].toLocaleString() : entry["updated"].toISOString(),
      entry["status"],
      statusMap.get(entry["status"]),
      entry["trackingCode"],
      entry["isIncludedInTotal"] ? "yes" : "no",
      entry["name"],
      entry["tel"],
      entry["email"],
      entry["address"],
      paymentMethod === PaymentMethods.QRCode
        ? `${paymentMethod} (QR Code)`
        : paymentMethod === PaymentMethods.BankAccountNumber
          ? `${paymentMethod} (Bank Acc. Number)`
          : `${paymentMethod}`,
      entry["requestReceipt"] ? "yes" : "no",
      (entry["donateAmount"] ?? 0) / 100,
      entry["nationalId"],
      entry["nameOnReceipt"],
      entry["addressOnReceipt"],
      useLocalTime
        ? entry["transferDateTime"]?.toLocaleString()
        : entry["transferDateTime"]?.toISOString(),
      entry["statusNotes"],
      entry["internalNotes"],
      ...itemIdForCol.map((id) => itemOrders[id]),
    ]);
  }
  CSVStringify.end();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-expressions
  (allRegistrations = null as any), (groupedItemOrders = null as any);

  const results: BlobPart[] = [];
  for await (const chunk of CSVStringify) {
    results.push(chunk);
  }

  log(`Done Processing CSV content`);

  return new Blob(results, { type: "text/csv" });
}

export const Export: React.FC = () => {
  const router = useRouter();

  const [lock, setLock] = useState(false);
  const [useLocalTime, setUseLocalTime] = useState(false);
  const [useBOM, setUseBOM] = useState(false);
  const [logs, setLogs] = useState(
    "Welcome to Database Export Tool. Please make sure you have the latest version of your web browser.",
  );

  const appendLogs = (msg: string) => setLogs((logs) => `${logs}\n${msg}`);

  return (
    <>
      <div className="p-4">
        <h1 className="mb-2 text-xl font-bold">Database Export Tool</h1>
        <div className="mb-2 flex items-center gap-2">
          <button
            type="button"
            className="btn btn-primary"
            disabled={lock}
            onClick={() => router.back()}
          >
            Back
          </button>
          <button type="button" className="btn btn-primary" onClick={() => setLogs("")}>
            Clear logs
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={lock}
            onClick={() => {
              setLock(true);
              exportToCsv(appendLogs, useLocalTime, useBOM)
                .then((blob) => downloadBlob(`Export-${Date.now()}.csv`, blob))
                .finally(() => setLock(false));
            }}
          >
            Export to Spreadsheet (CSV)
          </button>

          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={useLocalTime}
            onChange={(e) => setUseLocalTime(e.target.checked)}
          />
          <p className="text-nowrap">
            {useLocalTime
              ? "Use Local Time Format (Timezone will be local)"
              : "Use ISO Time Format (Timezone will be GMT)"}
          </p>

          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={useBOM}
            onChange={(e) => setUseBOM(e.target.checked)}
          />
          <p className="text-nowrap">
            {useBOM
              ? "Use BOM (For Thai texts in Microsoft Excel)"
              : "Don't use BOM (For processing e.g., python)"}
          </p>
        </div>

        <pre>{logs}</pre>
      </div>
    </>
  );
};
