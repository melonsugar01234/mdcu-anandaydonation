/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Fragment, useContext, useMemo, useState } from "react";
import { useAsyncRetry, useMap } from "react-use";
import { queryRegistrationDetails, updateRegistrations } from "@/app/admin/actions";
import { FullPageLoader } from "@/components/Admin/FullPageLoader";
import { omit } from "@/utils/utils";
import { type RegistrationUpdateData } from "@/types/registration";
import { ConfirmationDialogContext } from "@/components/ConfirmationDialog";
import { Checkbox, Input, Radio, RadioSet, TimePicker } from "@/components/Forms";
import { formatNumber } from "@/utils/format";

// region editor schema
/**
 * For generating the form
 */
const editorSchema = [
  {
    key: "name",
    name: "Name",
    mode: "text",
  },
  {
    key: "tel",
    name: "Phone Number",
    mode: "text",
  },
  {
    key: "email",
    name: "Email",
    mode: "text",
  },
  {
    key: "address",
    name: "Address",
    mode: "textarea",
  },
  {
    key: "paymentMethod",
    name: "Payment Method",
    mode: "number",
    displayNote: "1=QRCode, 2=BankAccountNumber",
  },
  {
    key: "requestReceipt",
    name: "Request Receipt",
    mode: "boolean",
  },
  {
    key: "nationalId",
    name: "National ID",
    mode: "text",
  },
  {
    key: "nameOnReceipt",
    name: "Name on Receipt",
    mode: "text",
  },
  {
    key: "addressOnReceipt",
    name: "Address on Receipt",
    mode: "text",
  },
  {
    key: "donateAmount",
    name: "Donate Amount",
    mode: "number",
    displayNote: "Number is shown in Satang (=฿0.01). Ex: ฿500 is 50000",
  },
  {
    key: "transferDateTime",
    name: "Transfer Date Time",
    mode: "time",
    displayNote: "Time denoted in your local timezone.",
  },
  {
    key: "statusNotes",
    name: "Status Note",
    mode: "textarea",
    displayNote: "This value is shown to the user.",
  },
  {
    key: "internalNotes",
    name: "Internal Note",
    mode: "textarea",
    displayNote: "This value is NOT shown to the user.",
  },
  {
    key: "isIncludedInTotal",
    name: "isIncludedInTotal",
    mode: "boolean",
    displayNote: "Whether this registration will contribute to total tally.",
  },
  // TODO: status?: number; editor
  // TODO: Orders editor
] satisfies ({
  key: keyof RegistrationUpdateData;
  name: string;
  displayNote?: string;
} & {
  mode: "text" | "textarea" | "number" | "boolean" | "time";
})[];
// endregion

export const RegistrationEditor: React.FC<{
  registrationId: string;
  itemsData: {
    id: number;
    isAvailable: boolean;
    price: number;
    nameTH: string;
    nameEN: string;
  }[];
  statusData: {
    id: number;
    nameTH: string;
    nameEN: string;
    isDefault: boolean;
  }[];
}> = ({ registrationId, itemsData, statusData }) => {
  const { withConfirmationDialog } = useContext(ConfirmationDialogContext);
  const [lock, setLock] = useState(false);

  const itemsDataMap = useMemo(() => {
    return new Map(itemsData.map((i) => [i.id, i]));
  }, [itemsData]);
  const [editItemID, setEditItemID] = useState(itemsData[0]?.id?.toString() ?? "");
  const [editItemAmount, setEditItemAmount] = useState("0");

  const [touched, { set: setTouched, remove: removeTouched, reset: resetTouched }] = useMap<
    Partial<RegistrationUpdateData>
  >({});

  const data = useAsyncRetry(async () => {
    const id = Number(registrationId);
    if (!Number.isFinite(id))
      return { found: false } as Extract<
        Awaited<ReturnType<typeof queryRegistrationDetails>>,
        { found: false }
      >;
    resetTouched();

    return queryRegistrationDetails(id);
  }, [registrationId]);

  const dataValueOrders = data.value?.orders;
  const itemOrdersDisplaySource = useMemo(
    () =>
      touched["orders"] !== undefined
        ? touched["orders"]
        : (dataValueOrders ?? []).map((o) => ({ id: o.itemId, amount: o.amount })),
    [dataValueOrders, touched],
  );

  if (data.loading) {
    return (
      <div className="grid min-h-svh min-w-svw">
        <FullPageLoader>Loading...</FullPageLoader>
      </div>
    );
  }
  if (!data.value) {
    return (
      <div className="grid min-h-svh min-w-svw">
        <FullPageLoader>Initializing...</FullPageLoader>
      </div>
    );
  }
  if (!data.value.found) {
    return (
      <div className="grid min-h-svh min-w-svw place-content-center">
        <h1>Registration with ID &quot;{registrationId}&quot; is not found.</h1>
      </div>
    );
  }

  const formatNumberOrNull = (num: number | null) =>
    typeof num === "number" ? formatNumber(num, { maxDecimals: null }) : "[NULL]";

  return (
    <div className="w-full overflow-x-hidden p-4">
      {
        // region top buttons & warning
      }
      <div className="mb-4 flex gap-2 overflow-x-auto">
        <button
          type="button"
          className="btn btn-primary btn-wide shrink text-nowrap"
          onClick={withConfirmationDialog(`Refresh? This will clear unsaved changes.`, () => {
            data.retry();
          })}
          disabled={lock}
        >
          Refresh
        </button>
        <button
          type="button"
          className="btn btn-primary btn-wide shrink text-nowrap"
          onClick={withConfirmationDialog(
            `This action cannot be undone. Following fields will be updated: ${Object.keys(touched).join(", ")}.`,
            () => {
              setLock(true);
              updateRegistrations(Number(registrationId), touched)
                .catch((e) => window.alert(e))
                .finally(() => {
                  setLock(false);
                  data.retry();
                });
            },
          )}
          disabled={lock || Object.keys(touched).length === 0}
        >
          Apply Changes
        </button>
      </div>
      <p className="mb-4">
        <b className="bg-primary text-primary-content">WARNING:</b> The admin editor, unlike the
        regular registration form, <b className="bg-primary text-primary-content">DOES NOT</b>{" "}
        validate your input. You are solely responsible for making sure that the data remains valid.
      </p>
      {
        // endregion
      }

      {
        // region schema-generated editor form
      }
      <div className="flex w-full flex-col">
        {editorSchema.map((ed) => (
          <div key={ed.key}>
            <div className="flex w-full flex-nowrap items-center gap-2 overflow-x-auto">
              {ed.mode === "boolean" ? (
                <Checkbox
                  label={ed.name}
                  value={
                    touched[ed.key] !== undefined
                      ? Boolean(touched[ed.key])
                      : Boolean(data.value.registration![ed.key])
                  }
                  onChange={(e) => setTouched(ed.key, e)}
                />
              ) : ed.mode === "text" || ed.mode === "textarea" ? (
                <div className="max-w-md grow">
                  <Input
                    label={ed.name}
                    autoComplete="off"
                    useTextarea={ed.mode === "textarea"}
                    value={
                      touched[ed.key] !== undefined
                        ? (touched[ed.key] ?? "[NULL]")
                        : (data.value.registration![ed.key] ?? "[NULL]")
                    }
                    onChange={(e) => setTouched(ed.key, e)}
                  />
                </div>
              ) : ed.mode === "number" ? (
                <div className="max-w-md grow">
                  <Input
                    type="number"
                    label={ed.name}
                    autoComplete="off"
                    value={formatNumberOrNull(
                      touched[ed.key] !== undefined
                        ? touched[ed.key]!
                        : data.value.registration![ed.key],
                    )}
                    onChange={(e) => setTouched(ed.key, Number(e))}
                  />
                </div>
              ) : ed.mode === "time" ? (
                <TimePicker
                  label={ed.name}
                  value={
                    touched[ed.key] !== undefined
                      ? new Date(Number(touched[ed.key]))
                      : new Date(Number(data.value.registration![ed.key]))
                  }
                  onChange={(e) => setTouched(ed.key, e.valueOf())}
                />
              ) : (
                <p>Unknown editor mode: {(ed as { mode: string }).mode}</p>
              )}

              <div className="flex flex-col">
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => setTouched(ed.key, null)}
                  disabled={
                    touched[ed.key] !== undefined
                      ? touched[ed.key] === null
                      : data.value.registration![ed.key] === null
                  }
                >
                  Set to [NULL]
                </button>
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => removeTouched(ed.key)}
                  disabled={touched[ed.key] === undefined}
                >
                  Reset
                </button>
              </div>
            </div>

            {ed.displayNote && <p>NOTE: {ed.displayNote}</p>}
            <div className="divider" />
          </div>
        ))}
      </div>
      {
        // endregion
      }

      {
        // region status options
      }
      <RadioSet
        label="Status"
        value={
          touched["status"] !== undefined
            ? formatNumber(touched["status"])
            : formatNumber(data.value.registration["status"])
        }
        onChange={(v) => setTouched("status", Number(v))}
      >
        {statusData.map((s) => (
          <Radio
            key={"statusradio-" + s.id}
            label={`${s.id}: ${s.nameTH} / ${s.nameEN}`}
            value={formatNumber(s.id)}
          ></Radio>
        ))}
      </RadioSet>
      <button
        type="button"
        className="btn btn-link"
        onClick={() => removeTouched("status")}
        disabled={touched["status"] === undefined}
      >
        Reset Status
      </button>
      <div className="divider" />
      {
        // endregion
      }

      {
        // region orders
      }
      <h1 className="my-4 text-xl font-bold">Orders</h1>
      <div className="overflow-x-auto">
        <table className="table-zebra table-reduce-padding table-sm table text-nowrap whitespace-nowrap">
          <thead>
            <tr className="bg-primary text-primary-content">
              <th className="w-[1%]">Item ID</th>
              <th>Name TH</th>
              <th>Name EN</th>
              <th className="w-[1%] min-w-20">Amount</th>
              <th className="w-[1%] min-w-20">Price</th>
              <th className="w-[1%] min-w-20">Amount✕Price</th>
            </tr>
          </thead>
          <tbody>
            {/* Orders */}
            {itemOrdersDisplaySource.map((order) => {
              const thisOrder = order;
              const itemData = itemsDataMap.get(thisOrder.id)!;

              return (
                <tr key={"item-" + thisOrder.id}>
                  <td>{itemData.id}</td>
                  <td>{itemData.nameTH}</td>
                  <td>{itemData.nameEN}</td>
                  <td>{formatNumber(thisOrder.amount, { useGrouping: true })}</td>
                  <td>{formatNumber(itemData.price / 100, { useGrouping: true, isTHB: true })}</td>
                  <td>
                    {formatNumber((thisOrder.amount * itemData.price) / 100, {
                      useGrouping: true,
                      isTHB: true,
                    })}
                  </td>
                </tr>
              );
            })}

            {/* Total Row */}
            <tr className="bg-primary! text-primary-content! font-bold">
              <td></td>
              <td></td>
              <td>Total (Merchandise)</td>
              <td></td>
              <td></td>
              <td>
                {formatNumber(
                  itemOrdersDisplaySource.reduce(
                    (sum, order) => sum + order.amount * (itemsDataMap.get(order.id)?.price ?? 0),
                    0,
                  ) / 100,
                  { useGrouping: true, isTHB: true },
                )}{" "}
                {touched["orders"] !== undefined ? "(UNSAVED EDIT VALUE)" : ""}
              </td>
            </tr>
            <tr className="bg-primary! text-primary-content! font-bold">
              <td></td>
              <td></td>
              <td>Donation Amount</td>
              <td></td>
              <td></td>
              <td>
                {formatNumber(
                  Number(
                    touched["donateAmount"] !== undefined
                      ? touched["donateAmount"]!
                      : data.value.registration!["donateAmount"],
                  ) / 100,
                  { useGrouping: true, isTHB: true },
                )}{" "}
                {touched["donateAmount"] !== undefined ? "(UNSAVED EDIT VALUE)" : ""}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex items-end gap-2 overflow-x-auto">
        <select
          className="select"
          value={formatNumber(Number(editItemID))}
          onChange={(e) => setEditItemID(e.target.value)}
        >
          {itemsData.map((i) => (
            <option key={"itemselect-" + i.id} value={i.id.toString()}>
              {i.id}: {i.nameTH} / {i.nameEN}
            </option>
          ))}
        </select>

        <Input
          type="number"
          label="Amount"
          autoComplete="off"
          value={formatNumber(Number(editItemAmount))}
          onChange={(e) => setEditItemAmount(e)}
        />

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            const newOrders = [...itemOrdersDisplaySource];
            const editId = Number(editItemID);
            const editAmount = Number(editItemAmount);

            if (!itemsDataMap.has(editId)) {
              window.alert("Item ID invalid");
              return;
            }
            if (!Number.isFinite(editAmount) || editAmount < 0) {
              window.alert("Amount invalid");
              return;
            }

            const idx = newOrders.findIndex((i) => i.id === editId);
            if (idx === -1) {
              newOrders.push({ id: editId, amount: editAmount });
            } else {
              newOrders[idx] = { id: editId, amount: editAmount };
            }

            setTouched("orders", newOrders);
          }}
        >
          Add/Update
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            setTouched(
              "orders",
              itemOrdersDisplaySource.filter((i) => i.id !== Number(editItemID)),
            )
          }
        >
          Remove Item by ID
        </button>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => removeTouched("orders")}
          disabled={touched["orders"] === undefined}
        >
          Reset Orders
        </button>
        <div className="divider" />
      </div>
      {
        // endregion
      }

      <h1 className="my-4 text-xl font-bold">Receipts</h1>
      <div className="flex w-full flex-col">
        {data.value.receipts.map((i, idx, arr) => (
          <Fragment key={"img-" + i.id}>
            <img className="w-full max-w-md" src={`data:image/jpeg;base64,${i.data}`} />
            {idx < arr.length - 1 && <div className="divider" />}
          </Fragment>
        ))}
      </div>

      <h1 className="my-4 text-xl font-bold">Raw Data</h1>
      <pre className="w-full overflow-x-auto">
        {JSON.stringify(omit(data.value, "receipts"), undefined, 2)}
      </pre>
    </div>
  );
};
