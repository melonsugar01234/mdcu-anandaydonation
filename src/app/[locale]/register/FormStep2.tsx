import { useMemo, useRef } from "react";
import Image from "next/image";
import { NavButtons } from "./NavButtons";
import type { FormStep2Data, FormStepProps } from "./types";
import { useLocale, useTranslations } from "next-intl";
import { formatNumber } from "@/utils/format";
import { ImageUpload, TimePicker } from "@/components/Forms";

export const FormStep2UI: React.FC<FormStepProps<2>> = ({ items, data, setData, setStep }) => {
  const t = useTranslations("RegistrationForm");
  const locale = useLocale();
  const formRef = useRef<HTMLFormElement | null>(null);

  // Cache data to prevent looping on every usage
  const dataOrders = data[1].orders;
  const [totalPrice, dataByItemId] = useMemo(() => {
    let totalPrice = 0;
    const dataByItemId = new Map<
      number,
      { amount: number; price: number; nameEN: string; nameTH: string }
    >();
    for (const item of items) {
      dataByItemId.set(item.id, { ...item, amount: 0 });
    }
    for (const order of dataOrders) {
      const itemData = dataByItemId.get(order.id)!;
      totalPrice += itemData.price * order.amount;
      dataByItemId.set(order.id, { ...itemData, amount: order.amount });
    }
    return [totalPrice, dataByItemId];
  }, [items, dataOrders]);

  const updateByKey = <K extends keyof FormStep2Data>(key: K, value: (typeof data)[2][K]) =>
    setData((prev) => {
      const newData = structuredClone(prev[2]);
      newData[key] = value;
      return newData;
    });

  return (
    <>
      <form ref={formRef} className="flex w-full flex-col gap-8">
        {
          // #region Summary Table
        }
        <div className="overflow-x-auto">
          <h2 className="mb-2 text-base font-bold">{t("summaryTable")}</h2>

          <table className="table-zebra table-reduce-padding table text-nowrap whitespace-nowrap">
            <thead>
              <tr className="bg-primary text-primary-content">
                <th></th>
                <th className="w-[1%] min-w-20">{t("summaryTableAmount")}</th>
                <th className="w-[1%] min-w-20">{t("summaryTablePrice")}</th>
              </tr>
            </thead>
            <tbody>
              {/* Orders */}
              {data[1].orders.map((order) => {
                const thisOrder = order;
                const itemData = dataByItemId.get(thisOrder.id)!;

                return (
                  <tr key={thisOrder.id}>
                    <td>
                      <span>{locale === "th" ? itemData.nameTH : itemData.nameEN}</span>
                    </td>
                    <td>
                      <span>{itemData.amount}</span>
                    </td>
                    <td>
                      <span>
                        {formatNumber((itemData.amount * itemData.price) / 100, {
                          useGrouping: true,
                          isTHB: true,
                        })}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {/* Total Row */}
              <tr className="bg-primary! text-primary-content! font-bold">
                <td>{t("summaryTableTotal")}</td>
                <td></td>
                <td>{formatNumber(totalPrice / 100, { useGrouping: true, isTHB: true })}</td>
              </tr>
              <tr className="bg-primary! text-primary-content! font-bold">
                <td>{t("summaryTableDonationAmount")}</td>
                <td></td>
                <td>
                  {formatNumber(data[1].donateAmount / 100, { useGrouping: true, isTHB: true })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {
          // #endregion
        }

        {
          // region Upload evidence
        }
        <Image src={t("payment_img")} width={2448} height={1262} alt="ways to pay" />

        <h2 className="text-base font-bold">{t("paymentConfirmationUpload")}</h2>
        <TimePicker
          label={t("paymentTransferTime")}
          value={new Date(data[2].transferDateTime)}
          onChange={(v) => updateByKey("transferDateTime", v.valueOf())}
        />

        <ImageUpload
          label={t("paymentTransferUploadLabel")}
          note={t("paymentTransferUploadNote")}
          initialValues={data[2].receipts}
          onChange={(files) => updateByKey("receipts", files)}
        />

        {data[2].receipts.length <= 0 && (
          <div role="alert" className="alert alert-warning alert-soft text-amber-800!">
            <span></span>
            <span>{t("paymentTransferUploadMissing")}</span>
          </div>
        )}
        {
          // endregion
        }
      </form>

      <NavButtons
        isFinalStep={true}
        goPrev={() => {
          setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
          setStep((step) => step - 1);
        }}
        goNext={() => {
          const formValidity = formRef.current?.reportValidity();
          if (formValidity && data[2].receipts.length > 0) {
            setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
            setStep((step) => step + 1);
          }
        }}
      />
    </>
  );
};
